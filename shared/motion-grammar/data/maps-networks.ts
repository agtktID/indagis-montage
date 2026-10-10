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

/** maps-networks — 5 recettes. */
export const MOTION_MAPSNETWORKS: readonly MotionRecipe[] = [
  {
    "key": "creative-agency-network-showreel",
    "title": "Showreel agence / réseau de cartes",
    "summary": "Rythme, le réseau et les cartes du showreel dans Remotion ou HyperFrames.",
    "family": "maps-networks",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 27.7,
    "fps": 30,
    "palette": [
      "#05060A",
      "#3159FF",
      "#F4D83B",
      "#F4F5F8"
    ],
    "beats": [
      {
        "at": "0:00–0:01.2 / 0–36",
        "description": "Noir, lueur bleu-violet basse, titre central blur 20 px→0 ; photos miniatures flottantes."
      },
      {
        "at": "0:01.2–0:05 / 36–150",
        "description": "Les portraits/cards se révèlent autour du titre, chacun sur son plan avec shadow et légère profondeur."
      },
      {
        "at": "0:05–0:10 / 150–300",
        "description": "Montage de cards colorées ; entrée par translateY 20 px, scale 0.92→1.04→1."
      },
      {
        "at": "0:10–0:20 / 300–600",
        "description": "Nœuds, lignes SVG et cartes créent le réseau ; pan lent 2D, draw-on des traits."
      },
      {
        "at": "0:20–0:27.70 / 600–831",
        "description": "Réduction vers CTA/logotype, extinction du réseau, fade noir."
      }
    ],
    "prompt": "Vidéo motion design 16:9, 27,7 secondes, fond noir premium avec glow bleu violet discret, cartes arrondies suspendues contenant portraits éditoriaux originaux et graphiques abstraits, accents jaune et cobalt, titre sans marque. Début flou vers net, cartes entrent par le bas avec petit overshoot, lignes SVG lumineuses relient les cartes de 5 à 20 s, CTA abstrait de 20 à 27,7 s ; grain fin, pas de logo, visage, interface, texte ou watermark de la référence.",
    "recipe": "### Découpage timecodé et calques\n\nPalette : noir `#05060a`, bleu cobalt `#3159ff`, jaune `#f4d83b`, blanc cassé `#f4f5f8`; sans-serif géométrique en gras, titres serrés. Calques : fond/grain, glow, lignes, nœuds, cards, texte, CTA.\n\n### Propriétés par beat\n\n- Titre 0–8f : `opacity 0→1`, `filter blur(20px)→0`, `scale .97→1`, `easeOutCubic`; hold 8–150f.\n- Chaque card : départ `y=20, opacity=0, scale=.92`; 12f `easeOutCubic`, puis 6f `back.out(1.3)` vers 1.04 et 5f vers 1. Stagger 5–8f.\n- Traits réseau : `strokeDashoffset longueur→0`, 18f, `easeInOutSine`; node `scale .5→1` en 9f, pulse ±4 % toutes les 30f.\n- CTA 600–630f : cards `opacity 1→0`, `scale 1→.96`; marque de remplacement `opacity 0→1`, 12f ; noir 810–831f.\n\n### Recettes\n\n**Remotion.** Composition 831 frames/30 fps : tableau `cards[]`, SVG de nœuds et Béziers, `interpolate(frame, …)` pour les transformations ; `spring({fps,frame,config:{damping:18,stiffness:150}})` uniquement aux impacts. `Sequence` pour les cinq beats ; aucune horloge ou hasard.\n\n**HyperFrames.** HTML à calques absolus. Construire `const tl=gsap.timeline({paused:true})`; `tl.fromTo(title,{filter:'blur(20px)',opacity:0},{filter:'blur(0px)',opacity:1,duration:8/30,ease:'power3.out'},0)` ; ajouter cards et `strokeDashoffset` aux secondes indiquées. Le contrôleur seeke `tl.time(frame/30)`.",
    "checks": [
      "0, 8, 36, 150 : titre et first card sans blur résiduel.",
      "300, 450, 600 : toutes les lignes ont un point d'origine et les labels suivent la caméra.",
      "630, 810, 830 : CTA lisible, puis noir complet ; durée 831 frames."
    ]
  },
  {
    "key": "documentary-route-map",
    "title": "Carte documentaire à trajet",
    "summary": "Routes documentaires, cartes et callouts.",
    "family": "maps-networks",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 66.1,
    "fps": 30,
    "palette": [
      "#232323",
      "#CC1730",
      "#F4F4F0"
    ],
    "beats": [
      {
        "at": "0–8 / 0–240",
        "description": "Carte sombre, zone cramoisie qui se révèle, trait pointillé."
      },
      {
        "at": "8–20 / 240–600",
        "description": "Pan vers une masse terrestre, route maritime et marqueur blanc."
      },
      {
        "at": "20–34 / 600–1020",
        "description": "Highlight régional, titre/counter et premier photo-callout."
      },
      {
        "at": "34–48 / 1020–1440",
        "description": "Transition vers second lieu : pan/zoom, route et pin."
      },
      {
        "at": "48–60 / 1440–1800",
        "description": "Carte mondiale/continentale, encadré photo, données sourcées."
      },
      {
        "at": "60–66.07 / 1800–1982",
        "description": "Vue de synthèse et fondu noir."
      }
    ],
    "prompt": "Carte documentaire sombre 16:9, continents gris mats et territoire fictif cramoisi, route maritime blanche pointillée animée, marqueur lumineux, cartouches de photos originales autorisées et labels factuels fournis. Pan/zoom lent et précis, dessin progressif des routes, grain fin ; pas de carte commerciale, logo, photo, texte ou donnée historique de la référence.",
    "recipe": "### Découpage / calques\n\nFond `#232323`, terres `#777`, zone active `#cc1730`, route `#f4f4f0`, texte blanc. Calques : texture, carte SVG, zone, route glow+net, marqueur, cartouche photo, labels, grain.\n\n### Propriétés\n\n- Zone : 12f `opacity 0→1`, `scale .98→1`; route : dashoffset longueur→0 sur 30–48f par segment, `linear`.\n- Marqueur : suivre le point de Bézier, 18–30f, rotation dans la tangente ; halo pulse 1→1.2→1 sur 20f.\n- Camera : groupes aux frames 240–420, 1020–1200 et 1440–1620, `scale 1→1.7`, `x/y` interpolés, `easeInOutCubic`.\n- Photo-callout : mask `scaleX 0→1` en 12f, image 4f après ; fade 1800–1982f.\n\n### Recettes\n\n**Remotion :** scène SVG/GeoJSON unique, `AnimatedRouteMap` reçoit waypoints et géométrie ; échantillonner les Béziers sans API cartographique. Imbriquer pin/callout dans map group.\n\n**HyperFrames :** timeline GSAP `{paused:true}` et SVG inline ; `attr:{'stroke-dashoffset':0}` pour chaque route, `motionPath` ou position échantillonnée pour marqueur ; `tl.time(frame/30)`.",
    "checks": [
      "0, 240, 600 : route commence/termine au bon point logique.",
      "1020, 1440, 1800 : caméra et callouts restent attachés à la géographie.",
      "1981 : noir total, 1 982 frames."
    ]
  },
  {
    "key": "global-network-map",
    "title": "Réseau mondial teal",
    "summary": "Arcs lumineux et connexions mondiales.",
    "family": "maps-networks",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 48.3,
    "fps": 30,
    "palette": [
      "#1C1E20",
      "#4A4D50",
      "#39C8B1"
    ],
    "beats": [
      {
        "at": "0–8 / 0–240",
        "description": "Titre et world map charcoal, lignes de base."
      },
      {
        "at": "8–20 / 240–600",
        "description": "Arcs teal se dessinent entre nœuds, halo."
      },
      {
        "at": "20–32 / 600–960",
        "description": "Zoom/pan sur point focal et callout."
      },
      {
        "at": "32–42 / 960–1260",
        "description": "Seconde connexion, labels locaux."
      },
      {
        "at": "42–48.27 / 1260–1448",
        "description": "Retrait des arcs et fade."
      }
    ],
    "prompt": "Carte réseau minimaliste 16:9 sur charbon, continents gris, arcs Bézier teal lumineux et nœuds pulsants, caméra 2D lente vers un callout photo original autorisé. Traits doubles pour glow, fade final ; sans carte, réseau, labels, image ou chiffres de la référence.",
    "recipe": "### Découpage et calques\n\nPalette `#1c1e20`, carte `#4a4d50`, teal `#39c8b1`, blanc cassé. Couches : carte licenciée, arcs SVG net+blur, nodes, labels, vignette photo, titre/vignette.\n\n### Propriétés et recettes\n\n- Arcs : double path, glow `blur(8px)` opacity .5 sous path net ; dashoffset `L→0` sur 24f, `easeInOutSine`.\n- Nodes : 10f `.4→1.1→1`, halo `opacity .2→.8`; pulse toutes les 30f. Camera 600–840 et 960–1140f `scale 1→1.8`, `easeInOutCubic`.\n- **Remotion :** `NetworkGlobeConnections({nodes,arcs,camera})`, toutes coordonnées dans groupe SVG, point par Bézier frame-based.\n- **HyperFrames :** SVG + `timeline({paused:true})`, `strokeDashoffset` et parent `map-camera` animés puis `tl.time(frame/30)`.",
    "checks": [
      "0/240/600 : titre, arcs et nœuds attachés à la carte.",
      "840/960/1260 : callout et caméra cohérents.",
      "1447 : fade noir, 1 448 frames."
    ]
  },
  {
    "key": "regional-map-data-story",
    "title": "Carte régionale et données",
    "summary": "L'infographie cartographique bleue et ses zooms.",
    "family": "maps-networks",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 63.5,
    "fps": 30,
    "palette": [
      "#F9FAFB",
      "#0758BC",
      "#16191F",
      "#39414B"
    ],
    "beats": [
      {
        "at": "0–7 / 0–210",
        "description": "Silhouette bleue de territoire sur blanc, relief/ombre, titre."
      },
      {
        "at": "7–14 / 210–420",
        "description": "Passage à carte sombre quadrillée, régions tracées et compteur."
      },
      {
        "at": "14–28 / 420–840",
        "description": "Sous-régions, pin bleu et labels ; grilles et lignes de mesure."
      },
      {
        "at": "28–45 / 840–1350",
        "description": "Statistiques, barrettes et compteur, carte demeure ancrée."
      },
      {
        "at": "45–55 / 1350–1650",
        "description": "Zoom sur une région, caméra 2D et callout."
      },
      {
        "at": "55–63.47 / 1650–1904",
        "description": "Second zoom / end card de données, fade."
      }
    ],
    "prompt": "Infographie cartographique 16:9, carte vectorielle sous licence d'une région fictive, territoires bleu intense avec frontières fines, version blanche puis fond anthracite quadrillé, pins bleus, graphique et compteurs renseignés par données fournies. Dessin des contours, pin avec rebond doux, zooms caméra précis ; aucun pays, chiffre, logo ou donnée de la référence.",
    "recipe": "### Découpage, calques, style\n\nBlanc `#f9fafb`, bleu carte `#0758bc`, nuit `#16191f`, grille `#39414b`, texte `#fff`. Couches : fond, grille, SVG territoires, bordures, pins, UI/labels, graphiques, vignette.\n\n### Propriétés\n\n- Paths 0–210f : `strokeDashoffset total→0` sur 24f, `easeInOutSine`; fill apparaît après 8f.\n- Pin : 10f `scale .4→1.12→1`, `back.out(1.4)` ; label `x −12→0`, 10f.\n- Barres 840–1050f : `scaleY 0→value`, origin bottom, stagger 5f ; compteur calculé de props pendant 24f, `easeOutCubic`.\n- Caméra 1350–1650f et 1650–1830f : `scale 1→2.2`, translations définies par coordonnées logiques ; labels restent dans le parent cartographique.\n\n### Recettes\n\n**Remotion :** `MapScene({geojson,data,waypoints})`, projection unique, SVG `<path>` ; `interpolate(frame,[start,end],[…])` pour camera group et barres ; compteur arrondi local. Conserver les fichiers source et attribution GeoJSON.\n\n**HyperFrames :** SVG inline dans une scène `transform-origin: 50% 50%`; timeline GSAP pausable anime dashoffset, pins, `scale/translate` du groupe `map-camera`. Tous les labels sont enfants de ce groupe.",
    "checks": [
      "0, 210, 420 : contours fermés, grille stable, aucune projection décalée.",
      "840, 1050, 1350 : valeurs issues des props et pins attachés à la carte.",
      "1650, 1830, 1903 : zoom sans glissement de label, fade final."
    ]
  },
  {
    "key": "travel-map-product-tour",
    "title": "Tour de carte voyage",
    "summary": "Product tour de carte voyage et ses appareils.",
    "family": "maps-networks",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 143.7,
    "fps": 30,
    "palette": [
      "#39A8E8",
      "#F7F6E9",
      "#131B28"
    ],
    "beats": [
      {
        "at": "0–15 / 0–450",
        "description": "Hero map bleue ciel, nuages/mer, titre et avion miniature."
      },
      {
        "at": "15–30 / 450–900",
        "description": "Carte style terrain, pins et labels."
      },
      {
        "at": "30–50 / 900–1500",
        "description": "Carte Amériques, callouts noirs et route aérienne."
      },
      {
        "at": "50–70 / 1500–2100",
        "description": "Variantes zoom/pan de carte et véhicule."
      },
      {
        "at": "70–90 / 2100–2700",
        "description": "Interface de personnalisation de route, panneau et icônes."
      },
      {
        "at": "90–110 / 2700–3300",
        "description": "Version dark/contraste, avion sur path."
      },
      {
        "at": "110–130 / 3300–3900",
        "description": "Laptop + téléphone 2.5D avec carte synchrone."
      },
      {
        "at": "130–143.73 / 3900–4312",
        "description": "Retour hero / end card de remplacement."
      }
    ],
    "prompt": "Product tour de carte voyage illustrée 16:9, océans bleu clair, terres chaudes sous licence, nuages décoratifs, avions et pins génériques sur routes pointillées, panneaux UI originaux, laptop et smartphone 2.5D. Zooms fluides, path drawing, reveals de 16 frames et CTA final ; pas de carte commerciale, trajet, texte, logo, interface ou données de la référence.",
    "recipe": "### Découpage complet\n\nMer `#39a8e8`, terre `#f7f6e9`/verts chauds, panneaux `#131b28`, blanc. Type sans-serif bold. Couches : carte/terrain autorisé, nuages/décor, routes SVG, plane/pin, labels, panneau UI, devices, CTA.\n\n### Propriétés\n\n- Routes 450–3300f : `strokeDashoffset L→0` 30f, avion échantillonné sur Bézier au long du même intervalle ; pin 10f `back.out(1.4)`.\n- Camera : changes 900–1200, 1500–1800, 2700–3000f, `scale 1→1.6`, x/y par coordonnées, `easeInOutCubic`; labels/enfants restent logiques.\n- UI 2100–2700f : panels `x 42→0`, 16f, items stagger 5f. Devices 3300–3900f : `y 28→0`, `rotateY ±8°→0`, 22f, shadow suit.\n- End 3900–4250f : route et CTA ; 4250–4312f opacity→0.\n\n### Recettes\n\n**Remotion :** `TravelMapProductTour({geojson,routes,waypoints,screens})`, projection/route unique; `PhoneMockup` et `LaptopMockup` avec captures autorisées. Synchroniser route/camera/device depuis le frame.\n\n**HyperFrames :** SVG inline, `<div class=map-camera>` puis panels/devices en plans HTML. GSAP `paused:true` anime dashoffset, transform parent et device; le lecteur appelle `tl.time(frame/30)`.",
    "checks": [
      "0/450/900/1500 : projection, mer/terre et routes stables.",
      "2100/2700/3300/3900 : pins/callouts attachés et écrans synchrones.",
      "4250/4311 : CTA puis noir, 4 312 frames."
    ]
  }
];
