/**
 * Fichier généré — ne pas modifier à la main.
 *
 * Source : la bibliothèque de déconstruction de motion design de l'utilisateur,
 * régénérable avec `node tools/motion-grammar/build.mjs <dossier>`.
 *
 * Les chemins locaux, les hash et les noms de fichiers source sont retirés à la
 * génération : voir `tools/motion-grammar/README.md`.
 */

import type { MotionRecipe } from "./types.ts";
import { MOTION_SPORTCARDS } from "./data/sport-cards.ts";
import { MOTION_COLLAGEARCHIVE } from "./data/collage-archive.ts";
import { MOTION_MAPSNETWORKS } from "./data/maps-networks.ts";
import { MOTION_DATAUI } from "./data/data-ui.ts";
import { MOTION_PRODUCTDEVICES } from "./data/product-devices.ts";
import { MOTION_IDENTITYLOGO } from "./data/identity-logo.ts";
import { MOTION_TYPOGRAPHY } from "./data/typography.ts";
import { MOTION_OVERLAYSTRANSITIONS } from "./data/overlays-transitions.ts";
import { MOTION_COMPLEXPHYSICAL } from "./data/complex-physical.ts";

export * from "./types.ts";
export * from "./primitives.ts";
export * from "./narrative-map.ts";
export * from "./brief.ts";

/**
 * Les 121 recettes de la grammaire de mouvement.
 *
 * N'importer ce module que depuis une action : comme le catalogue de prompts, il est
 * trop lourd pour le navigateur. L'interface n'importe que `types.ts`.
 */
export const MOTION_RECIPES: readonly MotionRecipe[] = [
  ...MOTION_SPORTCARDS,
  ...MOTION_COLLAGEARCHIVE,
  ...MOTION_MAPSNETWORKS,
  ...MOTION_DATAUI,
  ...MOTION_PRODUCTDEVICES,
  ...MOTION_IDENTITYLOGO,
  ...MOTION_TYPOGRAPHY,
  ...MOTION_OVERLAYSTRANSITIONS,
  ...MOTION_COMPLEXPHYSICAL,
];

const byKey = new Map(MOTION_RECIPES.map((recipe) => [recipe.key, recipe]));

export function motionRecipeByKey(key: string): MotionRecipe | undefined {
  return byKey.get(key);
}
