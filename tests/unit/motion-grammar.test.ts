/**
 * La grammaire de mouvement, et surtout son lien avec le récit.
 *
 * Deux choses à protéger ici, et elles sont de nature différente.
 *
 * La première est **l'intégrité des données générées**. `shared/motion-grammar/data/`
 * sort d'un script qui lit des notes locales et en retire les chemins, les hash et les
 * noms de fichiers source. Ce nettoyage est la seule barrière entre le disque de
 * l'utilisateur et un dépôt public, et un dépôt public ne se dépublie pas. Ces tests
 * le vérifient sur la sortie, pas sur le script : c'est la sortie qui est publiée.
 *
 * La seconde est **la cohérence de la carte narrative**. Elle est écrite à la main,
 * donc une faute de frappe dans un nom de famille y passerait sans bruit — et
 * `suggest-motion` renverrait silencieusement zéro recette pour une étape, ce qui se
 * lit comme « la grammaire ne couvre pas le climax » au lieu de « il y a un typo ».
 */
import { describe, expect, it } from "vitest";

import { JOURNEY_STEPS } from "../../shared/hero-journey.js";
import { MOTION_RECIPES, motionRecipeByKey } from "../../shared/motion-grammar/index.js";
import {
  NARRATIVE_MOTION_MAP,
  familiesForStep,
  narrativeMotionForStep,
  stepsForFamily,
} from "../../shared/motion-grammar/narrative-map.js";
import { MOTION_PRIMITIVES } from "../../shared/motion-grammar/primitives.js";
import { MOTION_FAMILIES } from "../../shared/motion-grammar/types.js";
import { buildMotionBrief, type MotionBriefStep } from "../../shared/motion-grammar/brief.js";

const FAMILY_KEYS = MOTION_FAMILIES.map((family) => family.key);

describe("les données générées ne portent rien de local", () => {
  /**
   * Chaque motif a sa raison d'être interdit, et ce ne sont pas les mêmes :
   * un chemin et un hash sont les données de l'utilisateur ; un nom de fichier média
   * et un nom de pack commercial désignent la source, que la recette ne republie pas.
   */
  const interdits: [RegExp, string][] = [
    [/\/home\//, "un chemin personnel"],
    [/\b[0-9a-f]{64}\b/, "un hash SHA-256"],
    [/\.(?:mp4|mov|moti|motn|fcpxml)\b/i, "un nom de fichier média"],
    [/Motion.{0,2}Array/i, "le nom du service source"],
    [/Smooth Letter Slideshow|Unique Typography V|\bLogo Reveal\b/, "un nom commercial de pack"],
  ];

  it.each(interdits)("ne contient jamais %s (%s)", (motif) => {
    const fautifs = MOTION_RECIPES.filter((recipe) => motif.test(JSON.stringify(recipe))).map(
      (recipe) => recipe.key,
    );
    expect(fautifs).toEqual([]);
  });

  it("ne garde aucun reste de nom de fichier en tête de titre", () => {
    // « Qua2lity — collage mode Y2K » : un jeton qui mêle lettres et chiffres en tête
    // de titre n'est jamais un mot, c'est un fragment de nom de fichier.
    const fautifs = MOTION_RECIPES.filter((recipe) => /^[A-Za-zÀ-ÿ]+\d/.test(recipe.title)).map(
      (recipe) => recipe.title,
    );
    expect(fautifs).toEqual([]);
  });
});

describe("chaque recette est exploitable", () => {
  it("en compte 121, toutes à clé unique", () => {
    expect(MOTION_RECIPES).toHaveLength(121);
    expect(new Set(MOTION_RECIPES.map((recipe) => recipe.key)).size).toBe(121);
  });

  it("porte une famille connue et un moteur connu", () => {
    for (const recipe of MOTION_RECIPES) {
      expect(FAMILY_KEYS, recipe.key).toContain(recipe.family);
      expect(["remotion", "hyperframes", "both"], recipe.key).toContain(recipe.engines);
    }
  });

  it("porte un titre et un résumé lisibles", () => {
    for (const recipe of MOTION_RECIPES) {
      expect(recipe.title.length, recipe.key).toBeGreaterThan(3);
      expect(recipe.summary.length, recipe.key).toBeGreaterThan(4);
      // Un résumé qui finit sur une préposition est une phrase amputée par le nettoyage.
      expect(recipe.summary, recipe.key).not.toMatch(/\s(?:de|du|des|from|in|of|d')\.$/i);
    }
  });

  it("se retrouve par sa clé", () => {
    const premiere = MOTION_RECIPES[0];
    expect(motionRecipeByKey(premiere.key)).toBe(premiere);
    expect(motionRecipeByKey("mouvement-qui-nexiste-pas")).toBeUndefined();
  });

  it("n'annonce une palette que faite de couleurs valides", () => {
    for (const recipe of MOTION_RECIPES) {
      for (const couleur of recipe.palette) {
        expect(couleur, `${recipe.key} → ${couleur}`).toMatch(/^#[0-9A-F]{6}$/);
      }
    }
  });

  it("remplit les neuf familles — aucune n'est un tiroir vide", () => {
    for (const key of FAMILY_KEYS) {
      const dedans = MOTION_RECIPES.filter((recipe) => recipe.family === key);
      expect(dedans.length, key).toBeGreaterThan(0);
    }
  });
});

describe("la carte narrative relie les douze étapes au mouvement", () => {
  it("couvre exactement les douze étapes du voyage, une fois chacune", () => {
    expect(NARRATIVE_MOTION_MAP).toHaveLength(12);
    expect(NARRATIVE_MOTION_MAP.map((entry) => entry.step)).toEqual(
      JOURNEY_STEPS.map((step) => step.step),
    );
  });

  it("ne nomme que des familles qui existent", () => {
    // Le test qui compte : un nom de famille mal orthographié ici ferait renvoyer
    // zéro recette par `suggest-motion`, sans erreur, pour une étape entière.
    for (const entry of NARRATIVE_MOTION_MAP) {
      for (const family of entry.families) {
        expect(FAMILY_KEYS, `étape ${entry.step}`).toContain(family);
      }
    }
  });

  it("ne nomme que des primitives qui existent", () => {
    const connues = MOTION_PRIMITIVES.map((primitive) => primitive.key);
    for (const entry of NARRATIVE_MOTION_MAP) {
      for (const primitive of entry.primitives) {
        expect(connues, `étape ${entry.step}`).toContain(primitive);
      }
    }
  });

  it("donne à chaque étape au moins une famille et des recettes à proposer", () => {
    for (const entry of NARRATIVE_MOTION_MAP) {
      expect(entry.families.length, `étape ${entry.step}`).toBeGreaterThan(0);
      const disponibles = MOTION_RECIPES.filter((recipe) =>
        entry.families.includes(recipe.family),
      );
      expect(disponibles.length, `étape ${entry.step}`).toBeGreaterThan(0);
    }
  });

  it("dit en une phrase ce que l'étape demande", () => {
    for (const entry of NARRATIVE_MOTION_MAP) {
      expect(entry.movement.length, `étape ${entry.step}`).toBeGreaterThan(40);
    }
  });

  it("se lit dans les deux sens", () => {
    // `stepsForFamily` est l'inverse de la table ; les deux doivent concorder, sinon
    // « où placer cette recette ? » et « quoi pour cette étape ? » se contrediraient.
    for (const key of FAMILY_KEYS) {
      for (const step of stepsForFamily(key)) {
        expect(familiesForStep(step), `famille ${key}`).toContain(key);
      }
    }
    for (const entry of NARRATIVE_MOTION_MAP) {
      for (const family of entry.families) {
        expect(stepsForFamily(family), `étape ${entry.step}`).toContain(entry.step);
      }
    }
  });

  it("réserve l'impact au climax", () => {
    // La règle de la méthode, encodée : le ressort amorti et le dépassement ne sont
    // justifiés qu'à l'étape 8. Ce test protège la phrase qui le dit — si elle
    // disparaît, l'agent perd la seule raison de ne pas en mettre partout.
    const climax = narrativeMotionForStep(8);
    expect(climax?.movement).toMatch(/impact|unique étape|ressort/i);
  });

  it("ignore une étape hors de 1–12 au lieu d'en inventer une", () => {
    expect(narrativeMotionForStep(0)).toBeUndefined();
    expect(narrativeMotionForStep(13)).toBeUndefined();
    expect(familiesForStep(99)).toEqual([]);
  });
});

describe("les primitives et leur vocabulaire", () => {
  it("sont six, à clés uniques, et chacune dit quand et comment", () => {
    expect(MOTION_PRIMITIVES).toHaveLength(6);
    expect(new Set(MOTION_PRIMITIVES.map((primitive) => primitive.key)).size).toBe(6);
    for (const primitive of MOTION_PRIMITIVES) {
      expect(primitive.when.length, primitive.key).toBeGreaterThan(20);
      expect(primitive.how.length, primitive.key).toBeGreaterThan(40);
    }
  });

  it("sont toutes employées par au moins une étape", () => {
    // Une primitive qu'aucune étape ne convoque est du vocabulaire mort : soit la carte
    // l'a oubliée, soit elle n'a pas sa place.
    const employees = new Set(NARRATIVE_MOTION_MAP.flatMap((entry) => entry.primitives));
    for (const primitive of MOTION_PRIMITIVES) {
      expect(employees.has(primitive.key), primitive.key).toBe(true);
    }
  });
});

describe("le brief de mouvement décrit sans prescrire", () => {
  const ecrite: MotionBriefStep = {
    step: 8,
    title: "Le climax",
    isCovered: true,
    note: "Il lâche la rampe et saute.",
    intensity: 95,
    referenceIntensity: 100,
    movement: "Le seul endroit où un impact est mérité.",
    primitives: [{ label: "Entrée premium", how: "12–18 frames cubic-out." }],
    recipes: [
      {
        title: "Fitness boxing",
        family: "sport-cards",
        engines: "both",
        durationSeconds: 29.9,
        format: "16:9",
        prompt: "Opener sombre, accent vert citron.",
      },
    ],
  };

  const vide: MotionBriefStep = {
    step: 3,
    title: "Refus / hésitation",
    isCovered: false,
    note: null,
    intensity: null,
    referenceIntensity: 20,
    movement: "Le mouvement recule.",
    primitives: [{ label: "Collage papier", how: "Textures alpha." }],
    recipes: [],
  };

  it("rend une étape écrite avec sa fonction, ses primitives et ses recettes", () => {
    const brief = buildMotionBrief({
      videoTitle: "Mon film",
      scopeLabel: "le récit complet",
      steps: [ecrite],
      determinismRules: ["Aucune horloge réelle."],
    });

    expect(brief.suggestedSteps).toBe(1);
    expect(brief.emptySteps).toEqual([]);
    expect(brief.content).toContain("Il lâche la rampe et saute.");
    expect(brief.content).toContain("95/100");
    expect(brief.content).toContain("impact est mérité");
    expect(brief.content).toContain("Entrée premium");
    expect(brief.content).toContain("Fitness boxing");
    expect(brief.content).toContain("Aucune horloge réelle.");
  });

  it("annonce une étape vide et ne lui propose RIEN", () => {
    // L'invariant qui compte. Une étape que l'utilisateur n'a pas écrite ne reçoit
    // aucune proposition : proposer un mouvement pour une intention qui n'existe pas,
    // c'est inventer la scène à sa place — ce que ce projet ne fait jamais.
    const brief = buildMotionBrief({
      videoTitle: "Mon film",
      scopeLabel: "le récit complet",
      steps: [vide],
      determinismRules: [],
    });

    expect(brief.suggestedSteps).toBe(0);
    expect(brief.emptySteps).toEqual([3]);
    expect(brief.content).toContain("étape non écrite");
    // Ni la primitive ni la fonction de l'étape ne fuient dans le brief : sans note,
    // l'étape n'a rien à montrer, et en dire quelque chose serait déjà trop.
    expect(brief.content).not.toContain("Collage papier");
    expect(brief.content).not.toContain("Le mouvement recule");
  });

  it("compte séparément les étapes écrites et les vides", () => {
    const brief = buildMotionBrief({
      videoTitle: "Mon film",
      scopeLabel: "le récit complet",
      steps: [vide, ecrite],
      determinismRules: [],
    });
    expect(brief.suggestedSteps).toBe(1);
    expect(brief.emptySteps).toEqual([3]);
  });

  it("rappelle qu'une recette calibre mais ne fournit pas le contenu", () => {
    // La présence de 121 recettes rend tentant de reprendre leur sujet. Le brief porte
    // le rappel ; si la phrase disparaît, l'agent perd le garde-fou.
    const brief = buildMotionBrief({
      videoTitle: "Mon film",
      scopeLabel: "le récit complet",
      steps: [ecrite],
      determinismRules: [],
    });
    expect(brief.content).toMatch(/mesures réutilisables/);
    expect(brief.content).toMatch(/jamais de la référence/);
  });
});
