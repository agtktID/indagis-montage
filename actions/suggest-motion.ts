import { defineAction } from "@agent-native/core/action";
import { eq } from "@agent-native/core/db/schema";
import { z } from "zod";

import { isBeatCovered } from "../shared/coverage.ts";
import { stepByNumber } from "../shared/hero-journey.ts";
import { buildMotionBrief } from "../shared/motion-grammar/brief.ts";
import {
  DETERMINISM_RULES,
  ENGINE_PORTING,
  MOTION_PRIMITIVES,
  MOTION_RECIPES,
  narrativeMotionForStep,
  type MotionRecipe,
} from "../shared/motion-grammar/index.ts";
import { scopeLabel, stepsInScope, type BriefScope } from "../shared/narrative-brief.ts";
import { getDb, schema } from "../server/db/index.ts";
import { loadVideo } from "../server/studio.ts";

/** Trois propositions par étape : de quoi choisir, pas de quoi se noyer. */
const DEFAULT_PER_STEP = 3;

/**
 * Le classement des recettes pour une étape.
 *
 * Pas de score inventé. Trois critères, dans cet ordre :
 *
 * 1. **Le rang de la famille** dans la liste de l'étape. `NARRATIVE_MOTION_MAP` les
 *    écrit par pertinence décroissante — c'est une décision prise une fois, lisible,
 *    plutôt qu'une pondération que personne ne peut vérifier.
 * 2. **La complétude** : une recette avec découpage *et* prompt est directement
 *    utilisable ; une recette sans découpage demande de tout mesurer.
 * 3. **La clé**, pour que deux appels identiques renvoient le même ordre.
 */
function rank(recipe: MotionRecipe, families: readonly string[]): [number, number, string] {
  const familyRank = families.indexOf(recipe.family);
  const completeness = (recipe.beats.length > 0 ? 0 : 1) + (recipe.prompt ? 0 : 1);
  return [familyRank === -1 ? families.length : familyRank, completeness, recipe.key];
}

/**
 * La carte d'une recette, sans son corps.
 *
 * Le corps d'une recette pèse plusieurs kilo-octets ; douze étapes en renverraient
 * trop. Le prompt, lui, part : c'est ce dont l'agent a besoin pour composer, et il
 * tient en quelques lignes. Le corps complet se récupère par
 * `list-motion-recipes --search <titre>`.
 */
function card(recipe: MotionRecipe) {
  return {
    key: recipe.key,
    title: recipe.title,
    summary: recipe.summary,
    family: recipe.family,
    engines: recipe.engines,
    format: recipe.format,
    durationSeconds: recipe.durationSeconds,
    fps: recipe.fps,
    palette: recipe.palette,
    beatCount: recipe.beats.length,
    prompt: recipe.prompt,
  };
}

export default defineAction({
  description:
    "Proposer des mouvements pour la carte narrative d'une vidéo : pour chaque étape du périmètre, ce que l'étape demande au mouvement, les primitives à employer, et les recettes de la grammaire qui servent cette fonction. C'est le chaînon entre get-narrative-brief et les ponts HyperFrames/Remotion. Une étape sans note est annoncée comme vide et ne reçoit AUCUNE proposition : le mouvement sert une intention écrite, il ne la remplace pas.",
  schema: z.object({
    videoId: z.string().describe("Identifiant de la vidéo"),
    scope: z
      .union([
        z.enum(["all", "depart", "initiation", "retour"]),
        z.coerce.number().int().min(1).max(12),
      ])
      .default("all")
      .describe("Tout le récit, un acte (depart, initiation, retour), ou une étape de 1 à 12"),
    perStep: z.coerce
      .number()
      .int()
      .min(1)
      .max(10)
      .optional()
      .describe("Combien de recettes proposer par étape ; 3 par défaut"),
    engine: z
      .enum(["remotion", "hyperframes"])
      .optional()
      .describe("Ne proposer que ce qu'un moteur sait rendre"),
  }),
  http: { method: "GET" },
  run: async ({ videoId, scope, perStep, engine }) => {
    const video = await loadVideo(videoId);
    const beats = await getDb()
      .select()
      .from(schema.storyBeats)
      .where(eq(schema.storyBeats.videoId, videoId));

    const beatByStep = new Map(beats.map((beat) => [beat.step, beat]));
    const steps = stepsInScope(scope as BriefScope);
    const size = perStep ?? DEFAULT_PER_STEP;

    const available = MOTION_RECIPES.filter(
      (recipe) => !engine || recipe.engines === engine || recipe.engines === "both",
    );

    let covered = 0;
    const suggestions = steps.map((step) => {
      const reference = stepByNumber(step);
      const beat = beatByStep.get(step);
      const isCovered = beat ? isBeatCovered(beat) : false;
      if (isCovered) covered += 1;

      const narrative = narrativeMotionForStep(step);
      const families = narrative?.families ?? [];

      // Une étape vide ne reçoit rien. C'est la règle du projet : on aide l'utilisateur
      // à nommer ce qu'il a dans ses rushes, on n'invente pas de scène — et proposer
      // un mouvement pour une intention qui n'existe pas, c'est inventer la scène.
      const recipes = isCovered
        ? available
            .filter((recipe) => families.includes(recipe.family))
            .sort((left, right) => {
              const a = rank(left, families);
              const b = rank(right, families);
              return a[0] - b[0] || a[1] - b[1] || (a[2] < b[2] ? -1 : 1);
            })
            .slice(0, size)
            .map(card)
        : [];

      return {
        step,
        title: reference.title,
        tagline: reference.tagline,
        actId: reference.actId,
        isCovered,
        note: isCovered ? (beat?.note ?? null) : null,
        intensity: beat?.intensity ?? null,
        referenceIntensity: reference.referenceIntensity,
        /** Ce que l'étape demande au mouvement. */
        movement: narrative?.movement ?? null,
        primitives: (narrative?.primitives ?? [])
          .map((key) => MOTION_PRIMITIVES.find((primitive) => primitive.key === key))
          .filter((primitive): primitive is (typeof MOTION_PRIMITIVES)[number] =>
            Boolean(primitive),
          ),
        families,
        recipes,
      };
    });

    // Le rendu texte, pour le chemin qui part d'un bouton : l'utilisateur clique, la
    // matière arrive dans le chat en contexte. L'agent qui appelle l'action lui-même
    // lit plutôt `steps`, structuré.
    const brief = buildMotionBrief({
      videoTitle: video.title,
      scopeLabel: scopeLabel(scope as BriefScope),
      steps: suggestions.map((entry) => ({
        step: entry.step,
        title: entry.title,
        isCovered: entry.isCovered,
        note: entry.note,
        intensity: entry.intensity,
        referenceIntensity: entry.referenceIntensity,
        movement: entry.movement,
        primitives: entry.primitives.map((primitive) => ({
          label: primitive.label,
          how: primitive.how,
        })),
        recipes: entry.recipes.map((recipe) => ({
          title: recipe.title,
          family: recipe.family,
          engines: recipe.engines,
          durationSeconds: recipe.durationSeconds,
          format: recipe.format,
          prompt: recipe.prompt,
        })),
      })),
      determinismRules: DETERMINISM_RULES,
    });

    return {
      video: { id: video.id, title: video.title },
      scope,
      scopeLabel: scopeLabel(scope as BriefScope),
      content: brief.content,
      suggestedSteps: brief.suggestedSteps,
      coverage: { covered, total: steps.length },
      // Dire combien d'étapes n'ont rien reçu, et pourquoi : sans ça, une carte presque
      // vide renvoie une réponse presque vide, et l'agent croit que la grammaire manque.
      emptySteps: suggestions.filter((entry) => !entry.isCovered).map((entry) => entry.step),
      steps: suggestions,
      enginePorting: ENGINE_PORTING,
      determinismRules: DETERMINISM_RULES,
    };
  },
});
