# Specification Quality Checklist : la section Skills

**Purpose** : valider que la spécification est complète et saine avant de planifier
**Created** : 11 octobre 2026
**Feature** : [spec.md](../spec.md)

## Content Quality

- [x] Aucun détail d'implémentation (langages, frameworks, API)
- [x] Centrée sur la valeur pour l'utilisateur et le besoin
- [x] Lisible par quelqu'un qui ne code pas
- [x] Toutes les sections obligatoires sont remplies

## Requirement Completeness

- [x] Aucun marqueur [NEEDS CLARIFICATION] ne subsiste
- [x] Les exigences sont testables et sans ambiguïté
- [x] Les critères de succès sont mesurables
- [x] Les critères de succès sont indépendants de la technologie
- [x] Tous les scénarios d'acceptation sont définis
- [x] Les cas limites sont identifiés
- [x] Le périmètre est borné
- [x] Les dépendances et hypothèses sont identifiées

## Feature Readiness

- [x] Chaque exigence fonctionnelle a un critère d'acceptation clair
- [x] Les parcours principaux sont couverts
- [x] La fonctionnalité répond aux critères de succès mesurables
- [x] Aucun détail d'implémentation n'a fui dans la spécification

## Conformité à la constitution

- [x] **Principe I — structure narrative d'abord** : la fonctionnalité se justifie parce
  que l'agent livré ignore aujourd'hui la méthode du voyage du héros. Elle sert le
  centre du produit, elle ne l'entoure pas.
- [x] **Principe IV — honnêteté (non négociable)** : FR-003 et SC-004 interdisent de
  présenter comme disponible un savoir-faire qui ne l'est pas. C'est la contrainte qui
  façonne tout l'écran.
- [x] **Principe V — simplicité de l'interface** : neuvième section de la bibliothèque,
  pas quatrième route. La bibliothèque est l'exception déjà justifiée.
- [x] **Aucun binaire en base** : les skills restent du texte (hypothèse explicite).
- [x] **Aucun secret stocké** : FR-011.

## Deux relectures appliquées

Deux manques relevés à la première passe, puis corrigés :

1. **La spécification supposait l'écart Code Mode / App Mode sans le prouver.** Il vient
   d'un tableau de documentation, pas d'une observation. Une hypothèse explicite impose
   désormais de le démontrer à l'exécution avant de construire — si l'écart n'existait
   pas, toute la spécification tomberait.
2. **Les trois premières histoires étaient classées P1, P2, P3**, ce qui laissait croire
   qu'un écran de consultation seul suffirait. Les deux premières sont maintenant P1 :
   montrer sans permettre d'agir ne ferait que nommer le problème.

## Notes

- Choix de l'utilisateur déjà arrêté : pour le motion design, **un sous-ensemble choisi**
  de skills Apache-2.0 avec attribution, pas les vingt et une.
- Reste à trancher en phase de planification, pas ici : lesquelles exactement, et la
  limite de taille d'un contenu importé (FR-010).
- Prêt pour `/speckit-plan`. `/speckit-clarify` n'est pas nécessaire : aucune ambiguïté
  bloquante ne subsiste.
