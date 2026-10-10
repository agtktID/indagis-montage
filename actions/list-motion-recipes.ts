import { defineAction } from "@agent-native/core/action";
import { z } from "zod";

import {
  DETERMINISM_RULES,
  ENGINE_PORTING,
  MOTION_ENGINES,
  MOTION_FAMILIES,
  MOTION_PRIMITIVES,
  MOTION_RECIPES,
  NARRATIVE_MOTION_MAP,
  familiesForStep,
  type MotionRecipe,
} from "../shared/motion-grammar/index.ts";

/** Une page de catalogue : assez pour remplir l'écran, pas assez pour le noyer. */
const DEFAULT_LIMIT = 24;

/** Tout ce sur quoi une recherche porte, mis bout à bout une seule fois. */
function haystack(recipe: MotionRecipe): string {
  // La clé en fait partie : `suggest-motion` renvoie des clés, et le premier geste
  // naturel est de rechercher celle qu'on vient de lire.
  return [recipe.key, recipe.title, recipe.summary, recipe.recipe, recipe.prompt ?? ""]
    .join(" ")
    .toLowerCase();
}

export default defineAction({
  description:
    "Lister les recettes de la grammaire de mouvement : 121 chorégraphies déconstruites, avec découpage timecodé, palette, recette Remotion, recette HyperFrames et prompt de reconstruction. Se filtre par famille, par moteur, et — c'est l'axe utile — par étape du voyage du héros : « quels mouvements servent le climax ? ». Renvoie aussi les six primitives et la table de portage entre les deux moteurs.",
  schema: z.object({
    family: z
      .string()
      .optional()
      .describe(`Famille de mouvement : ${MOTION_FAMILIES.map((f) => f.key).join(", ")}`),
    engine: z
      .enum(["remotion", "hyperframes", "both"])
      .optional()
      .describe("Ne garder que les recettes qu'un moteur sait rendre"),
    step: z.coerce
      .number()
      .int()
      .min(1)
      .max(12)
      .optional()
      .describe("Étape du voyage de 1 à 12 : ne garder que les familles qui la servent"),
    search: z
      .string()
      .optional()
      .describe("Recherche sur le titre, le résumé, la recette et le prompt"),
    limit: z.coerce.number().int().min(1).max(200).optional().describe("Taille de page"),
    offset: z.coerce.number().int().min(0).optional().describe("Décalage dans la liste"),
  }),
  http: { method: "GET" },
  run: async ({ family, engine, step, search, limit, offset }) => {
    if (family && !MOTION_FAMILIES.some((entry) => entry.key === family)) {
      throw new Error(
        `Famille « ${family} » inconnue. Les neuf familles : ${MOTION_FAMILIES.map((f) => f.key).join(", ")}.`,
      );
    }

    const needle = search?.trim().toLowerCase();

    // Une étape ne filtre pas sur une recette mais sur les familles qui la servent :
    // c'est `NARRATIVE_MOTION_MAP` qui porte ce lien, pas les fiches.
    const stepFamilies = step ? familiesForStep(step) : null;

    const filtered = MOTION_RECIPES.filter(
      (recipe) =>
        (!family || recipe.family === family) &&
        // `both` sait rendre les deux : une recette Remotion seule ne satisfait pas une
        // demande HyperFrames, mais une recette `both` satisfait les deux demandes.
        (!engine || recipe.engines === engine || recipe.engines === "both") &&
        (!stepFamilies || stepFamilies.includes(recipe.family)) &&
        (!needle || haystack(recipe).includes(needle)),
    );

    const start = offset ?? 0;
    const size = limit ?? DEFAULT_LIMIT;
    const page = filtered.slice(start, start + size);

    // Les compteurs d'une famille se lisent sur ce que les autres filtres laissent,
    // sinon les nombres affichés ne correspondent pas à ce qu'un clic donnera.
    const withoutFamily = MOTION_RECIPES.filter(
      (recipe) =>
        (!engine || recipe.engines === engine || recipe.engines === "both") &&
        (!stepFamilies || stepFamilies.includes(recipe.family)) &&
        (!needle || haystack(recipe).includes(needle)),
    );

    return {
      recipes: page,
      total: filtered.length,
      offset: start,
      limit: size,
      hasMore: start + page.length < filtered.length,
      facets: {
        families: MOTION_FAMILIES.map((entry) => ({
          ...entry,
          count: withoutFamily.filter((recipe) => recipe.family === entry.key).length,
        })).filter((entry) => entry.count > 0),
        engines: MOTION_ENGINES,
      },
      /** Le vocabulaire sous les recettes : utile même sans en ouvrir une. */
      primitives: MOTION_PRIMITIVES,
      enginePorting: ENGINE_PORTING,
      determinismRules: DETERMINISM_RULES,
      /** Ce que chaque étape demande au mouvement. */
      narrativeMap: NARRATIVE_MOTION_MAP,
      counts: {
        total: MOTION_RECIPES.length,
        withPrompt: MOTION_RECIPES.filter((recipe) => recipe.prompt).length,
        withBeats: MOTION_RECIPES.filter((recipe) => recipe.beats.length > 0).length,
      },
    };
  },
});
