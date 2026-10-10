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

/** overlays-transitions — 35 recettes. */
export const MOTION_OVERLAYSTRANSITIONS: readonly MotionRecipe[] = [
  {
    "key": "autumn-sticker-pack-catalog",
    "title": "Catalogue de stickers d’automne",
    "summary": "Promo d'un pack d'autocollants d'automne et catalogue de variantes de couleur.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 18,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:01",
        "description": "Quelques feuilles découpées tombent sur des planches de bois vert foncé."
      },
      {
        "at": "00:01–00:05",
        "description": "Explosion de stickers automnaux colorés autour du titre centré « AUTUMN THEMED STICKERS PACK », bandes de bois toujours visibles."
      },
      {
        "at": "00:06–00:08",
        "description": "Planche complète ordonnée sur fond kraft, cartouche « INCLUDES 34 COLOUR VERSIONS »."
      },
      {
        "at": "00:09–00:12",
        "description": "Transition vers fond blanc/bois pâle, assortiment multicolore et cartouche « 34 MULTI-COLOUR VERSIONS »."
      },
      {
        "at": "00:13–00:18, fin à 18,040 s",
        "description": "Présentation des variantes noir et blanc sur fond kraft, mêmes rangées d’objets pour la comparaison."
      }
    ],
    "prompt": "Réaliser un spot de présentation de 18,04 secondes en 16:9, 25 i/s pour un pack inédit de stickers d’automne. Ouvrir sur quelques feuilles qui se posent sur des planches de bois vert sombre; faire apparaître une composition dense de feuilles, champignons, glands, citrouilles, écharpes et petites icônes autour d’un titre éditable. Présenter ensuite trois planches comparables : une palette automnale, des déclinaisons multicolores, puis des versions monochromes, sur des fonds bois, blanc pâle et kraft. Conserver les mêmes silhouettes et positions entre colorways, avec un cartouche sobre décrivant chaque catégorie. Animation courte et lisible : chute amortie des premiers éléments, expansion douce de la couverture, transitions fondues entre catalogues; chaque planche finale tient assez longtemps pour lire les objets. Dessiner ou licencier tous les éléments, ne pas reproduire les illustrations ni le filigrane de l’aperçu.",
    "recipe": "### Recette Remotion et HyperFrames\n\nAssets : créer ou obtenir sous licence des feuilles, glands, champignons, citrouilles, vêtements et petites icônes saisonnières; prévoir versions couleur, palette alternative et monochrome alignées dans le même atlas. Les supports bois et kraft doivent être créés séparément des stickers.\n\n**Remotion :** 451f à 25 i/s. Entrée des feuilles sur 0–25f avec translation verticale et rotations distinctes depuis le haut; couverture du titre 25–125f, animer l’échelle du groupe vers 1 et verrouiller la composition après 60f. Afficher la grille couleur de 150–224f, grille multicolore de 225–324f et variantes monochromes de 325–450f. Faire des changements de support par fondu de 8f; maintenir les positions des objets pour une comparaison claire. Le placement est déterministe, sans physique dépendant du temps réel.\n\n**HyperFrames :** couches SVG/PNG alignées et trois scènes approximativement à 0, 6 et 9 s, puis scène monochrome vers 13 s. Timeline pausée et seekable; utiliser `fromTo` explicites pour les feuilles (y, rotation, scale), les cartouches et le fondu des fonds. La grille est une disposition fixe, et non une cascade auto-layout variable selon le navigateur.\n\n### Validation\n\nVérifier les temps 0, 1, 5, 6, 9, 12, 13 et 17,5 s; compter les éléments de la grille finale, contrôler l’alignement des colorways, lisibilité des cartouches, 451 images et les droits des illustrations et polices.",
    "checks": [
      "Vérifier les temps 0, 1, 5, 6, 9, 12, 13 et 17,5 s; compter les éléments de la grille finale, contrôler l’alignement des colorways, lisibilité des cartouches, 451 images et les droits des illustrations et polices."
    ]
  },
  {
    "key": "brutalist-neon-glitch-object-kit",
    "title": "Catalogue d’objets brutalistes au glitch néon",
    "summary": "Vitrine d'objets à glitch chromatique néon.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": null,
    "durationSeconds": 19,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:02",
        "description": "Logo/titre « BRUTALISM » sur une forme circulaire lumineuse, aberration chromatique multicolore et fond noir."
      },
      {
        "at": "00:03–00:04",
        "description": "Tête ou masque frontal rouge/rose isolé, bord RGB néon."
      },
      {
        "at": "00:05–00:06",
        "description": "Pistolet stylisé jaune/orange présenté de profil."
      },
      {
        "at": "00:07–00:08",
        "description": "Objet profilé vertical, silhouette jaune-verte puis orange."
      },
      {
        "at": "00:09–00:10",
        "description": "Poing américain puis anneau barbelé, objets centrés sur noir."
      },
      {
        "at": "00:11–00:14",
        "description": "Deux formes de lame croisées, puis paire d’ailes/lames en symétrie."
      },
      {
        "at": "00:15–00:18, fin 18,960 s",
        "description": "Couteau courbe isolé; sa couleur bascule du bleu/violet vers orange-jaune et son inclinaison varie légèrement."
      }
    ],
    "prompt": "Concevoir un aperçu de 18,96 s, 1920×1080, 25 i/s d’un catalogue original d’objets graphiques brutalistes au néon. Fond noir profond, titre blanc condensé « BRUTALISM » traversé brièvement par un disque chromatique, puis objets isolés : masque sculptural, forme futuriste inspirée d’un pistolet mais non fonctionnelle, silhouette verticale, emblème circulaire dentelé, deux lames abstraites symétriques et couteau courbe non réaliste. Donner à chaque forme un dégradé saturé jaune, orange, rouge, vert, cyan ou violet, un contour lumineux net et une présentation centrée. À chaque coupe, utiliser une aberration RGB de 2 ou 3 images puis rendre l’objet parfaitement stable. Le dernier couteau change de teinte pendant une rotation douce, sans mouvement aléatoire. Illustration originale, pas d’armes fonctionnelles, logos, tracés copiés, filigranes ou stroboscope.",
    "recipe": "### Reproduction\n\nCréer des objets originaux abstraits aux contours épais, avec dégradés chauds et froids. Pour éviter les armes réalistes, substituer les silhouettes de pistolet et de lame par des formes géométriques futuristes non fonctionnelles. Prévoir une lumière de contour et un fond noir propre.\n\n**Remotion :** 474f à 25 i/s. Titre 0–75f avec masque de révélation de cercle, léger décalage des canaux rouge/bleu limité à 2–3f. Sections objet par `Sequence`: masque 75–125f; objet horizontal 125–175f; silhouette verticale 175–225f; paire circulaire 225–275f; lames symétriques 275–375f; couteau courbe 375–473f. Pour chaque objet, entrée `scale .88→1` sur 8f, rotation de 2–4° qui se stabilise, shift RGB sur les seules coupes. Pas de scintillement continu ni de clignotement rapide.\n\n**HyperFrames :** créer un clip HTML/SVG par famille d’objet; timeline GSAP pausée, coupures vers 0, 3, 5, 7, 9, 11 et 15s. Appliquer le `filter` coloré à des doubles de silhouettes décalés de quelques pixels et visibles seulement pendant la transition; animer le couteau via rotation/teinte depuis la frame courante. Chaque recherche temporelle doit produire la même image.\n\n### Validation\n\nComparer les vignettes 0–18 s aux beats ci-dessus; inspecter chaque cut et limiter le glitch à des accents courts. Contrôler 474 images, contour lisible sur noir, sécurité des formes et absence de clignotement photosensible.\n\n**Droits et fidélité :** cette vidéo est une prévisualisation la référence. Les droits de réutilisation de ses images, objets, illustrations, marques, musique et fichiers source ne sont pas établis par le téléchargement. Recréer la grammaire d’animation avec des assets autorisés; ne pas réutiliser le watermark ni les éléments protégés sans licence vérifiée.",
    "checks": [
      "Créer des objets originaux abstraits aux contours épais, avec dégradés chauds et froids. Pour éviter les armes réalistes, substituer les silhouettes de pistolet et de lame par des formes géométriques futuristes non fonctionnelles. Prévoir une lumière de contour et un fond noir propre."
    ]
  },
  {
    "key": "comic-dynamite-arrows-action-overlays",
    "title": "Flèches BD et impacts sur footage d’action",
    "summary": "Flèches comics rouges, éclats d'impact et démonstrations sur images d'action.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 14.9,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:02",
        "description": "Carte cyan « Dynamite arrows » avec assortiment de flèches rouges et éclats BD jaunes/gris."
      },
      {
        "at": "00:03–00:04",
        "description": "Performeur en tenue rouge face à un public, flèche horizontale rouge bord noir, puis explosion comic à impact."
      },
      {
        "at": "00:05–00:08",
        "description": "Vue aérienne de terrain rocheux/action hors route, flèche courbe rouge puis impact explosif."
      },
      {
        "at": "00:09–00:11",
        "description": "Piste de course, grande flèche courbée rouge qui pointe un virage; petits débris ponctuent l’animation."
      },
      {
        "at": "00:12–00:14.867",
        "description": "Cycliste/motocycliste sur chemin poussiéreux, flèche rouge verticale/ondulée, puis éclat de mouvement."
      }
    ],
    "prompt": "Créer une démonstration de 14,87 secondes, 16:9, 30 i/s pour un pack original de flèches cartoon. Commencer par une planche cyan d’échantillons : flèches rouges épaisses à contour noir et petites étoiles/explosions. Montrer ensuite des plans d’action autorisés : performance devant public, terrain hors route, virage de circuit puis vélo en chemin forestier. Sur chaque plan, faire apparaître une flèche qui indique précisément un endroit du cadre; couper vers un petit burst BD jaune et gris au moment de l’impact, puis laisser quelques fragments retomber. Le mouvement doit illustrer l’action, sans cacher les personnes ni donner une fausse instruction de sécurité. Redessiner les assets vectoriels, garder les rushes réels visibles, sans filigrane, marque de véhicule ou copie du set de référence.",
    "recipe": "### Reproduction\n\nDessiner un set de flèches vectorielles rouge primaire à double contour noir et highlights blancs; inclure flèches droites, courbes, en tire-bouchon et verticales; explosions en jaune pâle, gris et contours noirs. Remplacer les rushes par du footage de sport autorisé ou conçu spécialement.\n\n**Remotion :** 446f à 30 i/s. Carte titre 0–74f; démo 1 75–149f, démo 2 150–254f, démo 3 255–359f, démo 4 360–445f. Chaque flèche entre via path SVG tracé ou translation + scale 0.86→1 sur 10f, possède un point de visée édité dans le plan. Burst d’impact dans 8–12f, puis disparition en fragments dessinés (positions fixes). Les rushes demeurent visibles et ne sont pas masqués plus longtemps que nécessaire.\n\n**HyperFrames :** clips action et overlays SVG synchronisés dans les mêmes scènes, timeline GSAP pausée. Anime `x/y/rotation` aux coordonnées repères, local frame pour chaque clip, burst en une série de 3 keyframes et fade-out. Ne pas appliquer les flèches comme autosuivi supposé d’un sujet mobile.\n\n### Validation\n\nComparer la pointe de flèche et la cible aux temps 3–4, 5–8, 9–11, 12–14; vérifier chaque overlay frame à frame sur le footage, contraste et absence de clignotement/obstruction. Contrôler 446f et les droits de chaque plan.",
    "checks": [
      "Dessiner un set de flèches vectorielles rouge primaire à double contour noir et highlights blancs; inclure flèches droites, courbes, en tire-bouchon et verticales; explosions en jaune pâle, gris et contours noirs. Remplacer les rushes par du footage de sport autorisé ou conçu spécialement."
    ]
  },
  {
    "key": "creator-follow-social-lowerthirds",
    "title": "Cartouches « suivre » pour créateur",
    "summary": "Lower-thirds de créateur avec badge avatar et languette sociale.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 49.9,
    "fps": 30,
    "palette": [],
    "beats": [],
    "prompt": "Fabrique un pack original de lower-thirds pour réseaux sociaux, 16:9, environ 49,94 s à 30 i/s. Le motif associe un badge carré coloré destiné à un avatar et un ruban horizontal à deux niveaux, avec une petite languette contrastée pour un CTA court. Utilise une palette jaune, bleu, blanc et magenta réinterprétée, formes et fontes originales. Anime le badge par une entrée douce depuis le bas, déploie le ruban avec un masque horizontal, puis affiche un CTA de type “Suivre” ou “S’abonner”. Présente différentes largeurs et thèmes entre 0 et 40 s, puis tiens les derniers exemples jusqu’à la fin. Le damier éventuel est uniquement un arrière-plan de contrôle et ne remplace pas la transparence réelle. Aucun logo, handle, police ni dessin extrait de la référence.",
    "recipe": "### Recette Remotion et HyperFrames\n\nConstruire une carte `SocialLowerThird` paramétrée par `avatar`, `handle`, `cta`, `theme`. Le badge carré se révèle par scale doux; le ruban s’étend horizontalement par `clipPath`, puis l’onglet coloré entre avec un léger décalage. Garder `handle` et CTA dans une zone de sécurité 16:9. Le damier de preview ne doit jamais être interprété comme canal alpha.\n\n**Remotion :** 30 fps × 49,94 s ≈ 1498 images, durée source 1497 images. Une séquence de démonstration data-driven décline les thèmes et textes fictifs. `interpolate` borné, avec hold stable; vérifier alpha au codec cible si livraison transparente.\n\n**HyperFrames :** couches SVG, reveal par masque et timeline GSAP pausée, labels `intro`, `cta-1`…`cta-4`. Scrub exact par index d’image, sans autoplay; utiliser un vrai fond uni de contrôle pour déceler les faux damiers.\n\n### Contrôles & limites\n\nComparer les instants 0, 5, 15, 28, 40 et 49,5 s. Vérifier la séparation badge/ruban, l’alpha réellement exporté, la lisibilité des CTA et le respect des safe zones. Les transitions internes exactes sont estimées à partir des échantillons seconde par seconde.",
    "checks": [
      "Comparer les instants 0, 5, 15, 28, 40 et 49,5 s. Vérifier la séparation badge/ruban, l’alpha réellement exporté, la lisibilité des CTA et le respect des safe zones. Les transitions internes exactes sont estimées à partir des échantillons seconde par seconde."
    ]
  },
  {
    "key": "creator-social-cta-bars",
    "title": "Boutons CTA sociaux de créateur",
    "summary": "Un pack de boutons et cartouches CTA sociaux multicolores.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 40.3,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Entrée dans une scène lifestyle; premiers callouts apparaissent près du sujet."
      },
      {
        "at": "4–14 s",
        "description": "Démonstration de plusieurs CTA individuels, avec changements de couleur, pictogramme et libellé."
      },
      {
        "at": "14–25 s",
        "description": "Alternance de placements sur des scènes et de séquences plus propres montrant le bouton seul."
      },
      {
        "at": "25–34 s",
        "description": "Nouvelle série de variantes d’action/interaction (suivre, envoyer, enregistrer, achat), parfois sous forme de badge compact."
      },
      {
        "at": "34–40,34 s",
        "description": "Carte sombre de présentation des variantes, derniers éléments du kit et sortie."
      }
    ],
    "prompt": "Crée une démonstration 16:9 de 40,34 secondes à 30 images/s pour une collection originale de call-to-action destinée à un créateur. Montrer des rushes lifestyle autorisés avec différents appels courts tels que “Suivre”, “S’abonner”, “Enregistrer”, “Partager” ou “Voir l’offre”. Construire des capsules et petits panneaux arrondis à couleurs franches, icônes simples dessinées pour ce projet, texte très lisible et contraste WCAG raisonnable. De 0–14 s, introduire plusieurs boutons sur l’image; de 14–25 s, alterner superpositions et présentations seules; de 25–34 s, exposer les variantes d’action; de 34–40,34 s, finir par une planche synthétique sur fond sombre. Chaque apparition fait un pop sobre en 8–12 images et se retire proprement. Ne pas reprendre de logo, visage, libellé commercial distinctif, asset ou musique de la preview.",
    "recipe": "### Reproduction technique\n\nDéfinir une grammaire de bouton : icône vectorielle simple à gauche, libellé court, capsule ou rectangle arrondi, contour/ombre légère. Entrée par scale 0,92→1 et décalage vertical de 12 px sur 8–12 images; éventuel petit rebond amorti. Sortie par réduction/translation sur 6 images. Prévoir versions clair/sombre et taille lisible sur mobile.\n\n**Remotion :** composition 30 fps, 1210 images pour arrondir le contenu à 40,33 s (ou 1208 exactement en fixant la durée source). Données CTA sous forme d’objets; `<Sequence>` autour de chaque apparition, `spring` ou interpolation bornée. Icônes dessinées localement en SVG; textes configurables.\n\n**HyperFrames :** SVG/HTML superposés aux scènes, GSAP timeline pausée avec labels aux timecodes du tableau. Désactiver le ticker; caler les scènes et callouts sur une horloge de frames. Les états de bouton doivent rester identiques après seeking aller-retour.\n\n### Validation / limites\n\nRendre et comparer à 0, 4, 14, 25, 34 et 40 s; contrôler lisibilité à l’échelle mobile, emplacements sans visage recouvert et états de sortie. Les timecodes décrivent les grandes phases observées; pas d’analyse audio ou frame par frame de chaque micro-transition.",
    "checks": [
      "Définir une grammaire de bouton : icône vectorielle simple à gauche, libellé court, capsule ou rectangle arrondi, contour/ombre légère. Entrée par scale 0,92→1 et décalage vertical de 12 px sur 8–12 images; éventuel petit rebond amorti. Sortie par réduction/translation sur 6 images. Prévoir versions clair/sombre et taille lisible sur mobile."
    ]
  },
  {
    "key": "cyber-monday-retro-sale-motion-kit",
    "title": "Kit motion promo Cyber Monday rétro",
    "summary": "Promo de soldes maximaliste, accessoires détourés et maquettes de vitrine.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 26.5,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:02",
        "description": "Couverture pop violette/jaune dense, lettres géantes Cyber Monday, autocollants donuts, sac, typewriter, ticket et objets qui volent."
      },
      {
        "at": "00:03–00:06",
        "description": "Série de présentations individuelles sur fonds rose puis rouge : écran de vente/commerce, cubes et étiquettes/cartes."
      },
      {
        "at": "00:07–00:09",
        "description": "Fond cyan; objet rétro (téléviseur) et logo/titre en sticker."
      },
      {
        "at": "00:10–00:14",
        "description": "Footage de magasin avec mains sur cintres; grand titre violet Cyber Monday, spirales jaunes et pastille Buy Now."
      },
      {
        "at": "00:15–00:19",
        "description": "Fond violet; machine à écrire, donut et sac affichés, objets tournant pour révéler leurs faces."
      },
      {
        "at": "00:20–00:21",
        "description": "Carte magenta de remise/lettres volumétriques sur rayons de vitesse."
      },
      {
        "at": "00:22–00:26.467",
        "description": "Maquettes de vitrines e-commerce sur fond néon, cartes remise et CTA."
      }
    ],
    "prompt": "Produire un spot e-commerce rétro maximaliste de 26,47 secondes en 16:9, 30 i/s. Ouvrir sur une couverture violette avec rayons jaune vif, headline éditable Cyber Monday et un collage original de donut, sac, ticket et machine à écrire. Faire ensuite défiler des cartes produit isolées sur fond rose, rouge et cyan, puis afficher le titre au-dessus d’un vrai plan retail autorisé. Présenter quelques objets 3D génériques sur violet avec une rotation courte et lisible, revenir sur une carte promotionnelle, finir sur plusieurs maquettes de storefront avec emplacement de remise, étiquette et bouton CTA. Couleurs saturées, contours sticker épais, perspective de type papier et rythme par petites entrées élastiques, avec holds lisibles entre les changements. Utiliser uniquement prix, pourcentages et urgence validés par le brief. Illustrations et maquettes neuves, sans logo, marque, source frame, watermark ni allégation fictive.",
    "recipe": "### Recette pour les moteurs\n\nAssets : formes 3D originales de donut, sac, machine à écrire et TV; typo éditable avec licence; footage retail autorisé ou rendu original; maquettes remplaçables et offre sourcée.\n\n**Remotion :** 794f à 30 i/s, séquences aux environs de 0, 3, 7, 10, 15, 20 et 22s. Cover : entrées en spring bornées à 12–18f et rotations de ±8°, densité fixée. Présentations solo : turntable déterministe (angle dérivé de frame) sur couleur pleine. Magasin : footage sous calque typographique avec contraste contrôlé et CTA fixe. Maquettes finales : translation douce 8–12f, hold 2,5s. Aucun chiffre de promotion n’est rendu sans valeur du brief.\n\n**HyperFrames :** diviser en clips déclaratifs, conserver la timeline pausée; animations objets via `rotationY` interpolée, `scale` et `y`; gérer les lettres avec `clip-path` ou translation au lieu d’une simulation d’édition variable. Vidéo retail en couche basse entre 10–15s. Les scènes 20 et 22s sont composées de SVG/cards séparés pour permettre la reprise.\n\n### Validation\n\nComparer à 0, 3, 7, 10, 15, 20, 22 et 26s; relire toute offre à l’écran, examiner l’intégralité du rendu et son audio séparément. Contrôler 794 frames, lisibilité et droits musique/footage/police.",
    "checks": [
      "Comparer à 0, 3, 7, 10, 15, 20, 22 et 26s; relire toute offre à l’écran, examiner l’intégralité du rendu et son audio séparément. Contrôler 794 frames, lisibilité et droits musique/footage/police."
    ]
  },
  {
    "key": "fashion-eyewear-sticker-overlay-showcase",
    "title": "Stickers lunettes sur portraits mode",
    "summary": "Surimpressions de lunettes sur mannequins et carton final en planche produit.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 20,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:03",
        "description": "Deux modèles en tenues crème dans un paysage désertique; des stickers lunettes colorés sont placés sur leurs yeux."
      },
      {
        "at": "00:04–00:06",
        "description": "Coupe vers une personne de profil près de l’eau, lunettes jaune-rouge superposées."
      },
      {
        "at": "00:07–00:09",
        "description": "Portrait d’une femme debout dans le désert, différentes lunettes rondes et lunettes à motifs."
      },
      {
        "at": "00:10–00:12",
        "description": "Groupe de modèles assis/debout dans l’herbe, plusieurs overlays eyewear."
      },
      {
        "at": "00:13",
        "description": "Transition floue vers une grille de modèles de lunettes détourés."
      },
      {
        "at": "00:14–00:19, fin 20,033 s",
        "description": "Planche catalogue de six styles, deux rangées, fond issu du footage flouté."
      }
    ],
    "prompt": "Créer une présentation mode de 20,03 secondes en 16:9, 30 i/s pour une collection originale de lunettes fantaisie. Montrer successivement deux modèles en vêtements neutres dans un paysage sec, un portrait de profil au bord de l’eau, une personne seule sur fond de dunes puis un petit groupe dans une prairie. Sur chaque visage, superposer proprement des stickers dessinés de lunettes aux yeux : modèles blancs à cercles concentriques, montures rouges géométriques, ronds bleu-jaune et montures vertes. Les lunettes suivent les points des yeux, gardent la bonne échelle et ne glissent pas lors des petits mouvements de tête. À environ 13 secondes, transformer le dernier portrait en fond doux flouté puis présenter une grille nette de six designs, deux rangées. Couleurs crème, terre, vert et accents pop. Utiliser des portraits autorisés et des dessins neufs; ne pas inventer de technologie de tracking dans la livraison.",
    "recipe": "### Recette de reconstruction\n\nPrendre des portraits dont les droits de diffusion et model releases sont vérifiés. Dessiner 6 styles de lunettes vectorielles avec aplats vifs, contours épais, reflets stylisés et quelques motifs d’yeux. Pour rester seekable sans tracking AI caché, ajouter des points d’ancrage yeux édités à la main par plan; interpoler seulement entre frames repères contrôlées.\n\n**Remotion :** 601f à 30 i/s. Organiser quatre clips vidéo (0–120f, 120–210f, 210–300f, 300–390f), chacun avec overlays SVG reliés aux coordonnées d’yeux normalisées; correction manuelle au besoin toutes les 6–10f si tête mobile. À 390f, flou de fond 12f, puis planche d’icônes 420–600f; faire entrer les lunettes par pop de 8f. Utiliser `interpolate` à partir de frames, pas une API de suivi temps réel.\n\n**HyperFrames :** quatre médias vidéo sous calques SVG, ancres exprimées en pourcentage du cadre. Définir keyframes aux timecodes de plans et interpoler les offsets dans la timeline pausée. Passage de 13 s vers la planche par blur/opacity sur 0,4 s, puis grille statique. Aucun autoplay ou tracker non déterministe.\n\n### Validation\n\nContrôler les positions des lunettes aux temps 0–3, 4–6, 7–9 et 10–12; examiner les points d’ancrage sur les mouvements intermédiaires. Vérifier la transition autour de 13s, la planche finale, 601 images et les autorisations des personnes.",
    "checks": [
      "Contrôler les positions des lunettes aux temps 0–3, 4–6, 7–9 et 10–12; examiner les points d’ancrage sur les mouvements intermédiaires. Vérifier la transition autour de 13s, la planche finale, 601 images et les autorisations des personnes."
    ]
  },
  {
    "key": "fashion-grunge-lowerthirds",
    "title": "Lower-thirds mode grunge",
    "summary": "Un pack de lower-thirds mode à textures grunge, tampons et accents néon.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": null,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–9 s",
        "description": "Installation sur portraits avec titre éditorial, premier accent coloré et textures imprimées."
      },
      {
        "at": "9–22 s",
        "description": "Alternance de bandeaux magenta/jaune/vert, textes courts et icône/stamp; images de modèles."
      },
      {
        "at": "22–36 s",
        "description": "Série de portraits et layouts avec morceaux de texture noire, barres colorées et titres décalés."
      },
      {
        "at": "36–50 s",
        "description": "Variantes typographiques/positionnelles, accents en collage et découpe; le regard reste d’abord sur le sujet."
      },
      {
        "at": "50–61 s",
        "description": "Plus d’exemples du kit, incluant certains éléments présentés comme assets."
      },
      {
        "at": "61–67 s",
        "description": "Planche/fin du preview sur les composants."
      }
    ],
    "prompt": "Réalise une vidéo 16:9 de 67 s, 30 images/s, présentant un système original de titrage pour mode éditorial. Alterne portraits autorisés et titres condensés, barres découpées, petits tampons graphiques et textures d’impression noire. Emploie une palette de magenta, jaune et vert acide, avec du grain fin et des décalages de calques très légers. De 0–22 s, établir trois layouts; de 22–50 s, les décliner sur de nouveaux portraits et varier l’emplacement; de 50–61 s, montrer les détails graphiques; de 61–67 s, disposer plusieurs éléments ensemble en fin de preview. Faire entrer les bandeaux en wipe de 6–9 images, sans obstruer visage ou regard. Créer tous les textes, textures, images et icônes pour ce projet; aucune reprise de logo, footage, watermark ou graphisme exact d’une banque.",
    "recipe": "### Reproduction\n\nComposer des bandeaux en calques : cartouche principal, marque secondaire façon tampon, accent géométrique et texture alpha originale. Le mouvement combine reveal en wipe et décalage à deux vitesses de 6–9 images; bruit/grain fixe en seed pour éviter le scintillement. Les portraits doivent provenir d’assets autorisés.\n\n**Remotion :** 2010 images à 30 fps; `Sequence` par exemple et composant `FashionTitle` aux props configurables. Utiliser masque SVG, translation contrôlée et hold; images de texture en `staticFile`. Toute texture animée doit dériver du frame déterministiquement.\n\n**HyperFrames :** calques SVG/HTML, `gsap.timeline({paused:true})`, sous-timelines pour entrée, hold, sortie; seek explicite au frame/30. Prévisualiser sur les mêmes portraits exportés pour éviter une différence de recadrage navigateur.\n\n### Contrôle\n\nComparer 0, 9, 22, 36, 50, 61 et 66 s; valider la tenue des sujets, lisibilité et rendu des masques. Les timecodes sont des regroupements d’échantillons à 1 fps, pas le relevé de chaque coupe. Audio non étudié.",
    "checks": [
      "Composer des bandeaux en calques : cartouche principal, marque secondaire façon tampon, accent géométrique et texture alpha originale. Le mouvement combine reveal en wipe et décalage à deux vitesses de 6–9 images; bruit/grain fixe en seed pour éviter le scintillement. Les portraits doivent provenir d’assets autorisés."
    ]
  },
  {
    "key": "fashion-smoke-transition-overlay-demo",
    "title": "Démonstration de transitions fumée sur montage mode",
    "summary": "Montage mode et action sombre démontrant des transitions de fumée volumineuse.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": null,
    "durationSeconds": 15.5,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:01",
        "description": "Silhouette mode en environnement brumeux sombre."
      },
      {
        "at": "00:02",
        "description": "Transition sur grande forme de fumée gris clair en plein écran."
      },
      {
        "at": "00:03–00:05",
        "description": "Deux modèles en noir contre mur texturé; fragments/voile fumé au raccord."
      },
      {
        "at": "00:06–00:07",
        "description": "Voiture en drift ou virage serré; fumée orange derrière, overlay clair de transition."
      },
      {
        "at": "00:08",
        "description": "Écran rempli de smoke matte/gris, nouveau raccord."
      },
      {
        "at": "00:09",
        "description": "Trois modèles assis dans un espace industriel sombre."
      },
      {
        "at": "00:10–00:12",
        "description": "Entrepôt vide en plan large, respiration de lumière naturelle."
      },
      {
        "at": "00:13",
        "description": "Transition fumée gris clair."
      },
      {
        "at": "00:14–15,458 s",
        "description": "Personne en noir qui bouge dans un gym/warehouse obscur."
      }
    ],
    "prompt": "Créer une démo de transitions de 15,46 secondes, 1920×1080, 24 i/s pour un kit de fumée. Monter des plans autorisés en progression : silhouette de mode en brume noire, duo devant un mur brut, voiture en mouvement avec fumée orange, trois modèles assis dans un espace sombre, entrepôt vide, puis performeur en vêtement noir. À chaque changement de lieu, laisser un panache volumétrique traverser l’écran, couvrir brièvement l’image et découvrir le plan suivant. Fumée blanche/gris clair pour les transitions mode et warehouse; accent orange uniquement sur la séquence automobile. Donner aux plans une gradation sombre et cinématique avec noirs détaillés. Créer overlays séparés et contrôlables, sans utiliser les images commerciales ou leurs personnes; s’assurer de l’alpha, ne pas laisser de flashs agressifs, et tenir compte de la musique uniquement si ses droits sont établis.",
    "recipe": "### Réalisation\n\nSe procurer des overlays de fumée sous licence, idéalement ProRes 4444/WebM alpha vérifié, ou créer des mattes volumétriques et les pré-rendre. Utiliser de la fumée comme pont visuel qui masque une coupe, pas comme couverture permanente. Flashes plein cadre à vérifier contre l’accessibilité photosensible.\n\n**Remotion :** 371f à 24 i/s. Importer 5 clips réels/licenciés dans les fenêtres ci-dessus et 3 transitions smoke. Les cuts vers f≈48, 144, 192 et 312f se font sous un overlay pré-rendu d’environ 8–14f qui monte en opacité puis s’éclaircit. Décaler teinte fumée vers orange uniquement au drift; garder la fumée grise ou blanche sur les autres scènes. Utiliser `OffthreadVideo` pour sources, transitions locales seekables et audio sur piste distincte. Pas de faux footage.\n\n**HyperFrames :** organiser vidéo réelle et fumée en clips qui se chevauchent, data-start/duration et z-order déclaratifs; timeline GSAP pausée. Les couches fuma sont seekées au même frame que le média inférieur, et tests d’alpha faits sur fond noir/blanc. Pas de transparence simulée si le codec n’en porte pas.\n\n### Validation\n\nVisionner toutes les 371 frames au rythme normal avec le son, examiner spécifiquement 2, 6–8 et 13s; vérifier l’alpha sur deux fonds, raccords sans frame blanche accidentelle, droits de footage/audio et fréquence des flashes.",
    "checks": [
      "Visionner toutes les 371 frames au rythme normal avec le son, examiner spécifiquement 2, 6–8 et 13s; vérifier l’alpha sur deux fonds, raccords sans frame blanche accidentelle, droits de footage/audio et fréquence des flashes."
    ]
  },
  {
    "key": "fast-zoom-transitions",
    "title": "Transitions de zoom rapide — reconstruction Remotion / HyperFrames",
    "summary": "Sept transitions zoom rapide par zoom, flou directionnel, chromatisme et rotation contrôlés, dans des timelines Remotion ou HyperFrames seekables.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": null,
    "durationSeconds": 27,
    "fps": 50,
    "palette": [
      "#090B12"
    ],
    "beats": [],
    "prompt": "> Conçois sept transitions de zoom rapides entre deux plans plein écran, chacune de 54 frames à 30 i/s (1,8 s environ). Chaque transition fait sortir le plan A par un zoom avant énergique et révèle le plan B en grand, flou puis net, centré sur le point de raccord. Décline les signatures : (1) halo chaud radial, (2) halo bleu/violet doux, (3) accent chromatique très subtil, (4) vague/anneau radial bleu, (5) translation diagonale avec rotation, (6) smear découpé en bandes, (7) torsion en spirale jusqu’à un tour complet. Garde le sujet principal identifiable et évite les flashes stroboscopiques; les deux plans doivent être fournis par l’utilisateur ou par une source dont les droits sont confirmés. N’utilise pas le footage du tutoriel ou des URL de démonstration sans vérification de licence. Donne une implémentation Remotion frame-driven et une version HyperFrames HTML/GSAP paused avec seekFrame(n), une API de variante 1–7, et des captures des frames 0, 13, 26, 40 et 53 pour chaque transition. Garantit qu’un seek direct et un rendu séquentiel produisent les mêmes images.",
    "recipe": "### Inventaire des vidéos source\n\nArchive la référence; éléments d’analyse sous `/tmp/template-packs/fast-zoom/` uniquement.\n\n**1/1 vidéo réelle couverte.** Le ZIP contient aussi la référence, fork AppleDouble de métadonnées, pas une seconde vidéo. Le tutoriel montre des exemples de plans (marche, modèle, montagne, montgolfière) pour tester les transitions; ils ne sont pas dans les dossiers `Media` vides des sept `.motr`. Le fichier RTF fournit des URL Pexels de référence (couple vers festival de montgolfières, groupe de marcheuses, défilé de mode, montagnes russes); URLs citées uniquement, sans copie ni validation des droits. Le PDF est un guide générique d’installation FCP.\n\n### Analyse timecodée et format\n\nVidéo décodée intégralement, contact sheet à 1 i/s :\n\n- `00:00–00:04` : fenêtre Final Cut, transitions dans le navigateur et montage de deux plans raccordés.\n- `00:04–00:10` : application d’un preset entre deux clips, aperçu d’un zoom flou radial.\n- `00:10–00:17` : comparaison de plans (marche, groupe, scène extérieure); le zoom sert à masquer la coupe et accélérer le rythme.\n- `00:17–00:23` : aperçu d’autres raccords/angles, alternance de flou et changement d’échelle.\n- `00:23–00:27` : aperçu de sortie et fin de la démonstration.\n\nLes `.motr` définissent deux zones nommées `Transition A` et `Transition B`, avec comportements de déplacement en profondeur (`Move`), et certaines variantes ont `Spin` allant jusqu’à 2π rad. Base de temps d’animation 120000 unités/s; clip de transition déclaré 216216/120000 s ≈1,802 s, soit environ 54 frames à 30 i/s. Le projet comporte des couches 3D/replicator Motion; les approximations CSS ci-dessous traduisent l’apparence en scale, translation, blur et rotation, elles ne sont pas un portage 3D exact.\n\n### Catalogue visuel des presets\n\nLes noms des fichiers sont `01.motr`…`07.motr`, avec une vignette `large.png` et `small.png` par preset. Le mouvement est une transition de deux sources: A sort et B entre autour du même instant. L’ordre effectif doit être validé visuellement selon le lecteur, car le format Final Cut peut utiliser des poignées de transition et des états de clip différents.\n\n### Recette Remotion déterministe\n\nPour toute transition, recevoir deux images de l’utilisateur/licenciées, durée 54 frames (30fps), et définir `p` borné entre 0 et 1. Le plan A s’éloigne et s’efface, le plan B arrive du flou vers netteté. Chaque paramètre est une fonction pure de `frame`.\n\n```tsx\nimport {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';\nconst cl = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};\nexport function FastZoom({a, b, variant=1}: {a: string; b: string; variant: number}) {\n const f = useCurrentFrame, duration = 54;\n const p = interpolate(f, [0, duration - 1], [0, 1], cl);\n const outScale = 1 + 1.35 * p, inScale = 2.15 - 1.15 * p;\n const blurIn = interpolate(p, [0.42, 1], [20, 8, 0], cl);\n const spin = variant >= 5 ? 2 * Math.PI * p : 0;\n const opacityA = interpolate(p, [0.46.58, 1], [1, 1, 0, 0], cl);\n const opacityB = interpolate(p, [0.42.58, 1], [0, 0, 1, 1], cl);\n return <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#090b12'}}>\n <Img src={a} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: opacityA, transform: `scale(${outScale}) rotate(${spin * .08}rad)`}} />\n <Img src={b} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: opacityB, filter: `blur(${blurIn}px)`, transform: `scale(${inScale}) rotate(${-spin}rad)`}} />\n </AbsoluteFill>;\n}\n```\n\nAppliquer les différences par preset dans un objet stable : `01` halo chaud; `02` halo bleu; `03` split RGB léger; `04` warp/halo; `05` rotation+translation; `06` masque de bandes; `07` rotation 2π. Limiter les translations/rotations aux paramètres souhaités plutôt que d’empiler aveuglément les couches. Pour le split RGB, générer trois copies avec filtres/couleurs, décalées de 1–3 px au pic, puis revenir à 0 au frame 53.\n\n### Recette HyperFrames / GSAP\n\nTimeline paused, deux éléments de plan identifiés par `data-shot=\"a|b\"`. La progression (`p`) utilise une durée fixe; aucun tween ne démarre depuis l’horloge courante.\n\n```js\nconst fps = 30, frames = 54, seconds = frames / fps;\nconst a = document.querySelector('[data-shot=\"a\"]');\nconst b = document.querySelector('[data-shot=\"b\"]');\nconst tl = gsap.timeline({paused: true});\ntl.fromTo(a, {scale: 1, autoAlpha: 1}, {scale: 2.35, autoAlpha: 0, duration: seconds, ease: 'power2.in'}, 0);\ntl.fromTo(b, {scale: 2.15, filter: 'blur(20px)', autoAlpha: 0},\n {scale: 1, filter: 'blur(0px)', autoAlpha: 1, duration: seconds, ease: 'power2.out'}, 0);\n// Variante torsion: ajouter rotation de B 360deg et de A -30deg sur la même plage.\nfunction seekFrame(frame) { tl.pause.seek(Math.max(0, Math.min(frame, frames - 1)) / fps, false); }\n```\n\nPour `06`, piloter un masque CSS à bandes avec `clip-path`/SVG dont les offsets dépendent de `p`; pour `03`, contrôler trois copies colorées. Vérifier que le moteur HyperFrames conserve son seek hors ordre et que le filtre blur n’est pas dépendant d’une simulation précédente.\n\n### Variantes et paramètres de départ\n\n- Durée : 36–72 frames; défaut 54 à 30 i/s. Calculer la durée depuis les secondes si la cadence change.\n- Zoom : facteur max 1,8–2,4; montée rapide sur les 40 premières frames, stabilisation/prise de netteté dans les 10 dernières.\n- Direction : centre, point focal du sujet, diagonale; éviter de couper visage/objet clé.\n- Overlays : lueur chaude/froide, aberration RGB de 1–3 px, bandes, spirale. Les garder brefs et modérés.\n- Accessibilité : éviter les changements lumineux répétés pleine image, limiter les éclats forts à un seul instant et proposer une version sans flash/rotation.\n\n### Contrôles et limites\n\n- Utiliser deux vraies sources distinctes, tester la jonction et vérifier l’absence de bord vide durant tout le raccord.\n- Inspecter les 54 frames pour détecter un saut, une netteté trop tardive ou un point focal perdu; comparer aussi la transition à vitesse réelle.\n- Les 7 fichiers XML `.motr` et leurs vignettes ont été inspectés; le tutoriel de 26,98 s a été décodé intégralement et observé par images échantillonnées à 1 i/s. L’AAC n’a pas été écouté ni analysé.\n- La recette reprend des mouvements observés et des indications XML mais ne prétend pas restituer les paramètres 3D internes exacts. Les médias d’exemple ne sont pas inclus; droits du pack, des URL Pexels et de toute musique à confirmer.",
    "checks": [
      "Utiliser deux vraies sources distinctes, tester la jonction et vérifier l’absence de bord vide durant tout le raccord.",
      "Inspecter les 54 frames pour détecter un saut, une netteté trop tardive ou un point focal perdu; comparer aussi la transition à vitesse réelle.",
      "Les 7 fichiers XML `.motr` et leurs vignettes ont été inspectés; le tutoriel de 26,98 s a été décodé intégralement et observé par images échantillonnées à 1 i/s. L’AAC n’a pas été écouté ni analysé.",
      "La recette reprend des mouvements observés et des indications XML mais ne prétend pas restituer les paramètres 3D internes exacts. Les médias d’exemple ne sont pas inclus; droits du pack, des URL Pexels et de toute musique à confirmer."
    ]
  },
  {
    "key": "film-damage-scratch-overlays",
    "title": "Overlays de pellicule abîmée",
    "summary": "Une démo d’effets de pellicule abîmée, rayures verticales et brûlures lumineuses.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 29.3,
    "fps": 1,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Mise en place du look pellicule et premiers défauts sur image."
      },
      {
        "at": "4–10 s",
        "description": "Plans de personnes/lifestyle avec poussière, rayures verticales et texture."
      },
      {
        "at": "10–17 s",
        "description": "Variantes plus marquées, light leaks et brûlures colorées au bord du cadre."
      },
      {
        "at": "17–24 s",
        "description": "Alternance de nouveaux plans et intensités d’endommagement; grain/flashs localisés."
      },
      {
        "at": "24–29,30 s",
        "description": "Dernières variations d’overlay, fin du montage."
      }
    ],
    "prompt": "Crée une démo cinématique de 29,30 s, 16:9 à 29,97 i/s, pour des overlays originaux de pellicule vieillie. Superpose à plusieurs rushes autorisés de portraits/vie quotidienne des rayures verticales fines, poussières, petites instabilités de luminance et fuites lumineuses orangées/sépia, parfois colorées. De 0–10 s, garder l’effet subtil; de 10–17 s, exposer une variante plus marquée; de 17–24 s, alterner quelques densités et plans; de 24–29,30 s, terminer sur une dernière texture. Utiliser une graine fixe, mouvement lent et aucun flash violent; préserver la lisibilité et le détail des sujets. N’employer aucun plan ou overlay de la preview.",
    "recipe": "### Recette\n\nGénérer scratches comme SVG/canvas sur seed stable avec distribution contrôlée; poussière en sprites statiques ou déplacement frame-based; light leaks en gradients à évolution lente. Mélanger à faible opacité; périodes brèves d’intensification, pas de flash aveuglant. Inclure toggle “clean” pour comparaison avant/après. Scènes tournées/achetées avec droits explicites.\n\n**Remotion :** 878 images à 30000/1001; overlay `FilmDamage` prend seed, density, scratchColor, leakHue. Hash(index, frame quantifié) évite jitter nondéterministe. Alternance de plans dans `<Sequence>` avec texture inchangée aux cuts si souhaité.\n\n**HyperFrames :** canvas/SVG overlay, GSAP paused; effets basés sur frame absolu/29.97. Les particules sont générées une seule fois avec seed, puis leur position est une fonction pure du frame. Tester export alpha/mode blend réel.\n\n### Validation et limites\n\nExaminer 0,4,10,17,24,29 s; comparer clean/overlay, vérifier absence de flashs excessifs, scintillement de pixel et perte des hautes lumières. Les microvariations d’overlay sont regroupées à partir des échantillons, pas mesurées frame par frame.",
    "checks": [
      "Examiner 0,4,10,17,24,29 s; comparer clean/overlay, vérifier absence de flashs excessifs, scintillement de pixel et perte des hautes lumières. Les microvariations d’overlay sont regroupées à partir des échantillons, pas mesurées frame par frame."
    ]
  },
  {
    "key": "glitch-lower-thirds-library",
    "title": "Bibliothèque de lower thirds glitch",
    "summary": "Vidéo catalogue de lower thirds typographiques à glitch sur plage monochrome.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 64.7,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Fond côtier gris, petits échantillons de barres RGB et gros titre LOWER / RGB THIRDS."
      },
      {
        "at": "4–11 s",
        "description": "Titre se sépare en blocs, apparition de dizaines de presets sur grille/écran, comprenant badges, lignes et variantes glitch."
      },
      {
        "at": "11–19 s",
        "description": "Quelques options sélectionnées seule, puis titres sur fond monochrome avec base colorée, glitch d’entrée/sortie."
      },
      {
        "at": "19–30 s",
        "description": "Défilé de lower thirds à deux lignes, empilées, contenues dans bandes/cartouches; marqueurs latéraux et contours."
      },
      {
        "at": "30–43 s",
        "description": "Suite de variantes blanches/contour, titres qui disparaissent en pixels; fond reste toujours en plan large."
      },
      {
        "at": "43–54 s",
        "description": "Versions à barres horizontales, strips couleur et variantes flottantes; effets RGB plus visibles mais brefs."
      },
      {
        "at": "54–64 s",
        "description": "Cartes en deux/trois niveaux, badges et accent coloré; ralentissement sur layouts lisibles."
      },
      {
        "at": "64–69 s",
        "description": "Derniers presets et sortie vers fond sombre/noir."
      }
    ],
    "prompt": "Crée une démonstration de lower thirds originale de 69 secondes, 16:9, 30 i/s. Commence sur un fond de côte monochrome avec trois bandes RVB et le titre “LOWER THIRDS”. Présente ensuite 8–12 modèles modifiables: bande blanche, capsule, cadre fin, accent de couleur, deux lignes et variantes empilées, chaque preset affiché seul avec les placeholders YOUR TITLE/TEXT ou des textes de démonstration neutres. Anime entrées et sorties par glissements, wipes et glitchs courts de quelques frames; conserve des holds lisibles sur l’arrière-plan monochrome. Augmente puis calme le rythme, termine sobrement par fade au noir. Crée layouts/identité originaux, aucun watermark, police, composition ou preset repris du preview. Tous les titres éditables, safe zones respectées.",
    "recipe": "### Recette moteur\n\nCréer une bibliothèque de 8–12 presets originaux pilotés par un objet (title, subtitle, accent, style, position, in/out). CSS/SVG: bande opaque, stroke, capsule, lower rule, mini-logo abstrait; glitch = déplacement de quelques pixels en tranches de 2–4 images et très faible chromatic aberration.\n\n**Remotion :** 2070 frames/30 fps. `LowerThird` réutilisable, props data-driven; cutaway fond gris stable. `interpolate` et `Sequence` pour démontrer chaque preset en 2–3 s et les holds; safe zones, text fit et entrée/sortie par frame. Variation des propositions déterministe.\n\n**HyperFrames :** un composant DOM par preset, tracks indépendants, timeline paused labels 0,4,11,19,30,43,54,64; GSAP `fromTo` + transforms simples, texte éditable. Seek `tl.time(frame/30,false)`; aucun `setTimeout`/CSS animation autonome.\n\n### Validation / limites\n\nComparer les repères 0,4,11,19,30,43,54,64,68 s; chaque transition doit laisser texte lisible, aucune collision ni titre hors cadre. Source muette. La quantité exacte des presets source n’est pas inférée; cette recette propose une bibliothèque originale et paramétrable plutôt qu’un inventaire juridique/asset exact.",
    "checks": [
      "Comparer les repères 0,4,11,19,30,43,54,64,68 s; chaque transition doit laisser texte lisible, aucune collision ni titre hors cadre. Source muette. La quantité exacte des presets source n’est pas inférée; cette recette propose une bibliothèque originale et paramétrable plutôt qu’un inventaire juridique/asset exact."
    ]
  },
  {
    "key": "grunge-brush-social-lowerthirds",
    "title": "Lower-thirds sociaux brush grunge",
    "summary": "Lower-thirds sociaux noirs et jaunes à bords brush/grunge.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 32.4,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–5 s",
        "description": "Premiers cartouches jaune/noir entrent, bande grunge horizontale et texte en capitales."
      },
      {
        "at": "5–12 s",
        "description": "Différentes proportions/longueurs de bandeau, apparition de mots et petits accents graphiques."
      },
      {
        "at": "12–21 s",
        "description": "Variantes de lower-third, formes de brosse irrégulières et combinaisons noir sur jaune."
      },
      {
        "at": "21–28 s",
        "description": "Derniers layouts, présentés puis maintenus."
      },
      {
        "at": "28–32,36 s",
        "description": "Planche/variantes finales et fin de preview."
      }
    ],
    "prompt": "Crée une démo 16:9 de 32,36 secondes à 24 i/s pour une collection originale de lower-thirds grunge. Utilise des panneaux jaunes et noirs, contours de pinceau irréguliers, titres en capitales lisibles et quelques formes d’accent. De 0–5 s, introduis un premier ruban; de 5–21 s, présente plusieurs tailles et compositions; de 21–28 s, montre les layouts restants; de 28–32,36 s, rassemble les éléments dans une planche de fin. Révèle chaque panneau par wipe, décalage léger puis stabilisation; texture fixe et maîtrisée. Aucun texte, marque, forme, asset ou musique repris de la source commerciale.",
    "recipe": "### Construction\n\nDessiner brush strokes en SVG ou masque bruité fixe, utiliser le masque pour révéler le panneau et le texte. Palette jaune chaud et charbon, marge intérieure généreuse; entrée courte au wipe, léger décalage vertical et settle. Prévoir une option sans texture pour petit écran.\n\n**Remotion :** 24 fps, 776 images. `BrushBanner` SVG paramétré et clips textuels; reveal borné par `interpolate`. Les coordonnées du texte sont basées sur le bounding box final du masque.\n\n**HyperFrames :** SVG path et DOM text; GSAP timeline paused, labels 0,5,12,21,28. `seek(frame/24)` avec état absolu; comparer la capture du navigateur et l’export.\n\n### QA / limites\n\nComparer 0,5,12,21,28 et 32 s; contrôler contours non pulsants, lisibilité, absence de collision avec titres futurs. Repères macroscopiques à partir de la planche; pas de mesure des micro-transitions.",
    "checks": [
      "Comparer 0,5,12,21,28 et 32 s; contrôler contours non pulsants, lisibilité, absence de collision avec titres futurs. Repères macroscopiques à partir de la planche; pas de mesure des micro-transitions."
    ]
  },
  {
    "key": "halftone-cutout-mouths-and-hands",
    "title": "Bouches et mains en collage halftone",
    "summary": "Aperçus de collage monochrome en trame de demi-teintes : bouches et mains.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": null,
    "durationSeconds": 8.4,
    "fps": 23,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:02",
        "description": "Planche de bouches et mains découpées en niveaux de gris, avec titre rouge étroit « HALFTONE COLLAGES » et fond quadrillé sombre."
      },
      {
        "at": "00:03",
        "description": "Une bouche ouverte isolée remplace la planche ; grande échelle, fond quadrillé."
      },
      {
        "at": "00:04–00:05",
        "description": "Coupe vers une main pointant, puis une main dressée/poing en gros plan."
      },
      {
        "at": "00:06–00:08, fin à 8,383 s",
        "description": "Deux variations de bouche souriante centrées, avec petits fragments typographiques rouges en périphérie."
      }
    ],
    "prompt": "Créer un aperçu motion design de 8,38 secondes, 1920×1080, environ 23,976 i/s, pour un kit original de collages halftone monochromes. Sur fond ardoise quadrillé, ouvrir avec une planche dense de bouches découpées et de gestes de mains, puis afficher brièvement un titre rouge étroit « HALFTONE COLLAGES ». Enchaîner sur une grande bouche ouverte tramée, une main expressive pointant vers la droite, une main levée, puis deux bouches souriantes en gros plan. Garder les textures noir et blanc, le grain d’impression et les bords papier visibles; rouge uniquement pour de petits accents typographiques. Alterner des coupes franches et de courts pops de 6 à 8 images; stabiliser les formes pendant les holds. Concevoir chaque illustration de zéro, sans tracer les images de référence, sans filigrane, sans texte de marque et sans revendiquer un alpha qui n’a pas été vérifié.",
    "recipe": "### Recette de reconstruction\n\nCréer de nouveaux scans ou illustrations monochromes détourés : 4 à 6 bouches avec expressions distinctes, 3 mains expressives, trame de points visible et contours papier légèrement irréguliers. Utiliser une grille de repérage uniquement comme texture de présentation. Palette : noir charbon, blanc cassé, gris tramé et rouge vif réservé aux titres.\n\n**Remotion :** composition 201 images à 24000/1001, 1920×1080. Scène d’ouverture 0–71f : plusieurs découpes distribuées aux quatre coins avec un titre en capitales compactes. Scène bouche 72–95f : remplacer la planche par une bouche centrée, entrée `scale: .9→1` sur 8f. Main 96–143f : coupe franche sur deux poses consécutives, avec déplacement de 4–8 px et rotation légère sur 6f. Bouches finales 144–200f : deux états alternés, puis arrêt sur image propre. Toute animation se calcule depuis `useCurrentFrame` ; pas de jitter aléatoire.\n\n**HyperFrames :** diviser en clips aux environs de 0, 3, 4, 6 s, déclarer leur début/durée, garder la timeline GSAP en pause et renseigner chaque état par `progress = frame / 23.976`. Utiliser les images SVG/PNG nouvellement créées comme couches; faire les entrées de scale avec `power2.out`, coupe franche aux changements d’expression, jamais d’animation CSS infinie.\n\n### Validation\n\nComparer vers 0, 2, 3, 4, 5, 6, 7 et 8 s : ordre des motifs, échelle, contraste tramé et fond. Confirmer 201 images, le dernier hold, aucune coupe entre états non souhaitée et nouveaux visuels sous licence connue.",
    "checks": [
      "Comparer vers 0, 2, 3, 4, 5, 6, 7 et 8 s : ordre des motifs, échelle, contraste tramé et fond. Confirmer 201 images, le dernier hold, aucune coupe entre états non souhaitée et nouveaux visuels sous licence connue."
    ]
  },
  {
    "key": "halloween-glitch-icon-kit",
    "title": "Halloween glitch icon kit",
    "summary": "Titre d'un pack à glitch pixel néon, grille et échantillons de ressources.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": null,
    "durationSeconds": 25,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:04",
        "description": "Full purple pack-cover collage, orange/yellow title and scattered Halloween icons. — RGB-channel jitter, brief horizontal tearing; title settles."
      },
      {
        "at": "00:05–00:09",
        "description": "Full asset grid with “HAPPY HALLOWEEN” and multiple decorative pieces. — Quick cut to flat preview board; brief glitch pulses."
      },
      {
        "at": "00:10–00:14",
        "description": "Title card with central headline, ghost/pumpkin props and side details. — Glitch transition into a clean hold."
      },
      {
        "at": "00:15–00:19",
        "description": "Repeated layout previews show labels, picture frames and “TRICK OR TREAT”. — Graphic pieces switch in blocks; text remains readable during holds."
      },
      {
        "at": "00:20–00:25",
        "description": "More organized mini-layouts, coffin/pumpkin/skull/labels; ends on asset board. — Fast alternation of two layouts, final freeze."
      }
    ],
    "prompt": null,
    "recipe": "### Build recipe\n\n**Assets:** create original vector Halloween icons and typography; purple background; pixel/scanline texture; yellow-orange accent; glitch displacement map or CSS pseudo-channel layers. No external copyrighted character assets. An asset board should expose each icon as a separate layer so timing can be controlled.\n\n**Remotion:** 600 frames at 24 fps. Construct title/asset-board scenes from SVG icons in a `Sequence`. For each glitch cut, animate `clipPath`/horizontal slices over 4–8 frames, RGB duplicate layers with offsets 0, ±5 px and opacity .35 for at most 3 frames, then resolve to crisp artwork. Stagger icon entrances by 2–4 frames with y offsets 10→0 and scale .88→1 over 8–12f. Hold all type without jitter during readable windows. End with a stable asset grid for at least 90f.\n\n**HyperFrames:** HTML grid of independent SVGs and type nodes, clips at 0, 5, 10, 15, 20 seconds. GSAP paused timeline animates icon scale/rotation and title text; glitch is a short deterministic set of 2–3 `clip-path: inset(...)` slices, not perpetual shake. Define `scrub(frame / 24)` or equivalent seek function; avoid CSS infinite animations.\n\n### Full generation prompt\n\nDesign a 25-second 1920×1080 24 fps promotional animation for an original Halloween icon pack. Use a saturated violet background, handmade orange and lemon-yellow headline type, black-and-orange sticker illustrations (pumpkins, friendly ghosts, bats, candy, potion bottle, coffin-shaped frame and small labels). Start with a dense cover composition, cut to a clean full-pack grid, show a centered “HAPPY HALLOWEEN” title card, then two curated asset boards with replaceable short labels, ending on a neat inventory grid. Use brief 3-frame RGB split and horizontal pixel tearing only at scene changes; keep artwork crisp and text readable in holds. Icons enter with 8–12 frame pop scale and small rotation settle. Supply original editable SVG assets; no copied pack artwork, logos, watermark or exact commercial font.\n\n### Validate\n\nCompare 0–4, 5–9, 10–14, 15–19 and 20–25 s. Check purple/yellow palette, icon density, cut timing, text legibility, glitch duration and final overview. Ensure no high-frequency flashing over 3 Hz; an RGB split must not become a strobe.",
    "checks": []
  },
  {
    "key": "halloween-spooky-lowerthirds",
    "title": "Lower-thirds Halloween illustrés",
    "summary": "Une collection de titres Halloween illustrés avec citrouilles, maison hantée et coups de pinceau.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 110.1,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "0–12 s",
        "description": "Installation du fond de ciel sombre au coucher du soleil, silhouette de maison et premier titre jaune/orange."
      },
      {
        "at": "12–30 s",
        "description": "Exemples de lower-thirds avec bande noire type pinceau et citrouille illustrée."
      },
      {
        "at": "30–50 s",
        "description": "Variantes de placement, échelle et libellés; fond brumeux/ciel conservé."
      },
      {
        "at": "50–72 s",
        "description": "Nouvelle série de citrouilles et de petites silhouettes/ornements, certains éléments tiennent comme planche."
      },
      {
        "at": "72–92 s",
        "description": "Combinaisons de bandeau, titre et décor avec différentes courbes de silhouette."
      },
      {
        "at": "92–104 s",
        "description": "Derniers exemples individuels, répétition de palette et formes saisonnières."
      },
      {
        "at": "104–110,10 s",
        "description": "Compo de fin où plusieurs éléments se réunissent puis tiennent."
      }
    ],
    "prompt": "Crée un pack de lower-thirds Halloween de 110,10 secondes, 16:9 à 25 i/s. Ambiance illustrée et inquiétante mais accessible : ciel de crépuscule nuageux, maison hantée noire en silhouette, citrouilles orange dessinées originalement, bandeaux à texture de pinceau et titres jaune chaud. Entre 0 et 12 s installe le décor et le premier titre; de 12 à 30 s montre des bandeaux avec citrouille; de 30 à 92 s décline plusieurs positions, formes et tailles; de 92 à 104 s présente les dernières options; de 104 à 110,10 s combine plusieurs composants dans un carton final. Garder un titre lisible, décors en arrière-plan peu chargés, animation lente de nuages et entrées rapides des cartouches. Ne pas recopier les illustrations, mots, silhouettes ou musique de la référence; utiliser des textes et graphismes propres au projet.",
    "recipe": "### Recette\n\nDessiner citrouilles et maison en SVG originaux, avec aplats orange/charbon et détails limités. Fond généré en couches (dégradé coucher de soleil, nuages lents, silhouettes), mais titres au premier plan. Bandeau façon pinceau par path SVG et masque; texte en jaune crème avec contraste vérifié. Transition d’exemple en 8–12 images, hold assez long pour la lecture.\n\n**Remotion :** 25 fps, 2751 images. Chaque variante est une entrée data-driven; nuages dérivés du frame et seed stable. `Sequence` couvre les tranches du tableau, avec crossfade doux aux changements.\n\n**HyperFrames :** SVG pour les silhouettes et la citrouille, DOM pour les titres; GSAP paused et labels aux plages indiquées. Utiliser seek absolu sur `frame/25`, vérifier qu’aucun élément ne sort du canvas.\n\n### Contrôle et incertitudes\n\nComparer 0,12,30,50,72,92,104 et 109 s; tester le contraste jaune/ciel, la netteté des contours et les fins de trajectoire. Le preview expose de nombreux exemples répétitifs; la matrice ci-dessus les regroupe, sans prétendre identifier chacune des variantes.",
    "checks": [
      "Comparer 0,12,30,50,72,92,104 et 109 s; tester le contraste jaune/ciel, la netteté des contours et les fins de trajectoire. Le preview expose de nombreux exemples répétitifs; la matrice ci-dessus les regroupe, sans prétendre identifier chacune des variantes."
    ]
  },
  {
    "key": "hand-drawn-doodle-overlay-pack",
    "title": "Bibliothèque de doodles dessinés",
    "summary": "Un aperçu de bibliothèque de doodles jaunes animés sur footage monochrome et couleur.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 23.1,
    "fps": 59,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "« 135 ELEMENTS / hand drawn style » sur plan architectural en plongée; premier cercle/trait apparaît."
      },
      {
        "at": "3–6 s",
        "description": "Doodles jaunes animés par-dessus scènes de rue et panneaux N&B; flèches, boucles, étoiles se dessinent."
      },
      {
        "at": "6–11 s",
        "description": "Montage couleur skate et portraits; gribouillis suivent les gestes, puis texte/chinois en arrière-plan et sujet assis."
      },
      {
        "at": "11–14 s",
        "description": "Coupes rapides portraits/littoral; dernier doodle blanc sur noir avant inventaire."
      },
      {
        "at": "14–18 s",
        "description": "Grandes planches séparées d’icônes : flèches, spirales, cercles, éclairs, cœurs, traits, marqueurs."
      },
      {
        "at": "18–23,09 s",
        "description": "Autres symboles et ponctuation (?! + @ etc.) isolés sur noir; maintien final."
      }
    ],
    "prompt": "Génère une démo 16:9 de 23,09 secondes à 59,94 i/s pour une collection originale de doodles dessinés à la main. Présente un titre simple “135 ELEMENTS” sur une scène urbaine générique, puis de courts plans de rue ou de skate sous licence où quelques traits jaunes suivent les actions : flèches, boucles, éclairs, cercles et étoiles. Après montage, montre sur noir un catalogue lisible de formes isolées en plusieurs planches, et finis par ponctuation. Les lignes doivent s’écrire en 4–12 images, avec irrégularité manuscrite contrôlée et épaisseur stable. Utilise ton propre jeu d’éléments et les images consenties; aucun modèle, graffiti, dessin, vidéo, watermark ou branding du preview. N’affirme pas contenir 135 éléments si le catalogue livré n’en compte pas 135.",
    "recipe": "### Recette\n\nDessiner des paths SVG jaune clair au crayon; chaque élément possède un `pathLength`, time de tracé, début/fin et rotation facultative. Préparer footage monochrome/color séparé, license-check avant tout usage. En mode bibliothèque, rester sur fond noir pour détourage propre.\n\n**Remotion :** 1384 frames à 59,94 (timeline rationnelle); chaque doodle `strokeDashoffset` piloté depuis `frame`, timings décalés selon `startFrame`. Utiliser `Sequence` pour les sections et un dataset d’assets signé/licencié; effet de suivi sur le sujet seulement si tracker disponible et preuve conservée.\n\n**HyperFrames :** DOM absolu + SVG; GSAP paused, labels 0,3,6,11,14,18; anime les paths via `drawSVG` (ou dashoffset) et leur position. `tl.time(frame/(60000/1001),false)` avec durée fractionnaire documentée.\n\n### Contrôle / limites\n\nComparer 0,3,6,11,14,18,22 s; vérifier la progression scène→overlays→catalogue, tracé visible et couleur cohérente. Source a une piste audio non écoutée; aucun calage musique revendiqué. Tracking manuel non vérifié; limité à quelques exemples.",
    "checks": [
      "Comparer 0,3,6,11,14,18,22 s; vérifier la progression scène→overlays→catalogue, tracé visible et couleur cohérente. Source a une piste audio non écoutée; aucun calage musique revendiqué. Tracking manuel non vérifié; limité à quelques exemples."
    ]
  },
  {
    "key": "handpainted-scribble-lowerthirds",
    "title": "Cartouches dessinés à la main",
    "summary": "Cartouches dessinés au pinceau blanc sur papier froissé sombre.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 27.3,
    "fps": 50,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Fond froissé sombre et premiers coups de pinceau blancs, apparition en tracé."
      },
      {
        "at": "4–10 s",
        "description": "Cartouche/slogan court révélé, ligne manuscrite puis texte en capitales."
      },
      {
        "at": "10–18 s",
        "description": "Plusieurs formes de ruban peint et variantes de titres, mouvements latéraux amples."
      },
      {
        "at": "18–24 s",
        "description": "Nouvelles compositions de cartouches et slogans de démo, traits de soulignement et détails."
      },
      {
        "at": "24–27,32 s",
        "description": "Dernier exemple puis tenue/coupe de sortie."
      }
    ],
    "prompt": "Génère un kit vidéo 16:9, 27,32 s à 50 i/s, de lower-thirds originaux dessinés au pinceau. Fond de papier sombre froissé, traits blancs épais et légèrement imparfaits; le geste peint le contour du cartouche, puis le texte arrive quelques images plus tard. Créer plusieurs variantes horizontales, une ligne forte et un petit sous-titre manuscrit, avec un soulignement au pinceau. De 0–10 s, installer le trait et deux premiers exemples; de 10–24 s, montrer différentes silhouettes et formulations fictives; de 24–27,32 s, tenir le dernier dessin puis couper proprement. Garder une texture subtile et un contraste très fort. Ne pas reprendre les slogans lisibles, la texture ou les tracés de la preview; générer la forme et les mots pour cette vidéo.",
    "recipe": "### Construction moteur\n\nCréer les bords avec chemins SVG irréguliers et utiliser `strokeDasharray`/`strokeDashoffset` pour l’écriture du trait; reveal du fond peint via masque. Le texte apparaît après la forme, avec décalage de 2–4 images. Un papier sombre texturé peut être généré depuis un motif original. Mouvement jamais parfaitement mécanique : amplitude basse, easing stable.\n\n**Remotion :** timeline 50 fps, 1366 images. Les chemins sont séquencés par longueurs de trait mesurées; chaque beat dispose de son propre `startFrame`. `interpolate` clipé et holds vérifiés au dernier frame.\n\n**HyperFrames :** paths SVG, DOM texte et surface de papier; GSAP paused, labels aux phases 0,4,10,18,24. `strokeDashoffset` lié explicitement au temps de timeline; aucun repeat autonome.\n\n### QA / réserves\n\nComparer 0, 4, 10, 18, 24 et 27 s; s’assurer que le texte apparaît après la forme, que le tracé ne clignote pas et que la dernière frame ne révèle pas un masque incomplet. Le statut transparent n’est pas confirmé par le preview sur noir.",
    "checks": [
      "Comparer 0, 4, 10, 18, 24 et 27 s; s’assurer que le texte apparaît après la forme, que le tracé ne clignote pas et que la dernière frame ne révèle pas un masque incomplet. Le statut transparent n’est pas confirmé par le preview sur noir."
    ]
  },
  {
    "key": "heatmap-social-media-emoji-stickers",
    "title": "Pack emoji social en rendu flamboyant",
    "summary": "Pack d'émojis sociaux 3D incandescents, grilles de ressources et invitation au téléchargement.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 26,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:02",
        "description": "Titre sur fond de foule/stage très coloré; petites icônes 3D emoji flottent autour."
      },
      {
        "at": "00:03–00:07",
        "description": "Présentations rapprochées : icône cœur/main, geste de la main, formes circulaires, autres stickers, sur des fonds de footage variés."
      },
      {
        "at": "00:08–00:14",
        "description": "Grilles successives de glyphes en rangées, fond sombre puis orangé; objets 3D avec liseré bleu."
      },
      {
        "at": "00:15–00:18",
        "description": "Plan rapproché sur gestes/cœurs et visages emoji."
      },
      {
        "at": "00:19–00:22",
        "description": "Une grille plus large d’icônes sociales est tenue à l’écran."
      },
      {
        "at": "00:23–00:26.04",
        "description": "End card sombre avec « DOWNLOAD NOW », éclat bleu/rose."
      }
    ],
    "prompt": "Créer un aperçu de pack de 26,04 secondes, 16:9, 25 i/s d’icônes sociales originales au volume doux, contour lumineux bleu/orange et ombrage chaud. Démarrer par une couverture « Social reaction stickers » avec une vingtaine d’emplacements uniquement si autant de glyphes originaux sont effectivement fournis. Introduire quelques formes en gros plan : cœur et main, geste de victoire, panier, lecture, localisation et groupe. Réorganiser les mêmes assets en deux planches catalogues bien espacées, puis finir sur un CTA éditable « Download now ». Utiliser un fond sombre ou une image d’ambiance autorisée; donner du relief par scale, rotation lente et ombres douces. Maintenir les objets lisibles, limiter les éclats lumineux à de courts accents, et ne pas copier des logos d’apps, emojis de plateformes, watermark ou scène de foule de l’aperçu.",
    "recipe": "### Recette Remotion/HyperFrames\n\nCréer emojis génériques originaux (panier, lecture, localisation, étoiles, cœurs, groupe, gestes), formes tridimensionnelles ou vectorielles épaissement détourées. Éviter logos d’apps ou emoji propriétaires identifiables.\n\n**Remotion :** 651f à 25 i/s. Cover 0–74f, stickers flottants par translations sur trajectoires fixées; ne pas utiliser de particules aléatoires. Individualiser les actifs 75–199f en plans courts de 20–35f. Grilles 200–374f puis gestes 375–474f puis grille complète 475–549f. CTA 550–650f; révéler lettres par masque sur 12f et tenir 40f. Profondeur simulée par scale et ombre, sans parallaxe non calibrée.\n\n**HyperFrames :** clips de scène aux alentours de 0, 3, 8, 15, 19 et 23s. Construire le catalogue en CSS grid fixe, placer les stickers en couches positionnées, puis timeline GSAP pausée; rotation lente découplée du son et déterministe en temps absolu. Utiliser l’élément de fond uniquement si droits vérifiés.\n\n### Validation\n\nVérifier chaque grille aux timecodes 8–14, 19–22 et la CTA finale; contrôler la vraie quantité d’assets, leur cohérence de rendu et 651 images.",
    "checks": [
      "Vérifier chaque grille aux timecodes 8–14, 19–22 et la CTA finale; contrôler la vraie quantité d’assets, leur cohérence de rendu et 651 images."
    ]
  },
  {
    "key": "lens-flare-cinematic-overlays",
    "title": "Overlays lens flare",
    "summary": "Showcase de dix flares cinématiques.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 51.8,
    "fps": 1,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Titre LENS FLARES et halos colorés sur noir."
      },
      {
        "at": "4–17 s",
        "description": "Flares chauds/froids sur plans de véhicule, conduite et scènes lifestyle."
      },
      {
        "at": "17–21 s",
        "description": "Carton annonçant la galerie de 10 overlays."
      },
      {
        "at": "21–49 s",
        "description": "Galerie des flares 1–10 : halos, streaks, taches, quelques images isolées sur fond noir."
      },
      {
        "at": "49–51,81 s",
        "description": "Carton final de remerciement sur noir."
      }
    ],
    "prompt": "Démo 16:9 de 51,81 s à 29,97 i/s présentant dix effets lens flare originaux. 0–4 s : titre neutre sur halos. 4–17 s : plans autorisés de conduite et lifestyle, flares motivés par une lumière de scène, tons orange/rouge avec quelques cyan. 17–21 s : transition vers galerie. 21–49 s : dix looks numérotés, variations de streak horizontal, disque, tache colorée et petit reflet, affichés lisiblement sur noir. 49–51,81 s : carton de fin original. Contrôler hautes lumières et bloom; ne pas reprendre les plans, design de flare, titre ou musique de la référence.",
    "recipe": "### Recette Remotion + HyperFrames\n\nGénérer les flares en gradients radiaux/linéaires, éléments optiques le long d’un axe et streak contrôlé. Sur rush, positionner près d’une source lumineuse motivée; galerie présente 10 presets originaux. Alpha/compositing doit être vérifié à l’export. Remotion 30000/1001, 1552 images, composants SVG pilotés par temps rationnel. HyperFrames SVG/HTML, GSAP paused avec labels 0/4/17/21/49 s, seek frame*1001/30000, pas d’autoplay.\n\n### Contrôle / limites\n\nComparer 0,4,17,21,25,30,40,49,51 s. Les micro-durées par flare restent approximatives à l’échantillon; vérifier vrai alpha/blend. Audio non analysé; licence inconnue.",
    "checks": [
      "Comparer 0,4,17,21,25,30,40,49,51 s. Les micro-durées par flare restent approximatives à l’échantillon; vérifier vrai alpha/blend. Audio non analysé; licence inconnue."
    ]
  },
  {
    "key": "magic-smoke-revealer-alpha-pack",
    "title": "Pack de révélateurs fumée colorée",
    "summary": "Échantillonneur de révélateurs de fumée colorée et carton final du pack alpha.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 50.8,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:03",
        "description": "Montage titre du pack avec éclats de fumée cyan, violet, vert, orange; mentions « Magic Smoke Revealer Pack »."
      },
      {
        "at": "00:04–00:10",
        "description": "Première fumée bleue/cyan lumineuse apparaît, s’étire horizontalement puis se dissipe sur fond sombre à damier."
      },
      {
        "at": "00:11–00:17",
        "description": "Variante orange chaude, apparition puis diffusion et extinction."
      },
      {
        "at": "00:18–00:24",
        "description": "Fumée verte en masse compacte, expansion plus large, résidu au centre."
      },
      {
        "at": "00:25–00:31",
        "description": "Variante violette/magenta qui gonfle puis se dissipe."
      },
      {
        "at": "00:32–00:37",
        "description": "Nuage orange/rouge, plus lumineux et concentré."
      },
      {
        "at": "00:38–00:43",
        "description": "Fumée bleue saturée, notamment forme horizontale et boucle courbe."
      },
      {
        "at": "00:44–00:50.8",
        "description": "Carton de pack listant « 10 Elements », 1920×1080 et ProRes 4444 + alpha, filigrane de preview encore présent."
      }
    ],
    "prompt": "Créer une présentation de 50,8 secondes en 16:9, 30 i/s pour un pack original de révélateurs de fumée. Ouvrir par un bref montage de quelques panaches cyan, violet, vert et orange, puis annoncer le pack avec une typographie simple sur fond presque noir. Montrer successivement une fumée cyan qui s’allonge, une orange qui s’épanouit, une verte compacte, une magenta large, puis plusieurs formes bleu électrique; chaque effet apparaît au centre, s’étend en volutes, se fragmente et disparaît dans le fond. Garder des fenêtres de noir entre les exemples pour exposer la forme alpha. Terminer par une fiche technique éditable; ne mentionner le nombre d’éléments, résolution ou ProRes alpha que si les exports le prouvent. Utiliser des simulations nouvelles et des bords d’alpha propres, sans watermark ni particules prélevées de la vidéo source.",
    "recipe": "### Recette\n\nProduire dix sources fumée originales (simulations 2D/3D pré-calculées en alpha), couleurs et silhouettes distinctes. Conserver leur alpha prémultiplié/straight explicitement documenté; utiliser checkerboard seulement dans l’outil de contrôle, jamais dans le master.\n\n**Remotion :** 1524f à 30 i/s. Intro multicouleur 0–119f; ensuite jouer 5–6 variations sur des fenêtres d’environ 150f chacune en dissolvant vers le noir. Les autres variantes peuvent être montées en grille ou sélectionnées pour correspondre au brief, mais le compte exact de 10 n’est affiché qu’après livraison de dix fichiers. Lecteur alpha via video/image sequence et `Sequence`; extraction de l’index d’image dépend de la frame locale afin que le rendu soit seekable.\n\n**HyperFrames :** utiliser chaque overlay comme clip vidéo alpha distinct; timeline pausée, début/durée explicite. Le sampler peut afficher un clip après l’autre sur checkerboard de prévisualisation; écrire en configuration de projet que le damier est un outil de vérification et la sortie doit être transparente/noire selon la livraison demandée. Éviter toute reconstruction avec filtres CSS si l’asset alpha existe.\n\n### Validation\n\nExaminer les débuts, expansions, dissipations et frames alpha entre 4–44s; composite chaque élément sur noir, blanc et damier, vérifier absence de halo/frange. N’affirmer ni 10 overlays ni codec/alpha sans vérifier les sources de production.\n\n**Droits et fidélité :** cette vidéo est une prévisualisation la référence. Les droits de réutilisation de ses images, objets, illustrations, marques, musique et fichiers source ne sont pas établis par le téléchargement. Recréer la grammaire d’animation avec des assets autorisés; ne pas réutiliser le watermark ni les éléments protégés sans licence vérifiée.",
    "checks": [
      "Examiner les débuts, expansions, dissipations et frames alpha entre 4–44s; composite chaque élément sur noir, blanc et damier, vérifier absence de halo/frange. N’affirmer ni 10 overlays ni codec/alpha sans vérifier les sources de production."
    ]
  },
  {
    "key": "monochrome-gesture-sticker-catalog",
    "title": "Catalogue de stickers de gestes monochromes",
    "summary": "Catalogue d'autocollants monochromes de mains et de visages expressifs.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": null,
    "durationSeconds": null,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:08",
        "description": "Lèvres et bouche isolées, puis petites illustrations d’araignée et éclats; fond abstrait bleu pétrole, rose et jaune, formes dessinées et filigrane PREVIEW."
      },
      {
        "at": "00:09",
        "description": "Bouche fermée centrée et éclat radial rose."
      },
      {
        "at": "00:10–00:14",
        "description": "Deux mains forment un cœur; les éclaboussures et traits doodle s’ajoutent autour."
      },
      {
        "at": "00:15–00:19",
        "description": "Main isolée en geste vertical, avec traits décoratifs."
      },
      {
        "at": "00:20–00:24",
        "description": "Oreille détourée en vignette de présentation."
      },
      {
        "at": "00:25–00:29",
        "description": "Visage stylisé, œil unique puis traits rayonnants autour de l’œil."
      },
      {
        "at": "00:30–00:31",
        "description": "Fond graphique seul / respiration entre familles."
      },
      {
        "at": "00:32–00:34",
        "description": "Poing fermé au centre, éclats de mouvement."
      },
      {
        "at": "00:35–00:39",
        "description": "Index levé et boucle/spirale jaune dessinée au-dessus."
      },
      {
        "at": "00:40–00:44",
        "description": "Pouce levé, petites formes d’accompagnement."
      },
      {
        "at": "00:45–00:49.96",
        "description": "Mains jointes en prière, puis fin tenue."
      }
    ],
    "prompt": "Créer une vidéo catalogue de 50 secondes, 1920×1080, 24 i/s de gestes humains monochromes découpés sur des formes abstraites en papier. Utiliser une palette de fond bleu pétrole, rose vif et jaune doux, de petites marques dessinées à la main et des silhouettes photo noir et blanc à bord propre. Parcours : bouche ouverte et lèvres, éclat radial, deux mains formant un cœur, une main en geste vertical, une oreille, un visage neutre avec focus sur l’œil et rayons doodle, respiration sur fond seul, poing fermé, index dressé avec spirale, pouce levé, puis mains jointes. Centrer une famille d’asset à la fois, transitionner en coupe ou petit fondu, tenir chaque pose pour lecture. Garder le rendu éditorial ludique et le fond sobre; créer de nouvelles images consenties, aucune imitation de la personne de référence, aucun filigrane ni marque.",
    "recipe": "### Reproduction\n\nAssets originaux de photos sculpturales grayscale détourées, mains avec model releases, oreille et visage non identifiables. Fonds en blobs plats rose/bleu/jaune, doodles séparés en couches. Le contrôle qualité doit enlever filigranes et confirmer droits avant import.\n\n**Remotion :** 1200f à 24 i/s. Une `Sequence` par famille de geste selon les fenêtres ci-dessus; transitions en 6–10f. Les mains/visages entrent par scale .92→1 et translateY 14→0 sur 10f; dessiner les accents avec SVG `strokeDashoffset`. Fond organique construit depuis quelques formes SVG statiques; faible mouvement de position déterministe. Le segment 30–31s reste délibérément aéré. AAC source est exclu du rendu sauf analyse/licence séparée.\n\n**HyperFrames :** médias PNG/SVG placés sur un fond HTML/SVG, scènes starts à 0, 9, 10, 15, 20, 25, 30, 32, 35, 40 et 45 s. Pause GSAP et anime les contours par `strokeDashoffset`, pas de morphing implicite du media. Utiliser timecodes en secondes convertis à frame 24fps pour un seek précis.\n\n### Validation\n\nComparer chaque point de la table à la frame échantillonnée; inspecter 30–32s et les transitions. Vérifier la totalité des 1200 frames. Ne synchroniser à la musique qu’après analyse audio dédiée; conserver un rapport distinct des droits et de l’accessibilité des représentations.",
    "checks": [
      "Assets originaux de photos sculpturales grayscale détourées, mains avec model releases, oreille et visage non identifiables. Fonds en blobs plats rose/bleu/jaune, doodles séparés en couches. Le contrôle qualité doit enlever filigranes et confirmer droits avant import."
    ]
  },
  {
    "key": "paper-lowerthirds-editorial",
    "title": "Lower-thirds en papier éditorial",
    "summary": "Un pack de lower-thirds éditoriaux papier crème, ruban adhésif et typographie sérif.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 44,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "Sujet sur fond rose; deux rubans de papier blancs glissent depuis les côtés."
      },
      {
        "at": "3–6 s",
        "description": "Le grand carton papier se complète en plusieurs parties et révèle le titre de pack."
      },
      {
        "at": "6–15 s",
        "description": "Cartons individuels à bords irréguliers avec tape, d’abord sur un portrait puis sur scène de plage."
      },
      {
        "at": "15–27 s",
        "description": "Le même langage papier se décline sur basket, visage/fleurs et autres cadres lifestyle."
      },
      {
        "at": "27–35 s",
        "description": "Plans marins plus larges et badges plus petits; le titre reste ancré près du bas/côté."
      },
      {
        "at": "35–42 s",
        "description": "Les plans s’effacent au profit d’une planche d’assets : cadres vides, rubans et formes de badge."
      },
      {
        "at": "42–44,04 s",
        "description": "Maintien de la planche et fin du preview."
      }
    ],
    "prompt": "Produis un showcase éditorial 16:9 de 44,04 secondes à 24 images/s pour un système original de lower-thirds en papier. Ouverture rose : deux bandes blanches entrent de côtés opposés et forment un carton crème à bords arrachés; révèle un titre sérif fictif, puis pose du ruban adhésif illustré sur les coins. De 6 à 35 secondes, décline plusieurs cartes et badges papier sur des images originales ou dûment autorisées de portraits, sport et paysages, en remplaçant tout placeholder par un texte éditable. Les éléments glissent de 20 à 40 px, pivotent très légèrement puis restent parfaitement stables pendant la lecture. De 35 à 42 secondes, montre les formes et rubans sur une planche propre; tiens jusqu’à 44,04 secondes. Texture fine, palette crème/beige/rose, contraste suffisant, aucune imitation exacte de la vidéo, des mots, de la fonte ou des personnes de référence. Audio original ou sous licence; si aucun audio vérifié n’est fourni, rendre silencieux.",
    "recipe": "### Déroulé continu\n\nLes frontières de beat sont des repères issus d’échantillons à 1 fps (≈±1 s), pas des coupes mesurées au frame.\n\n### Recette de reproduction\n\n1. Dessiner plusieurs polygones de carte à contour irrégulier mais stable, fond ivoire avec bruit papier basse fréquence.\n2. Fixer chaque carte par une bande de tape beige; les deux éléments arrivent avec translations opposées et une rotation inférieure à 2°.\n3. Révéler le titre par masque après que la carte s’est posée. Garder une ligne principale et éventuellement un sous-titre, avec une fonte sérif sous licence.\n4. Sur les plans, figer la position relative du carton; ne pas couvrir visage, mains ou action. Finir par une grille d’assets isolés.\n\n**Remotion :** composition 1920×1080 à 24 fps et 1057 images. Définir les beats avec des frames entiers, par exemple `startFrame = Math.round(seconds*24)`. Composant `PaperLowerThird` à props `headline`, `subline`, `shapeSeed`, `tapeColor`; SVG `clipPath` et interpolations bornées. Le contenu doit donner exactement la même frame à chaque rendu.\n\n**HyperFrames :** superposer SVG et HTML au média de fond; une GSAP timeline en pause contient les labels `intro`, `portrait`, `sports`, `wide`, `asset-grid`, `end`. Le scrubber pousse explicitement le temps/frame dans la timeline; le ticker ne tourne pas. Prendre une capture après seek avant de chercher toute différence à l’export.\n\n### Validation et limites\n\nRendre les frames 0, 3, 6, 15, 27, 35, 42 et 44, puis regarder le master du début à la fin. Contrôler transitions, safe areas, orthographe, bords du masque, stabilité du carton et transparence réelle uniquement si requise. La description audio et les micro-temps ne sont pas établis.",
    "checks": [
      "1. Dessiner plusieurs polygones de carte à contour irrégulier mais stable, fond ivoire avec bruit papier basse fréquence."
    ]
  },
  {
    "key": "pencil-scribble-doodle-elements",
    "title": "Pencil scribble doodle elements",
    "summary": "Aperçu de ressources au crayon monochrome et révélations dessinées à la main, en séquence.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": null,
    "durationSeconds": 23.7,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:04",
        "description": "Title and crowded sheet of black line doodles on off-white paper. — Loose marks surround title; slight paper grain."
      },
      {
        "at": "00:05–00:08",
        "description": "Large lightning bolt and crown with small banner. — Elements are separated and settle into a sparse catalog arrangement."
      },
      {
        "at": "00:09–00:11",
        "description": "Diamond and striped heart above globe/rainbow/cloud pair. — Direct cut between curated groups."
      },
      {
        "at": "00:12–00:15",
        "description": "Question and exclamation marks; rose and heart. — Individual pair holds on clean paper."
      },
      {
        "at": "00:16–00:19",
        "description": "Crossed symbol/star, then sweeping arrow and circled check. — Pairwise asset showcase."
      },
      {
        "at": "00:20–00:22.5",
        "description": "Spiral sun centered, hand-drawn rays added. — Small central mark expands into completed doodle."
      },
      {
        "at": "00:22.5–23.667",
        "description": "Mostly blank paper / end. — Fade or clear to blank."
      }
    ],
    "prompt": null,
    "recipe": "### Recreate in both engines\n\n**Assets:** original vector path per doodle, uneven stroke widths 3–7 px at 1080p, slightly imperfect rounded joins, off-white paper texture, subtle gray fibers. Keep a master SVG path and no traced source. Avoid excessive motion after a mark is drawn.\n\n**Remotion:** 710 frames at 30 fps. Each icon is SVG with `strokeDasharray` equal to path length. For a 12–18 frame reveal, interpolate `strokeDashoffset` from path length to zero using `Easing.out(Easing.quad)`; fill appears only after the outline finishes. Stagger marks 3–5f. Use scene groups matching the table, crossfade groups in 6–8f and keep background texture static. Every parameter derives from frame.\n\n**HyperFrames:** SVG path layers, each with explicit start and duration. Use GSAP `strokeDashoffset: length → 0`; paused timeline, `ease:\"power2.out\"`, small 0.15s offsets between icons. Register path lengths once and seek to normalized frame time; disable any infinite paper-noise animation.\n\n### Full generation prompt\n\nCreate a 23.67-second 1920×1080, 30 fps motion-graphics catalog of original pencil scribble doodles on lightly textured warm-white paper. Use black hand-drawn outlines with small natural line wobble and varied stroke widths. Start with a crowded sheet around a simple editable “Scribble Elements” title. Then present clear clusters in order: lightning/crown/banner; diamond/heart/rainbow/cloud; question/exclamation/rose/heart; crossed mark/star/arrow/check; a centered spiral sun whose rays draw outward. Draw each contour with visible stroke reveal over 12–18 frames, stagger neighboring marks by 3–5 frames, then hold the finished drawing. Use only simple cuts or short 6–8 frame dissolves between groupings; finish on blank paper. No color, copied illustration, brand, watermark or decorative effect that obscures the hand-drawn strokes.\n\n### Validation\n\nCheck all sequence changes at 4, 8, 11, 15, 19, 20 and 23s; inspect path direction, stroke completion, object spacing and off-white contrast. Confirm end clears cleanly, no incomplete dash remains, and every icon was newly drawn or licensed.",
    "checks": [
      "Check all sequence changes at 4, 8, 11, 15, 19, 20 and 23s; inspect path direction, stroke completion, object spacing and off-white contrast. Confirm end clears cleanly, no incomplete dash remains, and every icon was newly drawn or licensed."
    ]
  },
  {
    "key": "pixel-glitch-lowerthirds",
    "title": "Lower-thirds pixel glitch",
    "summary": "Un pack de lower-thirds à glitch par blocs pixel et bandes néon.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 17.1,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Titre construit par fragments RGB et bandes."
      },
      {
        "at": "4–8 s",
        "description": "Décomposition du lower-third en morceaux."
      },
      {
        "at": "8–13 s",
        "description": "Galerie de plusieurs variantes de bandes et éclats."
      },
      {
        "at": "13–17,08 s",
        "description": "Dernières animations d’éléments, puis fin."
      }
    ],
    "prompt": "Crée 17,08 s de lower-thirds pixel glitch, 16:9 à 24 i/s, sur noir. Titre original composé par blocs vert acide, magenta, jaune, bleu et rouge; 0–4 s reveal, 4–8 s décomposition, 8–13 s galerie, 13–17,08 s derniers éléments et fin propre. Glitch déterministe limité à quelques images; aucun flash blanc ou texte illisible. Dessiner les formes et mots pour ce projet, sans copier la référence.",
    "recipe": "### Recette\n\nBarres alignées sur grille pixel, glitches rares de 2–4 frames; offsets issus d’un hash fixe et non de `Math.random`. Remotion 24 fps/410 frames avec composant SVG piloté par frame. HyperFrames SVG/DOM et GSAP paused, labels aux beats, seek frame/24. Fond noir vu en preview ne prouve pas alpha.\n\n### QA\n\nFrames 0,4,8,13,16,8 s; vérifier lisibilité, flashs et dernier état. Audio non audité, times regroupés.",
    "checks": [
      "Frames 0,4,8,13,16,8 s; vérifier lisibilité, flashs et dernier état. Audio non audité, times regroupés."
    ]
  },
  {
    "key": "retro-cutout-collage-elements-pack",
    "title": "Pack d’éléments collage rétro",
    "summary": "Couverture de collage rétro, catalogue de découpes détourées et reprise finale du collage.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 18,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "00:00",
        "description": "Texture sombre/noire texturée avant la couverture."
      },
      {
        "at": "00:01–00:03",
        "description": "Collage dense autour du titre « Collage elements » : soleil, bouche souriante, lunettes, snack, mains, œil."
      },
      {
        "at": "00:04–00:07",
        "description": "Planche d’objets détourés, notamment cassette, véhicule rétro, papillon, chat, main en geste, fragments de vêtements et éléments graphiques."
      },
      {
        "at": "00:08–00:09",
        "description": "Guitare et mains/bras en compositions séparées."
      },
      {
        "at": "00:10–00:13",
        "description": "Autres découpes: bouche, œil/visage, fruit, pop-corn, tournesol, machine à écrire, jambes et voiture rouge."
      },
      {
        "at": "00:14",
        "description": "Écran sombre presque vide / beat de transition."
      },
      {
        "at": "00:15–00:17, fin 18,04 s",
        "description": "Retour de la couverture collage dense, tenue sur plusieurs secondes."
      }
    ],
    "prompt": "Créer une bande-annonce de 18,04 secondes en 16:9, 25 i/s pour un kit de collages rétro original. Démarrer sur une texture noire, puis construire une couverture sur un fond terracotta autour du titre modifiable « Collage Elements » avec découpes papier : visage/œil, bouche, lunettes, tournesol, snack, guitare, cassette, véhicule ancien, chat, étoile et formes graphiques. Passer à plusieurs planches aérées d’assets sur noir : véhicule et cassette, mains et guitare, visages et nourriture, soleil, machine à écrire et voiture. Insérer une courte respiration sombre, puis ramener la couverture en composition compacte et la tenir jusqu’à la fin. Les cutouts doivent avoir une ombre de papier et contours propres mais manuels, pas de photographies non autorisées, personnages identifiables, logos, watermark ou copie des assets de référence.",
    "recipe": "### Recette\n\nFournir des cutouts originaux ou sous licence (personnes avec autorisation), bord de découpe légèrement irrégulier, ombres papier. Construire une planche catalogue sombre et une scène cover à fond rouge, éléments échelonnés sur plusieurs plans; préserver modularité par fichiers individuels.\n\n**Remotion :** 451f à 25 i/s. Intro sombre 0–24f; composition cover 25–99f avec cinq couches qui rentrent en translation/rotation sur 8–14f; catalogue 100–349f réparti en cinq familles de 50f environ avec coupes nettes; respiration 350–374f; cover finale 375–450f. Ne pas échantillonner ni utiliser le vidéo source en tant que texture. Cadrer les découpes par `AbsoluteFill`, z-index explicite et coordonnées normalisées.\n\n**HyperFrames :** scène cover 1–4s, fiches catalogues à 4, 8, 10s, respiration vers 14s, rappel final 15s. HTML/SVG séparés par image, timeline paused; petits `rotation`/`scale` d’entrée mais arrêt rapide. Le plan final garde le collage stable pour identifier la collection.\n\n### Validation\n\nComparer à 0, 1, 3, 4, 8, 10, 13, 14, 15, 17 s; vérifier ordre des familles, cadence, retour cover et 451 images. Auditer sources, visages, marques et licences.",
    "checks": [
      "Comparer à 0, 1, 3, 4, 8, 10, 13, 14, 15, 17 s; vérifier ordre des familles, cadence, retour cover et 451 images. Auditer sources, visages, marques et licences."
    ]
  },
  {
    "key": "retro-gaming-download-cta",
    "title": "Retro gaming download CTA",
    "summary": "Montage d'autocollants retro-gaming vif et appel à l'action « télécharger ».",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 12,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:03",
        "description": "Busy violet opener, scattered devices/stickers, oversized “1UP” and gamer phrases. — Multiple pieces pop/rotate in; headline scales forward."
      },
      {
        "at": "00:03–00:07",
        "description": "Isolated gaming objects shown one by one on gray/transparent-looking plates. — Fast asset cuts: handheld console, controller, joystick and small device."
      },
      {
        "at": "00:08–00:11.96",
        "description": "Minimal light-gray CTA screen, small green icon and white brush lettering “DOWNLOAD IT NOW!”. — Headline types/reveals in two lines; gaming sticker lands at lower-right."
      }
    ],
    "prompt": null,
    "recipe": "### Production recipe\n\n**Assets:** original flat vector gaming icons, pixel-art mini-icons, broad violet background, lime/pink shadow/accent shapes, marker-like display font with a licensed substitute. Make per-icon SVG with separate outline and fill layers.\n\n**Remotion:** 299 frames at 25 fps. Opener: compose icon layers at fixed normalized coordinates; stagger entries every 3–5f. Use `spring({frame: local, fps, config:{damping:12, stiffness:150}})` for scale 0.7→1 with small rotation ±8°→0; cap overshoot. From frame ~75, isolate each object for 20–30f on a neutral gray plate with 6f cross-cuts. CTA from ~200f: reveal text with a left-to-right clip over 12f, scale .96→1 over 8f, place the small controller sticker at the end; retain 25f CTA hold.\n\n**HyperFrames:** HTML/SVG stickers positioned with percentages; clip starts about 0, 3, 8 seconds. GSAP timeline remains paused, uses explicit per-element `fromTo` for scale/rotation and a clip-path text wipe; finish with a 1s stable CTA. Keep any sprite animation frame-addressable.\n\n### Full generation prompt\n\nCreate an 11.96-second 16:9 retro-gaming sticker-pack promo at 25 fps. Open on saturated electric violet with a scattered composition of original handheld consoles, gamepad, joystick, mouse and pixel icons; add oversized white/lime/pink sticker lettering reading “1UP”, “QUEST ACCEPTED!” and “SAVE • LOAD • REPEAT”. Animate each graphic with short spring-like pops, 6–10° rotation settle and lime offset shadows. Around 3 seconds, present each original generic gaming device individually on a neutral light-gray plate for a quick catalog section. At 8 seconds, cut to a clean pale-gray CTA card, reveal “DOWNLOAD IT NOW!” in bold white brush lettering and place one small controller icon beside the second line. Keep the original vector artwork crisp, high contrast and playful, without copying console trade dress, game characters, brand marks, watermark or source pack art.\n\n### Validation\n\nCompare source at 0, 1, 3, 4, 7, 8, 9 and 11.5 s. Check opener density, four isolated object beats, CTA text order/line breaks and end hold. Confirm export is 299 frames, no asset is mistaken for a real product logo, and no text clips the 16:9 safe area.",
    "checks": [
      "Compare source at 0, 1, 3, 4, 7, 8, 9 and 11.5 s. Check opener density, four isolated object beats, CTA text order/line breaks and end hold. Confirm export is 299 frames, no asset is mistaken for a real product logo, and no text clips the 16:9 safe area."
    ]
  },
  {
    "key": "skate-comic-callouts",
    "title": "Étiquettes sportives façon comic",
    "summary": "Un montage sportif énergique avec étiquettes graphiques déchirées, inspiré.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 28.8,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–5 s",
        "description": "Images sportives rapides; les premiers cartouches contrastés entrent près des sujets, comme des annotations d’action."
      },
      {
        "at": "5–12 s",
        "description": "Alternance de plans de pratique et de tags colorés; les formes varient entre ruban horizontal et éclat découpé."
      },
      {
        "at": "12–20 s",
        "description": "Série de compositions plus démonstratives, mettant en avant des options de couleurs et de formes; certains labels se retirent avant le plan suivant."
      },
      {
        "at": "20–26 s",
        "description": "Derniers exemples de cartouches sur les plans d’action, accents blancs/noirs et couleurs acides."
      },
      {
        "at": "26–28,83 s",
        "description": "Présentation groupée des options de lower-third; fin courte sur les assets."
      }
    ],
    "prompt": "Réalise un montage 16:9 de 28,83 s à 30 i/s autour d’un sport d’action original et autorisé. Cadence énergique, succession de plans courts sans masquer le geste. Ajoute des annotations typographiques façon comic sur des formes SVG découpées irrégulières : violet, vert citron, blanc, orange, jaune et noir, sans reprendre les mots, logos, rushes ou formes exactes d’une référence commerciale. Chaque cartouche arrive avec un déplacement latéral bref, une légère rotation, un overshoot discret puis se stabilise; certains sortent par masque en quelques images. De 0 à 20 s, alterne action et annotations; de 20 à 26 s, montre plusieurs variantes cohérentes; de 26 à 28,83 s, présente le groupe de formes sur un dernier plan lisible. Garder visages et action dégagés, contraste suffisant, timings déterministes. Audio original ou dûment licencié, sinon muet.",
    "recipe": "### Recette reproductible\n\nCréer un rush sportif original ou autorisé. Dessiner les cartouches en SVG avec bords polygonaux asymétriques, petit décalage d’impression et ombre courte. Les entrées associent translation de 40–70 px, rotation de 2–4°, overshoot modéré puis settle; sortie par masque directionnel en 5–8 images. Ancrer les textes dans une zone sûre et éviter visage, roue ou geste principal.\n\n**Remotion :** composition 1920×1080, 30 i/s, 865 images. Un tableau d’événements (`start`, `duration`, `label`, `palette`, `anchor`) pilote `<Sequence>` et `interpolate(frame...)`; les rushes remplacent les placeholders. Seed fixe pour les petites variations de confettis, jamais de hasard à chaque rendu.\n\n**HyperFrames :** même timing via SVG/HTML et une GSAP timeline pausée avec labels `action-0`, `tags-1` … `kit-5`. `seek(frame / 30)` donne un rendu déterministe; ne laisser ni ticker ni lecture automatique modifier l’état. Exporter un frame à chaque changement d’asset.\n\n### Contrôle et limites\n\nComparer les frames à 0, 5, 12, 20, 26 et 28,5 s à la planche; contrôler cadrage sûr, absence de collisions et cohérence des bords/teintes. La planche ne permet pas de mesurer précisément chaque durée de plan ni d’identifier le contenu audio; les beats sont donc des repères de reproduction, pas un relevé au frame près.",
    "checks": [
      "Comparer les frames à 0, 5, 12, 20, 26 et 28,5 s à la planche; contrôler cadrage sûr, absence de collisions et cohérence des bords/teintes. La planche ne permet pas de mesurer précisément chaque durée de plan ni d’identifier le contenu audio; les beats sont donc des repères de reproduction, pas un relevé au frame près."
    ]
  },
  {
    "key": "social-grunge-editorial-lowerthirds",
    "title": "Lower-thirds grunge éditoriaux",
    "summary": "Un kit de lower-thirds éditoriaux grunge, colorés et modulaires.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 48.6,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–8 s",
        "description": "Installation de l’esthétique; portraits/plans de vie et premier lower-third coloré à entrée vive."
      },
      {
        "at": "8–20 s",
        "description": "Variantes en rubans et étiquettes, contrastes jaune/rose/noir; le sujet reste visible derrière."
      },
      {
        "at": "20–34 s",
        "description": "Déclinaisons de titre principal et ligne secondaire, parfois petite icône; montage de portraits."
      },
      {
        "at": "34–48 s",
        "description": "Alternance entre formes compactes, blocs plus larges et nouvelles palettes acides."
      },
      {
        "at": "48–60 s",
        "description": "Dernière série d’exemples de placement et de composition; certains éléments apparaissent seuls."
      },
      {
        "at": "60–67 s",
        "description": "Présentation groupée des assets et clôture du preview."
      }
    ],
    "prompt": "Crée une démonstration éditoriale 16:9 de 67 secondes à 30 i/s pour un pack original de lower-thirds grunge. Sur des portraits et scènes de vie propres au projet, ajoute des bandeaux irréguliers et des blocs de titre à deux lignes, alternant jaune acide, rose, magenta, vert citron, blanc et noir. Utilise des bords découpés, un léger grain statique et une typographie condensée lisible; ne copie aucun titre, portrait, logo, dessin ni traitement exact d’un template commercial. De 0–20 s, introduis les variantes principales; de 20–48 s, montre notamment les versions à ligne secondaire et les nouvelles formes; de 48–60 s, alterne plans et placements; de 60–67 s, expose les formes ensemble puis termine proprement. Les animations doivent être brèves et déterministes, sans couvrir les visages ou l’action.",
    "recipe": "### Réalisation\n\nCréer une bibliothèque de formes SVG : bande droite, polygone déchiré, encoche, bande oblique. Limiter une composition à un titre et une seconde ligne; petits décalages de couleur et texture contrôlée donnent le grain sans dégrader le texte. Entrées 6–10 images (translation courte, masque), sorties par coupure ou wipe bref. Conserver une zone visage dégagée.\n\n**Remotion :** composition 30 fps, 2010 images. Objet de scène par lower-third; montage avec `Sequence`, `interpolate` et masks SVG. Couleurs et contenu sont des props, micro-jitter dérivé d’une seed stable.\n\n**HyperFrames :** assets SVG/HTML au-dessus de rushes substituables, timeline GSAP paused, labels à 0,8,20,34,48,60 s. Tester seeking vers une frame isolée et revenir au temps précédent : aucun état de style ne doit dériver.\n\n### Validation / limites\n\nContrôler des frames aux secondes 0, 8, 20, 34, 48, 60 et 66,5; vérifier texte sans clipping, niveaux de contraste et cohérence des palettes. Le détail des frames intermédiaires n’est pas documenté au frame près; repères issus d’une planche complète à 1 fps.",
    "checks": [
      "Contrôler des frames aux secondes 0, 8, 20, 34, 48, 60 et 66,5; vérifier texte sans clipping, niveaux de contraste et cohérence des palettes. Le détail des frames intermédiaires n’est pas documenté au frame près; repères issus d’une planche complète à 1 fps."
    ]
  },
  {
    "key": "social-red-cta-icons",
    "title": "Lower-thirds sociaux pop illustrés",
    "summary": "Lower-thirds sociaux illustrés en style pop/comic multicolore.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 40,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–6 s",
        "description": "Formes cartoon et bandeaux apparaissent sur aplats pastel saturés."
      },
      {
        "at": "6–13 s",
        "description": "Stickers et variantes de titre présentés, dont placements sur fond lifestyle."
      },
      {
        "at": "13–23 s",
        "description": "CTA superposés à des scènes et éléments illustrés ludiques."
      },
      {
        "at": "23–32 s",
        "description": "Démonstrations sur plusieurs situations : objets, sport et bureau."
      },
      {
        "at": "32–40,04 s",
        "description": "Retour aux planches d’assets sur fonds colorés et fin."
      }
    ],
    "prompt": "Crée un showcase 16:9 d’environ 40 s à 24 i/s pour une collection originale de lower-thirds sociaux pop. Couleurs cyan, violet, rose et jaune, capsules, stickers cartoon et petits pictogrammes conçus pour ce projet. 0–6 s : introduire les titres sur aplats; 6–13 s : montrer bandeaux et stickers; 13–23 s : les superposer à des scènes lifestyle autorisées; 23–32 s : varier les situations; 32–40 s : exposer les éléments sur fonds colorés. Les éléments bondissent brièvement puis se stabilisent. Texte toujours lisible, sans logos ni assets copiés de la preview.",
    "recipe": "### Recette Remotion + HyperFrames\n\nCapsules SVG à contours épais, pictogrammes/stickers originaux; turquoise, fuchsia, jaune et noir. Entrée par scale 0,85→1 et rotation légère, settle sur 8–12 frames. Remotion 24 fps, 961 frames, timeline data-driven et `Sequence`; seed fixe. HyperFrames : SVG/HTML, GSAP timeline paused et seek absolu frame/24, labels aux changements. Réduire la densité sur les rushes pour ne pas cacher visage/action.\n\n### Validation / limites\n\nComparer 0, 6, 13, 23, 32 et 39 s. Contrôler collisions, lisibilité et contraste. Beats groupés depuis échantillons 1 fps; audio et micro-transitions non audités.",
    "checks": [
      "Comparer 0, 6, 13, 23, 32 et 39 s. Contrôler collisions, lisibilité et contraste. Beats groupés depuis échantillons 1 fps; audio et micro-transitions non audités."
    ]
  },
  {
    "key": "spooky-alpha-object-kit",
    "title": "Spooky alpha object kit",
    "summary": "Révélation d'objets hantés mis en scène et tableau final du kit de ressources.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 26,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:04",
        "description": "Dark ghost apparition, red eye points, then brighter white sheet ghost on checkerboard. — Ghost grows / changes pose in place; dissolve or asset cut around 00:01–02."
      },
      {
        "at": "00:04–00:08",
        "description": "Gravestone pair on a dim mossy ground pool. — Isolated scene, low green rim light; hold for legibility."
      },
      {
        "at": "00:08–00:11",
        "description": "Brass candlestick and small flame on black. — Centered cut-in; slight scale/rotation change."
      },
      {
        "at": "00:12–00:15",
        "description": "Vintage CRT with glowing mint screen. — Centered isolated prop; screen glow pulses subtly."
      },
      {
        "at": "00:16–00:19",
        "description": "Blue-gray door, perspective tilted, lime edge light intensifies. — Door slides / scales toward camera-left edge; bright green accent."
      },
      {
        "at": "00:20–00:25.96",
        "description": "The five prop families appear together as an asset overview. — Layered collage over black; final hold."
      }
    ],
    "prompt": null,
    "recipe": "### Assets and build\n\nUse licensed alpha PNG/WebM or self-created vector/3D substitutes for each prop; create a checkerboard only for the pack-preview beat. Required layers: ghost, ground/moss pool, two headstones, candle/flame, CRT/screen, door/rim, sparse dust, black and checkerboard backgrounds. Keep alpha edges clean.\n\n**Remotion:** 624 frames at 24 fps, 1920×1080. Model each beat as a `Sequence` and animate local frame values. Ghost: opacity 0→1 over 12f, scale .88→1.00 over 18f with cubic-out, 2–3 px vertical float over a 48f loop segment (deterministically sample a sine from frame). Gravestone scene: crossfade 8f; candle: flame scaleY .94→1.06 over 10f and rotate ±1°; CRT glow opacity .65→1 over 14f. Door moves from x=1.15W to .78W and scale .78→1.12 over 20f. Compose the final pack tableau from the same layers, no random timing.\n\n**HyperFrames:** declare sequential clips with starts near 0, 4, 8, 12, 16, 20 s and durations 4/4/3/4/4/5.96 s. Use a paused GSAP timeline; animate ghost opacity/scale, flame `scaleY`, door `xPercent`/scale and scene crossfades with explicit frame-derived progress. Use `data-start`, `data-duration`, `data-track-index`; seek every frame from `frame / 24`. The checkerboard is an editor aid, not part of the isolated assets.\n\n### Full generation prompt\n\nCreate a 25.96-second, 16:9, 24 fps Halloween asset-kit preview on mostly black, with a deliberate sequence of isolated spooky props. Begin with a translucent white sheet ghost with tiny red glowing eyes, a short eerie hover and a soft alpha edge; reveal a pair of weathered headstones over a small dark moss patch with low green rim light; cut to a centered antique brass candlestick with a restrained living flame; cut to a small vintage CRT with a softly pulsing mint screen; then reveal a heavy blue-gray door at a diagonal with a bright lime edge glow. End by arranging those five object families into a balanced pack overview. Keep each object centered during its solo beat, with clean silhouettes, soft contact shadows and restrained camera motion. Provide transparent-background source assets separately. No licensed character, no existing TV/film character, no copied branding, and no source-preview watermark.\n\n### Validation\n\nCompare at 0, 1, 4, 8, 12, 16, 19, 20, 24 and end. Check the prop order, silhouette scale, checkerboard only in preview, glow direction, door diagonal and final tableau. Verify transparent edges over both black and checker backgrounds; inspect AAC track separately if audio is used.",
    "checks": [
      "Compare at 0, 1, 4, 8, 12, 16, 19, 20, 24 and end. Check the prop order, silhouette scale, checkerboard only in preview, glow direction, door diagonal and final tableau. Verify transparent edges over both black and checker backgrounds; inspect AAC track separately if audio is used."
    ]
  },
  {
    "key": "tech-science-sticker-pack-promo",
    "title": "Promo sticker pack tech et science",
    "summary": "Présentation d'un pack d'autocollants tech violet et appel au téléchargement.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 31.8,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:05",
        "description": "Fond violet/bleu texturé, titre blanc contouré, cœur, ampoule et mascotte verte qui entrent."
      },
      {
        "at": "00:06–00:09",
        "description": "Texte « 14 ANIMATIONS ON ALPHA » à côté d’un laptop sticker et d’une mascotte."
      },
      {
        "at": "00:10–00:12",
        "description": "Planche de stickers tech/science sur fond presque noir, en rangées."
      },
      {
        "at": "00:13–00:15",
        "description": "Sticker de particules/étoiles isolé."
      },
      {
        "at": "00:16–00:19",
        "description": "Bocal vert avec symboles monétaires dessiné en sticker."
      },
      {
        "at": "00:20–00:21",
        "description": "Main tenant un cœur violet."
      },
      {
        "at": "00:22–00:26",
        "description": "Carte promotionnelle « PERFECT FOR SOCIAL VIDEOS & REELS » et mascotte/laptop."
      },
      {
        "at": "00:27–00:31.833",
        "description": "Grand CTA « DOWNLOAD NOW » sur le fond violet animé, tenue finale."
      }
    ],
    "prompt": "Créer une vidéo promotionnelle de 31,83 secondes, 16:9, 30 i/s pour une bibliothèque originale de stickers tech et science. Sur une texture violette/bleue, faire apparaître un titre contour blanc, des étincelles, un cœur, une planète et un personnage mascotte vert simple. Présenter ensuite une mention éditable « 14 animations » uniquement si le livrable contient réellement ces animations, avec laptop et mascotte en gros plan. Montrer une planche noire ordonnée, puis isoler une grappe d’étoiles, un bocal à monnaie et une main tenant un cœur violet. Terminer par une carte « Perfect for social videos & reels » et un grand « Download now » animé. Utiliser des pops courts avec contour blanc épais et ombre légère, et tenir chaque visuel lisible. Fournir des stickers originaux séparés; ne pas copier d’œuvre, marque, preview watermark, ni annoncer transparence ou quantité non vérifiée.",
    "recipe": "### Reproduction\n\nCréer 14 stickers SVG originaux : cœur, monnaie, laptop, planète, horloge, mascotte abstraite, main, étincelles et autres glyphes scientifiques. Exporter alpha séparément seulement après test de transparence réelle; ne pas intégrer damier de prévisualisation au rendu final.\n\n**Remotion :** 955f à 30 i/s. Cover 0–179f : titre, stickers en pops décalés de 4–7f. Claim « 14 animations » de 180–299f, garder le chiffre modifiable selon le contenu livré. Grille 300–389f. Trois assets mis en avant dans 390–659f, chacun animé en 10–14f, puis carte bénéfice 660–809f et CTA 810–954f avec reveal par clip horizontal et hold final 50f. Animer chaque sticker avec frame locale déterministe.\n\n**HyperFrames :** scènes aux environs de 0, 6, 10, 13, 16, 20, 22 et 27s; GSAP timeline paused; utiliser un storyboard HTML/SVG. L’aperçu des assets en noir aide à isoler les formes, mais n’est pas preuve d’alpha. Texte et nombre de stickers doivent provenir de props éditables.\n\n### Validation\n\nVérifier textes/chiffres, positions, cadence, end card, 955 images et séparation audio. Tester chaque export alpha sur fonds noir/blanc/couleur avant d’en revendiquer la transparence.",
    "checks": [
      "Créer 14 stickers SVG originaux : cœur, monnaie, laptop, planète, horloge, mascotte abstraite, main, étincelles et autres glyphes scientifiques. Exporter alpha séparément seulement après test de transparence réelle; ne pas intégrer damier de prévisualisation au rendu final."
    ]
  },
  {
    "key": "thunder-lightning-overlay-pack",
    "title": "Pack d’overlays orage et éclairs",
    "summary": "Exemples d'éclairs bleus sur images d'archive et surimpressions de foudre isolées.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": null,
    "durationSeconds": 51.1,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:03",
        "description": "Titre bleu électrique et trait d’éclair sur fond noir; texte « 4K THUNDER OVERLAY PACK / 10 THUNDER ELEMENTS »."
      },
      {
        "at": "00:04–00:07",
        "description": "Démo sur paysage de vallée/ville au crépuscule, éclair frappant le sol; petit label EXAMPLE."
      },
      {
        "at": "00:08–00:10",
        "description": "Rue de ville mouillée la nuit, grand éclair bleu dans le ciel puis réflexion sur chaussée."
      },
      {
        "at": "00:11–00:15",
        "description": "Lac alpin diurne, un ou deux impacts d’éclair au-dessus de l’eau."
      },
      {
        "at": "00:16–00:17",
        "description": "Vue nocturne de ville/montagnes, flash blanc bleuté très intense."
      },
      {
        "at": "00:18–00:25",
        "description": "Variantes sur montagnes, lac et skyline citadine; éclairs verticaux/horizontaux et flashes d’ambiance."
      },
      {
        "at": "00:26",
        "description": "Image blanche quasi pleine, probablement un flash transitionnel; fréquence/surface exacte à revoir frame à frame avant usage."
      },
      {
        "at": "00:27–00:33",
        "description": "Skyline urbaine puis séparation/montage de versions de composition, exemples toujours marqués."
      },
      {
        "at": "00:34–00:51.1",
        "description": "Catalogue de dix overlays sur noir avec étiquettes : Thunder Cloud Flash, Thunder 1–6, Thunder Ambient Flash, Thunder Bottom Flash 1–2; tailles de source indiquées 3840×2160 sur plusieurs assets."
      }
    ],
    "prompt": "Créer un aperçu de 51,1 secondes, 1920×1080, 30 i/s pour un pack original de dix overlays orage. Ouvrir avec titre blanc sobre sur fond noir et un éclair bleu qui révèle brièvement « Thunder overlays ». Illustrer ensuite les effets sur des plans autorisés : vallée montagneuse au crépuscule, rue humide de nuit, lac alpin, skyline lointaine. Les éclairs bleus apparaissent depuis des nuages, frappent un point cohérent, illuminent brièvement l’environnement et disparaissent. Finir par une grille noire listant séparément chaque effet fourni : éclairs ramifiés, nuage lumineux, flash d’ambiance et impacts bas de cadre. Les durées, le 4K et l’alpha ne sont annoncés que si les fichiers source les confirment. Maintenir une luminance contrôlée, éviter les flashes plein écran répétés et inclure une version test photosensibilité. Ne pas reprendre les paysages, labels filigranés ou éclairs commerciaux.",
    "recipe": "### Fabrication\n\nFaire ou licencier les 10 éclairs séparément sur alpha. Assets: nuage/flash, traits ramifiés Thunder 1–6, flash d’ambiance et deux impacts bas de cadre. Créer un fond noir d’inventaire; footage autorisé et traité séparément. Protéger la lisibilité des détails d’image et limiter exposition des flashes conformément au contrôle photosensibilité.\n\n**Remotion :** 1533f à 30 i/s. Intro titre 0–119f; trois scènes exemples de 120–479f avec footage paysage, rue, lac; variations ville/montagne 480–809f. Frame 26s (≈780f) exige inspection spécifique, ne pas conserver un flash blanc complet par défaut. Catalogue overlays 810–1532f : fenêtres approximatives 2s par asset, fond noir, nom sous forme de label. Les overlays sont superposés en lecture seekable, luminosité/opacity contrôlée par keyframes.\n\n**HyperFrames :** clips d’exemples composités séparés des clips overlay; timeline pausée, compositing alpha à vérifier et 10 assets affichés individuellement en dernière section. Utiliser couleurs et labels modifiables; `frame / 30` drive la timeline. Ne pas confondre file d’exemple compressé avec les assets maîtres 4K.\n\n### Validation\n\nVisionner le flux entier à vitesse normale; inspecter surtout 16–18, 25–27s, mesurer fréquence/surface des flashes, et tester les overlays sur plusieurs fonds. Vérifier le compte de fichiers, vraies dimensions/résolution, alpha et licences avant toute affirmation; 1533 frames à 30 i/s.",
    "checks": [
      "Visionner le flux entier à vitesse normale; inspecter surtout 16–18, 25–27s, mesurer fréquence/surface des flashes, et tester les overlays sur plusieurs fonds. Vérifier le compte de fichiers, vraies dimensions/résolution, alpha et licences avant toute affirmation; 1533 frames à 30 i/s."
    ]
  },
  {
    "key": "vertical-grit-overlays",
    "title": "Overlays portrait « vertical grit »",
    "summary": "Un pack d’overlays portrait de grain, poussière, brûlure film et texture grunge.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": "9:16",
    "durationSeconds": 32.1,
    "fps": 60,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Introduction de la texture grit et aperçu vertical dans le cadre 16:9."
      },
      {
        "at": "4–10 s",
        "description": "Clips portrait avec grain, poussières et irrégularités superficielles."
      },
      {
        "at": "10–17 s",
        "description": "Variantes plus marquées de scratches et voiles/burn; alternance de plans."
      },
      {
        "at": "17–25 s",
        "description": "Suite du showcase avec changements de sujet/cadrage, overlay maintenu au-dessus des frames verticales."
      },
      {
        "at": "25–30 s",
        "description": "Dernières variantes et comparaison de texture."
      },
      {
        "at": "30–32,085 s",
        "description": "Fin du preview et tenue brève."
      }
    ],
    "prompt": "Prépare une démonstration de 32,09 s à 60 i/s pour un style d’overlays grunge destinés à la vidéo verticale. Dans le preview 16:9, encadre des clips 9:16 de personnes/ville autorisés; option de livraison distincte en 1080×1920. Applique une texture originale de grain, poussière, fines rayures verticales et fuites lumineuses discrètes, modulées par scène. De 0–10 s, montre les effets subtils; de 10–17 s, révèle une version plus texturée; de 17–25 s, enchaîne plusieurs clips portrait; de 25–30 s, compare les variantes; 30–32,09 s termine par un hold bref. Mouvement des particules déterministe, titres hors safe zones, aucun clip, logo, watermark ou overlay copié de la source.",
    "recipe": "### Réalisation\n\nComposer les clips portrait en 9:16 à l’intérieur d’un fond 16:9 de démonstration, ou exporter le vrai master 9:16 si la destination est mobile. Overlays : grain monochrome seeded, poussières minuscules, scratches verticaux, gradients de light leak subtils. Caler le recadrage et la safe zone en portrait; ne pas prétendre que toute source est native 9:16.\n\n**Remotion :** 60 fps, 1923 images pour correspondre à la source. `AbsoluteFill` de démo 16:9; `<Sequence>` contenant des clips portrait au ratio propre, `objectFit: cover`, overlay procédural stable. Variante finale exportable 1080×1920, conserver le même timing.\n\n**HyperFrames :** frame 60 Hz, calques verticaux et backdrop, GSAP paused; crop et effects dérivés du même frame absolu. Vérifier dimensions portrait à l’export et le comportement du mode blend.\n\n### Contrôle / limites\n\nComparer 0,4,10,17,25,30 et 32 s; contrôler cadrage 9:16, stabilité de la texture et absence de flash. La fiche documente la grammaire visuelle; elle n’essaie pas de recopier l’identité, les plans ou chaque poussière du pack. Audio non analysé.",
    "checks": [
      "Comparer 0,4,10,17,25,30 et 32 s; contrôler cadrage 9:16, stabilité de la texture et absence de flash. La fiche documente la grammaire visuelle; elle n’essaie pas de recopier l’identité, les plans ou chaque poussière du pack. Audio non analysé."
    ]
  },
  {
    "key": "white-outline-doodle-sticker-sheet",
    "title": "Planche de stickers doodle au trait blanc",
    "summary": "Planche d'autocollants doodle à la craie blanche et aperçus d'objets.",
    "family": "overlays-transitions",
    "engines": "both",
    "format": null,
    "durationSeconds": null,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:03",
        "description": "Planche avec plusieurs visages circulaires, symboles, mains/traits et éclair; texture chalkboard."
      },
      {
        "at": "00:04–00:07, fin",
        "description": "Nouvelle zone de la planche: signe de paix, gribouillis épais, lignes de mouvement, question mark et traits blancs. Hold sur catalogue."
      }
    ],
    "prompt": "Produire un clip de 8 secondes, 1920×1080, 24 i/s qui présente une collection inédite de stickers doodle tracés à la craie blanche. Sur une grande planche ardoise légèrement quadrillée, afficher une première famille de smileys, cœur, éclair, signe de ponctuation, main stylisée et petits symboles. Vers la moitié, déplacer doucement le cadrage vers un second groupe avec signe de paix, grands gribouillis, lignes de vitesse et point d’interrogation. Conserver une composition en feuille de contact, objets séparés et clairement lisibles, contraste élevé et texture manuelle irrégulière. Aucun filigrane, aucun dessin tracé sur l’aperçu et aucune prétention de transparence non testée. Le clip peut garder des poses fixes comme dans les échantillons; un tracé animé reste une interprétation facultative.",
    "recipe": "### Reconstitution\n\nDessiner un nouvel alphabet d’icônes à la main en SVG ou raster transparent : contours blanc cassé, variations irrégulières d’épaisseur, petits doubles traits et texture crayeuse. Fond ardoise quadrillé discret. Préparer chaque icône en asset séparé pour la réutilisation; vérifier alpha réel à l’import.\n\n**Remotion :** 192f à 24 i/s. Présenter la planche 0–95f, puis faire un slide ou crop 96–191f vers un second cluster. Si un effet de dessin est voulu, l’ajouter comme proposition (non affirmée par la référence) via `strokeDashoffset` pendant 8–12f, puis hold. Les variations de texture utilisent une image fixe par frame, pas un bruit dépendant de l’horloge.\n\n**HyperFrames :** une scène de planche 0–4s et une seconde 4–8s, timeline pausée. Groupes SVG, repositionnement déterministe à l’approche du second beat; option `strokeDashoffset` explicitement marquée comme choix de recréation. Retirer toutes les animations infinies CSS, permettant un rendu stable à n’importe quelle frame.\n\n### Validation\n\nComparer début, 3, 4 et dernière seconde; contrôler cadrage, lisibilité des icônes, 192 images et retrait du watermark. Écouter ou retirer l’AAC selon sa provenance autorisée, sans supposer qu’il est libre.\n\n**Droits et fidélité :** cette vidéo est une prévisualisation la référence. Les droits de réutilisation de ses images, objets, illustrations, marques, musique et fichiers source ne sont pas établis par le téléchargement. Recréer la grammaire d’animation avec des assets autorisés; ne pas réutiliser le watermark ni les éléments protégés sans licence vérifiée.",
    "checks": [
      "Comparer début, 3, 4 et dernière seconde; contrôler cadrage, lisibilité des icônes, 192 images et retrait du watermark. Écouter ou retirer l’AAC selon sa provenance autorisée, sans supposer qu’il est libre."
    ]
  }
];
