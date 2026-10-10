# Crédits

Indagis Studio est publié sous licence MIT. Il embarque du contenu de tiers,
conservé avec son attribution.

## Catalogue de prompts

Les 550 prompts de la section **Prompts → Catalogue** proviennent de deux dépôts
publics sous licence MIT. Les corps de prompt sont repris tels quels ; seuls les
titres ont été traduits en français, le titre d'origine restant affiché.

| Contenu | Auteur | Dépôt | Licence |
| --- | --- | --- | --- |
| 541 prompts image (GPT-Image-2) | freestylefly et contributeurs | [awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | MIT |
| 9 cas d'usage vidéo (Seedance 2.0) | ZeroLu, d'après un article de 卡尔的AI沃茨 | [awesome-seedance](https://github.com/ZeroLu/awesome-seedance) | MIT |

516 des 541 prompts image portent en plus un lien vers leur auteur d'origine,
affiché sur la fiche du prompt.

L'import est reproductible : voir `tools/prompt-catalog/README.md`.

## Grammaire de mouvement

Les 121 recettes de la section **Mouvements** sont générées depuis la bibliothèque de
déconstruction de motion design de l'auteur du projet : une fiche d'analyse par
référence, écrite par lui.

Ce qui est publié est **l'analyse, jamais la source**. Les vidéos et les packs de stock
analysés restent sur le disque de l'auteur : aucun média, aucune capture, aucun nom de
fichier et aucun nom commercial ne sont redistribués. La génération retire les chemins
locaux et les empreintes SHA-256, et échoue si un reste passe au travers ; les mêmes
interdits sont rejoués à chaque exécution des tests.

| Partie | Origine | Licence |
| --- | --- | --- |
| Les 121 fiches d'analyse | auteur du projet | MIT, avec le reste du dépôt |
| Les 6 primitives et la table de portage entre moteurs | auteur du projet | MIT |
| La carte étape → mouvement (`narrative-map.ts`) | écrite pour ce projet | MIT |
| Les références analysées | tiers, droits non établis | **non redistribuées** |

Une durée d'easing, un décalage de quatre frames, un ordre de calques : ce n'est pas une
œuvre qu'on recopie, c'est une grammaire. Le média qui l'a inspirée, lui, est protégé —
et il n'est pas ici.

L'import est reproductible : voir `tools/motion-grammar/README.md`.

## Méthode narrative

Les 12 étapes, les 3 actes, les 5 questions de préparation et les 5 symptômes de
`shared/hero-journey.ts` sont transcrits du document *Le voyage du héros pour le
montage*, fourni par l'auteur du projet.

## Moteurs vidéo

| Outil | Licence | Rôle |
| --- | --- | --- |
| [HyperFrames](https://github.com/hyperframes/hyperframes) | Apache-2.0 | rendu local, proposé par défaut |
| [Remotion](https://www.remotion.dev) | source-available — **pas open source** | rendu local, installé à la demande ; gratuit pour les particuliers, les associations et les entreprises de trois salariés au plus |

Remotion n'est pas une dépendance d'Indagis Studio : le pont l'installe dans le
projet vidéo de l'utilisateur, qui accepte sa licence à ce moment-là.

## Framework

[Agent-Native](https://agent-native.com) — MIT.
