/**
 * Ce que chaque étape du voyage demande au mouvement.
 *
 * C'est la pièce qui manquait entre les deux moitiés du produit. `get-narrative-brief`
 * sait dire *ce que raconte* l'acte III ; les deux ponts savent *rendre* une
 * composition. Entre les deux, rien ne disait quel geste visuel sert une étape — et un
 * brief en prose laissait l'agent choisir au hasard dans 123 recettes.
 *
 * Les 123 recettes sont indexées par **famille** : de quoi le plan est fait. Cette
 * table les indexe par **fonction narrative** : à quoi le plan sert. Ce sont deux
 * questions différentes, et c'est la seconde qu'un monteur se pose devant sa timeline.
 *
 * Les intensités citées sont celles de `shared/hero-journey.ts` — la courbe de
 * référence de la méthode, jamais une cible imposée. Un climax à l'étape 8 est le seul
 * endroit où un impact est mérité ; l'y mettre partout le rend invisible.
 */
import type { MotionFamily } from "./types.ts";

export interface NarrativeMotion {
  /** 1 à 12 — la clé de jointure avec `shared/hero-journey.ts` et les tables. */
  step: number;
  /** Ce que le mouvement doit faire à cette étape, en une phrase. */
  movement: string;
  /** Les familles qui servent cette fonction, par ordre de pertinence. */
  families: readonly MotionFamily[];
  /** Les primitives à employer, par clé de `MOTION_PRIMITIVES`. */
  primitives: readonly string[];
}

export const NARRATIVE_MOTION_MAP: readonly NarrativeMotion[] = [
  {
    step: 1,
    movement:
      "Installer sans événement. Le mouvement est continu et lent, aucune coupe ne réclame l'attention : l'étape dit « voici d'où l'on part », et une entrée spectaculaire mentirait sur l'intensité.",
    families: ["collage-archive", "product-devices"],
    primitives: ["camera-2d", "collage-papier"],
  },
  {
    step: 2,
    movement:
      "La première chose qui casse le calme. Un mot qui se pose, une coupe qui arrive plus tôt que prévu — court, net, et une seule fois.",
    families: ["typography", "overlays-transitions"],
    primitives: ["entree-premium"],
  },
  {
    step: 3,
    movement:
      "Le mouvement recule. L'intensité redescend sous celle de l'étape 2 : on tient un plan, on laisse une image dériver, on retire plutôt qu'on ajoute.",
    families: ["collage-archive", "typography"],
    primitives: ["collage-papier", "entree-premium"],
  },
  {
    step: 4,
    movement:
      "Présenter quelqu'un ou quelque chose : cadrer, nommer, poser. C'est une carte qu'on montre, pas une action qu'on suit.",
    families: ["sport-cards", "identity-logo"],
    primitives: ["entree-premium"],
  },
  {
    step: 5,
    movement:
      "Ici la transition *est* l'étape. Le passage d'un espace à l'autre doit se voir comme un franchissement, pas comme un raccord de confort.",
    families: ["overlays-transitions", "maps-networks"],
    primitives: ["path-draw", "camera-2d"],
  },
  {
    step: 6,
    movement:
      "Accumuler. Les éléments s'ajoutent en décalé, un compteur monte, un trajet s'allonge : la progression se lit parce qu'elle s'empile.",
    families: ["maps-networks", "data-ui", "collage-archive"],
    primitives: ["graphiques-compteurs", "path-draw"],
  },
  {
    step: 7,
    movement:
      "Le cadre se resserre. Moins d'éléments, plus gros, plus lents — l'attente se fabrique en retirant, pas en accélérant.",
    families: ["product-devices", "typography"],
    primitives: ["device-2-5d", "camera-2d"],
  },
  {
    step: 8,
    movement:
      "Le seul endroit où un impact est mérité : c'est l'unique étape où le ressort amorti et le dépassement sont justifiés par le récit. Les employer ailleurs vole au climax ce qui le distingue.",
    families: ["sport-cards", "overlays-transitions", "complex-physical"],
    primitives: ["entree-premium", "collage-papier"],
  },
  {
    step: 9,
    movement:
      "Respirer. Le mouvement s'arrête presque : la chose obtenue est tenue à l'écran, immobile assez longtemps pour être regardée.",
    families: ["identity-logo", "product-devices"],
    primitives: ["device-2-5d", "entree-premium"],
  },
  {
    step: 10,
    movement:
      "Le trajet repart dans l'autre sens. La caméra revient vers l'espace du début, et le reconnaître est le propos de l'étape.",
    families: ["maps-networks", "collage-archive"],
    primitives: ["path-draw", "camera-2d"],
  },
  {
    step: 11,
    movement:
      "Une relance, plus courte et plus nette que le climax. Elle confirme, elle ne rejoue pas : si elle dure autant que l'étape 8, les deux s'annulent.",
    families: ["sport-cards", "typography", "complex-physical"],
    primitives: ["entree-premium"],
  },
  {
    step: 12,
    movement:
      "Fermer. Une affirmation, une marque, puis le silence — et aucun mouvement qui continue après la dernière frame.",
    families: ["identity-logo", "typography"],
    primitives: ["entree-premium"],
  },
];

const byStep = new Map(NARRATIVE_MOTION_MAP.map((entry) => [entry.step, entry]));

/** Ce que l'étape demande au mouvement, ou `undefined` hors de 1–12. */
export function narrativeMotionForStep(step: number): NarrativeMotion | undefined {
  return byStep.get(step);
}

/** Les familles qui servent une étape. */
export function familiesForStep(step: number): readonly MotionFamily[] {
  return byStep.get(step)?.families ?? [];
}

/**
 * Les étapes qu'une famille sert.
 *
 * L'inverse de la table, calculé à la demande : une famille sert plusieurs étapes, et
 * c'est utile dans l'autre sens — « cette recette, où la placer dans mon récit ? ».
 */
export function stepsForFamily(family: MotionFamily): readonly number[] {
  return NARRATIVE_MOTION_MAP.filter((entry) => entry.families.includes(family)).map(
    (entry) => entry.step,
  );
}
