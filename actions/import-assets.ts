import { defineAction } from "@agent-native/core/action";
import { z } from "zod";

import { parseAssetManifest } from "../shared/asset-io.ts";
import { getDb, newId, nowIso, schema } from "../server/db/index.ts";
import { ownerStamp } from "../server/studio.ts";

/** Une seule opération doit rester lisible dans un rapport, et réversible à la main. */
const MAX_IMPORT = 500;

export default defineAction({
  description:
    "Importer des ressources dans la bibliothèque depuis un CSV (celui que l'export produit, ou un autre à colonnes nommées) ou un JSON. Le format est reconnu tout seul. Les lignes incompréhensibles sont RENDUES avec leur numéro et leur raison, jamais devinées ni avalées : une valeur de taxonomie inconnue est refusée plutôt que rangée dans « autre ». Les ressources importées s'ajoutent, jamais ne remplacent. Utiliser dryRun pour voir ce qui serait créé sans rien écrire. N'importe que des FICHES — un nom et un lien ; aucun fichier n'est téléversé.",
  schema: z.object({
    content: z.string().min(1).describe("Le contenu du fichier, CSV ou JSON"),
    brandKitId: z
      .string()
      .optional()
      .describe("Rattacher toutes les ressources importées à ce kit de marque"),
    videoId: z.string().optional().describe("Rattacher toutes les ressources à cette vidéo"),
    dryRun: z.coerce
      .boolean()
      .optional()
      .describe("Lire et rapporter sans rien écrire — à faire en premier"),
  }),
  run: async ({ content, brandKitId, videoId, dryRun }) => {
    const report = parseAssetManifest(content);

    if (report.assets.length > MAX_IMPORT) {
      throw new Error(
        `${report.assets.length} ressources lues — la limite est de ${MAX_IMPORT} par import. Découper le fichier garde le rapport lisible, et l'erreur réparable à la main.`,
      );
    }

    // La lecture à blanc, et le cas où il n'y a rien à écrire, suivent le même chemin :
    // dans les deux cas on rapporte sans toucher à la base.
    if (dryRun || report.assets.length === 0) {
      return {
        format: report.format,
        imported: 0,
        read: report.assets.length,
        rejected: report.rejected,
        dryRun: Boolean(dryRun),
        preview: report.assets.slice(0, 10),
      };
    }

    const db = getDb();
    const timestamp = nowIso();

    const inserted = await db
      .insert(schema.assets)
      .values(
        report.assets.map((asset) => ({
          id: newId(),
          name: asset.name,
          description: asset.description ?? null,
          kind: asset.kind ?? "image",
          category: asset.category ?? "other",
          format: asset.format ?? null,
          status: (asset.status ?? "reference") as "draft" | "generated" | "reference",
          url: asset.url ?? null,
          thumbnailUrl: asset.thumbnailUrl ?? null,
          tags: asset.tags ?? null,
          // Le rattachement vient de l'appel, pas du fichier : un identifiant écrit
          // dans un CSV pourrait désigner le kit de quelqu'un d'autre.
          brandKitId: brandKitId ?? null,
          templateId: null,
          videoId: videoId ?? null,
          prompt: null,
          createdAt: timestamp,
          updatedAt: timestamp,
          ...ownerStamp(),
        })),
      )
      .returning();

    return {
      format: report.format,
      imported: inserted.length,
      read: report.assets.length,
      rejected: report.rejected,
      dryRun: false,
      assets: inserted,
    };
  },
});
