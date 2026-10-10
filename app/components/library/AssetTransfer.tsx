import { useActionMutation } from "@agent-native/core/client/hooks";
import { useT } from "@agent-native/core/client/i18n";
import { callAction } from "@agent-native/core/client/use-action";
import { IconDownload, IconFilePlus, IconUpload } from "@tabler/icons-react";
import { useRef, useState } from "react";

import { Badge } from "@/components/studio/primitives";
import { Button } from "@/components/ui/button";
import { assetFromFilename, assetsToCsv, type AssetRecord } from "@shared/asset-io";

interface ImportReport {
  format: string;
  imported: number;
  read: number;
  dryRun: boolean;
  rejected: { line: number; reason: string; raw: string }[];
  preview?: AssetRecord[];
}

interface ExportResult {
  content: string;
  format: string;
  rowCount: number;
  total: number;
  truncated: boolean;
  filename: string;
}

/**
 * Faire entrer et sortir le catalogue de ressources.
 *
 * Une ressource s'ajoutait une par une, au formulaire, avec son lien. Pour quelqu'un
 * qui a déjà des dossiers de rushes, c'est une porte trop étroite — et rien ne
 * permettait de ressortir le catalogue pour le sauvegarder ou le porter ailleurs.
 *
 * Trois gestes, et ils ne font pas la même chose :
 *
 * | Geste | Ce qui entre | Ce qui est écrit |
 * | --- | --- | --- |
 * | **Choisir des fichiers** | vos fichiers | une fiche par fichier : nom et type déduits |
 * | **Importer un CSV/JSON** | un catalogue | les fiches qu'il décrit |
 * | **Exporter** | — | rien ; un fichier est téléchargé |
 *
 * **Aucun fichier n'est téléversé.** Le contrat du projet l'interdit, et l'interface
 * le dit plutôt que de le laisser découvrir : choisir des fichiers les **catalogue**,
 * le lien reste à renseigner. C'est utile pour inventorier un dossier de rushes en un
 * geste ; ce n'est pas un hébergement.
 */
export function AssetTransfer({
  brandKitId,
  videoId,
  onImported,
  onClose,
}: {
  brandKitId?: string | null;
  videoId?: string | null;
  onImported: () => void;
  /**
   * Fermer le panneau.
   *
   * L'ouverture est tenue par l'écran parent, pas ici : le déclencheur vit dans
   * l'en-tête, à côté d'« Ajouter », tandis que le panneau s'étale sous lui sur toute
   * la largeur. Replié dans ce composant, il héritait du conteneur étroit aligné à
   * droite et sortait illisible.
   */
  onClose: () => void;
}) {
  const t = useT();
  const importAssets = useActionMutation("import-assets");

  const [report, setReport] = useState<ImportReport | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** Le contenu lu, gardé entre la lecture à blanc et la confirmation. */
  const [staged, setStaged] = useState<string | null>(null);

  const manifestInput = useRef<HTMLInputElement>(null);
  const filesInput = useRef<HTMLInputElement>(null);

  const attach = { ...(brandKitId ? { brandKitId } : {}), ...(videoId ? { videoId } : {}) };

  /** Lit un contenu à blanc : on montre ce qui serait créé avant d'écrire. */
  async function stage(content: string) {
    setError(null);
    setPending("read");
    try {
      const result = (await importAssets.mutateAsync({
        content,
        ...attach,
        dryRun: true,
      })) as ImportReport;
      setReport(result);
      setStaged(content);
    } catch (cause) {
      setError((cause as Error)?.message ?? t("transfer.failed"));
    } finally {
      setPending(null);
    }
  }

  async function confirm() {
    if (!staged) return;
    setError(null);
    setPending("write");
    try {
      const result = (await importAssets.mutateAsync({
        content: staged,
        ...attach,
      })) as ImportReport;
      setReport(result);
      setStaged(null);
      onImported();
    } catch (cause) {
      setError((cause as Error)?.message ?? t("transfer.failed"));
    } finally {
      setPending(null);
    }
  }

  /** Un CSV/JSON choisi : lu en texte, jamais téléversé. */
  async function readManifest(file: File) {
    await stage(await file.text());
  }

  /**
   * Des fichiers choisis : on n'en lit que le **nom**.
   *
   * Pas `file.text()` ici — le contenu ne nous sert à rien, et le lire ferait patiner
   * le navigateur sur un dossier de rushes. Le nom donne l'intitulé, l'extension donne
   * le type, et le lien reste à l'utilisateur.
   */
  function catalogue(files: FileList) {
    const records = Array.from(files).map((file) => assetFromFilename(file.name));
    void stage(assetsToCsv(records));
  }

  async function download(format: "csv" | "json") {
    setError(null);
    setPending(format);
    try {
      // `{ method: "GET" }` n'est pas décoratif : l'action déclare `http: { method:
      // "GET" }`, et `callAction` poste par défaut — sans ça, le serveur répond 405.
      const result = await callAction<ExportResult>("export-assets", { format }, { method: "GET" });

      const blob = new Blob([result.content], {
        type: format === "json" ? "application/json" : "text/csv;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = result.filename;
      link.click();
      // Sans révocation, l'URL d'objet retient le contenu jusqu'au rechargement.
      URL.revokeObjectURL(url);
    } catch (cause) {
      setError((cause as Error)?.message ?? t("transfer.failed"));
    } finally {
      setPending(null);
    }
  }

  return (
    <section className="border-border bg-muted/20 flex w-full flex-col gap-3 rounded-lg border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">{t("transfer.title")}</h3>
          <p className="text-muted-foreground max-w-prose text-xs">{t("transfer.hint")}</p>
        </div>
        <Button size="sm" variant="ghost" onClick={onClose}>
          {t("transfer.close")}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={pending !== null}
          onClick={() => filesInput.current?.click()}
        >
          <IconFilePlus size={14} /> {t("transfer.chooseFiles")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={pending !== null}
          onClick={() => manifestInput.current?.click()}
        >
          <IconUpload size={14} /> {t("transfer.chooseManifest")}
        </Button>

        <span className="border-border mx-1 h-5 border-l" aria-hidden="true" />

        <Button
          size="sm"
          variant="ghost"
          disabled={pending !== null}
          onClick={() => download("csv")}
        >
          <IconDownload size={14} /> {pending === "csv" ? t("transfer.exporting") : "CSV"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={pending !== null}
          onClick={() => download("json")}
        >
          <IconDownload size={14} /> {pending === "json" ? t("transfer.exporting") : "JSON"}
        </Button>
      </div>

      {/*
        Deux champs distincts, parce que les deux gestes diffèrent : l'un lit un
        catalogue, l'autre inventorie des fichiers. Un seul champ obligerait à deviner
        l'intention depuis l'extension, et se tromperait sur un CSV à cataloguer.
      */}
      <input
        ref={manifestInput}
        type="file"
        accept=".csv,.json,text/csv,application/json"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void readManifest(file);
          event.target.value = "";
        }}
      />
      <input
        ref={filesInput}
        type="file"
        multiple
        className="sr-only"
        onChange={(event) => {
          if (event.target.files?.length) catalogue(event.target.files);
          event.target.value = "";
        }}
      />

      <p className="text-muted-foreground text-[11px]">{t("transfer.noUpload")}</p>

      {error ? (
        <p role="alert" className="text-destructive text-xs">
          {error}
        </p>
      ) : null}

      {pending === "read" ? (
        <p className="text-muted-foreground text-xs">{t("transfer.reading")}</p>
      ) : null}

      {report ? (
        <div className="border-border flex flex-col gap-2 border-t pt-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge tone={report.rejected.length > 0 ? "muted" : "ok"}>
              {report.dryRun
                ? t("transfer.wouldCreate", { count: report.read })
                : t("transfer.created", { count: report.imported })}
            </Badge>
            {report.rejected.length > 0 ? (
              <Badge tone="muted">
                {t("transfer.refusedCount", { count: report.rejected.length })}
              </Badge>
            ) : null}
            <Badge tone="muted">{report.format.toUpperCase()}</Badge>
          </div>

          {report.preview && report.preview.length > 0 ? (
            <ul className="text-muted-foreground flex flex-wrap gap-1.5 text-[11px]">
              {report.preview.map((asset, index) => (
                <li key={`${asset.name}-${index}`} className="bg-muted rounded px-1.5 py-0.5">
                  {asset.name}
                  {asset.kind ? ` · ${asset.kind}` : ""}
                </li>
              ))}
            </ul>
          ) : null}

          {/*
            Les lignes refusées sont montrées avec leur numéro et leur raison. C'est la
            règle du dépôt : rendre la ligne plutôt que la deviner. Un catalogue à
            moitié faux coûte plus cher qu'un catalogue vide.
          */}
          {report.rejected.length > 0 ? (
            <details className="text-xs">
              <summary className="text-destructive cursor-pointer select-none">
                {t("transfer.seeRefused")}
              </summary>
              <ul className="mt-1 flex flex-col gap-1">
                {report.rejected.slice(0, 30).map((line) => (
                  <li key={`${line.line}-${line.reason}`}>
                    <span className="text-muted-foreground tabular-nums">
                      {t("transfer.line", { line: String(line.line) })}
                    </span>{" "}
                    {line.reason}
                  </li>
                ))}
              </ul>
            </details>
          ) : null}

          {staged ? (
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" disabled={pending !== null} onClick={confirm}>
                {pending === "write"
                  ? t("transfer.importing")
                  : t("transfer.confirm", { count: report.read })}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setStaged(null);
                  setReport(null);
                }}
              >
                {t("transfer.cancel")}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
