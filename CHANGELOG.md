# Journal des versions

Les changements visibles par l'utilisateur, les plus récents en premier.
Ce projet suit la [gestion sémantique de version](https://semver.org/lang/fr/).

## 0.1.0 — 11 octobre 2026

Première version publiable. **Alpha** : le produit fait ce qu'il annonce et ses
parcours sont vérifiés, mais il n'a pas encore servi à un montage de bout en bout
par quelqu'un d'autre que son auteur.

### La structuration narrative

- **La carte narrative** — les 12 étapes du voyage du héros en 3 actes, avec votre
  courbe d'intensité face à celle de la méthode.
- **Le diagnostic** — douze règles lisent la carte et disent où le récit cède : acte
  sous-doté, climax sans matière, fin déconnectée, matière sans intention. Aucun
  modèle de langage n'intervient, la réponse est immédiate et reproductible.
- **Le carnet de marqueurs** — vos passages repérés avec leurs timecodes réels, que
  vous réordonnez selon le récit et non selon la chronologie.
- **La fiche de préparation** et **les essais** — les cinq questions d'avant-montage,
  et la boucle observation → hypothèse → essai.

### Entrées et sorties

- **Exports** : CSV, EDL d'assemblage pour Resolve et Premiere, chapitres YouTube.
  Tout est rendu en ligne, sans stockage externe.
- **Imports** : un bloc de dérushage collé, un CSV ou un EDL. Une lecture à blanc
  montre ce qui serait créé **et refusé**, ligne par ligne, avant d'écrire.
- **La bibliothèque** s'importe et s'exporte en CSV ou JSON, avec le même principe :
  une valeur de taxonomie inconnue est refusée, jamais rangée dans « autre ».

### La bibliothèque de ressources

- Huit sections dans un seul écran : Créer, Bibliothèque, Prompts, Mouvements,
  Modèles, Ressources de départ, Kits de marque, Journal.
- **550 prompts** livrés avec l'application, à trier par catégorie, style et scène.
- **121 recettes de motion design** déconstruites, à trier **par étape du voyage** :
  la grammaire qui relie le récit aux deux moteurs de rendu.
- Vos ressources rangées sur trois axes — type, catégorie, format.

### Fabriquer des vidéos

- Deux ponts locaux, **HyperFrames** (Apache-2.0) et **Remotion** (source-available),
  avec versions épinglées plutôt que `@latest`.
- Le brief de composition transforme un acte entier de votre carte en consigne pour
  l'agent, avec la grammaire de mouvement en option.

### Les fondations

- **47 actions**, chacune à la fois outil d'agent, hook React, route HTTP et commande
  en ligne. Aucune route `/api/*` ne double une action.
- **229 tests** et **28 critères de vérification**, chacun avec la commande qui le
  démontre et une section finale sur ce qui reste non prouvé.
- Interface traduite en onze langues ; le contenu de la méthode reste en français,
  parce que c'est un référentiel transcrit, pas de la donnée traduisible.
- **Tout est local.** Aucun compte, aucun binaire en base, aucune donnée qui sort.

### Sécurité

- Trois dépendances transitives relevées par override : `pdfjs-dist`,
  `@anthropic-ai/sdk` et `postcss-selector-parser`.
- Deux vulnérabilités restent sans correctif publié en amont, `xlsx` et `sprintf-js`.
  Elles arrivent par le framework, et aucune n'est appelée par le code du projet.
