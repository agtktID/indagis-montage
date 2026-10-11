import { defineAction } from "@agent-native/core/action";
import { and, eq } from "@agent-native/core/db/schema";
import { asc } from "drizzle-orm";
import { z } from "zod";

import { assetsToCsv, assetsToJson, type AssetRecord } from "../shared/asset-io.ts";
import { ASSET_KIND_KEYS } from "../shared/asset-taxonomy.ts";
import { getDb, schema } from "../server/db/index.ts";
import { ownedByCurrentUser } from "../server/studio.ts";

/**
 * Au-delà, la réponse devient illisible et lourde pour rien. Le compte total est
 * renvoyé à part, pour que l'utilisateur sache qu'il manque quelque chose plutôt que
 * de croire son catalogue complet.
 */
const MAX_ROWS = 2000;

export default defineAction({
  description:
    "Exporter le catalogue de ressources en CSV (tableur) ou en JSON (relisible et modifiable). Le contenu est renvoyé directement dans la réponse — aucun stockage externe, aucun compte à connecter. N'exporte que les FICHES : nom, type, catégorie, format, état, lien. Jamais les fichiers eux-mêmes, qui restent où ils sont. Le CSV produit se relit tel quel par import-assets.",
  schema: z.object({
    format: z
      .enum(["csv", "json"])
      .default("csv")
      .describe("csv pour un tableur, json pour relire et modifier à la main"),
    status: z
      .enum(["draft", "generated", "reference"])
      .optional()
      .describe("N'exporter qu'un état"),
    kind: z.string().optional().describe(`N'exporter qu'un type : ${ASSET_KIND_KEYS.join(", ")}`),
    brandKitId: z.string().optional().describe("N'exporter que les ressources d'un kit"),
  }),
  http: { method: "GET" },
  run: async ({ format, status, kind, brandKitId }) => {
    if (kind && !ASSET_KIND_KEYS.includes(kind)) {
      throw new Error(`Type « ${kind} » inconnu. Valides : ${ASSET_KIND_KEYS.join(", ")}.`);
    }

    const conditions = [ownedByCurrentUser(schema.assets)];
    if (status) conditions.push(eq(schema.assets.status, status));
    if (kind) conditions.push(eq(schema.assets.kind, kind));
    if (brandKitId) conditions.push(eq(schema.assets.brandKitId, brandKitId));

    const rows = await getDb()
      .select()
      .from(schema.assets)
      .where(and(...conditions))
      .orderBy(asc(schema.assets.name));

    const truncated = rows.length > MAX_ROWS;
    const exported: AssetRecord[] = rows.slice(0, MAX_ROWS).map((asset) => ({
      name: asset.name,
      kind: asset.kind,
      category: asset.category,
      format: asset.format,
      status: asset.status,
      url: asset.url,
      thumbnailUrl: asset.thumbnailUrl,
      tags: asset.tags,
      description: asset.description,
    }));

    const stamp = new Date().toISOString().slice(0, 10);
    return {
      content: format === "json" ? assetsToJson(exported) : assetsToCsv(exported),
      format,
      rowCount: exported.length,
      total: rows.length,
      truncated,
      filename: `ressources-${stamp}.${format}`,
      note: "Les fiches seulement. Les fichiers ne sont ni copiés ni déplacés — une ressource porte un lien, jamais un binaire.",
    };
  },
});
