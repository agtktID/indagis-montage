/**
 * Les axes de tri de la grammaire de mouvement.
 *
 * Ce module est volontairement léger : c'est le seul de `motion-grammar/` que
 * l'interface importe. Les 123 recettes ne transitent que par les actions, comme les
 * 550 prompts du catalogue — pour la même raison, et avec la même règle.
 */

/**
 * Les neuf familles de mouvement.
 *
 * Elles répondent à « de quoi est fait ce plan ? », pas à « à quoi il sert ? ». Un
 * lower third et un titre animé peuvent servir la même étape du récit tout en
 * appartenant à deux familles : c'est `NARRATIVE_MOTION_MAP` qui porte l'autre axe.
 */
export type MotionFamily =
  | "sport-cards"
  | "collage-archive"
  | "maps-networks"
  | "data-ui"
  | "product-devices"
  | "identity-logo"
  | "typography"
  | "overlays-transitions"
  | "complex-physical";

/**
 * Le moteur qui sait rendre la recette.
 *
 * `both` est le cas majoritaire et le cas intéressant : la même chorégraphie est
 * décrite une fois par frame (Remotion) et une fois par timeline pausée
 * (HyperFrames). C'est cette double écriture qui rend la recette portable.
 */
export type MotionEngine = "remotion" | "hyperframes" | "both";

/** Un repère de découpage. `at` reste du texte : c'est un repère d'analyse, pas un timecode exact. */
export interface MotionBeat {
  at: string;
  description: string;
}

export interface MotionRecipe {
  key: string;
  title: string;
  /** Ce que la recette produit, en une phrase. */
  summary: string;
  family: MotionFamily;
  engines: MotionEngine;
  /** Un rapport d'image, quand la fiche en nomme un. */
  format: string | null;
  durationSeconds: number | null;
  fps: number | null;
  /** Les couleurs citées, dans leur ordre d'apparition. */
  palette: readonly string[];
  beats: readonly MotionBeat[];
  /** Le prompt de reconstruction, prêt à copier dans les prompts de l'utilisateur. */
  prompt: string | null;
  /** Les notes de métier : recette Remotion, recette HyperFrames, calques, easings. */
  recipe: string;
  /** Les points à comparer après implémentation. */
  checks: readonly string[];
}

export interface MotionFacet {
  key: string;
  label: string;
}

/**
 * Les familles et ce qu'elles nomment.
 *
 * Les sept premières sont celles de la bibliothèque source. Les deux dernières ont été
 * ajoutées à l'import : la source comptait 88 fiches de lettrage et d'incrustations que
 * les sept premières ne décrivaient pas, et les forcer dans « collage » aurait dilué
 * la famille jusqu'à l'inutilité.
 */
export const MOTION_FAMILIES: readonly MotionFacet[] = [
  { key: "sport-cards", label: "Cartes et portraits" },
  { key: "collage-archive", label: "Collage et archive" },
  { key: "maps-networks", label: "Cartes et réseaux" },
  { key: "data-ui", label: "Données et interfaces" },
  { key: "product-devices", label: "Produit et appareils" },
  { key: "identity-logo", label: "Identité et logo" },
  { key: "typography", label: "Typographie animée" },
  { key: "overlays-transitions", label: "Surimpressions et transitions" },
  { key: "complex-physical", label: "Mouvement physique complexe" },
];

export const MOTION_ENGINES: readonly MotionFacet[] = [
  { key: "remotion", label: "Remotion" },
  { key: "hyperframes", label: "HyperFrames" },
  { key: "both", label: "Les deux" },
];
