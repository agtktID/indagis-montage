import { defineAction } from "@agent-native/core/action";
import { and, eq } from "@agent-native/core/db/schema";
import { z } from "zod";

import { nullableId } from "../shared/cli-compat.ts";
import { ASSET_CATEGORY_KEYS, assetCategoryByKey } from "../shared/asset-taxonomy.ts";
import { builtInPromptByKey } from "../shared/prompt-library.ts";
import { catalogPromptByKey } from "../shared/prompt-catalog/index.ts";
import { motionRecipeByKey } from "../shared/motion-grammar/index.ts";
import { assetCategoryForCatalog } from "../shared/prompt-catalog/fill.ts";
import { getDb, newId, nowIso, schema } from "../server/db/index.ts";
import { ownedByCurrentUser, ownerStamp } from "../server/studio.ts";

export default defineAction({
  description:
    "Créer ou modifier un prompt réutilisable. Pour partir d'un prompt livré avec l'application, passer sa clé dans fromBuiltIn (voyage du héros), fromCatalog (les 550 du catalogue) ou fromMotion (les 121 recettes de la grammaire de mouvement) : il en est fait une copie modifiable, l'original reste intact.",
  schema: z.object({
    promptId: z.string().optional().describe("Prompt à modifier ; absent = création"),
    fromBuiltIn: z
      .string()
      .optional()
      .describe("Clé d'un prompt du voyage du héros à copier ; les autres champs deviennent optionnels"),
    fromCatalog: z
      .string()
      .optional()
      .describe("Clé d'un prompt du catalogue à copier, par exemple img-11 ou vid-seedance-2"),
    fromMotion: z
      .string()
      .optional()
      .describe(
        "Clé d'une recette de la grammaire de mouvement à copier, par exemple dark-ai-saas-hero",
      ),
    name: z.string().optional(),
    description: z.string().optional(),
    kind: z.enum(["image", "video"]).optional(),
    category: z.string().optional().describe(`Catégorie : ${ASSET_CATEGORY_KEYS.join(", ")}`),
    format: nullableId("Format conseillé").optional(),
    body: z.string().optional().describe("Le corps du prompt, avec ses {{variables}}"),
    tags: z.string().optional().describe("Mots-clés séparés par des virgules"),
  }),
  run: async ({ promptId, fromBuiltIn, fromCatalog, fromMotion, ...fields }) => {
    const sources = [fromBuiltIn, fromCatalog, fromMotion].filter(Boolean);
    if (sources.length > 1) {
      throw new Error(
        "Copier depuis une seule source à la fois : fromBuiltIn, fromCatalog ou fromMotion.",
      );
    }

    const source = fromBuiltIn ? builtInPromptByKey(fromBuiltIn) : undefined;
    if (fromBuiltIn && !source) {
      throw new Error(`Prompt intégré « ${fromBuiltIn} » inconnu.`);
    }

    const fromCat = fromCatalog ? catalogPromptByKey(fromCatalog) : undefined;
    if (fromCatalog && !fromCat) {
      throw new Error(`Prompt de catalogue « ${fromCatalog} » inconnu.`);
    }

    const motion = fromMotion ? motionRecipeByKey(fromMotion) : undefined;
    if (fromMotion && !motion) {
      throw new Error(`Recette de mouvement « ${fromMotion} » inconnue.`);
    }
    // Cinq des 121 fiches n'ont pas de prompt rédigé : le dire, plutôt que créer un
    // prompt vide que l'utilisateur découvrirait dans sa bibliothèque.
    if (motion && !motion.prompt) {
      throw new Error(
        `La recette « ${fromMotion} » n'a pas de prompt de reconstruction — sa chorégraphie est décrite, mais pas résumée en consigne.`,
      );
    }

    // Le catalogue n'a pas de description rédigée : on décrit ce qu'on sait de lui.
    const catalogDescription = fromCat
      ? [fromCat.originalName, [...fromCat.styles, ...fromCat.scenes].join(", ")]
          .filter(Boolean)
          .join(" — ")
      : undefined;

    /**
     * Ce qu'on sait dire d'une recette de mouvement, faute de description rédigée.
     *
     * Le résumé, puis la famille, la durée et le format : de quoi retrouver la recette
     * d'origine depuis la bibliothèque de prompts.
     */
    const motionDescription = motion
      ? [
          motion.summary,
          [
            motion.family,
            motion.durationSeconds ? `${motion.durationSeconds} s` : null,
            motion.format,
          ]
            .filter(Boolean)
            .join(" · "),
        ]
          .filter(Boolean)
          .join(" — ")
      : undefined;

    const db = getDb();
    const timestamp = nowIso();

    /**
     * La ligne existante, quand on modifie — et c'est tout le correctif.
     *
     * Les valeurs de repli étaient posées en dur : un appel de modification qui ne
     * nommait pas un champ retombait sur « image », « other » ou `null`, jamais sur ce
     * que le prompt portait déjà. Deux conséquences visibles : modifier le seul corps
     * **échouait** sur « Un nom est requis » — ce que fait pourtant l'écran — et renommer
     * effaçait format et mots-clés. La ligne existante devient le dernier recours de
     * chaque champ, juste avant les défauts de création.
     */
    const existing = promptId
      ? (
          await db
            .select()
            .from(schema.prompts)
            .where(and(eq(schema.prompts.id, promptId), ownedByCurrentUser(schema.prompts)))
            .limit(1)
        )[0]
      : undefined;
    if (promptId && !existing) throw new Error(`Prompt « ${promptId} » introuvable.`);

    const resolved = {
      name: fields.name ?? source?.name ?? fromCat?.name ?? motion?.title ?? existing?.name,
      description:
        fields.description ??
        source?.description ??
        catalogDescription ??
        motionDescription ??
        existing?.description ??
        null,
      // Une recette de mouvement est toujours une consigne vidéo : elle décrit une
      // chorégraphie dans le temps, pas une image fixe.
      kind: fields.kind ?? source?.kind ?? fromCat?.kind ?? (motion ? "video" : undefined) ?? existing?.kind ?? "image",
      category:
        fields.category ??
        source?.category ??
        (fromCat ? assetCategoryForCatalog(fromCat.category) : undefined) ??
        (motion ? "video" : undefined) ??
        existing?.category ??
        "other",
      format: fields.format ?? source?.format ?? fromCat?.format ?? motion?.format ?? existing?.format ?? null,
      body: fields.body ?? source?.body ?? fromCat?.body ?? motion?.prompt ?? existing?.body,
      tags:
        fields.tags ??
        source?.tags.join(", ") ??
        // `undefined` et non `null` : un `null` ici court-circuiterait la ligne existante.
        (fromCat ? [...fromCat.styles, ...fromCat.scenes].join(", ") || null : undefined) ??
        (motion ? [motion.family, motion.engines].join(", ") : undefined) ??
        existing?.tags ??
        null,
    };

    if (!resolved.name) throw new Error("Un nom est requis.");
    if (!resolved.body) throw new Error("Le corps du prompt est requis.");
    if (!assetCategoryByKey(resolved.category)) {
      throw new Error(
        `Catégorie « ${resolved.category} » inconnue. Valides : ${ASSET_CATEGORY_KEYS.join(", ")}.`,
      );
    }

    if (promptId) {
      const [prompt] = await db
        .update(schema.prompts)
        .set({ ...resolved, name: resolved.name, body: resolved.body, updatedAt: timestamp })
        .where(and(eq(schema.prompts.id, promptId), ownedByCurrentUser(schema.prompts)))
        .returning();
      if (!prompt) throw new Error(`Prompt « ${promptId} » introuvable.`);
      return { prompt, created: false };
    }

    const [prompt] = await db
      .insert(schema.prompts)
      .values({
        id: newId(),
        ...resolved,
        name: resolved.name,
        body: resolved.body,
        sourceKey: fromBuiltIn ?? fromCatalog ?? fromMotion ?? null,
        createdAt: timestamp,
        updatedAt: timestamp,
        ...ownerStamp(),
      })
      .returning();

    return { prompt, created: true, copiedFrom: fromBuiltIn ?? fromCatalog ?? fromMotion ?? null };
  },
});
