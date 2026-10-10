/**
 * Les propositions de mouvement, rendues en texte pour l'agent.
 *
 * `suggest-motion` renvoie des données structurées — c'est ce dont l'agent a besoin
 * quand il appelle l'action lui-même. Mais le chemin qui compte pour l'utilisateur part
 * d'un bouton : il clique, et la matière arrive dans le chat **en contexte**. Ce
 * chemin-là demande du texte.
 *
 * Exactement le même partage que `shared/narrative-brief.ts`, et pour la même raison :
 * la mise en forme est une fonction pure, donc testable sans base ni serveur.
 *
 * **Le brief décrit, il ne prescrit pas.** Une étape sans note est annoncée comme vide
 * et ne reçoit aucune proposition. Proposer un mouvement pour une intention que
 * l'utilisateur n'a pas écrite, ce serait inventer la scène à sa place.
 */

/** Ce qu'une étape apporte au brief de mouvement. */
export interface MotionBriefStep {
  step: number;
  title: string;
  isCovered: boolean;
  note: string | null;
  intensity: number | null;
  referenceIntensity: number;
  /** Ce que l'étape demande au mouvement. */
  movement: string | null;
  primitives: readonly { label: string; how: string }[];
  recipes: readonly {
    title: string;
    family: string;
    engines: string;
    durationSeconds: number | null;
    format: string | null;
    prompt: string | null;
  }[];
}

export function buildMotionBrief(options: {
  videoTitle: string;
  scopeLabel: string;
  steps: readonly MotionBriefStep[];
  determinismRules: readonly string[];
}): { content: string; suggestedSteps: number; emptySteps: number[] } {
  const { videoTitle, scopeLabel, steps, determinismRules } = options;

  const lines: string[] = [
    `Vidéo : ${videoTitle}`,
    `Périmètre : ${scopeLabel}`,
    "",
    "## Ce que chaque étape demande au mouvement",
    "",
  ];

  const emptySteps: number[] = [];
  let suggested = 0;

  for (const entry of steps) {
    lines.push(`### ${entry.step}. ${entry.title}`);

    if (!entry.isCovered) {
      // Dire le vide plutôt que le combler, comme le brief narratif.
      emptySteps.push(entry.step);
      lines.push(
        "_(étape non écrite — aucune proposition : le mouvement sert une intention, il ne la remplace pas)_",
      );
      lines.push("");
      continue;
    }

    suggested += 1;

    if (entry.note) lines.push(`**Ce qui est écrit** — ${entry.note.trim()}`);

    const intensity =
      entry.intensity !== null
        ? `${entry.intensity}/100 (référence de la méthode : ${entry.referenceIntensity})`
        : `non renseignée (référence de la méthode : ${entry.referenceIntensity})`;
    lines.push(`**Intensité** — ${intensity}`);

    if (entry.movement) lines.push(`**Fonction du mouvement** — ${entry.movement}`);

    if (entry.primitives.length > 0) {
      lines.push("", "**Primitives à employer**");
      for (const primitive of entry.primitives) {
        lines.push(`- ${primitive.label} : ${primitive.how}`);
      }
    }

    if (entry.recipes.length > 0) {
      lines.push("", "**Recettes calibrées**");
      for (const recipe of entry.recipes) {
        const specs = [
          recipe.family,
          recipe.engines,
          recipe.durationSeconds ? `${recipe.durationSeconds} s` : null,
          recipe.format,
        ]
          .filter(Boolean)
          .join(" · ");
        lines.push(`- **${recipe.title}** — ${specs}`);
        if (recipe.prompt) lines.push(`  > ${recipe.prompt}`);
      }
    }

    lines.push("");
  }

  lines.push("## Les trois interdits, dans les deux moteurs", "");
  for (const rule of determinismRules) lines.push(`- ${rule}`);

  // La recette donne un calibrage, jamais un contenu : le rappeler dans le brief, parce
  // que c'est l'erreur que la présence de 121 recettes rend tentante.
  lines.push(
    "",
    "Une recette fournit des **mesures réutilisables** — durées, easings, décalages, ordre des calques. Son sujet, ses textes et ses images viennent de la carte ci-dessus et des ressources autorisées de l'utilisateur, jamais de la référence.",
  );

  return { content: lines.join("\n"), suggestedSteps: suggested, emptySteps };
}
