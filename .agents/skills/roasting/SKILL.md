---
name: roasting
description: >
  Transformer un retour de spectateur en hypothèse testable, sans prendre une solution
  proposée pour un diagnostic. À lire dès que l'utilisateur rapporte ce qu'une personne a dit
  de son montage, prépare une séance de retours, ou revient d'une projection. Déclenche-toi
  aussi sur « on m'a dit que », « un ami a trouvé que », « les commentaires disent », « je
  viens de le montrer à », et quand un retour arrive sous forme de solution (« il faudrait
  couper le début ») plutôt que d'observation — c'est précisément le cas où cette compétence
  sert.
---

# Roasting — du retour à l'essai

## Règle

**Une solution proposée par un testeur n'est pas un diagnostic.** Ce que la personne
ressent est une donnée fiable ; ce qu'elle propose d'y faire ne l'est pas.

- « J'ai décroché ici » → localise un vrai problème. Exploitable tel quel.
- « Ajoute une musique » → une solution déjà formulée. Il faut remonter à ce qui a
  déclenché ce besoin avant de l'appliquer.

## Le format

| Champ | Contenu |
| --- | --- |
| **Observation** | Ce que le testeur dit, **mot pour mot**. Ne pas reformuler, ne pas interpréter à ce stade. |
| **Hypothèse** | La cause probable, formulée par l'utilisateur. Exemple : la question principale se résout avant les dernières scènes. |
| **Essai** | Ce qu'on va tester. Un seul changement. |

## Comment procéder

1. Enregistrer l'observation telle quelle avec `create-experiment`
   (`source: "roasting"`). Ne pas y glisser une hypothèse déguisée.
2. Si le testeur a proposé une solution, la noter dans l'observation entre guillemets,
   puis **demander à l'utilisateur ce qui, selon lui, a provoqué cette réaction**.
3. Renseigner l'hypothèse dans un second temps, une fois qu'elle est formulée.
4. Clore avec `resolve-experiment` en exigeant un verdict : ce que la comparaison
   avant/après a montré.

## À ne pas faire

- Ne pas appliquer directement la solution proposée par un testeur.
- Ne pas fusionner plusieurs retours en une seule observation : chacun localise un
  endroit différent.
- Ne pas décider à la place de l'utilisateur si un retour est fondé — c'est son récit.
