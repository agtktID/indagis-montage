# Grammaire de mouvement — import

`shared/motion-grammar/data/` et `shared/motion-grammar/index.ts` sont **générés**.
Ce dossier contient de quoi les reconstruire.

```bash
node tools/motion-grammar/build.mjs <dossier-remotion-hyperframe>
```

Le dossier source est une bibliothèque de déconstruction de motion design : un
`skills/**/SKILL.md` par référence analysée, avec son découpage timecodé, sa palette,
sa recette Remotion, sa recette HyperFrames, son prompt de reconstruction et ses points
de comparaison de frames. Sortie attendue : **121 recettes**, réparties en 9 familles.

Écrits à la main et **non régénérés** : `types.ts`, `primitives.ts`, `narrative-map.ts`.
Le script n'efface que `data/` et réécrit `index.ts`.

## Ce que le script retire, et pourquoi

Les fiches source sont des notes de travail locales. Elles citent le chemin absolu du
fichier analysé, son SHA-256, son nom, et le nom commercial du pack dont il provient.
Rien de tout cela n'a sa place dans un dépôt public : c'est le disque de l'utilisateur,
et ça n'aide personne d'autre.

| Retiré | Pourquoi |
| --- | --- |
| Chemins absolus (`/home/…`) | données de l'utilisateur, inutiles ailleurs |
| Hash SHA-256 | idem : ils identifient ses fichiers, pas la grammaire |
| Noms de fichiers média et d'archives | désignent la source, que l'on ne republie pas |
| Nom du service de stock source | une recette se décrit par ce qu'elle fait |
| Noms commerciaux des packs | « le preset Logo Reveal 03 » devient « la révélation de logo 03 » : la recette ne perd rien |
| Sections « Source » entières | elles ne décrivent que le média d'origine |

**Le script échoue plutôt que de laisser passer.** Chaque recette est revérifiée après
nettoyage contre la liste d'interdits ; un seul reste arrête la génération. Un chemin
personnel publié ne se dépublie pas. Les mêmes interdits sont rejoués à chaque
`pnpm test` dans `tests/unit/motion-grammar.test.ts`, sur la sortie — c'est elle qui est
publiée, pas le script.

Les sections « Source » portaient aussi des réserves utiles (« audio non écouté »,
« licence inconnue »). Elles disparaissent avec le reste, et c'est cohérent : ces
réserves concernent le média source, précisément ce qu'on ne republie pas.

## Ce qu'il garde

Les durées, les easings, les décalages en frames, les palettes, les calques, le
découpage, le prompt, et les points de comparaison. C'est le métier — et une
chorégraphie de mouvement n'est pas une œuvre qu'on recopie, c'est une grammaire.

## Les décisions que le script porte

**Neuf familles, pas sept.** La bibliothèque source en définit sept. Les 88 fiches du
second lot sont pour l'essentiel des kits de lettrage et des packs d'incrustations, que
les sept ne décrivent pas ; les y ranger de force aurait dilué « collage » jusqu'à
l'inutilité. D'où `typography` et `overlays-transitions`.

**Une famille inconnue arrête la génération.** Même convention que le catalogue de
prompts : mieux vaut un échec qu'une fiche rangée au hasard. L'affectation se fait par
mots-clés sur la clé, dans un ordre qui compte — « fashion-smoke-transition-overlay »
est une surimpression avant d'être de la mode — plus une table d'exceptions explicites.

**Vingt et un résumés sont traduits à la main.** Les fiches du premier lot sont en
anglais ; l'application est en français. Vingt-une phrases se traduisent et se
relisent, une passe automatique ne se relit pas. Les **corps** restent dans leur langue,
par la même règle que le catalogue de prompts : c'est le texte éprouvé.

**Les titres sont réécrits, pas amputés.** Les fiches titrent « Référence `<fichier>` —
fitness boxing » : retirer le fichier laissait « Référence la référence — fitness
boxing », sur 58 des 121 titres. Trois cas de nettoyage sont traités, et trois coquilles
de nommage de la source sont nommées une par une dans `SOURCE_TYPOS` — une règle plus
large effacerait de vrais mots, « lower » étant une sous-chaîne d'un nom de fichier et
« Lower thirds » un titre légitime.

## Provenance

| Partie | Origine | Statut |
| --- | --- | --- |
| Les 121 fiches d'analyse | écrites par l'auteur du projet | son texte |
| Les références analysées | vidéos et packs de stock tiers, droits non établis | **non redistribués** — aucun média, aucune capture, aucun nom |
| Les 6 primitives et la table de portage | transcrites de la fiche `motion-families` de la bibliothèque | son texte |
| La carte étape → mouvement | écrite pour ce projet, dans `narrative-map.ts` | neuve |

Ce qui est publié est l'analyse, jamais la source. Une grammaire de mouvement — une
durée d'easing, un décalage de 4 frames, l'ordre des calques — n'est pas une œuvre
protégeable ; le média qui l'a inspirée l'est, et il reste sur le disque de
l'utilisateur.
