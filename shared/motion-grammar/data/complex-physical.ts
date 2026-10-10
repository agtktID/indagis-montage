/**
 * Fichier généré — ne pas modifier à la main.
 *
 * Source : la bibliothèque de déconstruction de motion design de l'utilisateur,
 * régénérable avec `node tools/motion-grammar/build.mjs <dossier>`.
 *
 * Les chemins locaux, les hash et les noms de fichiers source sont retirés à la
 * génération : voir `tools/motion-grammar/README.md`.
 */

import type { MotionRecipe } from "../types.ts";

/** complex-physical — 3 recettes. */
export const MOTION_COMPLEXPHYSICAL: readonly MotionRecipe[] = [
  {
    "key": "art-book-page-turn",
    "title": "Art book page turn",
    "summary": "Livre ouvert et tourné par pré-rendu ou 3D.",
    "family": "complex-physical",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 15.6,
    "fps": 30,
    "palette": [
      "#2A1C16",
      "#EEE9DD",
      "#25221E",
      "#E2B679"
    ],
    "beats": [
      {
        "at": "0–90 / 0–3 s",
        "description": "Livre fermé sur table bois sombre, caméra top-down; zoom 1→1.035, vignette."
      },
      {
        "at": "90–210 / 3–7 s",
        "description": "Livre s'ouvre : couverture gauche `rotateY 0→-158°`, ombre de charnière augmente .1→.38."
      },
      {
        "at": "210–330 / 7–11 s",
        "description": "Pages s'éventent, 5 feuilles avec `rotateY` décalé 6f, puis s'arrêtent; gravures N&B autorisées."
      },
      {
        "at": "330–420 / 11–14 s",
        "description": "Page droite révèle panneau photo/vidéo, légère parallaxe x 0→-12 px."
      },
      {
        "at": "420–468 / 14–15.594 s",
        "description": "Insert devient flou, texte placeholder et fondu noir."
      }
    ],
    "prompt": "Plan cinématographique 16:9 de 16 secondes : livre d'art fictif sur table en bois sombre, lumière de lampe chaude, papier ivoire épais, gravures originales noir et blanc, ouverture lente, pages qui s'éventent avec ombres physiques, profondeur de champ subtile. Aucun livre, gravure ou texte de référence.",
    "recipe": "### Contrat et faisabilité\n\n L'illusion crédible de papier et de lumière nécessite un pré-rendu 3D ou un asset filmé autorisé; une feuille CSS reste une approximation. Remplacer gravures, couverture, vidéo intégrée et texte source.\n\nPalette bois `#2A1C16`, papier `#EEE9DD`, encre `#25221E`, lumière chaude `#E2B679`; typographie serif livre. Calques : plateau, livre 3D, feuilles recto/verso, ombres de contact, gravures, lumière, grain.\n\n**Remotion** : préférer `<OffthreadVideo>` de pré-rendu 3D transparent ou un PNG sequence; sinon 6 panneaux 3D `perspective:1200`, origine à la reliure, z-index trié par angle. Interpoler chaque angle et opacité d'ombre selon frame.\n\n**HyperFrames** : mêmes plans DOM `transform-style:preserve-3d`; GSAP paused labels `0,3,7,11,14`, `.to(page,{rotationY:-158,duration:4,ease:'power2.inOut'})`; rendu à `tl.time(frame/30)`.",
    "checks": []
  },
  {
    "key": "pastel-inflatable-3d-abstract-objects",
    "title": "Objets abstraits gonflables pastel en 3D",
    "summary": "Promo d'un pack d'objets gonflables pastel, mises en page scindées et carton de remerciement.",
    "family": "complex-physical",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 26.8,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:03",
        "description": "Objets gonflables pastel flottants; à 1s apparaît titre étroit « INFLATABLE ABSTRACT OBJECTS »."
      },
      {
        "at": "00:04–00:11",
        "description": "Mise en page divisée en grands blocs cyan/vert, typo noire énorme derrière assemblage d’objets pastel, badge « EASY TO USE!! »."
      },
      {
        "at": "00:12",
        "description": "Cadre bleu clair, typographie géante et badge circulaire sur le côté."
      },
      {
        "at": "00:13–00:19",
        "description": "Composition de coussins et formes molles (fleurs/fruits/blocs) flottant au-dessus d’un fond bleu et d’un titre géant peu contrasté."
      },
      {
        "at": "00:20–00:26.8",
        "description": "Reprise sur blanc, objets autour du texte haut « THANK YOU! », tenue finale."
      }
    ],
    "prompt": "Créer un spot de présentation de 26,8 secondes, 16:9, 30 i/s pour une collection originale d’objets abstraits gonflables. Utiliser des volumes doux comme coussins nuage, formes fleurs, grappes de boules, blocs et étoiles, en menthe, bleu ciel, lavande, pêche, jaune et rose. Éclairage studio large, matière caoutchouc/tissu mat, reflets diffus et ombre douce. Ouvrir sur les objets flottants et un titre vertical élégant, continuer par des compositions graphiques découpées en zones cyan/vert avec grande typographie éditable, puis une scène bleu clair avec la collection groupée. Finir sur fond blanc, « Thank you! » simple et objets pastel qui bordent le cadre. Mouvement lent et amorti, aucun rebond rapide; cadrages et assets originaux, texte lisible, aucune source watermark ou géométrie copiée.",
    "recipe": "### Recette pour moteurs\n\nCréer des modèles 3D originaux avec matières caoutchouc/tissu mat, lumière large et ombres douces, palettes menthe, lavande, pêche, jaune. Remotion peut importer renders transparents pré-calculés ou images animées; ne pas tenter de reproduire une simulation 3D dépendante de l’horloge dans le composant.\n\n**Remotion :** 804f à 30 i/s. Hero 0–119f avec 5–7 objets flottant à ±10px sur un cycle sinusoïdal dérivé du frame. Split ad 120–359f : grille cyan/vert, mots éditables, pack groupé; morph visuel à réaliser par cuts/fondu, pas par déformation d’asset. Composition blue-stage 360–599f, légère poussée de caméra; merci/end card 600–803f, titre fixe et objets au premier plan. Ajouter `Sequence` et poster frame par asset.\n\n**HyperFrames :** HTML wrappers aux moments 0, 4, 12, 13, 20 s. Images/vidéos 3D pré-rendues comme couches, animé via paused timeline par `y`, `rotate`, `scale` et parallaxe minimale. Garantir que toutes les séquences 3D sont pré-rendues/seekables; ne pas laisser une boucle WebGL non déterministe.\n\n### Validation\n\nVérifier les scènes vers 0, 4, 12, 13, 20 et fin; contrôler que les objets restent doux, distincts des textes, contrastés et cohérents; durée 26,8s = 804f.\n\n**Droits et fidélité :** cette vidéo est une prévisualisation la référence. Les droits de réutilisation de ses images, objets, illustrations, marques, musique et fichiers source ne sont pas établis par le téléchargement. Recréer la grammaire d’animation avec des assets autorisés; ne pas réutiliser le watermark ni les éléments protégés sans licence vérifiée.",
    "checks": [
      "Vérifier les scènes vers 0, 4, 12, 13, 20 et fin; contrôler que les objets restent doux, distincts des textes, contrastés et cohérents; durée 26,8s = 804f."
    ]
  },
  {
    "key": "surreal-fashion-3d-collage-scenes",
    "title": "Montage de scènes mode en collage 3D surréaliste",
    "summary": "Scènes de mode découpées surréalistes, formes 3D abstraites et montage d'effondrement graphique.",
    "family": "complex-physical",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 41.5,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:02",
        "description": "Fond terre cuite, titre condensé sombre (texte illisible avec certitude) et silhouettes mode/éléments 3D qui entrent."
      },
      {
        "at": "00:03–00:07",
        "description": "Plateau terracotta avec formes abstraites, objets dorés, personnage en marche; une forme soleil/visage jaune apparaît."
      },
      {
        "at": "00:08–00:10",
        "description": "Silhouettes noires en marche devant spheres, panneau et bloc bleu; formes et marcheurs alternent en collage."
      },
      {
        "at": "00:11–00:14",
        "description": "Passage fond noir étoilé: modèle en tenue rayée debout puis étoile métallique qui tourne lentement."
      },
      {
        "at": "00:15–00:18",
        "description": "Retour au plateau orange, silhouette marche devant sphères et sculpture dorée."
      },
      {
        "at": "00:19–00:21",
        "description": "Personnage à tête jaune entre dans un cadre/panneau flottant sur noir étoilé."
      },
      {
        "at": "00:22–00:32",
        "description": "Scène beige sculpturale en forme de diorama: sphères et arc, personnage et formes animées cohabitent, succession de placements."
      },
      {
        "at": "00:33–00:35",
        "description": "Brève rupture graphique faite de zigzags/lignes rouges sur fond gris puis rouge, silhouettes et pièces se désassemblent."
      },
      {
        "at": "00:36–00:41.542",
        "description": "Carton terracotta presque stable avec crédit « la référence x Ariel Costa » centré."
      }
    ],
    "prompt": "Créer un film motion design surréaliste de 41,54 secondes, 16:9, 24 i/s. Sur un décor terracotta, juxtaposer silhouettes de modèles en marche et objets abstraits 3D : sphère, sablier doré, panneau illustré, forme soleil à tête jaune. Passer brièvement à un plateau noir étoilé avec modèle mode en pose et étoile métallique en rotation; revenir sur le terracotta avec silhouettes passant devant les sculptures. Faire entrer une figure par un cadre illustré, puis composer un diorama beige avec arches, demi-disques et plusieurs objets arrondis. Vers 33s, provoquer une rupture graphique courte en zigzags rouge/gris, désassembler les couches, puis retrouver un carton terracotta très simple avec un crédit modifiable fourni par le commanditaire. Mouvement saccadé mais contrôlé, palette chaleureuse, silhouettes stylisées, lumière studio. Utiliser personnages, typographie, musique et modèles 3D originaux/licenciés; ne pas copier le crédit, watermark ou la mise en page exacte.",
    "recipe": "### Recette\n\nCréer silhouettes ou footage mode autorisés, objets 3D stylisés (sphères, demi-lune, étoile chromée, panneau), diorama sculptural. Palette terracotta, bleu sarcelle, crème, noir nuit, accents jaune/or. Garder chaque objet sur une couche distincte. Le dernier crédit est un texte d’auteur de l’aperçu et ne doit pas être attribué à l’utilisateur.\n\n**Remotion :** 997f à 24 i/s. Séquences aux alentours de 0, 3, 8, 11, 15, 19, 22, 33 et 36s. Chaque plateau fait 2–5s; animées par position/rotation/scale sur repères absolus. Diaporama de 3D pré-rendus ou Canvas/WebGL seekable; ne pas laisser une scène 3D dépendre d’horloge. Rupture 33–35s: cuts d’images rouges, zigzag en SVG pendant moins de 12f puis retour fond. Fin 36–41,5s sur fond rouge uni et crédit éditable propre.\n\n**HyperFrames :** composer calques HTML, silhouettes PNG/SVG et objets 3D pré-rendus; déclarer les fenêtres aux timecodes ci-dessus. Timeline pausée, z-order fixe. Un `fromTo` distinct par scène pour déplacement des éléments et rotation lente de l’étoile. Respecter les 33–35s comme accent court, pas de flash agressif.\n\n### Validation\n\nComparer les fenêtres aux 0, 3, 8, 11, 15, 19, 22, 30, 33, 36 et 41s; vérifier lisibilité des silhouettes et transitions 3D. Ne pas reprendre le crédit auteur sans autorisation; confirmer 997 images.\n\n**Droits :** Les droits de la vidéo d’aperçu et de ses images, modèles, illustrations, formes 3D et crédits ne sont pas établis par le téléchargement. Utiliser des ressources et modèles autorisés; ne pas reprendre l’identité ou le crédit de l’auteur affiché.",
    "checks": [
      "Comparer les fenêtres aux 0, 3, 8, 11, 15, 19, 22, 30, 33, 36 et 41s; vérifier lisibilité des silhouettes et transitions 3D. Ne pas reprendre le crédit auteur sans autorisation; confirmer 997 images."
    ]
  }
];
