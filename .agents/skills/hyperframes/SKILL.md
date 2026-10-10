---
name: hyperframes
description: >-
  Transformer une carte narrative Studio en composition vidéo HyperFrames. À lire quand
  l'utilisateur veut produire une vidéo, un teaser, un chapitrage animé ou une courbe
  émotionnelle animée à partir de sa carte. Décrit aussi ce que l'agent peut et ne peut
  PAS faire ici — le rendu n'a pas lieu dans cette application.
---

# HyperFrames depuis la carte narrative

## Ce que tu peux faire, et ce que tu ne peux pas

Cette application **ne rend aucune vidéo**. Rendre demande FFmpeg, un navigateur sans
interface et l'exécution de commandes — trois choses que le serveur Studio n'a pas, par
construction (la constitution interdit `fs` et `child_process` côté serveur pour que
l'app reste déployable partout).

| Situation | Ce que tu fais |
| --- | --- |
| Des outils `mcp__hyperframes__*` sont dans ton registre | Le pont local est démarré. Enchaîne : `doctor` → `init` → `write_composition` → `lint` → `preview_start` (l'utilisateur regarde) → `render`. Le rendu se fait sur la machine de l'utilisateur, dans `video/<projet>/`. |
| Aucun outil MCP HyperFrames n'est branché | Tu **produis le brief de composition** et tu le rends à l'utilisateur en texte. Tu dis clairement que le rendu se fera de son côté. Tu n'inventes pas une URL de vidéo. |

Vérifie avec `tool-search` avant d'annoncer ce que tu peux faire. Ne prétends jamais
avoir lancé un rendu sans un identifiant de tâche renvoyé par un vrai outil.

## Ce que la carte narrative donne à une composition

C'est le pont : Studio a déjà la matière dont une composition a besoin.

| Donnée Studio | Ce qu'elle devient |
| --- | --- |
| Les 12 étapes couvertes (`get-story-map`) | la structure en scènes ; une étape = un bloc narratif |
| Les 3 actes et leurs couleurs | l'identité visuelle par partie : teal / orange / violet |
| `intensity` de chaque étape | le rythme : coupes serrées au pic (étape 8), respiration à la 9 |
| Les marqueurs (`list-markers`) avec `startMs`/`endMs` | les points de montage réels, en millisecondes — directement exploitables |
| `sortOrder` des marqueurs | **l'ordre narratif**, qui peut différer du chronologique. C'est lui qui fait foi pour la composition, pas le timecode. |
| Le titre et la fiche de préparation | le texte à l'écran, les cartons, la promesse à tenir |
| `suggest-motion` sur la même vidéo | **le geste visuel que l'étape demande** : fonction de mouvement, primitives, recettes calibrées |

## Comment procéder

1. `get-story-map` pour la structure, jamais de mémoire.
2. `list-markers` en `order: "narrative"` — c'est l'ordre voulu par l'utilisateur.
2bis. `suggest-motion` pour savoir **quel mouvement** sert chaque étape, au lieu de
   choisir les effets au hasard. Voir la section dédiée plus bas.
3. Construire le brief : une scène par étape **couverte** (une étape sans note n'a rien à
   montrer), sa durée déduite de ses marqueurs, son intensité, sa couleur d'acte.
4. Si les outils MCP existent : `doctor` d'abord (Chrome et ffmpeg présents ?), puis
   `init`, `write_composition`, `lint`, et seulement ensuite `render`. Rendre en
   `quality: "draft"` tant qu'on itère, `delivery` pour la version finale. Un rendu prend
   plusieurs minutes — prévenir l'utilisateur plutôt que de le laisser attendre en silence.
5. Sinon, rendre le brief en texte structuré et dire où le porter.

## À ne pas faire

- Ne pas inventer de contenu narratif absent de la carte. Les étapes vides restent vides.
- Ne pas trier les marqueurs par timecode quand l'utilisateur a posé un ordre narratif.
- Ne pas annoncer un rendu terminé sans identifiant renvoyé par un outil.
- Ne pas proposer d'installer HyperFrames « dans l'app » : ce n'est pas une option.
- Ne pas réserver l'impact à autre chose que l'étape 8.

## La grammaire de mouvement : ne pas composer à l'aveugle

Avant d'écrire une composition, appeler **`suggest-motion --videoId <id> --scope <acte>`**.
Elle renvoie, étape par étape, ce que l'étape demande au mouvement, les primitives à
employer, et des recettes avec leurs durées et leurs easings mesurés.

Sans elle, le choix des effets est arbitraire. Avec elle, il est motivé par le récit :
une entrée de 12–18 frames en cubic-out à l'étape 1, un impact **seulement** à l'étape 8.

Trois règles qui en découlent :

- **Le ressort amorti et le dépassement sont réservés à l'étape 8.** C'est la seule étape
  où le récit les justifie. Les mettre partout vole au climax ce qui le distingue.
- **Les trois interdits sont absolus** : aucune horloge réelle, aucun `Math.random()` non
  graine, aucune animation autonome. Une timeline GSAP est `paused: true` et se déplace
  par `tl.time(frame / fps)`. Sans ça, aucune comparaison de frames n'est possible — donc
  aucune vérification.
- **Une recette donne un calibrage, pas un contenu.** Ses durées et ses easings sont des
  mesures réutilisables ; son sujet, ses textes et ses images viennent de la carte de
  l'utilisateur et de ses ressources autorisées.

`list-motion-recipes --step 8` liste tout ce qui sert le climax ;
`--search <titre>` renvoie le corps complet d'une recette, que `suggest-motion` omet pour
rester lisible.

## Où est la référence complète

Le détail du CLI, du catalogue de primitives et des modes de rendu (local, cloud HeyGen,
AWS Lambda, Google Cloud Run) vit dans le plugin HyperFrames de l'environnement de
développement, pas ici. Cette skill couvre uniquement le pont Studio → composition.
