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

/** collage-archive — 11 recettes. */
export const MOTION_COLLAGEARCHIVE: readonly MotionRecipe[] = [
  {
    "key": "archive-torn-paper-collage",
    "title": "Collage papier",
    "summary": "Question, collage archive papier déchiré et logo final.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 20.3,
    "fps": 30,
    "palette": [
      "#F7F5EE",
      "#C7342D"
    ],
    "beats": [],
    "prompt": "collage éditorial original monochrome sur papier ivoire, masque papier déchiré diamant, planches contact, annotation crayon rouge, sans image, texte ou logo existant",
    "recipe": "### Contrat et limites\n\n960×540/30 fps/610 f (20.33 s). Conserver blanc, diamant déchiré, planches contact et crayon; photos, phrases et logo doivent être originaux ou sous licence.\n\n### Découpage\n\n0–119 f (0–3.97 s) question. 120–389 f (4–12.97 s) collage et bande film. 390–609 f (13–20.33 s) verrouillage puis logo final.\n\n### Calques / mouvement\n\nFond blanc `#F7F5EE`; noir encre, rouge crayon `#C7342D`, gris photo; papier déchiré PNG/SVG, filmstrips, image N&B. Texte sérif éditoriale + manuscrite sous licence. Reveal diamant `clipPath polygon irrégulier` 12 f power3.out; bandes film `x:960→-80` sur 75 f linear; photos `rotate(-3→0), scale(.92→1)` 12 f spring; crayon stroke 16 f.\n\n### Remotion\n\n`TornMask` SVG ou PNG alpha; `Sequence` 0/120/390; `Img` avec `clipPath`; bande sous forme d'éléments répétés transformés avec modulo frame. Dessin crayon SVG dashoffset. Garder le mouvement frame-based.\n\n### HyperFrames\n\nClips `question`, `collage`, `outro`; GSAP paused. `.from(mask,{clipPath:'polygon(50% 50%...)',duration:.4,ease:'power3.out'})`; track `.to(track,{x:-1040,duration:2.5,ease:'none'})`; stroke dash .53 s. Ne pas utiliser de CSS keyframes.",
    "checks": [
      "960×540/30 fps/610 f (20.33 s). Conserver blanc, diamant déchiré, planches contact et crayon; photos, phrases et logo doivent être originaux ou sous licence.",
      "f 0/119/120/389/390/609; contours de déchirure nets.",
      "Loop bande film sans saut; assets sous licence.",
      "610 f exacts."
    ]
  },
  {
    "key": "beautiful-slideshow",
    "title": "Soigné — reconstruction Remotion / HyperFrames",
    "summary": "Reconstituer en Remotion ou HyperFrames le diaporama soigné observé, avec ses dix pages photo, ses titres, ses fuites de lumière, sa poussière et ses transitions géométriques.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 107.1,
    "fps": 30,
    "palette": [],
    "beats": [],
    "prompt": "> Crée un diaporama 16:9 de 50 secondes, 30 i/s, composé de dix pages photo de 5 secondes. Respecte une esthétique élégante de souvenir de voyage/mariage : photographie plein cadre, recadrage lent de type Ken Burns, titre personnalisable court, bordure grunge discrète, vignette et texture poussière fines. Sur quelques raccords seulement, ajoute un flash géométrique blanc/gris très bref; emploie des fuites de lumière rouges ou bleues en arrière-plan avec faible opacité. Garde les sujets et textes lisibles, contraste suffisant, aucune surcharge d’effets. Fournis une composition entièrement seekable : image de chaque frame déterminée par son numéro, sans horloge réelle ni hasard non seedé. Demande les dix images et les textes à l’utilisateur ou utilise uniquement des assets dont la licence est validée. N’intègre aucun média du pack de référence. Génère le projet Remotion (30 fps, 1500 frames) et une version HTML/HyperFrames équivalente avec timeline paused et seek par frame, plus une planche de frames à 0, 149, 150, 749, 1499 et un rapport de validation des coupes, du contraste et des zones de sécurité.",
    "recipe": "### Inventaire de sources et couverture\n\nArchive : la référence — éléments extraits uniquement sous `/tmp/template-packs/beautiful/` pour analyse.\n\n**9/9 vidéos réelles couvertes.** Le ZIP contient aussi neuf entrées la référence ou la référence (forks de ressources AppleDouble), qui ne sont pas des vidéos supplémentaires et ne se décodent pas comme des médias. Les huit fichiers la référence sont des éléments d’overlay/transition, pas des scènes filmées de personnes ou de lieux. Les dix `Drop Zone 01.jpg` à `Drop Zone 10.jpg` sont des pages blanches numérotées servant de placeholders. La vidéo tutorielle est une capture d’écran Final Cut, pas un plan de contenu final. Le PDF donne l’installation de modèles FCP; `Font Link.txt` mentionne Amatic et une URL Font Squirrel, sans établir ici les droits de redistribution de la police.\n\n### Analyse du tutoriel et du projet\n\nRepères visuels approximatifs du tutoriel (échantillonnage des images à 1 seconde; vidéo intégralement décodée, sans erreur) :\n\n- `00:00–00:09` : ouverture du modèle et aperçu de page numérotée; choix du titre/élément dans le navigateur FCP.\n- `00:10–00:34` : remplacement séquentiel des drop zones par des photos; la consigne visible demande d’ajouter une photo à chaque zone.\n- `00:35–00:50` : sélection, échelle et repositionnement pour recadrer chaque image.\n- `00:51–01:05` : répétition du remplacement pour les autres pages, rythme de diaporama régulier.\n- `01:06–01:23` : modification des textes et réglage de couleur, style et taille.\n- `01:24–01:47` : réglages finaux et aperçu de la séquence.\n\nLe fichier de projet la référence annonce une durée de scène d’environ 50,05 s (base de temps interne 120 000 unités/s) et un paramètre de durée 1500. Les pages occupent environ cinq secondes chacune; prévoir 10 pages × 5 s = 50 s, puis mesurer le rendu de référence si l’on veut aligner le dernier frame. Les pistes du projet montrent des couches de bordure, vignette, mosaïque, poussière et fuites lumineuses ainsi que des flashes de forme autour des changements de page. Les nombres de blend mode du XML sont des identifiants propriétaires : ne pas les interpréter comme des noms CSS sans comparaison visuelle. Le MOV la référence est encodé sur fond clair/noir et son alpha n’est pas établi; reconstruire la bordure avec SVG/CSS ou un masque plutôt que supposer une transparence native.\n\n### Grammaire visuelle à reproduire\n\n1. Canvas 16:9, 1920×1080 logique. Dix images en plein cadre, chacune tenue environ 5 s.\n2. Image : fondu/cut doux au début de page, léger mouvement lent (scale 1.00→1.06 et déplacement de quelques pourcents) pour éviter un arrêt statique; garder le mouvement discret, le modèle ne fournit pas une courbe exacte de Ken Burns.\n3. Titres : courts, grands, lisibles, placés dans une zone libre de l’image; texte modifiable indépendamment par page. Le pack cite Amatic dans un fichier texte, mais ne redistribuer/embarquer aucune police sans validation de licence. Prévoir une police de remplacement locale.\n4. Texture : vignette légère et bord grunge, grain/poussière en faible opacité. Fuites rouge/bleue utilisées par touches, pas en continu au premier plan. Éclat géométrique bref sur les raccords.\n5. Palette chaude et romantique, contraste doux, mouvement des overlays plus lent que les coupes.\n\n### Recette Remotion déterministe et seekable\n\nUtiliser `useCurrentFrame` comme unique horloge. La fonction de rendu ne lit ni `Date.now` ni l’état aléatoire non seedé. Les assets photo doivent être fournis par l’utilisateur ou issus d’une source licenciée; ils ne sont pas dans le ZIP.\n\n```tsx\nimport {AbsoluteFill, Img, Sequence, interpolate, useCurrentFrame} from 'remotion';\n\nconst PAGE_FRAMES = 150; // 5 s à 30 i/s\nconst clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};\nfunction Page({src, title, index}: {src: string; title: string; index: number}) {\n const f = useCurrentFrame; // temps local à la Sequence\n const scale = interpolate(f, [0, PAGE_FRAMES - 1], [1, 1.06], clamp);\n const x = interpolate(f, [0, PAGE_FRAMES - 1], [0, index % 2 ? -24 : 24], clamp);\n const fade = interpolate(f, [0, 12, PAGE_FRAMES - 12, PAGE_FRAMES - 1], [0, 1, 1, 0], clamp);\n return <AbsoluteFill style={{overflow: 'hidden', opacity: fade}}>\n <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `translateX(${x}px) scale(${scale})`}} />\n <div className=\"vignette\" />\n <div className=\"film-grain\" />\n <h1>{title}</h1>\n </AbsoluteFill>;\n}\nexport const Slideshow = ({pages}: {pages: {src: string; title: string}[]}) => <AbsoluteFill>\n {pages.slice(0, 10).map((p, i) => <Sequence key={i} from={i * PAGE_FRAMES} durationInFrames={PAGE_FRAMES}>\n <Page {...p} index={i} />\n </Sequence>)}\n</AbsoluteFill>;\n```\n\nAjouter les flashes de raccord en séquences de 8–18 frames centrées sur chaque coupe, en SVG (formes blanches avec masque/blur), et décliner deux versions de fuite colorée en gradients/vidéos d’overlay dûment licenciés. Une texture calculée doit utiliser un seed fixe dérivé de l’index de page. Pour une reproduction stable, tous les paramètres sont des fonctions du frame local; test : rendre le frame `149`, `150`, `151`, puis rechercher un seek direct à `600` identique au frame 600 du rendu séquentiel.\n\n### Recette HyperFrames / HTML seekable\n\nLe DOM doit être une fonction pure du temps exposé par le moteur de timeline. Avec GSAP, créer une timeline paused et l’avancer explicitement à partir du frame demandé (les sélecteurs sont uniques par page); ne piloter aucune animation en temps réel.\n\n```js\nconst fps = 30, pageFrames = 150;\nconst tl = gsap.timeline({paused: true});\ndocument.querySelectorAll('[data-page]').forEach((el, i) => {\n const image = el.querySelector('img');\n tl.fromTo(image, {scale: 1, x: i % 2 ? 24 : -24},\n {scale: 1.06, x: i % 2 ? -24 : 24, duration: 5, ease: 'none'}, i * 5);\n tl.fromTo(el, {autoAlpha: 0}, {autoAlpha: 1, duration: .4}, i * 5);\n tl.to(el, {autoAlpha: 0, duration: .4}, i * 5 + 4.6);\n});\nfunction seekFrame(frame) { tl.pause.seek(frame / fps, false); }\n```\n\nChaque page contient `img`, titre, calque de vignette et texture statique ou pré-rendue. Le lecteur/exporteur doit appeler `seekFrame(n)` dans l’ordre demandé par son rendu; la même frame `n` doit toujours produire les mêmes pixels. Le raccord peut être un élément indépendant `data-cut` dont opacité dépend de `abs(t - cutTime)`.\n\n### Variantes\n\n- **Pages/titres** : 10 placeholders numérotés peuvent devenir des chapitres, lieux, dates ou phrases; un seul titre court par page. Ne pas reprendre le nom de marque du pack.\n- **Zoom** : zoom avant 1.00→1.06 ou recul 1.06→1.00; déplacement horizontal ±24 px/1080p ou vertical ±16 px; alterner seulement si le cadrage le permet.\n- **Overlays** : bordure grunge SVG; poussière/grain subtil; lumière rouge, bleue ou neutre; mosaïque brève; flash géométrique long (jusqu’à 3,16 s source) ou court (1,76 s source), mais pour une version élégante limiter le flash au raccord à 0,25–0,6 s.\n- **Sortie** : pour 25 i/s, recalculer toutes les durées depuis les secondes (125 frames/page) au lieu de réutiliser les 150 frames.\n\n### Contrôle et limites\n\n- Vérifier le nombre de pages, recadrages, absence de bandes, fondu aux raccords et synchronisation des titres.\n- Inspecter les frames de début/fin et les zones de bordure à 100%; s’assurer que le grain n’obscurcit pas le texte.\n- Sous-titres non nécessaires pour un diaporama muet; respecter contraste, flashs rares et sensibilité photosensible.\n- La vidéo a été décodée intégralement; l’analyse visuelle des longues boucles la référence repose sur des images échantillonnées toutes les 2 secondes, pas sur une annotation manuelle de chacun des 3000 frames. Le tutoriel a été échantillonné à 1 image/s. Son AAC n’a pas fait l’objet d’une analyse d’écoute.\n- Les règles de licence commerciale, la licence de la police Amatic, les droits des images fournies et la permission de redistribution des overlays restent à vérifier.",
    "checks": [
      "Vérifier le nombre de pages, recadrages, absence de bandes, fondu aux raccords et synchronisation des titres.",
      "Inspecter les frames de début/fin et les zones de bordure à 100%; s’assurer que le grain n’obscurcit pas le texte.",
      "Sous-titres non nécessaires pour un diaporama muet; respecter contraste, flashs rares et sensibilité photosensible.",
      "La vidéo a été décodée intégralement; l’analyse visuelle des longues boucles la référence repose sur des images échantillonnées toutes les 2 secondes, pas sur une annotation manuelle de chacun des 3000 frames. Le tutoriel a été échantillonné à 1 image/s. Son AAC n’a pas fait l’objet d’une analyse d’écoute.",
      "Les règles de licence commerciale, la licence de la police Amatic, les droits des images fournies et la permission de redistribution des overlays restent à vérifier."
    ]
  },
  {
    "key": "documentary-grain-timeline",
    "title": "Documentary timeline grain",
    "summary": "Chronologie documentaire en noir et moutarde.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 102.1,
    "fps": 30,
    "palette": [
      "#101017",
      "#E8E8E5",
      "#D39A22",
      "#5D5C69"
    ],
    "beats": [
      {
        "at": "0–210 / 0–7 s",
        "description": "Photo mécanique N&B, année géante émerge derrière : `scale 1.18→1`, blur 8→0 18f."
      },
      {
        "at": "210–510 / 7–17 s",
        "description": "Année 1 et cartouche moutarde; label glisse x -80→0 15f `power3.out`; poussière permanente."
      },
      {
        "at": "510–810 / 17–27 s",
        "description": "Portrait femme, anneau dessiné 24f, année traverse à droite."
      },
      {
        "at": "810–1110 / 27–37 s",
        "description": "Groupe/événement, cut flash blanc 2f, même gabarit."
      },
      {
        "at": "1110–1410 / 37–47 s",
        "description": "Couple, tag et description; Ken Burns 100→108 % sur 300f."
      },
      {
        "at": "1410–1710 / 47–57 s",
        "description": "Portrait serré; chiffre avant-plan `opacity .25→1` 12f."
      },
      {
        "at": "1710–2010 / 57–67 s",
        "description": "Scène famille; carton moutarde peut se retourner `rotateY 90→0` 12f."
      },
      {
        "at": "2010–2310 / 67–77 s",
        "description": "Photo duo, travelling x -18→18 px; anneaux et flèches rouges remplacés par accents originaux."
      },
      {
        "at": "2310–2610 / 77–87 s",
        "description": "Photo animal/terrain, année grande et tag; dissolve 10f."
      },
      {
        "at": "2610–2910 / 87–97 s",
        "description": "Portrait femme, intensification fumée `opacity .15→.35`."
      },
      {
        "at": "2910–3063 / 97–102.1 s",
        "description": "Montage final de silhouettes/caméra, année puis fondu noir 24f."
      }
    ],
    "prompt": "Chronologie documentaire 16:9 de 102 secondes, photos d'archive correctement licenciées ou générées, noir bleuté, grain de pellicule, fumée lente, grand millésime blanc, cartouche moutarde, fines annotations et anneaux dessinés. Transitions flash et dissolve courtes, Ken Burns lent, informations factuelles fournies par l'utilisateur, aucune photo, année, phrase ou logo de la référence.",
    "recipe": "### Recettes et prompt\n\n**Remotion** : données `events[]`, un `TimelineEvent` par `Sequence`; année avec `interpolate(frame,[start,start+18],[.8,1])`, image `scale 1→1.08`; grain asset transparent à opacité .08.\n\n**HyperFrames** : chaque événement est un div photo/année/tag; timeline GSAP paused avec labels 0,7,17,27,37,47,57,67,77,87,97. `to(photo,{scale:1.08,duration:10,ease:'none'})`; seek sur frame.\n\n« Chronologie documentaire 16:9 de 102 secondes, photos d'archive correctement licenciées ou générées, noir bleuté, grain de pellicule, fumée lente, grand millésime blanc, cartouche moutarde, fines annotations et anneaux dessinés. Transitions flash et dissolve courtes, Ken Burns lent, informations factuelles fournies par l'utilisateur, aucune photo, année, phrase ou logo de la référence. »",
    "checks": []
  },
  {
    "key": "documentary-history-timeline",
    "title": "Timeline documentaire",
    "summary": "Timeline documentaire sépia, événements historiques et montage final.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 101.1,
    "fps": 30,
    "palette": [
      "#D9CCB0",
      "#2B241D",
      "#B58A37"
    ],
    "beats": [],
    "prompt": "pack documentaire sépia, papier ancien, photos d'archives originales ou domaine public vérifié, fumée légère, grilles fines et cartouches moutarde, aucun personnage ou texte de référence",
    "recipe": "### Contrat et fidélité\n\n960×540, 30 fps, 3032 f (101.07 s). Refaire seulement le langage éditorial : archives sous licence, faits sourcés, dates vérifiées; ne pas recopier photos, biographies, narration ou titres.\n\n### Découpage\n\n0–239 f / 0–7.97 s : titre sur papier. 240–2639 f / 8–87.97 s : 10 événements de 240 f, chacun photo + date + annotation. 2640–3031 f / 88–101.07 s : montage accéléré puis fermeture.\n\n### Direction et beats\n\nPapier `#D9CCB0`, encre `#2B241D`, moutarde `#B58A37`, fumée/grain en overlays; photo dans panneaux masqués. Serif éditoriale sous licence (ex. **Cormorant Garamond**) + sans condensée. Chaque événement : panneau `clipPath inset(0 100% 0 0)→inset(0)` 12 f cubic-out; photo Ken Burns 100→108 % sur 210 f; date opacity/blur 0→1/0 8 f; dissolution 6 f. Montage final : bandes de 15 f, flash 2 f, pas de strobe prolongé.\n\n### Remotion\n\n`events.map` avec `{start, image, year, claim}` et `Sequence from={240+i*240}`. Photo `Img` transform scale interpolé; `PaperPanel` clip-path; `NoiseOverlay` asset vidéo/PNG autorisé. Les facts restent des props sourcées; prévoir `sourceUrl` dans les données.\n\n### HyperFrames\n\nUn clip intro, `event-${i}` 240 f, outro. GSAP paused : `from(panel,{clipPath:'inset(0 100% 0 0)',duration:.4,ease:'power3.out'})`, `to(img,{scale:1.08,duration:7,ease:'none'},0)`, `from(label,{filter:'blur(8px)',opacity:0,duration:.27}.18)`. Seek local frame exact.",
    "checks": [
      "f 0,239,240, chaque début/fin d'événement, 2639,2640,3031.",
      "Chaque assertion possède une source éditoriale hors vidéo.",
      "Aucun faux fait, archive non licenciée ou flicker de masque."
    ]
  },
  {
    "key": "editorial-infinite-carousel",
    "title": "Editorial carousel",
    "summary": "Portfolio ivoire et six scènes de carrousels continus.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 35.1,
    "fps": 30,
    "palette": [
      "#F5F0E6",
      "#202018"
    ],
    "beats": [],
    "prompt": "portfolio éditorial original sur fond ivoire, cartes photo arrondies, photographies autorisées de design, typographie raffinée, ombres douces, sans images ni marque de référence",
    "recipe": "### Contrat et limites\n\n960×540/30 fps/1052 f (35.07 s). Conserver continuité horizontale, cartes arrondies et ombres; employer photos/portfolio et textes originaux.\n\n### Découpage\n\n0–174 f scène carousel 1; 175–349 f scène 2; 350–524 f scène 3; 525–699 f scène 4; 700–874 f scène 5; 875–1051 f scène 6.\n\n### Calques / beats\n\nIvoire `#F5F0E6`, encre `#202018`, accents discrets, cards rayon 22 px, ombre `0 16px 40px #1d1b1322`. Fonte serif élégante (ex. DM Serif Display sous licence). Chaque track avance de 0 à `-cardWidth*setLength` pendant 150 f linear, dupliqué pour loop; parallaxe image 5 px sine; transition entre scènes crossfade 8 f et y ±16 px.\n\n### Remotion\n\n`InfiniteTrack` : rendre deux fois le set, `translateX = -((localFrame*speed)%trackWidth)`; images `objectFit:cover`; `Sequence from={scene*175}`. Bannir `Math.random` et calculer toutes tailles depuis width props.\n\n### HyperFrames\n\nSix clips, track DOM avec deux jeux identiques. Timeline GSAP paused `.to(track,{x:-trackWidth,duration:5,ease:'none'})`; la position seekée recommence au bon point. Transition CSS/GSAP `autoAlpha` sur .27 s; `perspective:900px` avec rotateY max 3° pour card centrale.",
    "checks": [
      "960×540/30 fps/1052 f (35.07 s). Conserver continuité horizontale, cartes arrondies et ombres; employer photos/portfolio et textes originaux.",
      "f 0/174/175/349/350/524/525/699/700/874/875/1051.",
      "Aucune couture quand la track recommence; 1052 f.",
      "Cards et images originales/licenciées."
    ]
  },
  {
    "key": "forensic-evidence-board",
    "title": "Evidence board",
    "summary": "Titre documentaire, evidence board, polaroids et annotations tracées.",
    "family": "collage-archive",
    "engines": "both",
    "format": null,
    "durationSeconds": 35,
    "fps": 30,
    "palette": [
      "#11141A",
      "#E43B32",
      "#F0C84B"
    ],
    "beats": [],
    "prompt": "tableau d'enquête fictif contemporain, portraits noir et blanc générés/originaux, notes papier, ruban rouge, labels jaunes, grille forensique, sans personnes, affaire, logo ou texte réel",
    "recipe": "### Contrat et limites\n\n960×540, 30 fps, 1050 f (35.00 s). Reprendre board, traits, stickers et CRT; utiliser portraits fictifs, annotations et faits originaux/sourcés, jamais des identités ou éléments d'enquête réels.\n\n### Découpage\n\n0–239 f (0–7.97 s) logo/titre. 240–869 f (8–28.97 s) board : notes, polaroids, liens et labels. 870–1049 f (29–35 s) end card.\n\n### Calques / mouvement\n\nFond charbon/grille `#11141A`, papier blanc cassé, rouge marqueur `#E43B32`, jaune label `#F0C84B`, portraits N&B; fonte mono + sans bold. Stickers `scale(.7→1), rotate(±5→0)` 14 f `spring(16,170)` stagger 6 f; liens SVG `strokeDashoffset:length→0` 18 f ease-out; CRT/grain opacity .12; sortie via luma-mask noir 10 f.\n\n### Remotion\n\n`EvidenceItem[]` props (asset, position, rotation, note); `Sequence from={240+index*6}`; `svg path` with `strokeDasharray`/`strokeDashoffset` interpolés; polaroids en `AbsoluteFill` transform. `calculateMetadata` valide 1050 f. Aucun canvas aléatoire non seedé.\n\n### HyperFrames\n\n`clip.intro(0,240)`, `clip.board(240,630)`, `clip.end(870,180)`. DOM board positions absolues, timeline GSAP paused : `from(items,{scale:.7,opacity:0,rotation:=>randomRotation,duration:.47,stagger:.2,ease:'back.out(1.4)'})`; dessiner les paths par `strokeDashoffset` sur .6 s; seek à frame/30.",
    "checks": [
      "960×540, 30 fps, 1050 f (35.00 s). Reprendre board, traits, stickers et CRT; utiliser portraits fictifs, annotations et faits originaux/sourcés, jamais des identités ou éléments d'enquête réels.",
      "f 0/239/240/869/870/1049.",
      "Tous les liens finissent dessinés; pas de nom/personne réel.",
      "1050 f à 30 fps, aucune rotation non déterministe."
    ]
  },
  {
    "key": "grid-cutout-portfolio",
    "title": "Portfolio grille/cutouts",
    "summary": "Grille technique, les cutouts et contrôles.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": null,
    "fps": 30,
    "palette": [
      "#0B0B12",
      "#16113A"
    ],
    "beats": [
      {
        "at": "0–8 / 0–240",
        "description": "Fond noir, invitation de background, grille discrète."
      },
      {
        "at": "8–18 / 240–540",
        "description": "Portrait cutout sur grille, texte de contrôle et curseur couleur."
      },
      {
        "at": "18–30 / 540–900",
        "description": "Cutouts organiques/textures dans deux cadres, transformations lentes."
      },
      {
        "at": "30–43 / 900–1290",
        "description": "Variation de grille, formes irrégulières et scènes empilées."
      },
      {
        "at": "43–50 / 1290–1500",
        "description": "Palette/contrôles de couleur, zoom local."
      },
      {
        "at": "50–55 / 1500–1650",
        "description": "End card de remplacement."
      }
    ],
    "prompt": "Portfolio motion graphique 16:9, fond noir avec grille fine, portraits éditoriaux originaux détourés dans masques polygonaux/organique, cadres techniques, panel de palette RGB et contrôles factices. Entrées scale .82 à 1, rotations ±3 degrés, reveals par mask, zoom final ; pas de visage, logo, texte ou image de la référence.",
    "recipe": "### Découpage timecodé\n\nNoir `#0b0b12`, violet nuit `#16113a`, grille `#ffffff25`, accents RGB. Sans-serif compact. Couches : fond, grille, cards/frame, clips polygonaux, portraits, texte, control UI, grain.\n\n### Propriétés et recettes\n\n- Cutout 240–900f : mask clip polygon déjà en place ; contenu `scale .82→1`, `rotate −3°→0°`, 18f `power3.out`; shadow opacity .0→.45.\n- Cadres : translate `±32→0`, 12f, stagger 5f ; contrôles `clip-path inset(0 100% 0 0)→0`, 12f.\n- 900–1290f : swaps en crossfade 8f et rotations ±3° ; zoom 1290–1500f `scale 1→1.18`, `easeInOutSine`.\n- **Remotion :** `GridCutoutShowcase`, `clipPath` SVG pour formes, props portraits/palette ; `Sequence` six beats.\n- **HyperFrames :** SVG defs et `clip-path:url(#…)`, GSAP paused anime transform/opacity, camera parent puis seek par frame.",
    "checks": [
      "0/240/540 : grille alignée et masks ne coupent pas les ombres.",
      "900/1290/1500 : crossfades et zoom du parent.",
      "1649 : end card/fade, 1 650 frames."
    ]
  },
  {
    "key": "retail-fashion-lineup",
    "title": "Retail fashion lineup",
    "summary": "Plan de groupe mode retail sobre et recadrage lent.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 15,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:03",
        "description": "Four young adult models grouped in front of retail shelving; central figure taller and forward, two figures clustered left, one right. — Static composition with small subject/head changes between samples; slight reframing may be source-camera motion."
      },
      {
        "at": "00:03–00:08",
        "description": "Same take and formation; clothing silhouettes and shelves remain stable. — No graphic overlay or obvious cut. Avoid inventing movement."
      },
      {
        "at": "00:08–00:15",
        "description": "Same take through end; exposure and framing remain broadly consistent. — Finish on the live image; no observed title card."
      }
    ],
    "prompt": null,
    "recipe": "### Rebuild recipe\n\n**Assets:** an authorized wide fashion group shot with four people, layered retail shelves, neutral realistic light. Keep the center person slightly forward. For a designed substitute, shoot one locked-off 16:9 take; do not fabricate a branded shop.\n\n**Remotion:** make one 451-frame composition at 30 fps. Put the footage in `OffthreadVideo`/`Video` on a 1920×1080 `AbsoluteFill`. A restrained crop animation may use scale 1.00→1.025 over frames 0–450 with `Easing.inOut(Easing.quad)` only if a comparison confirms the source drift; otherwise hold scale at 1.00. Do not add text, speed ramps, transitions or synthetic subject gestures absent from the reference. Audio remains silent unless licensed ambience is separately supplied.\n\n**HyperFrames:** one full-duration video layer, `data-start=\"0\"`, `data-duration=\"15.033\"`; keep the timeline paused and seekable. If confirmed by closer frame comparison, animate a wrapper from `scale(1)` to `scale(1.025)` with one GSAP `fromTo` over 15.033 s and `ease: \"none\"`; use `timeline.progress(frame / 451)` rather than autoplay.\n\n### Full generation prompt\n\nCreate a 15.03-second, 1920×1080, 30 fps realistic fashion retail group-shot plate. Show four adult fashion models standing close together in a contemporary clothing store with orderly shelves behind them: a taller central person in a pale graphic T-shirt, two people grouped at camera-left in muted pastel outfits, and one person in a dark outfit at camera-right. Use a straight-on eye-level medium-wide composition, subdued natural retail lighting and restrained editorial color. Hold the same take almost continuously; preserve authentic micro-movement, keep the camera locked or add only an extremely slow 2.5% push-in if needed. No title, captions, logos, fake signage, cutaways, artificial gestures, or added transitions. Deliver a clean licensed substitute shot, not a reconstruction using the source frame.\n\n### Comparison and acceptance\n\nCompare source/rebuild at 0, 3, 7, 11 and 15 s: group spacing, camera height, shelf lines, clothing value balance and crop. Verify no added cuts or text, 16:9 framing and a continuous 15.03 s duration. Record any inferred camera push as an estimate.",
    "checks": []
  },
  {
    "key": "scrapbook-collage-transitions",
    "title": "Icônes CTA sociales rouges",
    "summary": "Une galerie de CTA illustrés rouges et blancs.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 32.4,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–5 s",
        "description": "Planche de boutons et bulles sur gradients pastel."
      },
      {
        "at": "5–11 s",
        "description": "Stickers rouges superposés à un plan sombre/personne."
      },
      {
        "at": "11–23 s",
        "description": "Présentation des pictogrammes individuels sur rose-violet."
      },
      {
        "at": "23–27 s",
        "description": "Combinaisons de bandeaux, abonnement et notification."
      },
      {
        "at": "27–32,43 s",
        "description": "Dernières variantes simples et fin."
      }
    ],
    "prompt": "Réalise 32,43 s, 16:9 à 30 i/s, de pictogrammes CTA originaux. Rouge vif et blanc sur dégradés rose-violet. Crée badges de forme bulle, capsule et pastille, avec symboles propres au projet pour aimer, suivre, partager et recevoir des notifications. 0–5 s galerie de base, 5–11 s aperçu sur une scène autorisée, 11–23 s icônes isolées, 23–27 s bandeaux combinés, puis dernière planche jusqu’à 32,43 s. Pop bref puis stabilisation, aucun logo/symbole de plateforme repris de la référence.",
    "recipe": "### Recette\n\nCréer set d’icônes SVG génériques, silhouettes bulle/capsule/pastille/burst arrondi. Pop de 6–8 frames puis hold; couleurs rouge et blanc. Remotion : 30 fps, 973 frames, séquences data-driven avec interpolation bornée. HyperFrames : SVG/HTML et GSAP paused, labels aux temps ci-dessus, seek frame/30; valeurs absolues sans autoplay.\n\n### Validation\n\nComparer 0, 5, 11, 23, 27 et 32 s; contrôler silhouettes et lisibilité. Durées regroupées à partir des échantillons; audio non caractérisé, droits non vérifiés.",
    "checks": [
      "Comparer 0, 5, 11, 23, 27 et 32 s; contrôler silhouettes et lisibilité. Durées regroupées à partir des échantillons; audio non caractérisé, droits non vérifiés."
    ]
  },
  {
    "key": "scrapbook-travel-collage",
    "title": "Collage scrapbook de voyage",
    "summary": "Une vidéo de voyage en scrapbook avec papiers, mains et bandes film.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 40.1,
    "fps": 1,
    "palette": [],
    "beats": [
      {
        "at": "0–5 s",
        "description": "Fragments papier/stickers se déploient sur le premier plan de voyage."
      },
      {
        "at": "5–12 s",
        "description": "Route et randonnée révélées par composition de collage."
      },
      {
        "at": "12–20 s",
        "description": "Scènes quotidiennes/cuisine accompagnées de notes et éléments dessinés."
      },
      {
        "at": "20–30 s",
        "description": "Paysages et stickers découpés encadrent les sujets."
      },
      {
        "at": "30–40,06 s",
        "description": "Dernières scènes et reprise des composants scrapbook."
      }
    ],
    "prompt": "Monte un film de voyage scrapbook 16:9, 40,06 s à 29,97 i/s, avec plans autorisés de route, randonnée, quotidien et paysage. Fais entrer feuilles de carnet crème, papier déchiré, stickers originaux et morceaux de pellicule; les pièces se posent au bord avec ombre discrète. Révèle chaque nouveau plan par un masque papier puis stabilise la composition. 0–12 s découverte/route, 12–20 s scènes quotidiennes, 20–30 s nature et variantes, 30–40,06 s fin graphique. Palette pastel, gestes doux et déterministes. Ne pas reprendre les plans, mains, dessins ou textes de la preview.",
    "recipe": "### Recette Remotion + HyperFrames\n\nPapiers et film strips en SVG, masques irréguliers fixes; photos autorisées dans `clipPath`. Transition par feuille qui balaie l’image, éléments qui se posent par petite translation/rotation. Remotion : 1200 frames au taux 30000/1001, `Sequence` par scène, seed stable. HyperFrames : DOM/SVG + timeline GSAP paused, seek `frame*1001/30000`; tester raccords des masques et aucun autoplay.\n\n### Validation / limites\n\nContrôler 0,5,12,20,30,39,5 s, masques et lisibilité. Beats groupés depuis les samples 1 fps; transitions précises et musique non analysées.\n\n**Droits :** Les droits des rushes, photos, mains, stickers et compositions de la prévisualisation ne sont pas établis. Les assets doivent être remplacés par des éléments autorisés.",
    "checks": [
      "Contrôler 0,5,12,20,30,39,5 s, masques et lisibilité. Beats groupés depuis les samples 1 fps; transitions précises et musique non analysées."
    ]
  },
  {
    "key": "y2k-fashion-collage",
    "title": "Collage mode Y2K",
    "summary": "Collage streetwear Y2K, ses flashes et RGB split.",
    "family": "collage-archive",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 27.7,
    "fps": 30,
    "palette": [
      "#040404",
      "#2548FF",
      "#24EE39",
      "#B529D4",
      "#FF4A98"
    ],
    "beats": [
      {
        "at": "0–4 / 0–120",
        "description": "Fond noir, mots verticaux répétés, bandes bleues et first flash."
      },
      {
        "at": "4–11 / 120–330",
        "description": "Portrait magenta/violet dans cadre décalé, titre diagonal."
      },
      {
        "at": "11–19 / 330–570",
        "description": "Collage de cadres/texture, duplication RGB et scanlines."
      },
      {
        "at": "19–24 / 570–720",
        "description": "Grille d'icônes/éléments verts, cuts courts."
      },
      {
        "at": "24–27.70 / 720–831",
        "description": "Carton final / fade."
      }
    ],
    "prompt": "Collage fashion Y2K 16:9, fond noir, bandes bleu électrique, portrait éditorial original violet/magenta, mots typographiques originaux verticaux, cadres décalés, scanlines et légère aberration chromatique. Slides très rapides, flashes de 1–2 frames, cuts nets et fin graphique ; aucun visage, vêtement, texte, logo ou texture de la référence.",
    "recipe": "### Découpage / style\n\nNoir `#040404`, bleu électrique `#2548ff`, vert acide `#24ee39`, violet/magenta `#b529d4/#ff4a98`, blanc. Type sans-serif ultra-bold condensée. Calques : fond, pattern texte, bandes, portrait masqué, frames, type, RGB split, scanlines/grain.\n\n### Propriétés par beat\n\n- Wipes 0–120f : strips `x −100%→0` en 8f `expo.out`; flash blanc 1–2f aux cuts.\n- Portrait/cadres : `x ±80→0`, `rotate ±7°→0°`, 12f `expo.out`; cadre secondaire avec retard 2f.\n- RGB split 330–570f : trois copies offset `(−3,0)/(0,0)/(3,0)` pendant 2f puis retour ; scanlines opacity .12.\n- Icons 570–720f : grid scale `.65→1`, 8f, stagger 3f; outro 720–831f `scale 1→1.04`, opacity→0.\n\n### Recettes\n\n**Remotion :** `FashionTypeCollage` en DOM + `clipPath`; le flash est une `Sequence` de 2 frames, RGB split via trois filtres/copies. Utiliser `interpolate` uniquement et textures fournies.\n\n**HyperFrames :** calques HTML, `tl=gsap.timeline({paused:true})`; strips/cadres par `xPercent/rotation`, scans via overlay. Fixer le frame courant avec `tl.time(frame/30)` ; pas de CSS loops.",
    "checks": [
      "0/120/330 : strips, flashes et portraits sans clip involontaire.",
      "570/720 : RGB split limité aux beats et grille lisible.",
      "830 : fade final, 831 frames."
    ]
  }
];
