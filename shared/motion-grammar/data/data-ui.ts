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

/** data-ui — 12 recettes. */
export const MOTION_DATAUI: readonly MotionRecipe[] = [
  {
    "key": "ai-saas-orbital-launch",
    "title": "AI SaaS orb",
    "summary": "Reveal SaaS sombre, dashboards verre, pièces et orbite lumineuse.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 53.2,
    "fps": 30,
    "palette": [
      "#080611",
      "#7545FF",
      "#F33BCE"
    ],
    "beats": [],
    "prompt": "univers SaaS IA premium abstrait, fond noir violet magenta, panneaux frosted glass sans texte lisible, pièces génériques et sphère lumineuse, rendu studio doux, sans logo",
    "recipe": "### Contrat et fidélité\n\n960×540/30 fps/1596 f (53.20 s). Fidélité : noir violet magenta, profondeur et dolly lent. Dashboards, données, logo et modèle 3D sont à recréer sans reprendre d'UI, assets ou marque tiers.\n\n### Découpage\n\n0–269 f (0–8.97 s) : logo/titre abstrait. 270–1049 f (9–34.97 s) : dashboards, coins et cards en perspective. 1050–1595 f (35–53.2 s) : orb lumineux, convergence et outro.\n\n### Calques et mouvement\n\nFond `#080611`, gradients radiaux violet `#7545FF`/magenta `#F33BCE`, brume pré-rendue, `GlassPanel` rgba blanc .10 / blur, cards, coins abstraits, orb. Fonte : **Sora** sous licence ou alternative. Intro : fog opacity 0→1 24 f, titre y 24→0 18 f sine-out. Chaque card : `translateZ(-240→0)`, `rotateY(8→0)`, opacity 0→1 sur 18 f cubic-in-out, stagger 7 f. Orb : scale .85→1 et halo pulse ±4 % sur 90 f sine; caméra/x parallax 8 px sur 150 f.\n\n### Remotion\n\n`AbsoluteFill` gradients + SVG blur; `GlassPanel` et `PerspectiveCard` avec `transformPerspective:1000`. Pré-rendre WebGL/Three pour pièces et orb si réalisme nécessaire, importé via `OffthreadVideo`; sinon SVG cercles/radial gradients. `Sequence` 0/270/1050; toutes valeurs via `interpolate`/`spring`.\n\n### HyperFrames\n\nTrois clips GSAP paused. DOM : `.stage > .fog + .dashboard + .orb`. Timeline dashboard : `from(cards,{z:-240,rotateY:8,opacity:0,stagger:7/30,duration:.6,ease:'power2.inOut'})`; orb `to(orb,{scale:1.04,duration:1.5,yoyo:true,repeat:-1,ease:'sine.inOut'})`, mais évaluer timeline au temps demandé et ne pas laisser tourner hors scrub.",
    "checks": [
      "f 0,269,270,1049,1050,1595; pas de saut de caméra.",
      "Les cards restent lisibles et l'orb ne clippe jamais.",
      "1596 f, UI/données originales."
    ]
  },
  {
    "key": "automotive-hud-atlas",
    "title": "Automotive HUD atlas",
    "summary": "Catalogue HUD automobile cyan.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 90,
    "fps": 30,
    "palette": [
      "#02070B",
      "#071822",
      "#00B9FF",
      "#77E9FF",
      "#FFFFFF"
    ],
    "beats": [
      {
        "at": "0–180 / 0–6 s",
        "description": "Titre véhicule : fond `#02070B`, liseré cyan, lettres `tracking 40→0`, opacité 0→1, 18f `power3.out`."
      },
      {
        "at": "180–480 / 6–16 s",
        "description": "Planche dashboard : grilles, gauges, widgets. Traits `strokeDashoffset 1→0` sur 24f; scanline x `-960→960` sur 90f linéaire."
      },
      {
        "at": "480–720 / 16–24 s",
        "description": "Carte système/voiture isométrique; nodes échelonnés de 6f, `scale .7→1` ressort doux."
      },
      {
        "at": "720–1050 / 24–35 s",
        "description": "Grand compteur circulaire; aiguille `rotate -125→55deg` 60f `power2.inOut`, arc via dashoffset."
      },
      {
        "at": "1050–1350 / 35–45 s",
        "description": "Batterie et charge : bloc arrondi glisse x 80→0 18f, segments s'allument 5f chacun."
      },
      {
        "at": "1350–1650 / 45–55 s",
        "description": "Console centrale, icônes nav/charge; caméra 2D `scale 1→1.06` 150f."
      },
      {
        "at": "1650–1980 / 55–66 s",
        "description": "Schéma moteur et barre de charge; compteur 0→valeur par interpolation, filaments se dessinent 18f."
      },
      {
        "at": "1980–2310 / 66–77 s",
        "description": "Grille véhicules/silhouettes, reveal en rangée tous les 4f; micro flash blanc 2f aux cuts."
      },
      {
        "at": "2310–2610 / 77–87 s",
        "description": "Atlas d'icônes, zoom `1→1.04`, halo cyan pulsé `opacity .15↔.35` sur 30f."
      },
      {
        "at": "2610–2700 / 87–90.015 s",
        "description": "Extinction : traits `opacity 1→0` 24f, noir."
      }
    ],
    "prompt": "Animation HUD automobile futuriste 16:9, noir profond, lignes vectorielles cyan électrique, schémas d'un véhicule générique, cadrans circulaires, batterie, carte électronique et catalogue d'icônes dessinés sur mesure. Aiguilles pivotantes, arcs SVG qui se dessinent, balayage lumineux, grille et glow maîtrisé; 90 secondes, montage de modules techniques, aucune marque, aucun modèle de voiture ou donnée réelle.",
    "recipe": "### Découpage complet\n\nPalette `#02070B,#071822,#00B9FF,#77E9FF,#FFFFFF`; police technique condensée autorisée, capitales 12/24/64 px. Calques constants : noise 3 %, grille, vecteurs, glow doublé (blur 8px), labels, scanline.\n\n### Remotion et HyperFrames\n\n**Remotion** : SVG pour chaque arc et blueprint; `interpolate(frame,[start,start+24],[pathLength,0])`, `transformOrigin:'50% 50%'` pour aiguilles. Grouper les scènes dans `Sequence`; `Math.floor(frame/12)%2` pour le blink, jamais de hasard.\n\n**HyperFrames** : DOM/SVG séparé par module; `gsap.timeline({paused:true})` avec labels 0,6,16,24,35,45,55,66,77,87 et `.to(path,{strokeDashoffset:0,duration:.8,ease:'power2.out'})`. Seek : `tl.time(frame/30,false)`.",
    "checks": [
      "0/180/480/720/1050/1350/1650/1980/2310/2610/2699",
      "arcs et aiguilles restent seekables à toute frame",
      "contraste cyan lisible sans bloom qui masque les traits"
    ]
  },
  {
    "key": "cyber-neon-network-hud",
    "title": "Réseau HUD cyber bleu-violet",
    "summary": "Lignes de circuit, points animés et panneaux de données cyber bleu-violet.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 25.3,
    "fps": 1,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "Installation du fond gradient et premier panneau d’information; branches lumineuses se révèlent."
      },
      {
        "at": "3–8 s",
        "description": "Le réseau de lignes et de nœuds s’étend; pulsations lumineuses suivent les tracés."
      },
      {
        "at": "8–16 s",
        "description": "Réseau plus dense, circuits/courbes angulaires et petits points en déplacement."
      },
      {
        "at": "16–21 s",
        "description": "Persistance des mouvements d’énergie sur la carte; quelques nœuds scintillent."
      },
      {
        "at": "21–25,26 s",
        "description": "Carte/panneau informatif réapparaît au-dessus du réseau; fin sur un hold propre."
      }
    ],
    "prompt": "Crée une animation abstraite d’interface réseau futuriste, 16:9, 25,26 secondes à 29,97 i/s. Fond dégradé indigo, bleu et violet. Trace progressivement des circuits fins, ramifications à angles nets et nœuds ronds cyan; des impulsions lumineuses parcourent les lignes, sans flash agressif. Affiche une petite carte de données fictives à 0–3 s, laisse le réseau s’étendre de 3 à 21 s, puis fais revenir une carte concise entre 21 et 25,26 s. Style technologique élégant, lignes lisibles, glow discret, composition aérée. Tous les graphes, noms et chiffres sont originaux et inventés. Aucun logo, écran ou musique de la référence; mouvement déterministe et seamless uniquement si demandé.",
    "recipe": "### Recette\n\nDessiner chaque circuit en path SVG, révéler avec stroke offset, puis déplacer un point le long du path via distance normalisée. Palette fond indigo-violet, lignes cyan/bleu froid; bloom simulé par double trait flouté à faible opacité. Contrôler la densité: ne pas superposer un faux dashboard chargé.\n\n**Remotion :** 756 images à 30000/1001; frame `f` donne le temps `f*1001/30000`. Animer dash offsets avec `interpolate`, points via table de longueur/path sampling; graine stable pour nœuds. Cartes HTML/SVG avec données factices, séquences aux beats.\n\n**HyperFrames :** SVG circuits plus panneau HTML, timeline GSAP paused; animer offset et position à partir du temps exact. À chaque seek, appliquer valeurs absolues (`progress`), sans dépendance au temps réel; tester frames avant/après les entrées de carte.\n\n### Validation\n\nRendre 0, 3, 8, 16, 21 et 25 s; vérifier que les points restent sur leurs trajectoires, que les textes demeurent lisibles et que le glow ne bouche pas les lignes. Durées internes approximatives, audio non analysé.\n\n**Droits :** La licence de cette vidéo d’aperçu et des éléments source n’est pas établie par le téléchargement. Les graphes et données du rendu doivent être recréés; n’utiliser que des assets autorisés.",
    "checks": [
      "Rendre 0, 3, 8, 16, 21 et 25 s; vérifier que les points restent sur leurs trajectoires, que les textes demeurent lisibles et que le glow ne bouche pas les lignes. Durées internes approximatives, audio non analysé."
    ]
  },
  {
    "key": "dark-ai-saas-hero",
    "title": "Dark AI SaaS hero",
    "summary": "Hero logiciel IA sombre.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 28.1,
    "fps": 30,
    "palette": [
      "#08070E",
      "#11101B",
      "#4524B8",
      "#9E49FF",
      "#F5F0FF",
      "#E4419B"
    ],
    "beats": [
      {
        "at": "0–105 / 0–3.5 s",
        "description": "Fond noir, fog bleu-violet et titre; opacité 0→1 24f, blur 15→0."
      },
      {
        "at": "105–195 / 3.5–6.5 s",
        "description": "Mot secondaire gradient; halo tourne 8° sur 90f."
      },
      {
        "at": "195–315 / 6.5–10.5 s",
        "description": "Navigation et hero dashboard arrivent depuis profondeur : `scale .76→1`, y 65→0, 24f."
      },
      {
        "at": "315–435 / 10.5–14.5 s",
        "description": "Éléments UI flottent vers l'avant puis se dispersent x ±100, blur 0→10."
      },
      {
        "at": "435–540 / 14.5–18 s",
        "description": "Phrase isolée et cercle outline; stroke se dessine 45f."
      },
      {
        "at": "540–660 / 18–22 s",
        "description": "Bouton/pill violet, texte morphing frame par frame, plume lumineuse."
      },
      {
        "at": "660–750 / 22–25 s",
        "description": "Cartes prix/dashboard fictives; y 35→0 10f stagger."
      },
      {
        "at": "750–843 / 25–28.1 s",
        "description": "Titre final, logo abstrait original rose, fondu noir 18f."
      }
    ],
    "prompt": "Hero 16:9 de 28 secondes pour une plateforme IA fictive, noir encre, brume bleu-violet pré-rendue, halo et lueurs magenta, grande typographie blanche, dashboard abstrait qui sort de la profondeur, cartes de prix fictives, cercle lumineux et emblème rose original à la fin. Très premium, calme, sans marque, UI ou texte de référence.",
    "recipe": "### Contrat et séquence\n\n Reproduire profondeur, fog et transformation UI, sans nom, logo, tableaux, prix ni texte de la référence. Brume/rayons : plate vidéo ou noise pré-rendu original, pas d'aléatoire à l'exécution.\n\nPalette `#08070E,#11101B,#4524B8,#9E49FF,#F5F0FF,#E4419B`; sans-serif géométrique, titres 36–56px. Calques : noir, plate fog, flare, UI CSS, textes, cercle SVG, bloom, grain.\n\n### Moteurs, prompt et QA\n\n**Remotion** : fog via `<OffthreadVideo>` ou boucle de 90f seekée par frame, dashboard DOM, `interpolate` pour z/scale/blur, cercle SVG. **HyperFrames** : GSAP paused labels `0,3.5,6.5,10.5,14.5,18,22,25`; aucun `repeat:-1`, calculer périodiques avec frame; `tl.time(frame/30)`.",
    "checks": [
      "0,105,195,315,435,540,660,750,842",
      "fog et bloom sont seekables et déterministes"
    ]
  },
  {
    "key": "dark-corporate-data-library",
    "title": "Bibliothèque corporate data",
    "summary": "Bibliothèque de modules data sombre.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 372,
    "fps": 30,
    "palette": [
      "#6D102B",
      "#F6F7FB",
      "#E3364F"
    ],
    "beats": [
      {
        "at": "0–15 / 0–450",
        "description": "Intro titre sur montagne sombre, robot/objet 3D de substitution."
      },
      {
        "at": "15–45 / 450–1350",
        "description": "Éléments, tweets/cartes, mini carte et pin."
      },
      {
        "at": "45–75 / 1350–2250",
        "description": "Bar charts et data dashboard."
      },
      {
        "at": "75–105 / 2250–3150",
        "description": "Radar/compteurs, silhouettes et pourcentages."
      },
      {
        "at": "105–135 / 3150–4050",
        "description": "Donuts/circles, timers et gauges."
      },
      {
        "at": "135–165 / 4050–4950",
        "description": "Wave charts, line/area charts."
      },
      {
        "at": "165–205 / 4950–6150",
        "description": "Cartes de pays, chiffres et comparaisons."
      },
      {
        "at": "205–250 / 6150–7500",
        "description": "Social counters, icônes et tags."
      },
      {
        "at": "250–315 / 7500–9450",
        "description": "Drapeaux en grille, reveal/stagger."
      },
      {
        "at": "315–360 / 9450–10800",
        "description": "Variantes de flags/labels et montage de modules."
      },
      {
        "at": "360–371.97 / 10800–11159",
        "description": "Merci/end card."
      }
    ],
    "prompt": "Bibliothèque motion data 16:9 sur photographie de montagnes originale autorisée, overlay navy et bordeaux, modules configurables de cartes, barres, lignes, donuts, gauges, compteurs sociaux, drapeaux et cartes. Entrées de 0,3 à 0,5 s avec staggger net, valeurs strictement injectées ; aucun logo, chiffre, photo, drapeau ou interface de la référence.",
    "recipe": "### Découpage complet par famille\n\nFond photo autorisée + overlay navy `#071124cc`, bordeaux `#6d102b`, blanc `#f6f7fb`, accent rouge `#e3364f`; police sans-serif condensée pour chiffres. Calques : plate photo, voile, grille, module SVG/HTML, labels, marqueurs, grain.\n\n### Propriétés par module\n\n- Toute entrée : 9–15f, `y 16→0`, `opacity 0→1`, `power3.out`; enfants en stagger 4–7f.\n- Barres : `scaleY 0→value`, 18f, origin bottom ; lignes : dashoffset 24f ; donuts : dashoffset circonférence→0, 24f.\n- Countup : props `start/end`, frame-based sur 20–30f, jamais une métrique codée en dur. Flags : `scale .7→1`, 8f, stagger 5f.\n- Changement de famille : couche sort 9f `opacity→0, y −8`; couche suivante commence 3f après. End card 10800–11159f fade.\n\n### Recettes\n\n**Remotion :** créer `DarkCorporateDataKit` paramétrique : `BarChart`, `LineChart`, `Donut`, `MapPin`, `SocialCounter`, `FlagGrid`, tous alimentés par JSON. `Sequence` utilise les intervalles ci-dessus ; faux 3D = asset sous licence/pré-rendu.\n\n**HyperFrames :** un `<section>` par famille et `const tl=gsap.timeline({paused:true})`; SVG inline pour bars/lines/donuts, `tl.to(el,{scaleY:value,duration:.6,ease:'power3.out'})`; l'intégration seeke seulement.",
    "checks": [
      "Frames 0, 450, 1350, 3150, 4950 : fond constant et un seul module dominant.",
      "2250, 4050, 7500, 9450 : valeurs viennent du JSON et aucun compteur ne dépend du temps réel.",
      "10800, 11158 : end card, fade, durée 11 159 frames."
    ]
  },
  {
    "key": "glass-saas-workflow",
    "title": "Micro-UI SaaS glass",
    "summary": "Cards glass violet, le flux et CTA.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 29.7,
    "fps": 30,
    "palette": [
      "#1D123B",
      "#8D67E9",
      "#F8F4FF"
    ],
    "beats": [
      {
        "at": "0–5 / 0–150",
        "description": "Gradient violet flou, titre et première capsule."
      },
      {
        "at": "5–12 / 150–360",
        "description": "Glass cards et bouton, apparition du flux de points."
      },
      {
        "at": "12–21 / 360–630",
        "description": "Réseau/orbite SVG, panneaux de fonctions et ticks."
      },
      {
        "at": "21–26 / 630–780",
        "description": "Composition récapitulative, cards convergent."
      },
      {
        "at": "26–29.73 / 780–892",
        "description": "CTA final / fade."
      }
    ],
    "prompt": "Explainer SaaS 16:9 violet/lavande, fond gradient flouté, panneaux de verre translucide avec bord blanc, interface et texte originaux, réseau de points/orbite SVG et capsules. Glissements de 16–22 frames, petits ressorts doux, convergence vers CTA final ; sans marque, UI, donnée ou logo de la référence.",
    "recipe": "### Découpage, calques, palette\n\nGradient `#1d123b→#8d67e9`, glass `#e9ddff33`, bord `#ffffff66`, encre `#f8f4ff`. Type sans-serif ronde bold. Calques : gradient bruité, bokeh, réseau points/arcs, panels backdrop-filter, UI, texte, CTA.\n\n### Propriétés et recettes\n\n- Cards 150–630f : `x/y ±40→0`, `opacity 0→1`, `scale .94→1`, 16–22f `power3.out`; léger `back.out(1.1)` seulement sur capsules.\n- Réseau 360–630f : nodes 6f stagger, arcs dashoffset 18f ; orbite `rotate 0→360` sur 120f, seekable.\n- CTA 780–850f : cards `scale 1→.96/opacity→0`, CTA 14f ; 850–892f fade.\n- **Remotion :** `GlassProductMicroUI` + SVG, props `cards/nodes/copy`; backdrop est CSS déterministe.\n- **HyperFrames :** `<div class=glass>` + GSAP pausée ; `fromTo` aux secondes 5,12,21,26 ; seek `frame/30`.",
    "checks": [
      "0/150/360 : contraste des cards et titre sur gradient.",
      "630/780 : arcs sans scintillement, panneau jamais autonome.",
      "891 : fade noir, 892 frames."
    ]
  },
  {
    "key": "led-social-panels",
    "title": "Lower-thirds LED industriels",
    "summary": "Lower-thirds comme panneaux LED orange/rouge dans un décor urbain.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 12,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–2 s",
        "description": "Décor urbain et premiers panneaux qui s’allument."
      },
      {
        "at": "2–5 s",
        "description": "Grand titre sur enseigne centrale et quatre rubans sociaux."
      },
      {
        "at": "5–9 s",
        "description": "Variantes de contenu et états des enseignes."
      },
      {
        "at": "9–12,03 s",
        "description": "Dernier arrangement, tenue et fin."
      }
    ],
    "prompt": "Crée une démo 16:9 de 12,03 s à 30 i/s d’enseignes sociales originales dans une rue stylisée. Panneaux sombres, pixels orange/rouges, métal et reflets doux. 0–2 s allumer le décor; 2–5 s présenter un titre générique et rubans CTA; 5–9 s varier les contenus; 9–12,03 s tenir la composition finale. Texte lisible, pas de flicker rapide, aucune marque ou formulation de plateforme copiée.",
    "recipe": "### Recette\n\nPanneaux SVG avec biseau et grille LED, fond urbain original, texte orange/rouge. Allumage par masque/opacity en 6–10 frames puis état stable. Remotion 30 fps/361 frames, scènes séquencées; HyperFrames HTML/SVG et GSAP paused, labels 0/2/5/9 s, seek exact frame/30. Bannir scintillement rapide.\n\n### Contrôle\n\nComparer 0,2,5,9,11,8 s; vérifier aliasing et flash. Audio non audité.\n\n**Droits :** Les droits de l’aperçu, des images urbaines, du design des enseignes, du texte et de l’audio ne sont pas établis. Recréer les panneaux avec des ressources autorisées et du wording original.",
    "checks": [
      "Comparer 0,2,5,9,11,8 s; vérifier aliasing et flash. Audio non audité."
    ]
  },
  {
    "key": "minimal-tech-hud-lines",
    "title": "Connecteurs HUD minimalistes",
    "summary": "Un long showcase de lignes HUD et connecteurs futuristes sur dégradé bleu-violet.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": null,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–12 s",
        "description": "Écran dashboard de démonstration sur gradient, cartes et lignes apparaissent; titre/placeholder et marque preview."
      },
      {
        "at": "12–50 s",
        "description": "Premières familles de connecteurs angulaires, cercles terminaux, chemins lumineux simples; exemples présentés successivement."
      },
      {
        "at": "50–105 s",
        "description": "Nouvelles variantes de jonctions, boucles, angles et pulsations de point; compositions majoritairement centrées."
      },
      {
        "at": "105–160 s",
        "description": "Poursuite de la galerie de motifs sur le même fond chromatique; densité et longueur de traits varient."
      },
      {
        "at": "160–215 s",
        "description": "Exemples supplémentaires de chemins UI et petites combinaisons de nœuds, rythme régulier de présentation."
      },
      {
        "at": "215–252 s",
        "description": "Familles finales de connecteurs et reprises de motifs; certains chemins se dessinent puis tiennent."
      },
      {
        "at": "252–265 s",
        "description": "Retour progressif vers des compositions d’interface/données plus groupées."
      },
      {
        "at": "265–270 s",
        "description": "Dernière carte/branding et fin du preview."
      }
    ],
    "prompt": "Produis un showcase technique 16:9 de 270 secondes à 30 i/s pour un système original de connecteurs UI futuristes. Fond dégradé bleu indigo vers violet avec touches magenta; traits fins presque blancs, chemins angulaires, cercles terminaux et points lumineux qui parcourent chaque branche. 0–12 s : installer un dashboard fictif avec cartes et données non sensibles. 12–252 s : présenter progressivement des familles de connecteurs différents, en tenant chaque tracé avant de passer au suivant; varier les angles, ramifications, boucles et positions sans surcharger. 252–265 s : réunir plusieurs éléments dans une interface cohérente; 265–270 s : conclure sur un écran propre sans logo de banque ni watermark. Animation déterministe, formes SVG originales, petits halos contrôlés, aucune donnée réelle et aucun texte de la référence.",
    "recipe": "### Recette technique\n\nCréer une galerie pilotée par data de chemins SVG (line, elbow, fork, loop, endpoint, dot), chaque scène choisissant une famille, une couleur et un tempo. Traçage par `strokeDashoffset`; point animé au long du chemin; glow en double trait flou bas. Pour 270 s, tenir les motifs 3–8 s avec transitions bornées plutôt que d’animer sans repos. Utiliser libellés et valeurs de dashboard fictifs. Exclure filigrane/branding.\n\n**Remotion :** 8100 images à 30 fps; JSON de scènes `startFrame/endFrame/pathData/pointTiming`. `<Sequence>` par exemple; interpolation de progression clampée. Les motifs sont SVG originaux et paramétrables. Pré-rendre un contact sheet des temps clés 0,12,50,105,160,215,252,265,269.\n\n**HyperFrames :** SVG paths en DOM et données de scènes, `gsap.timeline({paused:true})`, un label par transition de famille. Pour frame `f`, pousser un temps absolu `f/30`, dériver dessin et point de ce temps; ne pas laisser le ticker s’exécuter. Un cas de dashboard final est une séquence HTML/SVG distincte.\n\n### Validation / limites\n\nComparer frames aux secondes listées, puis un point au milieu de chaque tranche longue. Vérifier continuité des paths, repère de branche du point, stabilité après seeking et densité sur 270 s. Les nombreux micro-exemples du pack sont regroupés; préciser qu’il s’agit d’une reconstruction stylistique, pas du clonage frame-exact. Audio non audité.",
    "checks": [
      "Comparer frames aux secondes listées, puis un point au milieu de chaque tranche longue. Vérifier continuité des paths, repère de branche du point, stabilité après seeking et densité sur 270 s. Les nombreux micro-exemples du pack sont regroupés; préciser qu’il s’agit d’une reconstruction stylistique, pas du clonage frame-exact. Audio non audité."
    ]
  },
  {
    "key": "modular-social-infographic-library",
    "title": "Atlas d'infographies UI",
    "summary": "Widgets sociaux, graphiques et UI.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 266,
    "fps": 30,
    "palette": [
      "#232323",
      "#F4F4F4"
    ],
    "beats": [
      {
        "at": "0–30 / 0–900",
        "description": "Intro sur laptop flou, collection de bar charts."
      },
      {
        "at": "30–60 / 900–1800",
        "description": "Line/pie/radial charts, titres de section."
      },
      {
        "at": "60–95 / 1800–2850",
        "description": "People charts, curseurs, compteurs circulaires."
      },
      {
        "at": "95–130 / 2850–3900",
        "description": "Timers, avatars et sets d'icônes."
      },
      {
        "at": "130–170 / 3900–5100",
        "description": "Chat/messages et board UI."
      },
      {
        "at": "170–205 / 5100–6150",
        "description": "Boutons follow/subscribe et badges."
      },
      {
        "at": "205–235 / 6150–7050",
        "description": "Lower thirds, citations, offres/labels."
      },
      {
        "at": "235–255 / 7050–7650",
        "description": "Icônes variées, devises et pictos."
      },
      {
        "at": "255–266.03 / 7650–7981",
        "description": "Logo de remplacement/end card."
      }
    ],
    "prompt": "Atlas d'infographies UI 16:9, fond anthracite et photographie laptop originale floutée, graphiques vectoriels, timers, avatars fictifs, messages, boutons, pictogrammes et lower thirds originaux. Cascades d'éléments toutes les 4–7 frames et masques directionnels de 12–18 frames ; aucune marque sociale, donnée, texte, photo ou icône de la référence.",
    "recipe": "### Découpage complet\n\nFond anthracite `#232323`, photo laptop autorisée floutée, blanc `#f4f4f4`, palettes ponctuelles rouge/bleu/ambre. Sans-serif bold. Couches : backdrop, overlay, grille, widgets, texte, curseur/emoji, grain.\n\n### Propriétés\n\n- Titres : 12f masque `inset(0 100% 0 0)→inset(0)`, `power3.out`.\n- Widgets : 10–16f, `opacity 0→1`, `x/y ±24→0`, stagger 4–7f. Sortie par masque directionnel sur 12–18f.\n- Charts/timers : barres 18f, lignes dashoffset 20f, angles de cercle dashoffset 20f, chiffres depuis props sur 24f.\n- Transitions aux frames 900,1800,2850,3900,5100,6150,7050,7650 : fade 8f puis entrée nouvelle famille, sans lecture autonome.\n\n### Recettes\n\n**Remotion :** `ModularInfographicAtlas` reçoit `sections[]` et fabrique widgets (`Chart`, `Timer`, `AvatarRow`, `Chat`, `ButtonSet`, `LowerThird`, `IconGrid`). `Sequence` aux bornes du tableau et SVG pour graphes.\n\n**HyperFrames :** sections absolues et `gsap.timeline({paused:true})`; les composants occupent des tracks distincts, les clips déclenchent à `startFrame/30`. Ne pas utiliser CSS animation infinite.",
    "checks": [
      "0, 900, 1800, 3900 : aucun chevauchement entre familles de widgets.",
      "5100, 6150, 7050 : directions de mask cohérentes et valeurs injectées.",
      "7650, 7980 : end card de substitution et 7 981 frames."
    ]
  },
  {
    "key": "saas-web-presentation",
    "title": "SaaS web presentation",
    "summary": "Film de présentation web/SaaS.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 35.1,
    "fps": 30,
    "palette": [
      "#061A22",
      "#132E38",
      "#F7F7F4",
      "#83D6C0"
    ],
    "beats": [
      {
        "at": "0–90 / 0–3 s",
        "description": "Fond noir bleuté, micro-logo placeholder et particules."
      },
      {
        "at": "90–210 / 3–7 s",
        "description": "Fenêtre blanche apparaît `scale .92→1`, `rotateY 8→0`, 20f."
      },
      {
        "at": "210–360 / 7–12 s",
        "description": "Page éditoriale sur plan de bureau; mise au point blur 12→0 18f."
      },
      {
        "at": "360–510 / 12–17 s",
        "description": "Titre plein écran, mots apparaissent en deux lignes y 20→0, 12f stagger."
      },
      {
        "at": "510–660 / 17–22 s",
        "description": "Tableau/tableau de données dans carte blanche, entrée y 45→0 `power3.out`."
      },
      {
        "at": "660–810 / 22–27 s",
        "description": "Quote et image sculpturale; pan 3D lent `rotateY -4→3`."
      },
      {
        "at": "810–930 / 27–31 s",
        "description": "Phrase promo; mot accent menthe crossfade."
      },
      {
        "at": "930–1052 / 31–35.067 s",
        "description": "Mur de cartes, écran tablette, laptop, puis logo placeholder sur noir."
      }
    ],
    "prompt": "Film de lancement 16:9 de 35 secondes pour un studio web fictif : environnement bleu nuit, fenêtres web originales blanches, écrans et appareils 3D, grande typographie éditoriale blanche, accent menthe, grille de projets, lentes perspectives et reflets. Sans site, logo, tarifs, images ou texte de la référence.",
    "recipe": "### Contrat et timeline\n\n Faire des screenshots, UI et textes propres au projet; ne pas reprendre le site ou le nom vus dans la référence.\n\nPalette `#061A22,#132E38,#F7F7F4,#83D6C0`; serif éditoriale pour titres, sans-serif 11–48px. Calques : dégradé, grain, screenshots fictifs, cartes, appareil mockup, reflets, texte.\n\n### Recettes, prompt, check\n\n**Remotion** : `WebScene[]`, images en `Img`, perspective CSS et interpolation frame; mockups sont SVG/PNG maison; titres révélés par mask `translateY(100→0%)`.\n\n**HyperFrames** : GSAP paused avec labels `0,3,7,12,17,22,27,31`; transform origin, `autoAlpha`, `filter:blur`; synchronisation `frame/30`.\n\n« Film de lancement 16:9 de 35 secondes pour un studio web fictif : environnement bleu nuit, fenêtres web originales blanches, écrans et appareils 3D, grande typographie éditoriale blanche, accent menthe, grille de projets, lentes perspectives et reflets. Sans site, logo, tarifs, images ou texte de la référence. »",
    "checks": []
  },
  {
    "key": "ui-theme-morph-demo",
    "title": "Prompt UI theme morph",
    "summary": "Démonstration de chat UI clair/sombre avec Remotion ou HyperFrames.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 25.1,
    "fps": 30,
    "palette": [
      "#FAFAF8",
      "#202020",
      "#1D1D1F",
      "#E8E8E4",
      "#F6F6F3",
      "#343434",
      "#4E7BF2"
    ],
    "beats": [
      {
        "at": "0–72 / 0–2.4 s",
        "description": "Carton « deux versions » : moitié blanche/noire, deux mini cartes, titre noir. `scale .92→1`, opacité 0→1 sur 12f `easeOutCubic`."
      },
      {
        "at": "72–180 / 2.4–6 s",
        "description": "UI claire plein écran : fond `#FAFAF8`, titre central, champ arrondi et chips. Le curseur se déplace 80 px en 18f."
      },
      {
        "at": "180–330 / 6–11 s",
        "description": "Saisie frame-by-frame, réponse en lignes à `opacity 0→1` toutes les 5f; zone de saisie reste ancrée au bas."
      },
      {
        "at": "330–405 / 11–13.5 s",
        "description": "Voile noir en `opacity 0→.86` 15f; inversion des tokens et crossfade des mêmes calques sur 15f."
      },
      {
        "at": "405–690 / 13.5–23 s",
        "description": "UI sombre `#202020`, même scène, réponse/éditeur code; glow discret du champ, cursor blink déterministe (12f visible/12f caché)."
      },
      {
        "at": "690–753 / 23–25.1 s",
        "description": "Fondu noir 18f, maintien."
      }
    ],
    "prompt": "Vidéo 16:9 de 25 secondes, démonstration d'un assistant de rédaction fictif. Carton initial divisé clair/noir montrant deux mini interfaces, puis interface claire minimaliste, titre centré, champ de saisie et capsules; texte qui apparaît lettre par lettre, réponse structurée, transition par voile vers exactement la même composition en thème graphite. Design éditorial propre, sans marque, sans logo, sans texte de la référence; mouvements calmes, cursor précis, morph CSS 0,5 seconde, fin en fondu noir.",
    "recipe": "### Découpage et calques\n\nPalette : clair `#FAFAF8/#1D1D1F/#E8E8E4`, sombre `#202020/#F6F6F3/#343434`, accent bleu `#4E7BF2`. Sans-serif neutre (Arial/Helvetica), titre 32 px, UI 10–14 px. Calques : fond, titre, contenu conversation, composer, chips, curseur, voile de thème.\n\n### Recettes déterministes\n\n**Remotion.** Une `ThemeDemo({frame})`; `interpolate(frame,[72,84],[0,1])`, `spring({frame: frame-72, fps:30, config:{damping:200}})` pour le carton. Définir `isDark=frame>=330`; interpoler les couleurs et opacités, ne pas monter un vrai éditeur. Chaque caractère est `text.slice(0, Math.floor((frame-start)/2))`.\n\n**HyperFrames/GSAP.** Construire les deux DOM UI, puis `const tl=gsap.timeline({paused:true})`; labels `intro:0, light:2.4, type:6, switch:11, dark:13.5, out:23`. Utiliser `.to('#veil',{opacity:.86,duration:.5,ease:'power3.out'})`, puis les `autoAlpha` des UI; pilotage uniquement avec `tl.time(frame/30)`.",
    "checks": [
      "frames 0, 72, 180, 330, 405, 690, 752 comparées",
      "tous les changements de thème conservent le même ancrage UI",
      "aucun curseur réel, minuterie ou contenu propriétaire"
    ]
  },
  {
    "key": "web-promotions",
    "title": "Promotions web — vitrine de site animée",
    "summary": "Présentation animée de site web avec panneaux typographiques, cartes médias et cinq variantes couleur.",
    "family": "data-ui",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 141.3,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–25 s",
        "description": "Ouverture du projet et comparaison des variantes graphiques."
      },
      {
        "at": "25–55 s",
        "description": "Présentation du layout et des contrôles de couleur/palette."
      },
      {
        "at": "55–90 s",
        "description": "Edition de titres, textes, contenus et blocs de mise en page."
      },
      {
        "at": "90–121 s",
        "description": "Remplacement des vidéos/images et ajustement du logo ou contenu web."
      },
      {
        "at": "121–141,289 s",
        "description": "Contrôle des pages/scènes, rendu et fin."
      }
    ],
    "prompt": "Produis une vidéo promo originale de site/produit numérique, 40 secondes, 16:9, 30 i/s. Style studio éditorial, beaucoup d’espace, grande phrase d’ouverture originale, rond photo animé, 3 cartes de bénéfices, maquette de navigateur avec contenu fictif, panneau de présentation du service et fin avec CTA générique. Définis cinq palettes interchangeables (ex. lime/ivoire, bleu/vert doux, orange/crème, graphite/cyan, bordeaux/pêche) tout en conservant le même timing; crée aussi une variante qui échange les médias et la grille. Anime les groupes par fade/translation, masque les panneaux couleur, évite le mouvement décoratif excessif. Fournis prompt asset par scène, code Remotion et timeline HyperFrames déterministes, timeline JSON, métriques d’export, thumbnails, sources/licences des médias; aucun logo/site/texte/photo/musique repris du template.",
    "recipe": "### Provenance, inspection et incertitude\n\nArchive `la référence` lue depuis l’archive sous `/tmp` (aucune source modifiée). Projet la référence, PDF/RTF, grandes et petites previews, un tutoriel (141,289 s; 1920×1080; 30 i/s; 4279 images) et six vidéos embarquées de 50 s / 3840×2160 / 30 i/s / 1500 images chacune ont été décodés intégralement; leurs planches ont été inspectées par échantillons à 1 i/s. Projet XML contient de nombreux nœuds de scène et références médias. Aperçu général : composition éditoriale de site, grand slogan « Our Vision », cercle/photo, cartes et capture web, présentation de marque puis end-card. Tutoriel montre les contrôles couleur, texte et remplacement médias/logos.\n\nLes six vidéos media sont H.264 `yuv420p` (pas d’alpha déclaré). Ne pas les traiter comme overlays transparents, même si quelques planches montrent des champs plats saturés : ce sont des rendus complets/plates à recomposer ou à recréer par SVG. Les animations temporelles par élément et leur rôle précis ne peuvent pas être entièrement déduits de planches 1 i/s; les timings ci-dessous sont une recette équivalente, à valider en preview.\n\nDroits des vidéos, preview, polices, photos, captures, logo et éventuellement musique non établis. Le document liste des liens sources pour footage mais ce n’est pas preuve de licence. Utiliser contenus de démonstration fictifs, images et polices autorisées, logos du client seulement avec permission.\n\n### Recette visuelle et animation\n\nMaster 1920×1080, 30 i/s. Construire comme assemblage de cartes UI : fond pastel neutre, grand headline sans-serif en capitales (wording original), image dans cercle masqué, colonne de cartes éditoriales, maquette de page/site, barre d’adresse ou logo générique, end-card. Entrées par translation/fade de 12–24 frames, stagger 4–8 frames. Transitions d’aplats par masque rectangulaire, durée test 18–30 frames. Démo vidéo cible 35–50 s si l’on veut respecter les plates de 50 s; préciser si recadrage/loop. Les cinq « Color » doivent être 5 jeux de palette appliqués au même graphe, pas 5 copies d’animation. Variante « Media » sert au remplacement de plans/captures et au changement d’agencement.\n\nRemotion : composants `Hero`, `CircleMedia`, `FeatureCard`, `BrowserMock`, `Outro`; props centralisées pour la palette, médias, textes. `Sequence` et `interpolate` depuis le numéro de frame; jamais de logo/URL réelle sauf validation. HyperFrames : SVG/DOM, timeline GSAP paused, labels `hero`, `features`, `web-mock`, `outro`, seek précis par frame/30. Les clips source H.264 ont 50 s; pour un projet plus court, utiliser un segment explicite et enregistrer les points in/out.\n\n### Vérifications\n\nExécuter/décoder le rendu complet, examiner début/milieu/fin de chaque scène, contrôler recadrages cercle/cartes, texte mobile et CTA, couleurs sur les deux fonds, gamma/alpha et audio. Déclarer quels médias des sources ont été remplacés et confirmer leur licence. Pour l’exactitude relative à la référence, exiger le projet ouvert ou rendu comparatif; les captures seules donnent l’aspect mais pas les valeurs de keyframe.",
    "checks": [
      "Exécuter/décoder le rendu complet, examiner début/milieu/fin de chaque scène, contrôler recadrages cercle/cartes, texte mobile et CTA, couleurs sur les deux fonds, gamma/alpha et audio. Déclarer quels médias des sources ont été remplacés et confirmer leur licence. Pour l’exactitude relative à la référence, exiger le projet ouvert ou rendu comparatif; les captures seules donnent l’aspect mais pas les valeurs de keyframe."
    ]
  }
];
