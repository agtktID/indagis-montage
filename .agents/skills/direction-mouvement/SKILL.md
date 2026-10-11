---
name: direction-mouvement
description: >
  Poser un système de mouvement cohérent et lisible avant de composer un plan animé. Se
  déclenche quand l'utilisateur demande des titres, des surimpressions, des transitions, des
  zooms, un générique ou une animation. Déclenche-toi aussi sur « ajoute un titre », « fais
  une transition », « anime ça », « rends ça plus dynamique », sur toute mention de direction
  artistique, rythme, palette, typographie ou lisibilité, et avant tout brief de composition
  envoyé à un moteur de rendu — même quand l'utilisateur demande seulement le rendu.
---

# Direction de mouvement

Adapté du workflow vidéo de l'auteur du projet. La version d'origine supposait un
moteur de rendu sous la main ; **Studio ne rend rien**. Ce qui reste est ce qui compte
en amont : décider avant d'animer.

## Décider avant de composer

Le système se pose une fois, puis tous les plans s'y rangent : format et zones de
sécurité, grille, palette, typographie, échelle, durées et courbes. Un plan composé
sans ce cadre oblige à tout refaire au deuxième.

**Chaque animation répond à une fonction éditoriale** — attirer, orienter, expliquer,
ponctuer. Une animation qui n'en sert aucune se retire ; elle coûte de l'attention sans
rien rendre.

## Les trois règles non négociables

Elles vivent dans `shared/motion-grammar/primitives.ts` sous le nom `DETERMINISM_RULES`,
et ce ne sont pas des préférences de style :

- aucune horloge réelle ;
- aucun hasard non graine ;
- aucune animation autonome.

Sans elles, deux rendus de la même composition diffèrent, donc **aucune comparaison de
frames n'est possible, donc aucune vérification**. C'est la raison, pas le goût.

## L'impact appartient à l'étape 8

Le ressort amorti et le dépassement ne sont justifiés qu'au climax. Les employer
partout vole au climax ce qui le distingue — et c'est précisément ce que
`NARRATIVE_MOTION_MAP` encode pour les douze étapes.

Avant de proposer un mouvement, regarde **ce que l'étape demande** plutôt que de
choisir au hasard parmi 121 recettes. `suggest-motion` répond à cette question.

## Six primitives, pas cent vingt et une

`primitives.ts` porte le vocabulaire : entrée premium, tracé et déplacement de point,
caméra 2D, appareil en 2,5D, collage papier, graphiques et compteurs. Les 121 recettes
les recombinent.

**Les lire avant d'ouvrir une recette.** Qui connaît les six compose sans recette, et
une recette lui sert alors de calibrage.

## Avant de considérer un plan terminé

- Contraste et lisibilité, y compris au téléphone.
- Cohérence d'un plan au suivant : même grille, mêmes durées, mêmes courbes.
- Respect d'une préférence de mouvement réduit, quand elle est exprimée.
- Une capture d'interface ne doit jamais laisser croire à un état qui n'a pas existé.
  Un cadrage, un zoom ou une flèche sont permis ; reconstruire l'écran ne l'est pas.

## Une étape sans note ne reçoit aucune proposition

`suggest-motion` l'annonce comme vide, et c'est voulu. Proposer un mouvement pour une
intention que l'utilisateur n'a pas écrite, c'est inventer la scène — ce que ce projet
ne fait pas.
