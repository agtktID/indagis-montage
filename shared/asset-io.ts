/**
 * Sortir la bibliothèque de ressources, et la faire rentrer.
 *
 * Jusqu'ici une ressource s'ajoutait une par une, au formulaire, avec son URL. Pour
 * quelqu'un qui a déjà des dossiers de rushes et de visuels, c'est une porte trop
 * étroite — et rien ne permettait de ressortir le catalogue pour le sauvegarder ou le
 * porter ailleurs.
 *
 * Le contrat du projet est respecté tel quel : **aucun binaire ne transite ici.** Ce
 * module manipule des fiches — un nom, un type, une catégorie, un format, un lien. Le
 * fichier reste où il est.
 *
 * ## Rejeter plutôt que deviner
 *
 * Même règle que `shared/import-markers.ts`, et pour la même raison : une ligne
 * incompréhensible est rendue avec son numéro et sa raison, jamais devinée à moitié ni
 * avalée en silence. Un catalogue à moitié faux coûte plus cher qu'un catalogue vide,
 * parce qu'on ne sait pas quelle moitié.
 */
import {
  ASSET_CATEGORY_KEYS,
  ASSET_FORMAT_KEYS,
  ASSET_KIND_KEYS,
} from "./asset-taxonomy.ts";
import { csvRow } from "./csv.ts";

/**
 * Les trois états d'une ressource.
 *
 * Recopiés depuis `server/db/schema.ts`, qui en est la source : un module de `shared/`
 * ne doit pas importer du serveur, puisque l'interface l'importe. `tests/unit/asset-io`
 * vérifie que les deux listes restent d'accord — une divergence ferait refuser à
 * l'import un état que la base accepte.
 */
export const ASSET_IO_STATUSES = ["draft", "generated", "reference"] as const;

/** Les colonnes de l'échange, dans cet ordre. Un export se relit à l'import. */
export const ASSET_COLUMNS = [
  "name",
  "kind",
  "category",
  "format",
  "status",
  "url",
  "thumbnailUrl",
  "tags",
  "description",
] as const;

export type AssetColumn = (typeof ASSET_COLUMNS)[number];

/** Une fiche telle qu'elle voyage. Tous les champs sauf le nom sont facultatifs. */
export interface AssetRecord {
  name: string;
  kind?: string;
  category?: string;
  format?: string | null;
  status?: string;
  url?: string | null;
  thumbnailUrl?: string | null;
  tags?: string | null;
  description?: string | null;
}

export interface RejectedAssetLine {
  /** Le numéro de ligne dans le fichier fourni, tel que l'utilisateur le voit. */
  line: number;
  reason: string;
  /** Le contenu brut, pour que l'utilisateur retrouve la ligne sans compter. */
  raw: string;
}

export interface AssetImportReport {
  format: "csv" | "json";
  assets: AssetRecord[];
  rejected: RejectedAssetLine[];
}

/* ------------------------------------------------------------------ sortie */

export function assetsToCsv(assets: readonly AssetRecord[]): string {
  const lines = [csvRow(ASSET_COLUMNS)];
  for (const asset of assets) {
    lines.push(csvRow(ASSET_COLUMNS.map((column) => asset[column] ?? "")));
  }
  return lines.join("\n");
}

/**
 * Le JSON, indenté.
 *
 * Lisible et modifiable à la main : c'est souvent ce qu'on attend d'un export, bien
 * plus qu'un fichier compact. Les champs vides sont retirés, pour que la sortie montre
 * ce qui est renseigné plutôt qu'une forêt de `null`.
 */
export function assetsToJson(assets: readonly AssetRecord[]): string {
  const cleaned = assets.map((asset) =>
    Object.fromEntries(
      ASSET_COLUMNS.map((column) => [column, asset[column]]).filter(
        ([, value]) => value !== null && value !== undefined && value !== "",
      ),
    ),
  );
  return JSON.stringify(cleaned, null, 2);
}

/* ------------------------------------------------------------------ entrée */

/** JSON ou CSV, décidé sur le premier caractère non blanc. */
export function detectAssetFormat(content: string): "csv" | "json" {
  const trimmed = content.trim();
  return trimmed.startsWith("[") || trimmed.startsWith("{") ? "json" : "csv";
}

/**
 * Découpe une ligne CSV en respectant les guillemets.
 *
 * Écrit ici plutôt qu'importé d'une bibliothèque : le besoin est une ligne à la fois,
 * et une dépendance de plus pour ça ne se justifie pas. Les règles suivies sont celles
 * que l'export produit — guillemets doublés pour échapper un guillemet.
 */
function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (inQuotes) {
      if (char === '"') {
        if (line[index + 1] === '"') {
          current += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells;
}

/**
 * Valide une fiche, ou dit pourquoi elle est refusée.
 *
 * Une valeur de taxonomie inconnue est une erreur, pas une occasion de replier sur
 * « autre » : l'utilisateur a écrit quelque chose, et le lui ranger ailleurs en
 * silence lui ferait croire que c'est passé.
 */
function validate(record: Record<string, string | undefined>): {
  asset?: AssetRecord;
  reason?: string;
} {
  const name = (record.name ?? "").trim();
  if (!name) return { reason: "un nom est requis" };

  const kind = (record.kind ?? "").trim() || undefined;
  if (kind && !ASSET_KIND_KEYS.includes(kind)) {
    return { reason: `type « ${kind} » inconnu — ${ASSET_KIND_KEYS.join(", ")}` };
  }

  const category = (record.category ?? "").trim() || undefined;
  if (category && !ASSET_CATEGORY_KEYS.includes(category)) {
    return {
      reason: `catégorie « ${category} » inconnue — ${ASSET_CATEGORY_KEYS.join(", ")}`,
    };
  }

  const format = (record.format ?? "").trim() || undefined;
  if (format && !ASSET_FORMAT_KEYS.includes(format)) {
    return { reason: `format « ${format} » inconnu — ${ASSET_FORMAT_KEYS.join(", ")}` };
  }

  const status = (record.status ?? "").trim() || undefined;
  if (status && !(ASSET_IO_STATUSES as readonly string[]).includes(status)) {
    return { reason: `état « ${status} » inconnu — ${ASSET_IO_STATUSES.join(", ")}` };
  }

  return {
    asset: {
      name,
      kind,
      category,
      format: format ?? null,
      status,
      url: (record.url ?? "").trim() || null,
      thumbnailUrl: (record.thumbnailUrl ?? "").trim() || null,
      tags: (record.tags ?? "").trim() || null,
      description: (record.description ?? "").trim() || null,
    },
  };
}

export function parseAssetManifest(content: string): AssetImportReport {
  return detectAssetFormat(content) === "json" ? parseJson(content) : parseCsv(content);
}

function parseJson(content: string): AssetImportReport {
  const assets: AssetRecord[] = [];
  const rejected: RejectedAssetLine[] = [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (cause) {
    return {
      format: "json",
      assets: [],
      rejected: [{ line: 1, reason: `JSON illisible : ${(cause as Error).message}`, raw: "" }],
    };
  }

  const entries = Array.isArray(parsed) ? parsed : [parsed];
  entries.forEach((entry, index) => {
    // L'indice de l'entrée, pas un numéro de ligne : c'est ce qui permet de la
    // retrouver dans un JSON indenté, où une fiche occupe une dizaine de lignes.
    const position = index + 1;
    if (typeof entry !== "object" || entry === null) {
      rejected.push({
        line: position,
        reason: "entrée qui n'est pas un objet",
        raw: String(entry),
      });
      return;
    }
    const record = Object.fromEntries(
      Object.entries(entry as Record<string, unknown>).map(([key, value]) => [
        key,
        value === null || value === undefined ? undefined : String(value),
      ]),
    );
    const { asset, reason } = validate(record);
    if (asset) assets.push(asset);
    else {
      rejected.push({
        line: position,
        reason: reason ?? "entrée refusée",
        raw: JSON.stringify(entry),
      });
    }
  });

  return { format: "json", assets, rejected };
}

function parseCsv(content: string): AssetImportReport {
  const assets: AssetRecord[] = [];
  const rejected: RejectedAssetLine[] = [];

  const lines = content.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => line.trim().length > 0);
  if (headerIndex === -1) {
    return { format: "csv", assets: [], rejected: [{ line: 1, reason: "fichier vide", raw: "" }] };
  }

  const header = splitCsvLine(lines[headerIndex]).map((cell) => cell.trim());
  if (!header.includes("name")) {
    return {
      format: "csv",
      assets: [],
      rejected: [
        {
          line: headerIndex + 1,
          reason: `en-tête sans colonne « name » — attendu : ${ASSET_COLUMNS.join(", ")}`,
          raw: lines[headerIndex],
        },
      ],
    };
  }

  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    const raw = lines[index];
    if (raw.trim().length === 0) continue;

    const cells = splitCsvLine(raw);
    const record = Object.fromEntries(header.map((column, position) => [column, cells[position]]));
    const { asset, reason } = validate(record);
    if (asset) assets.push(asset);
    else rejected.push({ line: index + 1, reason: reason ?? "ligne refusée", raw });
  }

  return { format: "csv", assets, rejected };
}

/* --------------------------------------------------- depuis des fichiers */

/** Extension → type de ressource. Ce que l'on sait d'un fichier sans l'ouvrir. */
const KIND_BY_EXTENSION: Record<string, string> = {
  mp4: "video", mov: "video", webm: "video", avi: "video", mkv: "video", m4v: "video",
  png: "image", jpg: "image", jpeg: "image", gif: "image", webp: "image", svg: "image",
  avif: "image", heic: "image", tif: "image", tiff: "image", bmp: "image",
  mp3: "audio", wav: "audio", aac: "audio", flac: "audio", ogg: "audio", m4a: "audio",
  pdf: "document", doc: "document", docx: "document", txt: "document", md: "document",
  rtf: "document", odt: "document",
  ttf: "font", otf: "font", woff: "font", woff2: "font",
  ase: "palette", aco: "palette",
};

/**
 * Ce qu'on peut déduire d'un fichier choisi, sans le lire.
 *
 * Le nom sert d'intitulé — sans son extension, qui n'apprend rien à un lecteur humain
 * — et l'extension donne le type. Le reste reste vide : deviner une catégorie ou un
 * format depuis un nom de fichier produirait un catalogue plausible et faux.
 *
 * L'état est `reference` : un fichier que l'utilisateur possède déjà n'est ni un
 * brouillon à produire, ni une sortie de génération.
 */
export function assetFromFilename(filename: string): AssetRecord {
  const clean = filename.replace(/\\/g, "/").split("/").pop() ?? filename;
  const dot = clean.lastIndexOf(".");
  const extension = dot > 0 ? clean.slice(dot + 1).toLowerCase() : "";
  const stem = dot > 0 ? clean.slice(0, dot) : clean;

  return {
    name: stem.trim() || clean,
    kind: KIND_BY_EXTENSION[extension] ?? "other",
    status: "reference",
  };
}
