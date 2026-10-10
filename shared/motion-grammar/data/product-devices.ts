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

/** product-devices — 7 recettes. */
export const MOTION_PRODUCTDEVICES: readonly MotionRecipe[] = [
  {
    "key": "cyan-device-studio-showcase",
    "title": "Cyan device studio",
    "summary": "Array de téléphones studio noir/cyan, hero site et outro.",
    "family": "product-devices",
    "engines": "both",
    "format": null,
    "durationSeconds": 45.1,
    "fps": 30,
    "palette": [
      "#05090B",
      "#22E6E4"
    ],
    "beats": [],
    "prompt": "film produit mobile original, studio noir avec roche sombre abstraite et pool de lumière cyan, plusieurs smartphones génériques avec écrans mockup sur mesure, rendu premium sans marque",
    "recipe": "### Contrat et limites\n\n960×540/30 fps/1352 f (45.07 s). Respecter roche sombre, pool cyan, orbit et devices; mockups, écrans, site et marque doivent être originaux/licenciés.\n\n### Découpage\n\n0–719 f (0–23.97 s) phones et scène studio; 720–1109 f (24–36.97 s) website/hero; 1110–1351 f (37–45.07 s) outro.\n\n### Calques / beats\n\nFond noir `#05090B`, rock/mesh pré-rendu gris anthracite, light plane cyan `#22E6E4`, 2–4 phones, UI mockup, vignette. Fonte sans moderne. Intro phones : opacity 0→1 18 f, x positions de ±140→0, rotateY ±12→0 24 f; orbit caméra wrapper x±10 y±4 sur 210 f sine; chaque phone bob ±2 px sur phase différente. Website : panneau `z:-220→0`, opacity 0→1 18 f, titre blur 8→0 10 f. Outro : cyan fade 20 f.\n\n### Remotion\n\n`DeviceArray` avec `phones.map`, phases déterministes; `StudioBackground` pré-rendu original recommandé pour roche/DOF, importé via `OffthreadVideo`; si CSS, employer gradients et SVG noise sans prétendre au CGI. `Sequence` 0/720/1110; perspective 1400.\n\n### HyperFrames\n\nTrois clips paused : `.from(phones,{x:(i)=>i*140-210,rotateY:(i)=>i%2?12:-12,opacity:0,stagger:.08,duration:.8,ease:'power2.inOut'})`; wrapper camera wiggle aligné au `progress`; website `from(panel,{z:-220,opacity:0,duration:.6})` et title blur .33 s. Rendre au seek de frame.",
    "checks": [
      "960×540/30 fps/1352 f (45.07 s). Respecter roche sombre, pool cyan, orbit et devices; mockups, écrans, site et marque doivent être originaux/licenciés.",
      "f 0/719/720/1109/1110/1351; transitions propres.",
      "Screens et device assets possédés/licenciés; 1352 f.",
      "Pas de claim de reproduction CGI exacte si aucun pré-rendu 3D n'est fourni."
    ]
  },
  {
    "key": "floating-glass-device-showcase",
    "title": "Floating glass widgets",
    "summary": "Showreel de widgets glassmorphism et fonds tactiles.",
    "family": "product-devices",
    "engines": "both",
    "format": null,
    "durationSeconds": 59,
    "fps": 30,
    "palette": [
      "#8B4DFF",
      "#CE38B8",
      "#C9EF28",
      "#00B5A6"
    ],
    "beats": [
      {
        "at": "0–180 / 0–6 s",
        "description": "Carte statut flottante sur bleu nuit et cube végétal; entrée y 35→0, `scale .94→1`, 20f `power3.out`."
      },
      {
        "at": "180–360 / 6–12 s",
        "description": "Lecteur musique sur nature morte graphique; disque/onde tourne 0→18° en 180f `sine.inOut`."
      },
      {
        "at": "360–540 / 12–18 s",
        "description": "Carte métrique sur fumée N&B, balise horaire; fade + blur 12→0 px en 18f."
      },
      {
        "at": "540–720 / 18–24 s",
        "description": "Widget mise à jour sur volumes blancs; jauge lisse 0→1 sur 90f."
      },
      {
        "at": "720–900 / 24–30 s",
        "description": "Carte météo sur vagues textiles chaudes; pluie de lignes verticale 8f stagger."
      },
      {
        "at": "900–1080 / 30–36 s",
        "description": "Graphique violet sur liquide sombre, bars 0→hauteur 20f."
      },
      {
        "at": "1080–1260 / 36–42 s",
        "description": "Batterie circulaire sur relief gris; `strokeDashoffset` 24f."
      },
      {
        "at": "1260–1440 / 42–48 s",
        "description": "Widgets investissement/call-to-action sur scènes bureau et violet; crossfade 15f."
      },
      {
        "at": "1440–1620 / 48–54 s",
        "description": "Chiffres grands sur texture ondulée; compteur et drift 8px."
      },
      {
        "at": "1620–1770 / 54–59.008 s",
        "description": "Dernière carte graphique sur forme violette, recule `scale 1→.96`, fade noir."
      }
    ],
    "prompt": "Showreel de 59 secondes de widgets en verre givré originaux, une carte translucide élégante au centre de décors abstraits tactiles : bleu nuit, papier blanc, fumée, vagues textiles, liquide sombre et violet. Reflets subtils, profondeur de champ pré-rendue, mouvements caméra très lents, graphiques et données fictives, aucune interface ou marque existante.",
    "recipe": "### Contrat\n\nVidéo  Fidélité : verre givré, cartes centrées, parallax et alternance de décors. Les photos, UI et données financières de la référence sont remplacées par des assets originaux/autorisés.\n\n### Timeline et style\n\nPalette : glace `rgba(255,255,255.18)`, bord `rgba(255,255,255.48)`, ombre `#08151F99`, accents `#8B4DFF,#CE38B8,#C9EF28,#00B5A6`. Police sans-serif ronde; carte 260×150, backdrop blur 18–28px, rayon 18px; calques fond / grain / carte / reflet / contenu / ombre.\n\n### Recettes\n\n**Remotion** : passer chaque décor comme `Img` ou pré-rendu licencié; `GlassCard` possède transform `translate3d(x,y,0) rotateX/rotateY` depuis sinus du frame. Les contenus SVG ont transitions `interpolate`; remplacer les chiffres par props.\n\n**HyperFrames** : fond avec `background-image`, carte `backdrop-filter:blur(24px)`; GSAP paused, labels `0,6,12,18,24,30,36,42,48,54`, `fromTo(card,{y:35,scale:.94,autoAlpha:0},{y:0,scale:1,autoAlpha:1,duration:.66,ease:'power3.out'})`; avancer par `time(frame/30)`.",
    "checks": [
      "captures aux frames 0,180,360,540,720,900,1080,1260,1440,1620,1769",
      "le flou de fond ne rend jamais le contenu de carte illisible",
      "les décors 3D sont pré-rendus ou sous licence"
    ]
  },
  {
    "key": "light-mobile-app-promo",
    "title": "Promo app claire",
    "summary": "Promo mobile claire, son téléphone incliné et ses reveals.",
    "family": "product-devices",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": null,
    "fps": 30,
    "palette": [
      "#E8ECF2",
      "#4B87D7",
      "#1B2534"
    ],
    "beats": [
      {
        "at": "0–5 / 0–150",
        "description": "Footage maison clair à gauche, titre blanc sur voile, entrée téléphone."
      },
      {
        "at": "5–11 / 150–330",
        "description": "Fond gris bleuté, téléphone `rotateZ(12°)`, cartes de fonction et texte latéral."
      },
      {
        "at": "11–19 / 330–570",
        "description": "Variation de screen ; formes organiques SVG, ombres longues et reveals horizontaux."
      },
      {
        "at": "19–23 / 570–690",
        "description": "Composition finale avec CTA et badges de substitution, fade."
      }
    ],
    "prompt": "Publicité mobile claire 16:9, gris bleu poudré, vidéo lifestyle originale autorisée, téléphone générique incliné de 12 degrés avec interface originale, cartes arrondies, ombres longues, formes organiques bleues. Entrées horizontales souples, mise à l'échelle .92 vers 1, CTA final original ; aucune marque, badge store, écran ou texte de référence.",
    "recipe": "### Découpage / couches / palette\n\nFond `#e8ecf2`, bleu `#4b87d7`, encre `#1b2534`, blanc `#fff`; sans-serif humaine medium. Calques : vidéo autorisée/voile, blobs SVG, phone mask, UI, cards, texte, CTA.\n\n### Propriétés\n\n- Hero 0–18f : voile `opacity 0→.45`; titre `x −32→0`, `opacity 0→1`, `easeOutCubic`.\n- Phone 24–48f : `x 70→0`, `scale .92→1`, `rotateZ(16°→12°)`, `easeOutCubic`; ombre synchronisée.\n- Feature cards 150–570f : reveal par `clip-path inset(0 100% 0 0)→inset(0)`, 14f, staggers 6f ; `scale .92→1` en 12f.\n- Outro 570–660f : CTA 16f; frame 660–690 `opacity 1→0`.\n\n### Recettes\n\n**Remotion :** `PhoneMockup` avec `<Img>` original dans le masque ; `interpolate` pour clips/rotation ; `Sequence from={0,150,330,570}`. Ne jamais lire une vidéo non licenciée hors de son contrat.\n\n**HyperFrames :** cards et phone en absolu ; GSAP pausée : `fromTo(phone,{x:70,scale:.92,rotation:16},{x:0,scale:1,rotation:12,duration:.8,ease:'power3.out'}.8)` ; l'adaptateur scrube `frame/30`.",
    "checks": [
      "0, 90, 150 : voile/footage et téléphone alignés.",
      "330, 450, 570 : clips sans bord dur et ombres sous le device.",
      "660, 689 : fin fade et durée de 690 frames."
    ]
  },
  {
    "key": "lime-ai-product-announcement",
    "title": "Lime AI announcement",
    "summary": "Phrase/capsule, stats/cards et outro produit IA noir-lime.",
    "family": "product-devices",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 26.7,
    "fps": 30,
    "palette": [
      "#0B0D0A",
      "#CBFF18",
      "#D8C9FF"
    ],
    "beats": [],
    "prompt": "annonce produit IA abstraite noir et vert lime, capsules pill arrondies, cartes lavande 3D, orb lumineux minimal, données fictives modifiables, sans logo ni chiffre commercial réel",
    "recipe": "### Contrat et limites\n\n960×540, 30 fps, 800 f (26.67 s). Respecter capsules, reveal en cascade et orbite lente; statistiques, labels et produit sont fictifs ou fournis, jamais repris de la référence.\n\n### Découpage\n\n0–269 f (0–8.97 s) phrase/capsule; 270–599 f (9–19.97 s) stats et cards; 600–799 f (20–26.67 s) outro.\n\n### Calques / beats\n\nNoir `#0B0D0A`, lime `#CBFF18`, blanc chaud, lavande pastel `#D8C9FF`, gradients radiaux. Fonte grotesk nette. Intro capsule `scale(.86→1)` 12 f spring 16/180, mots stagger 5 f; cards opacity/y 20→0 et scale .95→1 14 f, stagger 5 f; chiffres count-up déterministe sur 20 f à partir de props; orb SVG tourne 8°/120 f easeInOutSine et glow .65→1.\n\n### Remotion\n\n`StatsCards` props `[{label,value,unit}]`; count via `Math.round(interpolate(local,[0,20],[0,value]))`; capsules `borderRadius:9999`; orb en deux circles blur. Séquences 0/270/600.\n\n### HyperFrames\n\nTimeline GSAP paused par clip : `from(capsules,{scale:.86,opacity:0,stagger:5/30,duration:.4,ease:'back.out(1.3)'})`; cards `{y:20,scale:.95}` .47 s stagger .17; utiliser compteur rendu depuis temps local (pas ticker autonome). Orb rotation seekée.",
    "checks": [
      "960×540, 30 fps, 800 f (26.67 s). Respecter capsules, reveal en cascade et orbite lente; statistiques, labels et produit sont fictifs ou fournis, jamais repris de la référence.",
      "f 0/269/270/599/600/799; chaque valeur est un prop vérifiable.",
      "Aucun chiffre présenté comme réel sans source.",
      "800 f, glow non saturé."
    ]
  },
  {
    "key": "luxury-mobile-device-launch",
    "title": "Ii — lancement luxe noir / indigo",
    "summary": "Présentation sombre d'appareil et les inversions de panneaux.",
    "family": "product-devices",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 87.4,
    "fps": 30,
    "palette": [
      "#05050A",
      "#2936BC",
      "#F6F5F1"
    ],
    "beats": [
      {
        "at": "0–8 s / 0–240",
        "description": "Device noir en perspective à gauche, icône et nom à droite, halo indigo au sol."
      },
      {
        "at": "8–16 s / 240–480",
        "description": "Deuxième arrangement de téléphone, tagline et panneau UI flottant."
      },
      {
        "at": "16–30 s / 480–900",
        "description": "Écran vertical au centre ; cartes/messages UI apparaissent par couches."
      },
      {
        "at": "30–38 s / 900–1140",
        "description": "Focus sur feature ; fond noir et lumière bleue, mouvement lent de caméra."
      },
      {
        "at": "38–55 s / 1140–1650",
        "description": "Panneau blanc avance en `scaleX`, remplace le monde sombre ; device/texte s'inversent."
      },
      {
        "at": "55–74 s / 1650–2220",
        "description": "Déclinaisons clair/sombre, cards et téléphone en pile 2.5D."
      },
      {
        "at": "74–87.37 s / 2220–2621",
        "description": "End card noir, symbole/CTA de remplacement, fade."
      }
    ],
    "prompt": "Film produit d'application premium 16:9 noir minuit et halo indigo, smartphones abstraits noirs flottant en 2.5D, écrans d'application créés sur mesure, copies fictives. Mouvements lents et précis, cartes UI en cascade, grand panneau blanc qui balaie l'écran à mi-parcours et inverse l'interface ; fin minimaliste. Pas de marque, logotype, store badge, UI ou texte de référence.",
    "recipe": "### Découpage, calques et style\n\nCalques : backdrop noir `#05050a`, spotlight `#2936bc`, bloom, devices, captures originales, texte blanc, panneaux `#f6f5f1`. Police : grotesque nette, titre medium/bold. Ombre device : 0 28px 70px `#0008`.\n\n### Mouvements mesurables\n\n- Devices : 18–30f, `opacity 0→1`, `translateY(24px)→0`, `rotateY(−9°→0°)`, `easeInOutCubic`; flottement `translateY ±3px` sur 3 s.\n- Cards UI : 15–22f, `scale .94→1`, `y 14→0`, stagger 4f, `easeOutCubic`.\n- Transition claire 1140–1180f : panneau `transform-origin:left`, `scaleX 0→1`, `power3.inOut`; le texte noir apparaît 8f après le front.\n- Stack 1650–2220f : offsets ±28px/±14px, rotations ±4°, crossfade 12f ; sortie finale 24f `opacity→0`.\n\n### Recettes\n\n**Remotion :** `DeviceMockup` (mask screen + `perspective/rotateY`), `Sequence` pour les sept plages, props `theme`, `screens`, `copy`. Échantillonner le flottement via `Math.sin(frame/90)` uniquement ; toutes les interpolations sont frame-based.\n\n**HyperFrames :** device en `<div>` transform-style preserve-3d, `timeline({paused:true})`; placer les labels dans le même parent que leur device. `fromTo('.light-panel',{scaleX:0},{scaleX:1,duration:40/30,ease:'power3.inOut'},38)` puis seek par frame.",
    "checks": [
      "Frames 0, 240, 480, 900 : horizon, perspective et écrans nets.",
      "1140, 1180, 1650 : front du panneau clair sans clignotement et couleurs inversées cohérentes.",
      "2220, 2520, 2620 : pile lisible, CTA substitué, noir final."
    ]
  },
  {
    "key": "mobile-finance-device-launch",
    "title": "Floating mobile finance",
    "summary": "Téléphone finance flottant, carte UI violette/lime et end card.",
    "family": "product-devices",
    "engines": "both",
    "format": null,
    "durationSeconds": 31.9,
    "fps": 30,
    "palette": [
      "#08090C",
      "#6B4DFF",
      "#C9FF20"
    ],
    "beats": [],
    "prompt": "publicité finance mobile originale, smartphone noir générique flottant en studio sombre, écran UI violet et accent vert lime créé sur mesure, carte translucide, reflets réalistes, sans banque, logo, app ou données réelles",
    "recipe": "### Contrat et limites\n\n960×540/30 fps/956 f (31.87 s). Garder studio noir, téléphone flottant, reflets et perspective; UI, données financières, marque et interface doivent être créées sur mesure.\n\n### Découpage\n\n0–809 f (0–26.97 s) téléphone/carte et mouvements 2.5D; 810–955 f (27–31.87 s) end card.\n\n### Calques / beats\n\nStudio `#08090C`, halo violet `#6B4DFF`, lime `#C9FF20`, phone noir avec notch générique, écran UI violet, card flottante, reflection plane. 0–90 f phone `y:45→0, rotateY:-14→-4, scale:.88→1` cubic-in-out; 90–720 f rotation Y -4→6 et bob y±5px sur 180 f sine; card arrive à 180 f `z:-180→0` 18 f spring; reflets opacity `.1→.35`; end wipe 12 f.\n\n### Remotion\n\n`PhoneMockup` SVG/CSS (assets device autorisés), `perspective:1200`, `transformStyle:'preserve-3d'`; `FinanceUi` props fictifs; `interpolate`/`spring`; reflection avec `scaleY(-1)` + gradient mask. Pour un device photoréaliste, intégrer un pré-rendu 3D original plutôt qu'une capture tierce.\n\n### HyperFrames\n\nClip device 0–810 et outro 810–956. GSAP paused : `.from(phone,{y:45,rotateY:-14,scale:.88,duration:1,ease:'power2.inOut'})`; to rotation/bob avec timeline seekée; card from `{z:-180,opacity:0,scale:.9}` .6 s `back.out(1.2)`. Caméra est un wrapper transformé, jamais un autoplay.",
    "checks": [
      "960×540/30 fps/956 f (31.87 s). Garder studio noir, téléphone flottant, reflets et perspective; UI, données financières, marque et interface doivent être créées sur mesure.",
      "f 0/90/180/809/810/955; téléphone ne sort pas du canvas.",
      "Tous nombres financiers sont explicitement fictifs/test.",
      "956 f, pas de capture d'UI réelle."
    ]
  },
  {
    "key": "mobile-productivity-launch",
    "title": "Mobile productivity launch",
    "summary": "Lancement d'application mobile.",
    "family": "product-devices",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 22.6,
    "fps": 30,
    "palette": [
      "#F7F6F4",
      "#A58EEB",
      "#242128",
      "#C8EF20"
    ],
    "beats": [
      {
        "at": "0–90 / 0–3 s",
        "description": "Fond blanc cassé, lignes fines, promesse typographique; y 15→0, 15f."
      },
      {
        "at": "90–165 / 3–5.5 s",
        "description": "Marque placeholder, anneau lumineux; scale .8→1, 18f."
      },
      {
        "at": "165–270 / 5.5–9 s",
        "description": "Phone vertical sombre, écran contenu; y 80→0, rotateZ 6→0, 24f."
      },
      {
        "at": "270–390 / 9–13 s",
        "description": "Deux téléphones/écrans chat, cartes messages stagger 6f; fond lavande."
      },
      {
        "at": "390–480 / 13–16 s",
        "description": "Phone partiellement cadré + question; transition blanche 12f."
      },
      {
        "at": "480–585 / 16–19.5 s",
        "description": "CTA téléchargement et téléphone du bas; micro bounce `scale .96→1`."
      },
      {
        "at": "585–679 / 19.5–22.635 s",
        "description": "Icône/nom placeholder en sortie, lumière circulaire, fade."
      }
    ],
    "prompt": "Pub application de productivité fictive 16:9, 23 secondes, fond blanc ivoire et lavande, smartphone noir élégant, panneaux de chat et repas/projets fictifs, accent lime, ligne décorative, entrées calmement dynamiques et CTA originaux. Sans interfaces, logo, textes ou icônes de la référence.",
    "recipe": "### Contrat, découpage, direction\n\n Refaire le tempo de promo mobile; concevoir app, messages, marque et écran de téléchargement originaux.\n\nCouleurs `#F7F6F4,#A58EEB,#242128,#C8EF20`; police sans-serif ronde, 16–52px. Calques : fond, lignes, glow, mockup phone PNG/SVG, screen UI, chats, texte, ombre.\n\n**Remotion** : mockup téléphone en SVG, `transform:perspective(900px) rotateZ`; messages mappés avec `Sequence from={...}` et spring doux. **HyperFrames** : `tl=gsap.timeline({paused:true})`, labels `0,3,5.5,9,13,16,19.5`, `fromTo(phone,{y:80,rotation:6},{y:0,rotation:0,duration:.8,ease:'power3.out'})`, seek `frame/30`.",
    "checks": []
  }
];
