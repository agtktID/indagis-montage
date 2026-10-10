#!/usr/bin/env node
/**
 * Construit `shared/motion-grammar/data/` depuis la bibliothèque de déconstruction
 * de motion design de l'utilisateur.
 *
 *   node tools/motion-grammar/build.mjs <dossier-remotion-hyperframe>
 *
 * Le dossier source contient des `skills/**\/SKILL.md` écrits à la main, chacun
 * décrivant la grammaire de mouvement d'une référence vidéo : découpage timecodé,
 * palette, recette Remotion, recette HyperFrames, prompt de reconstruction et points
 * de comparaison de frames.
 *
 * ## Ce que le script retire, et pourquoi
 *
 * Les fiches source sont des notes de travail locales : elles citent le chemin absolu
 * du MP4 analysé, son SHA-256, et le nom du fichier d'origine. Rien de tout cela n'a
 * sa place dans un dépôt public — c'est le disque de l'utilisateur, et ça n'aide
 * personne d'autre. Le script les supprime, et **échoue** si un reste passe au
 * travers : un chemin personnel publié ne se dépublie pas.
 *
 * Les sections « Source » sont retirées en entier pour la même raison. Elles portaient
 * aussi des réserves utiles (« audio non écouté », « licence inconnue »), mais ces
 * réserves concernent le média source — précisément ce qu'on ne republie pas.
 *
 * Ce qui reste est le métier : des durées, des easings, des palettes, des primitives
 * et un prompt. Une chorégraphie de mouvement n'est pas une œuvre qu'on recopie, c'est
 * une grammaire — et celle-ci a été écrite par l'utilisateur.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = join(HERE, "..", "..");
const DATA_DIR = join(PROJECT, "shared", "motion-grammar", "data");

const SRC = process.argv[2];
if (!SRC) {
  console.error("Usage : node tools/motion-grammar/build.mjs <dossier-remotion-hyperframe>");
  process.exit(1);
}

/* ------------------------------------------------------------------ familles */

/**
 * Les neuf familles.
 *
 * Sept viennent de la table de `skills/motion-families/SKILL.md` écrite par
 * l'utilisateur. Les deux dernières — typographie et surimpressions — sont ajoutées
 * ici : les 88 fiches téléchargées sont pour l'essentiel des kits de lettrage et des
 * packs d'incrustations, que les sept premières ne décrivent pas. Les ranger de force
 * dans « collage » aurait rendu la famille inutilisable.
 */
const FAMILIES = [
  "sport-cards",
  "collage-archive",
  "maps-networks",
  "data-ui",
  "product-devices",
  "identity-logo",
  "typography",
  "overlays-transitions",
  "complex-physical",
];

/**
 * L'affectation par mot-clé, dans l'ordre : la première règle qui accroche gagne.
 *
 * L'ordre compte beaucoup. « fashion-smoke-transition-overlay » est une
 * surimpression avant d'être de la mode ; « pyro-fire-font » est de la typographie
 * avant d'être un effet. Les règles les plus spécifiques passent donc en premier.
 */
const FAMILY_RULES = [
  [/lowerthird|lower-third/, "overlays-transitions"],
  [/font|typeface|type-kit|type-family|lettering|alphabet|typography|smooth-letter|social-titles/, "typography"],
  [/overlay|transition|sticker|flare|scratch|smoke|thunder|lightning|callout|doodle|scribble|icon-kit|object-kit|cta-bars|cta-icons|grit|damage|wipes|halftone|element/, "overlays-transitions"],
  [/logo|silhouette|opening-(in|out)|brand-reveal|ribbon/, "identity-logo"],
  [/sport|player|fitness|boxing|skate|urban-fashion-cinematic/, "sport-cards"],
  [/\bmap\b|network|route|global|regional|travel|hud/, "maps-networks"],
  [/data|infographic|saas|dashboard|corporate|web-promotion|ui-theme|led-social|panels/, "data-ui"],
  [/device|mobile|product|phone|glass|launch|showcase|web-presentation|announcement|promo/, "product-devices"],
  [/page-turn|inflatable|3d|surreal/, "complex-physical"],
  [/collage|archive|scrapbook|documentary|grain|torn-paper|cutout|portfolio|slideshow|carousel|evidence|y2k|retail|lineup|zoom/, "collage-archive"],
];

/**
 * Les cas que les mots-clés classent mal.
 *
 * Chacun est une décision, pas un rattrapage : `glitch-sport` contient « glitch » mais
 * c'est un pack d'ouverture sportive ; `cyber-neon-network-hud` dit « network » mais
 * c'est une surcouche d'interface, pas une carte.
 */
const FAMILY_OVERRIDES = {
  "glitch-sport": "sport-cards",
  "cyber-neon-network-hud": "data-ui",
  "minimal-tech-hud-lines": "data-ui",
  "automotive-hud-atlas": "data-ui",
  "art-book-page-turn": "complex-physical",
  "luxury-organic-brand-reveal": "identity-logo",
  "gradient-ribbon-logo-reveal": "identity-logo",
  "grunge-portrait-card-opener": "sport-cards",
  "fast-zoom-transitions": "overlays-transitions",
  "bounce-text-animations": "typography",
  "beautiful-slideshow": "collage-archive",
  "modular-social-infographic-library": "data-ui",
  "dark-corporate-data-library": "data-ui",
  "pastel-inflatable-3d-abstract-objects": "complex-physical",
  "surreal-fashion-3d-collage-scenes": "complex-physical",
  "magic-smoke-revealer-alpha-pack": "overlays-transitions",
  "retail-fashion-lineup": "collage-archive",
  "retro-gaming-download-cta": "overlays-transitions",
  "cyber-monday-retro-sale-motion-kit": "overlays-transitions",
  "unique-typography-v2": "typography",
  "web-promotions": "data-ui",
  "scrapbook-travel-collage": "collage-archive",
  "scrapbook-collage-transitions": "collage-archive",
};

function familyFor(key) {
  if (FAMILY_OVERRIDES[key]) return FAMILY_OVERRIDES[key];
  for (const [pattern, family] of FAMILY_RULES) {
    if (pattern.test(key)) return family;
  }
  // La convention du projet : une valeur inconnue arrête la génération. Mieux vaut un
  // échec qu'une fiche rangée au hasard dans une famille qui ne la décrit pas.
  throw new Error(`Aucune famille pour « ${key} » — ajouter une règle ou un override.`);
}

/* -------------------------------------------------------------- nettoyage */

/**
 * Un chemin absolu, un hash, un nom de fichier média : rien de tout ça ne sort d'ici.
 *
 * L'ordre est porteur. Le nom du service commercial part **avant** le motif de nom de
 * fichier, parce que « Motion Array(57).mp4 » contient une espace qu'un motif de nom
 * de fichier ne doit pas franchir — un motif permissif sur l'espace avalait la phrase
 * entière et laissait des résumés vides.
 */
const SANITISERS = [
  [/SHA-?256\s*:?\s*`?[0-9a-f]{64}`?/gi, ""],
  [/\b[0-9a-f]{64}\b/g, ""],
  [/\/home\/[^\s`,;)»"]+/g, "la référence"],
  [/`[^`\n]*\.(?:mp4|mov|zip|moti|motn|fcpxml)`/gi, "la référence"],
  // Motion Array est un service commercial : son nom n'a rien à faire dans une recette.
  [/Motion[ _]?Array\s*\(?\s*\d*\s*\)?\.(?:mp4|mov|zip)/gi, "la référence"],
  [/Motion[ _]?Array/gi, "la référence"],
  // Un seul jeton, sans espace : `yuiuy.mp4`, `Social_Titles_source_279843.zip`.
  [/\b[\w\-]+\.(?:mp4|mov|zip|moti|motn|fcpxml)\b/gi, "la référence"],
  // Les noms commerciaux des packs sources. Une grammaire de mouvement se décrit par
  // ce qu'elle fait, pas par le produit payant qui l'a inspirée : « le preset Logo
  // Reveal 03 » devient « la révélation de logo 03 », et la recette ne perd rien.
  [/\bSmooth Letter(?: Slideshow)?\b/g, "lettrage progressif"],
  [/\bUnique Typography V\.?\s*2\b/gi, "typographie singulière"],
  [/\bLogo Reveal Pack\b/gi, "pack de révélation de logo"],
  [/\bLogo Reveal\b/gi, "révélation de logo"],
  [/\bBeautiful Slideshow\b/gi, "soigné"],
  [/\bBounce Text Animations\b/gi, "rebondissant"],
  [/\bFast Zoom Transitions\b/gi, "transitions de zoom rapide"],
  [/\bFast Zoom\b/gi, "zoom rapide"],
  [/\bSocial Titles\b/gi, "titres sociaux"],
  [/\bWeb Promotions\b/gi, "promotions web"],
  // « Reproduire le titre sportif GLITCH SPORT avec… » : remplacer par un groupe
  // nominal bégayait. L'adjectif seul se glisse dans la phrase sans la casser.
  [/\bGLITCH SPORT\b/g, "glitché"],
  [/\bSilhouette Openings\b/gi, "ouvertures en silhouette"],
  [/\bSilhouette (in|out)\b/gi, "silhouette $1"],
  // Ce que les suppressions laissent derrière. `[ \t]` et non `\s` : `\s` mange les
  // retours à la ligne, et avec eux la structure markdown des recettes.
  [/\(\s*\)/g, ""],
  [/[ \t]*;[ \t]*\./g, "."],
  [/,[ \t]*\./g, "."],
  [/,[ \t]*,/g, ","],
  [/[ \t]{2,}/g, " "],
  [/[ \t]+,/g, ","],
  [/\n{3,}/g, "\n\n"],
];

function sanitise(text) {
  let out = text;
  for (const [pattern, replacement] of SANITISERS) out = out.replace(pattern, replacement);
  return out.trim();
}

/**
 * Le résumé, réécrit plutôt qu'amputé.
 *
 * Les fiches source annoncent « Reproduit le hero logiciel IA sombre de <fichier>. ».
 * Retirer le fichier laisse « Reproduit le hero logiciel IA sombre de. », ce qui ne
 * décrit plus rien. On garde donc la description et on retire l'acte de reproduction :
 * ce qui reste nomme le mouvement, et c'est exactement ce qu'on veut lire dans une
 * bibliothèque.
 */
/**
 * Les résumés que la source a écrits en anglais, traduits à la main.
 *
 * Vingt et une fiches du premier lot sont rédigées en anglais. L'application est en
 * français : les laisser tels quels donnerait une bibliothèque bilingue par accident.
 * La traduction est faite ici, à la main, parce que ce sont vingt-une phrases — pas
 * dans une passe automatique dont personne ne relirait la sortie.
 *
 * Seuls les résumés sont traduits. Les corps restent dans leur langue, par la même
 * règle que le catalogue de prompts : c'est le texte éprouvé.
 */
const SUMMARY_FR = {
  "retail-fashion-lineup": "Plan de groupe mode retail sobre et recadrage lent.",
  "pastel-inflatable-3d-abstract-objects":
    "Promo d'un pack d'objets gonflables pastel, mises en page scindées et carton de remerciement.",
  "surreal-fashion-3d-collage-scenes":
    "Scènes de mode découpées surréalistes, formes 3D abstraites et montage d'effondrement graphique.",
  "autumn-sticker-pack-catalog":
    "Promo d'un pack d'autocollants d'automne et catalogue de variantes de couleur.",
  "brutalist-neon-glitch-object-kit": "Vitrine d'objets à glitch chromatique néon.",
  "comic-dynamite-arrows-action-overlays":
    "Flèches comics rouges, éclats d'impact et démonstrations sur images d'action.",
  "cyber-monday-retro-sale-motion-kit":
    "Promo de soldes maximaliste, accessoires détourés et maquettes de vitrine.",
  "fashion-eyewear-sticker-overlay-showcase":
    "Surimpressions de lunettes sur mannequins et carton final en planche produit.",
  "fashion-smoke-transition-overlay-demo":
    "Montage mode et action sombre démontrant des transitions de fumée volumineuse.",
  "halftone-cutout-mouths-and-hands":
    "Aperçus de collage monochrome en trame de demi-teintes : bouches et mains.",
  "halloween-glitch-icon-kit":
    "Titre d'un pack à glitch pixel néon, grille et échantillons de ressources.",
  "heatmap-social-media-emoji-stickers":
    "Pack d'émojis sociaux 3D incandescents, grilles de ressources et invitation au téléchargement.",
  "magic-smoke-revealer-alpha-pack":
    "Échantillonneur de révélateurs de fumée colorée et carton final du pack alpha.",
  "monochrome-gesture-sticker-catalog":
    "Catalogue d'autocollants monochromes de mains et de visages expressifs.",
  "pencil-scribble-doodle-elements":
    "Aperçu de ressources au crayon monochrome et révélations dessinées à la main, en séquence.",
  "retro-cutout-collage-elements-pack":
    "Couverture de collage rétro, catalogue de découpes détourées et reprise finale du collage.",
  "retro-gaming-download-cta":
    "Montage d'autocollants retro-gaming vif et appel à l'action « télécharger ».",
  "spooky-alpha-object-kit":
    "Révélation d'objets hantés mis en scène et tableau final du kit de ressources.",
  "tech-science-sticker-pack-promo":
    "Présentation d'un pack d'autocollants tech violet et appel au téléchargement.",
  "thunder-lightning-overlay-pack":
    "Exemples d'éclairs bleus sur images d'archive et surimpressions de foudre isolées.",
  "white-outline-doodle-sticker-sheet":
    "Planche d'autocollants doodle à la craie blanche et aperçus d'objets.",
};

function cleanSummary(raw, fallback, key) {
  if (SUMMARY_FR[key]) return SUMMARY_FR[key];
  const out = sanitise(raw)
    // Certaines descriptions sont elles-mêmes entre guillemets dans le frontmatter.
    .replace(/^["«']\s*|\s*["»']$/g, "")
    .replace(/^(?:Reproduit|Reproduire|Recrée|Recréer|Recree|Reconstruit|Reconstruire|Recompose|Rejoue|Rebuild|Reconstruct|Recreate)\s+/i, "")
    .replace(/^(?:les?|la|l'|des?|du)\s+/i, "")
    .replace(/^référence\s*:\s*/i, "")
    // « Sept transitions du pack <fichier> par zoom… » : le fichier parti, « du pack
    // la référence » ne désigne plus rien. Au milieu d'une phrase, on retire ; en
    // fin de phrase, les règles suivantes s'en chargent.
    .replace(/\s*(?:du|dans le|de la|de|le|la)?\s*pack\s+la référence\b/gi, "")
    // La préposition part avec le groupe qu'elle introduisait : retirer « la
    // référence » seule laissait « Livre ouvert et tourné de par pré-rendu ».
    .replace(/\s+(?:de\s+la|de|du|des|d')\s+la référence\b/gi, "")
    .replace(/\s+la référence\b(?=\s+\S|\s*[:;])/gi, "")
    // Un mot répété que le remplacement a créé : « le diaporama diaporama soigné ».
    .replace(/\b(\w+)(\s+\1)\b/gi, "$1")
    .replace(/\s*(?:—|-)?\s*(?:de|du|de la|des|d')\s+la référence\s*\.?$/i, "")
    .replace(/\s*la référence\s*[.:]?$/i, "")
    // Les fiches en anglais finissent parfois sur la préposition qui introduisait le
    // nom de fichier retiré : « …previews from. » n'est pas une phrase.
    .replace(/\s+(?:from|in|of|on|with|de|du|des|dans|avec|d')\s*\.?$/i, "")
    .replace(/[\s,;:.]+$/, "")
    .trim();
  if (out.length < 3) return fallback;
  return `${out.charAt(0).toUpperCase()}${out.slice(1)}.`;
}

/**
 * Les notes de métier, débarrassées de ce que les autres champs portent déjà.
 *
 * Les tableaux de découpage sont retirés : ils sont dans `beats`, sous forme
 * exploitable. Les y laisser doublait chaque fiche et donnait un markdown bancal.
 */
function cleanRecipe(text) {
  return (
    text
      .split(/\r?\n/)
      .filter((line) => !line.trim().startsWith("|"))
      // Les cases à cocher sont dans `checks`, sous forme de liste exploitable.
      .filter((line) => !/^\s*-\s*\[\s*\]/.test(line))
      .join("\n")
      // La fin de phrase est un point suivi d'une espace et d'une majuscule, et non le
      // premier point rencontré : « 28.10 s » en contient un au milieu d'un nombre.
      .replace(/Source\s+(?:observée|exacte)?\s*:[\s\S]*?\.(?=\s+[A-ZÀ-Þ])/gi, "")
      // Le prompt a son propre champ ; le laisser ici doublait chaque fiche.
      .replace(/Prompt\s*(?:complet)?\s*:?\s*«[^»]*»\s*/gi, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

/**
 * Les intertitres dont la section est devenue vide.
 *
 * « ### Découpage » ne portait qu'un tableau, et le tableau est parti dans `beats` : le
 * titre annonce désormais le vide, ce qui est pire que son absence.
 *
 * Fait par découpage plutôt que par expression régulière. La version en regex
 * (`/^### .*\n+(?=### |$)/gm`) retirait **tous** les titres : en mode multiligne, `$`
 * accroche la ligne vide qui suit un titre, et la section entière passait pour vide.
 */
function dropEmptySections(text) {
  const parts = text.split(/^(### [^\n]*)$/m);
  const out = [parts[0]];
  for (let index = 1; index < parts.length; index += 2) {
    const body = (parts[index + 1] ?? "").trim();
    if (body.length > 0) out.push(parts[index], parts[index + 1]);
  }
  return out
    .join("")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Ce qui ne doit jamais survivre au nettoyage. Vérifié sur la sortie finale. */
const FORBIDDEN = [
  [/\/home\//, "chemin personnel"],
  [/\b[0-9a-f]{64}\b/, "hash SHA-256"],
  [/\.(mp4|mov|moti)\b/i, "nom de fichier média"],
  [/Motion.{0,2}Array/i, "nom du service source"],
  [/Smooth Letter Slideshow|Unique Typography V|GLITCH SPORT|\bLogo Reveal\b/, "nom commercial de pack"],
];

/* ---------------------------------------------------------------- lecture */

/** Les sections dont le contenu décrit le média source, pas le mouvement. */
const DROPPED_SECTIONS = /^(?:source|contrat source|sources?\b|matrice sources)/i;

function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { fields: {}, body: raw };
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([a-z_]+):\s*(.*)$/.exec(line);
    if (pair) fields[pair[1]] = pair[2].trim();
  }
  return { fields, body: raw.slice(match[0].length) };
}

/** Découpe le corps en sections `## …`, et jette celles qui parlent de la source. */
function sections(body) {
  const found = [];
  const parts = body.split(/^## +/m);
  // `parts[0]` est le préambule : le titre `#` et l'éventuel chapeau.
  for (const part of parts.slice(1)) {
    const newline = part.indexOf("\n");
    const title = (newline === -1 ? part : part.slice(0, newline)).trim();
    const content = newline === -1 ? "" : part.slice(newline + 1).trim();
    if (DROPPED_SECTIONS.test(title)) continue;
    found.push({ title, content });
  }
  return found;
}

/** Le premier `# titre` du corps. */
function headline(body, fallback) {
  const match = /^# +(.+)$/m.exec(body);
  return match ? match[1].trim() : fallback;
}

/**
 * Le titre, débarrassé de la source qu'il nommait.
 *
 * Les fiches titrent « Référence <fichier> — fitness boxing » ou « Overlays lens flare
 * — <fichier> ». Retirer le fichier laissait « Référence la référence — fitness
 * boxing » : un bégaiement, sur 58 des 121 titres. Ce qui reste est le descriptif, et
 * c'est le seul morceau qui nomme vraiment le mouvement.
 */
function cleanTitle(raw, fallback) {
  let out = sanitise(raw);

  // Les fiches titrent avec un *fragment* du nom de fichier, pas le nom entier :
  // « Lohwer — bibliothèque corporate data » pour `preview_540p_crf26_lohwer_quality`.
  //
  // Un simple « est-ce une sous-chaîne d'un radical ? » ne suffit pas : « lower » en
  // est une, et « Lower thirds mode grunge » devenait « Thirds mode grunge ». Trois
  // conditions, chacune sûre : le jeton mêle lettres et chiffres, ou c'est un radical
  // entier, ou il figure dans la courte liste des coquilles de nommage ci-dessous.
  const lead = /^([\w\d]{4,})\s*[—–-]\s*/.exec(out);
  if (lead && out.length - lead[0].length >= 3) {
    const token = lead[1].toLowerCase();
    const mixed = /[a-zà-ÿ]/i.test(token) && /\d/.test(token);
    if (mixed || STEMS.includes(token) || SOURCE_TYPOS.includes(token)) {
      out = out.slice(lead[0].length);
    }
  }

  out = out
    .replace(/^Référence\s+la référence\s*[—–-]\s*/i, "")
    .replace(/^la référence\s*[—–-]\s*/i, "")
    .replace(/\s*[—–-]\s*la référence\s*$/i, "")
    .replace(/^(?:Référence|la référence)\s*[:—–-]?\s*/i, "")
    .trim();
  if (out.length < 3) return fallback;
  return `${out.charAt(0).toUpperCase()}${out.slice(1)}`;
}

/** `dark-ai-saas-hero` → `Dark ai saas hero` : le dernier recours d'un titre. */
function humanise(key) {
  const words = key.replace(/-/g, " ");
  return `${words.charAt(0).toUpperCase()}${words.slice(1)}`;
}

/**
 * Le prompt de reconstruction.
 *
 * Les fiches l'écrivent entre guillemets français, parfois précédé de « Prompt : ».
 * Quand il n'est pas entre guillemets, on prend la section entière.
 */
function extractPrompt(allSections, preamble) {
  const haystack = [
    ...allSections.filter((s) => /^prompts?\b/i.test(s.title)).map((s) => s.content),
    ...allSections.map((s) => s.content),
    preamble,
  ];
  for (const text of haystack) {
    const quoted = /«\s*([\s\S]*?)\s*»/.exec(text);
    if (quoted && quoted[1].length > 80) return quoted[1].replace(/\s+/g, " ").trim();
  }
  const own = allSections.find((s) => /^prompts?\b/i.test(s.title));
  if (own && own.content.length > 80) {
    return own.content.replace(/^Prompt\s*(?:complet)?\s*:?\s*/i, "").replace(/\s+/g, " ").trim();
  }
  return null;
}

/** Les lignes d'un tableau de découpage, quand la fiche en porte un. */
function extractBeats(allSections) {
  const beatSection = allSections.find((s) =>
    /beat|découpage|chronolog|timeline|séquence|frames/i.test(s.title),
  );
  const text = beatSection?.content ?? allSections.map((s) => s.content).join("\n");
  const beats = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 2) continue;
    // L'en-tête et le séparateur du tableau.
    if (/^-+:?$|^:?-+:?$/.test(cells[0])) continue;
    if (/^(temps|début|frames?|time|projet|élément)/i.test(cells[0]) && beats.length === 0) continue;
    // Une première cellule qui porte un repère temporel : c'est un beat.
    if (!/\d/.test(cells[0])) continue;
    beats.push({ at: cells[0], description: cells.slice(1).join(" — ") });
  }
  return beats;
}

/** Les couleurs citées dans la fiche, dans leur ordre d'apparition. */
function extractPalette(body) {
  const seen = [];
  for (const match of body.matchAll(/#[0-9A-Fa-f]{6}\b/g)) {
    const hex = match[0].toUpperCase();
    if (!seen.includes(hex)) seen.push(hex);
  }
  return seen;
}

/** Les points de comparaison de frames : ce que la fiche demande de vérifier. */
function extractChecks(allSections) {
  const checks = [];
  for (const section of allSections) {
    if (!/validation|contrôle|checklist|\bqc\b|\bqa\b|limites|vérif|reproduction/i.test(section.title)) continue;
    for (const line of section.content.split(/\r?\n/)) {
      const item = /^\s*-\s*\[\s*\]\s*(.+)$/.exec(line) ?? /^\s*-\s+(.+)$/.exec(line);
      if (item) checks.push(item[1].trim());
    }
    if (checks.length === 0 && section.content) {
      checks.push(section.content.split(/\r?\n/)[0].trim());
    }
  }
  return checks;
}

function detectEngines(body) {
  const remotion = /remotion/i.test(body);
  const hyperframes = /hyperframes/i.test(body);
  if (remotion && hyperframes) return "both";
  if (hyperframes) return "hyperframes";
  return "remotion";
}

const RATIOS = ["9:21", "9:16", "2:3", "3:4", "4:5", "1:1", "5:4", "4:3", "3:2", "16:10", "16:9", "2:1", "21:9"];

function detectFormat(body) {
  for (const ratio of RATIOS) {
    if (new RegExp(`(^|[^\\d.])${ratio.replace(":", "\\s*:\\s*")}([^\\d.]|$)`).test(body)) {
      return ratio;
    }
  }
  return null;
}

function detectDuration(body) {
  // « 28.10 s », « 51,806 s », « 93,75 s »
  const match = /(\d{1,4}[.,]\d{1,3})\s*s\b/.exec(body);
  if (!match) return null;
  const value = Number(match[1].replace(",", "."));
  return Number.isFinite(value) && value > 0 && value < 3600 ? Math.round(value * 10) / 10 : null;
}

function detectFps(body) {
  const match = /(\d{2,3})(?:[.,]\d+)?\s*(?:fps|i\/s|images\/s)/i.exec(body);
  if (match) return Number(match[1]);
  if (/30000\s*\/\s*1001/.test(body)) return 30;
  return null;
}

/* ------------------------------------------------------------- parcours */

function walk(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, found);
    else if (entry === "SKILL.md") found.push(full);
  }
  return found;
}

/** `logo-reveal-pack/logo-01` → `logo-reveal-pack-logo-01` : une clé unique et lisible. */
function keyFor(file, root) {
  const parts = relative(root, dirname(file)).split("/");
  // `videos/<nom>` → `<nom>` ; `downloaded/<lot>/<nom>` → `<nom>` ; un niveau de plus
  // (les variantes d'un pack) garde son parent pour rester unique.
  const tail = parts.slice(1).filter((part) => !/^motion-array-|^template-packs-/.test(part));
  const name = tail.length > 1 ? tail.slice(-2).join("-") : tail[tail.length - 1];
  return name.replace(/^remotion-hyperframes-/g, "").replace(/(^|-)\d\d-/g, "$1");
}

/**
 * Les radicaux des fichiers source, lus dans les index de la bibliothèque.
 *
 * Les fiches titrent parfois « iugkiu — promo app claire » : le radical du MP4, sans
 * extension, que le motif de nom de fichier ne voyait donc pas. On ne peut pas les
 * retirer partout — « a », « e », « v » sont des radicaux et aussi des mots français —
 * mais en tête de titre, suivis d'un tiret, ils ne sont rien d'autre qu'une source.
 *
 * La liste est dérivée de la source plutôt qu'écrite ici : elle suit la bibliothèque
 * si elle change, et un radical oublié ne passerait pas la vérification finale.
 */
function sourceStems(root) {
  const stems = new Set();
  for (const index of ["videos/README.md", "downloaded/README.md"]) {
    let text;
    try {
      text = readFileSync(join(root, index), "utf8");
    } catch {
      continue;
    }
    for (const match of text.matchAll(/`([^`]+)\.(?:mp4|mov|zip)`/gi)) {
      const stem = match[1].trim();
      if (stem.length >= 2) stems.add(stem.toLowerCase());
    }
  }
  return [...stems].sort((a, b) => b.length - a.length);
}

/**
 * Les coquilles de nommage des fichiers source, qui servent de titre dans trois fiches.
 *
 * Trois, nommées une par une : elles ne portent ni chiffre ni radical entier, et une
 * règle plus large effacerait de vrais mots — « lower » est une sous-chaîne de
 * `preview_540p_crf26_lower_quality`, et « Lower thirds » est un titre légitime.
 */
const SOURCE_TYPOS = ["lohwer", "lowelr", "qualit"];

const SKILLS_ROOT = join(SRC, "skills");
const STEMS = sourceStems(SKILLS_ROOT);
const files = walk(SKILLS_ROOT).filter(
  (file) => !/\/(motion-families|reference-motion-reconstruction)\//.test(file),
);

if (files.length === 0) {
  console.error(`Aucun SKILL.md sous ${SKILLS_ROOT}`);
  process.exit(1);
}

const recipes = [];
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const { fields, body } = parseFrontmatter(raw);
  const key = keyFor(file, SKILLS_ROOT);
  const kept = sections(body).map((section) => ({
    title: sanitise(section.title),
    content: sanitise(section.content),
  }));
  const preamble = sanitise(body.split(/^## +/m)[0] ?? "");

  const title = cleanTitle(headline(body, key), humanise(key));
  const recipe = {
    key,
    title,
    summary: cleanSummary(fields.description ?? "", `${title}.`, key),
    family: familyFor(key),
    engines: detectEngines(body),
    format: detectFormat(body),
    durationSeconds: detectDuration(body),
    fps: detectFps(body),
    palette: extractPalette(body),
    beats: extractBeats(kept).map((beat) => ({
      at: sanitise(beat.at),
      description: sanitise(beat.description),
    })),
    prompt: extractPrompt(kept, preamble),
    recipe: dropEmptySections(
      cleanRecipe(
        kept
          .filter((section) => !/^prompts?\b/i.test(section.title))
          .map((section) => `### ${section.title}\n\n${section.content}`)
          .join("\n\n"),
      ),
    ),
    checks: extractChecks(kept),
  };

  // Le prompt sort du nettoyage comme le reste, mais il est extrait après : on le
  // repasse explicitement, sinon un nom de fichier cité dedans survivrait.
  if (recipe.prompt) recipe.prompt = sanitise(recipe.prompt);

  // Un titre qui commence par un jeton mêlant lettres et chiffres est un reste de nom
  // de fichier : aucun titre de mouvement ne s'appelle « Qua2lity ».
  if (/^[A-Za-zÀ-ÿ]+\d[\w]*\b/.test(recipe.title)) {
    throw new Error(`« ${key} » garde un reste de nom de fichier en tête : ${recipe.title}`);
  }

  const serialised = JSON.stringify(recipe);
  for (const [pattern, what] of FORBIDDEN) {
    if (pattern.test(serialised)) {
      throw new Error(
        `« ${key} » laisse passer un ${what} après nettoyage : ${pattern.exec(serialised)[0]}`,
      );
    }
  }

  recipes.push(recipe);
}

recipes.sort((a, b) => (a.key < b.key ? -1 : 1));

const duplicates = recipes.filter(
  (recipe, index) => recipes.findIndex((r) => r.key === recipe.key) !== index,
);
if (duplicates.length > 0) {
  throw new Error(`Clés en double : ${duplicates.map((r) => r.key).join(", ")}`);
}

/* --------------------------------------------------------------- écriture */

const HEADER = `/**
 * Fichier généré — ne pas modifier à la main.
 *
 * Source : la bibliothèque de déconstruction de motion design de l'utilisateur,
 * régénérable avec \`node tools/motion-grammar/build.mjs <dossier>\`.
 *
 * Les chemins locaux, les hash et les noms de fichiers source sont retirés à la
 * génération : voir \`tools/motion-grammar/README.md\`.
 */
`;

rmSync(DATA_DIR, { recursive: true, force: true });
mkdirSync(DATA_DIR, { recursive: true });

const constantName = (family) => `MOTION_${family.replace(/-/g, "").toUpperCase()}`;

for (const family of FAMILIES) {
  const group = recipes.filter((recipe) => recipe.family === family);
  const lines = [
    HEADER,
    `import type { MotionRecipe } from "../types.ts";`,
    "",
    `/** ${family} — ${group.length} recette${group.length > 1 ? "s" : ""}. */`,
    `export const ${constantName(family)}: readonly MotionRecipe[] = ${JSON.stringify(group, null, 2)};`,
    "",
  ];
  writeFileSync(join(DATA_DIR, `${family}.ts`), lines.join("\n"), "utf8");
}

const indexLines = [
  HEADER,
  `import type { MotionRecipe } from "./types.ts";`,
  ...FAMILIES.map((family) => `import { ${constantName(family)} } from "./data/${family}.ts";`),
  "",
  `export * from "./types.ts";`,
  `export * from "./primitives.ts";`,
  `export * from "./narrative-map.ts";`,
  `export * from "./brief.ts";`,
  "",
  "/**",
  ` * Les ${recipes.length} recettes de la grammaire de mouvement.`,
  " *",
  " * N'importer ce module que depuis une action : comme le catalogue de prompts, il est",
  " * trop lourd pour le navigateur. L'interface n'importe que `types.ts`.",
  " */",
  `export const MOTION_RECIPES: readonly MotionRecipe[] = [`,
  ...FAMILIES.map((family) => `  ...${constantName(family)},`),
  `];`,
  "",
  "const byKey = new Map(MOTION_RECIPES.map((recipe) => [recipe.key, recipe]));",
  "",
  "export function motionRecipeByKey(key: string): MotionRecipe | undefined {",
  "  return byKey.get(key);",
  "}",
  "",
];
writeFileSync(join(PROJECT, "shared", "motion-grammar", "index.ts"), indexLines.join("\n"), "utf8");

const counts = FAMILIES.map(
  (family) => `${family}: ${recipes.filter((r) => r.family === family).length}`,
);
console.log(`${recipes.length} recettes écrites dans shared/motion-grammar/data/`);
console.log(counts.join(" · "));
console.log(
  `avec prompt : ${recipes.filter((r) => r.prompt).length} · avec découpage : ${recipes.filter((r) => r.beats.length > 0).length}`,
);
