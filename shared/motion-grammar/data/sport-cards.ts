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

/** sport-cards — 7 recettes. */
export const MOTION_SPORTCARDS: readonly MotionRecipe[] = [
  {
    "key": "fitness-boxing-opener",
    "title": "Fitness boxing",
    "summary": "Hook lime, montage fitness/boxe, mots massifs et end card, en assets originaux.",
    "family": "sport-cards",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 29.9,
    "fps": 30,
    "palette": [
      "#C7FF00"
    ],
    "beats": [
      {
        "at": "0–119 / 0–3.97 s",
        "description": "hook lime, titre noir massif"
      },
      {
        "at": "120–569 / 4–18.97 s",
        "description": "six plans gym/boxe, mots latéraux et overlays diamant"
      },
      {
        "at": "570–897 / 19–29.93 s",
        "description": "promesse, verrouillage visuel, end card"
      }
    ],
    "prompt": "campagne fitness boxing originale, athlètes fictifs en salle sombre, accent vert citron, texture halftone et poussière, silhouettes contrastées, sans marque ni slogan existant",
    "recipe": "### Contrat et fidélité\n\n960×540, 30 fps, 898 frames (29.93 s). Garder la cadence à cuts et les losanges amortis; footage, athlètes, mots, marque et son doivent être originaux/licenciés.\n\n### Direction et beats\n\nCalques : fond charbon `#111`, footage autorisé N&B, voile contrasté, lime `#C7FF00`, halftone/poussière, copy blanche. Typo : **Anton** ou condensée sous licence. À chaque cut (≈75 f) : footage fade 3 f; mot `x:-140→0` 12 f `expo.out`; diamant SVG `rotate(-25→0), scale(.7→1)` 14 f avec spring damping 14; légère caméra `scale 1→1.03` pendant la tenue. End card : lime wipe 10 f, copy 8 f.\n\n### Remotion\n\n`Sequence` pour intro, puis `OffthreadVideo` par plan avec `startFrom/endAt`; surimposer `Diamond` SVG et `TextSlide`. Calculer les interpolations avec `local = frame - start`; employer `spring` pour le diamant, `interpolate` pour wipes/zoom, `noise` uniquement pré-rendu texture statique.\n\n### HyperFrames\n\n`clip({start:0,end:120})`, six clips de 75 f, end clip 328 f. Chaque timeline GSAP `paused:true` : from footage opacity 0 (.1 s), from text x -140 (.4 s, `expo.out`), from SVG `{rotation:-25,scale:.7}` (.47 s, `back.out(1.5)`). Scrub strict par frame; vider/masquer le précédent plan avant le suivant.",
    "checks": [
      "f 0/119/120/569/570/897 validés visuellement.",
      "Aucun texte ou visage de la référence; 898 f exacts.",
      "Les losanges s'immobilisent sans oscillation après 18 f."
    ]
  },
  {
    "key": "glitch-sport",
    "title": "Glitch Sport — typographie cinétique en dix zones",
    "summary": "Titre sportif glitché avec dix zones vidéo, typo condensée, distorsion chromatique, glitch et accents rouges.",
    "family": "sport-cards",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 25.3,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:04",
        "description": "Cartes géométriques et titre « glitché » sur fond sombre — Accroche flash; mot massif blanc; rouge et noir"
      },
      {
        "at": "00:04–00:10",
        "description": "Lettres surdimensionnées, parfois coupées par les bords — Gros plans typo, découpe/masque, déplacement latéral"
      },
      {
        "at": "00:10–00:20",
        "description": "Rush sportif inséré dans la compo — vidéo d'action en fond ou dans les lettres"
      },
      {
        "at": "00:20–00:45",
        "description": "Remplacement de médias successif dans les dix zones — dix slots autonomes, recadrage cover, rythme séquentiel"
      },
      {
        "at": "00:45–01:18",
        "description": "Plans athlétiques traversés par titres, plaques et glitches — cuts secs, blocs rouges/noirs, impulsion RGB brève"
      },
      {
        "at": "01:18–02:25",
        "description": "Répétition des zones et réglages — alternance titre plein / image plein cadre; cohérence d'entrées"
      },
      {
        "at": "02:25–03:04",
        "description": "Retouches textuelles/couleur et aperçu final — pose hero stable puis extinction/cut final"
      }
    ],
    "prompt": "Crée un film sportif 16:9 de 1920×1080 à 30 fps, d'environ 25,3 secondes. Direction typographique nerveuse : capitales sans sérif très grasses et condensées, blanc lumineux sur noir profond, accent rouge corail. Organise dix beats paramétrables par dix clips d'action différents. Ouvre sur un mot plein écran massif, coupes très rythmées, parfois lettres géantes recadrées; révèle ensuite course et entraînement soit plein cadre, soit à travers les glyphes, avec plaques rectangulaires rouges/noires. Ajoute uniquement aux transitions de courtes perturbations numériques : séparation cyan/rouge de 12 px maximum, micro-jitter, balayage et flash blanc très bref; stabilise aussitôt le texte pour maintenir sa lecture. Entrelace quelques overlays de lumière/grain subtils sans cacher le sujet, puis termine sur une pose hero nette, titre lisible. Garde texte, dix médias, couleur et découpage modifiables. Les effets se calculent par numéro de frame, toutes les images doivent être seekables et identiques lors d'un rerender. N'utilise pas logo, footage, police, musique ou voix du modèle sans droits; remplace par éléments remis ou licenciés pour ce projet.",
    "recipe": "### But et source\n\nRecréer la structure et le mouvement du générateur Apple Motion « Glitch Sport » en Remotion ou HyperFrames. Projet exact : la référence, XML Motion, 30 i/s, 759 images (25,3 s). Format publié 16:9. Projet déclaré 10 textes éditables et 10 Drop Zones; deux calques d'effets « Leak Light » et « Elements » ont leurs opacités liées dans le projet. Ce n'est pas importable comme projet Remotion.\n\n### Matrice source → section\n\nLes lignes `Media/...` sont relatives à `la référence Sport/Glitch Sport/`; le tutoriel est relatif à la racine du pack. Les 14 vidéos réelles sont toutes couvertes par le tableau. Fichiers `__MACOSX/._*` exclus comme métadonnées AppleDouble. Les sources restent aux emplacements originaux.\n\n### Analyse complète du tutoriel et beats\n\nTutoriel examiné en planches d'images à pas de 2 s sur ses 184 secondes; on y voit l'interface FCP et les résultats. Les aperçus MT sont échantillonnés de leur première à leur dernière seconde; les trois overlays sont également couverts par échantillons réguliers sur toute leur durée. Ceci n'est pas une écoute audio temps réel ni une capture export du projet Apple Motion.\n\nLes TC décrivent le tuto; durées exactes des keyframes, courbes d'easing et son de la maquette ne sont pas lisibles dans ces extraits et sont à considérer comme estimations.\n\n### Remotion seekable\n\nCanevas 1920×1080, 30fps, 759 frames. Paramétrer `slots[10] = {src,title,start,duration,crop,accent}`. `frame` est le seul temps. Reveal type : `interpolate(frame,[start,start+12],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)})`. Impulsion glitch déterministe `g=max(0,1-abs(frame-pulse)/3)`, décalage RVB `12*g px`, jamais un random par rendu. Pour slot i proposer `start=24+i*64`; ajuster après comparaison. Clip sous masque de glyphes/plaques, gros titre condensé, couches facultatives Elements/Leak Light, flash de 1–3 images; retourner à une image nette. Exposer les dix médias et titres comme props. Ne pas intégrer par défaut le son unique MT02.\n\n### HyperFrames seekable\n\nHTML/CSS/SVG, dix scènes-slot, `object-fit:cover`, masque SVG de glyphes ou clip-path par panneau. Créer timelines GSAP avec `paused:true`; à chaque frame de rendu, poser `master.time(frame/30,false)`. Toutes les poses aux mêmes offsets que le plan Remotion; glitch uniquement autour des transitions. Interdit : `setTimeout`, `Date.now`, `Math.random`, timeline libre. Sur Chromium contrôler les masques, fonts et filtres par screenshots aux points de transition.\n\n### Droits, limites et QA\n\n`Fonts/Fonts.txt` recommande Montserrat et un dépôt Google Fonts; confirmer licence du fichier/version téléchargés. `Link for videos used in the preview.txt` nomme trois vidéos Pexels : c'est une attribution du bundle, pas preuve du droit du fichier local. Vérifier séparément stock, police, musique, logos, pack source. Valider des stills aux frames 0, 90, 210, 360, 540 et 750; comparer durée, taille/type des titres, lisibilité, densité des cuts, palette et direction des transitions aux MT/tuto. Pour l'exactitude native, ouvrir/exporter la référence dans Apple Motion/FCP et comparer; ces applications ne sont pas utilisées ici. Exactitude des plugins, du blur et des valeurs de keyframe reste non vérifiée.",
    "checks": [
      "`Fonts/Fonts.txt` recommande Montserrat et un dépôt Google Fonts; confirmer licence du fichier/version téléchargés. `Link for videos used in the preview.txt` nomme trois vidéos Pexels : c'est une attribution du bundle, pas preuve du droit du fichier local. Vérifier séparément stock, police, musique, logos, pack source. Valider des stills aux frames 0, 90, 210, 360, 540 et 750; comparer durée, taille/type des titres, lisibilité, densité des cuts, palette et direction des transitions aux MT/tuto. Pour l'exactitude native, ouvrir/exporter la référence dans Apple Motion/FCP et comparer; ces applications ne sont pas utilisées ici. Exactitude des plugins, du blur et des valeurs de keyframe reste non vérifiée."
    ]
  },
  {
    "key": "grunge-portrait-card-opener",
    "title": "Grunge portraits",
    "summary": "Portraits N&B, six cartes créatives, brush wipe et merci final.",
    "family": "sport-cards",
    "engines": "both",
    "format": null,
    "durationSeconds": 41,
    "fps": 30,
    "palette": [
      "#315AFF",
      "#7749F8",
      "#FF4A83",
      "#FFCF3C"
    ],
    "beats": [],
    "prompt": "portraits éditoriaux fictifs noir et blanc détourés, texture papier grunge, coups de brosse blancs, aplats bleu violet rose jaune, sans visage ni mots de référence",
    "recipe": "### Contrat et limites\n\n960×540/30 fps/1230 f (41.00 s). Fidélité : rythme, aplats saturés, brosses et portraits pop. Tous visages, mots et identifiants doivent être originaux.\n\n### Découpage\n\n0–119 f portrait/hook; 120–989 f six cartes (145 f chacune); 990–1229 f merci/end card.\n\n### Calques / beats\n\nPapier/grunge noir, portrait cutout N&B, aplats bleu `#315AFF`, violet `#7749F8`, rose `#FF4A83`, jaune `#FFCF3C`, brosse blanche. Fonte bold condensée. Chaque carte : BrushWipe 7 f; portrait `scale(1.15→1)` 10 f power3.out; titre y 50→0 12 f; texture 0→.18 8 f; sortie slash 6 f. Portrait double en `mix-blend-mode:multiply` décalé 6 px.\n\n### Remotion\n\n`BrushWipe` asset alpha ou SVG; `Card({start,color,portrait,copy})` dans `Sequence`; composer six starts `120+i*145`. `interpolate` pour brush/zoom, `spring` uniquement pour le titre. Précharger PNG alpha.\n\n### HyperFrames\n\nTrois clips intro/cards/outro ou sous-clips par card. GSAP paused: from brush scaleX 0 (.23 s power4.out); from portrait scale 1.15 (.33 s); from title y 50 opacity 0 (.4 s). Reset les layers hors clip.",
    "checks": [
      "960×540/30 fps/1230 f (41.00 s). Fidélité : rythme, aplats saturés, brosses et portraits pop. Tous visages, mots et identifiants doivent être originaux.",
      "f 0/119/120, débuts de six cards, 989/990/1229.",
      "Brush ne masque pas le portrait après 7 f; no protected likeness.",
      "1230 f."
    ]
  },
  {
    "key": "sports-player-card-broadcast",
    "title": "Player-card broadcast",
    "summary": "Grammaire d'animation : neuf cartes de joueurs sportives, reveal orange et outro broadcast. À utiliser pour une vidéo originale 960x540.",
    "family": "sport-cards",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 63,
    "fps": 30,
    "palette": [
      "#F15A24",
      "#F5F0E8",
      "#101010"
    ],
    "beats": [
      {
        "at": "0–89 (0–2.97 s)",
        "description": "fond orange/noir, titre massif et wipe diagonal"
      },
      {
        "at": "90–1769 (2.97–58.97 s)",
        "description": "neuf player cards, une carte par bloc d'environ 186 f; flash de cut entre blocs"
      },
      {
        "at": "1770–1890 (59–63.03 s)",
        "description": "grille récapitulative puis outro"
      }
    ],
    "prompt": "pack broadcast sport 16:9, neuf portraits originaux détourés d'athlètes fictifs, palette noir orange blanc cassé, textures papier et bandes diagonales, éclairage studio dur, sans logo, club, nom ou visage réel",
    "recipe": "### Contrat et fidélité\n\n- Livrer une composition 960×540, 30 fps, `durationInFrames: 1891` (63.03 s).\n- Conserver le rythme, les diagonales, l'empilement 3×3 et les entrées; remplacer portrait, équipe, numéro, texte et musique par des éléments licenciés/originaux. Une copie de marque ou d'athlète n'est pas couverte.\n\n### Direction visuelle\n\nCalques : papier/grain noir → bandes orange `#F15A24` → portrait détouré → silhouette doublée → cadre/card → nom/numéro original → flash blanc. Typo : **Roboto Condensed Black** ou autre fonte condensée sous licence. Garder blanc cassé `#F5F0E8`, noir `#101010`, accent orange.\n\n### Mouvement par beat\n\nSur chaque entrée : bande `translateX(-960→0)` sur 8 f `cubic-bezier(.16,1.3,1)`; portrait `scale(1.08→1)` sur 10 f ease-out; nom en slide 12 f; silhouette et texture avec décalage 2 f. Tenue : dérive de 2 px sinusoïdale. Sortie : flash blanc 2 f, wipe diagonal 8 f. Stagger de la grille : 5 f par carte, `spring({damping:16, stiffness:180})` avec dépassement max 1.04.\n\n### Recette Remotion\n\nCréer `SportsPlayerCard` avec `Sequence from={90 + index*186}` et `interpolate(frame-local,[0,8,18],[ -960,0,0],{extrapolateRight:'clamp'})`. Utiliser `Img` pour des PNG cutout, `AbsoluteFill` pour les bandes en `clipPath: polygon(...)`, et `useCurrentFrame` pour tous les styles. Composer `PlayerCardGrid` avec neuf instances; `random` doit être seedé par index. Aucun `setTimeout`, CSS animation, ni transition aléatoire.\n\n### Recette HyperFrames\n\nStructure : `clip.intro(0,90)`, `clip.card(i,90+i*186,186)`, `clip.outro(1770,121)`. Dans chaque clip, construire les calques DOM ci-dessus et une timeline GSAP `paused:true`: `.from(band,{x:-960,duration:8/30,ease:'power4.out'}).from(portrait,{scale:1.08,duration:10/30,ease:'power3.out'},'<').from(copy,{x:-120,opacity:0,duration:12/30},'-=.18')`. Le moteur positionne la timeline à `localFrame/30`; aucune lecture autonome.",
    "checks": [
      "Capture aux f 0, 89, 90, 98, 1769, 1770, 1890 : aucun flash inattendu ni bord hors champ.",
      "Chaque carte arrive dans son bloc et la grille est complète à 59 s.",
      "Render 960×540/30 fps/1891 f; texte et images originaux, pas d'asset protégé."
    ]
  },
  {
    "key": "sports-player-intro-posters",
    "title": "Sports player intro posters",
    "summary": "Série d'affiches d'introduction de joueurs.",
    "family": "sport-cards",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 79.6,
    "fps": 30,
    "palette": [
      "#EDEBE6",
      "#272727",
      "#ED4762",
      "#00D9C1",
      "#F6792C",
      "#B83C82",
      "#93C56B"
    ],
    "beats": [
      {
        "at": "0–150 / 0–5 s",
        "description": "Titre outline sur béton blanc; tracking 28→0 15f, texture 5 %."
      },
      {
        "at": "150–300 / 5–10 s",
        "description": "Sous-titre joueur, logo placeholder; deux slashes teal/pink entrent x ±960→0, 14f."
      },
      {
        "at": "300–540 / 10–18 s",
        "description": "Poster 1 : joueur cutout devant mot vertical, `scale .78→1.03→1` 22f `back.out(1.5)`."
      },
      {
        "at": "540–780 / 18–26 s",
        "description": "Poster 2 rouge/noir, wipe diagonal 10f et silhouette dupliquée 8 px."
      },
      {
        "at": "780–1020 / 26–34 s",
        "description": "Poster 3 rose, nom énorme derrière, oscillation caméra -2→2 px."
      },
      {
        "at": "1020–1260 / 34–42 s",
        "description": "Poster 4 orange/blanc, photo secondaire crop dans bande; 3 calques stagger 5f."
      },
      {
        "at": "1260–1500 / 42–50 s",
        "description": "Poster 5 rose/gris; stripe typographique de gauche à droite 16f."
      },
      {
        "at": "1500–1740 / 50–58 s",
        "description": "Poster 6 bleu/violet en cadre, cartes latérales arrivent `rotateY 12→0`."
      },
      {
        "at": "1740–1980 / 58–66 s",
        "description": "Poster 7 crème/rouge; brush smear reveal 12f."
      },
      {
        "at": "1980–2220 / 66–74 s",
        "description": "Poster 8 vert, mot de fond dépasse cadrage, impact flash 2f."
      },
      {
        "at": "2220–2387 / 74–79.562 s",
        "description": "Fin de papier et éclair outline, fade vers fond clair."
      }
    ],
    "prompt": "Série de 10 posters de joueurs fictifs 16:9, béton blanc texturé, typographie ultra-condensée surdimensionnée, portraits d'athlètes licenciés détourés, couleurs magenta/teal/orange/vert qui varient, slashs diagonaux et impacts rapides, look editorial sportif, sans équipes, blasons, noms ou maillots existants.",
    "recipe": "### Contrat\n\n Fidélité : succession d'affiches sportives, découpage nerveux, texte immense, découpes athlète et texture papier. Noms, clubs, maillots, badges, photos et logos sont obligatoirement remplacés par un kit original/licencié.\n\n### Beats complets\n\nPalette de substitution : base `#EDEBE6/#272727`, accents au choix par joueur `#ED4762,#00D9C1,#F6792C,#B83C82,#93C56B`; fonte extra-condensée autorisée; calques : ciment, wordmark géant, cutout PNG, dupliqué coloré, panneau, labels, grain.\n\n### Recettes\n\n**Remotion** : une liste `players[]` et `Sequence` de 240f, `PlayerPoster`; CSS `mixBlendMode:multiply` pour texture, `spring` pour cutout, SVG clip polygon pour wipes.\n\n**HyperFrames** : les posters sont DOM absolu; GSAP paused labels `0,5,10,18,26,34,42,50,58,66,74`; `fromTo('.athlete',{scale:.78},{scale:1.03,duration:.4,ease:'back.out(1.5)'})` puis settle; `tl.time(frame/30)`.",
    "checks": []
  },
  {
    "key": "sports-torn-paper-opener",
    "title": "Sport torn collage",
    "summary": "Titre outline, collage sport grunge, chevrons et outro.",
    "family": "sport-cards",
    "engines": "both",
    "format": null,
    "durationSeconds": 28,
    "fps": 30,
    "palette": [
      "#C9FF00",
      "#F4F4EC"
    ],
    "beats": [],
    "prompt": "poster sport original noir et vert lime, athlètes fictifs autorisés, cadres papier déchiré, chevrons et texture béton, sans club, logo, visage ou slogan existant",
    "recipe": "### Contrat et limites\n\n960×540, 30 fps, 840 f (28.00 s). Conserver contraste noir/lime, texte contour et impacts; athlètes, logos et copy sont strictement originaux/licenciés.\n\n### Découpage\n\n0–119 f (0–3.97 s) title outline; 120–719 f (4–23.97 s) collage sportif; 720–839 f (24–28 s) outro.\n\n### Calques / beats\n\nFond noir `#111`, grain/béton, lime `#C9FF00`, blanc, athlete cutout, cadres papier déchiré, chevrons SVG. Fonte condensée en `-webkit-text-stroke:2px #F4F4EC; color:transparent`. Intro outline scale .9→1 12 f. Par séquence : chevrons `x:-100→0` 8 f expo-out, photo mask 12 f, portrait x 60→0/scale 1.07→1 10 f, jitter déterministe ±1px (frame modulo 3), sortie flash 2 f.\n\n### Remotion\n\n`OutlineText`, `TornFrame`, `ChevronRow`; `Sequence` intro 120 f, 5 scènes ×120 f, outro 120 f. Générer jitter par table fixe et frame%3, jamais par random. SVG polygons et `interpolate` pour moves.\n\n### HyperFrames\n\nClips 0–120, 120–720 avec sous-timelines 120 f, outro. GSAP paused : title from `{scale:.9,opacity:0,duration:.4,ease:'expo.out'}`; chevrons stagger .04 s; portrait `{x:60,scale:1.07}` .33 s. Simuler grain via image overlay, pas animation CSS.",
    "checks": [
      "960×540, 30 fps, 840 f (28.00 s). Conserver contraste noir/lime, texte contour et impacts; athlètes, logos et copy sont strictement originaux/licenciés.",
      "f 0/119/120/719/720/839; outline net sur fond.",
      "Jitter ne crée aucun scintillement excessif.",
      "840 f, assets originaux."
    ]
  },
  {
    "key": "urban-fashion-cinematic-reel",
    "title": "Reel mode urbaine nocturne",
    "summary": "Un court montage de mode urbaine nocturne avec cuts rythmés et traitement cinématique.",
    "family": "sport-cards",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 24.5,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Entrée directe dans l’ambiance de mode urbaine, premier plan/personnage et décor de ville."
      },
      {
        "at": "4–9 s",
        "description": "Alternance de détails de tenues et portraits, éclairage nocturne à contraste fort."
      },
      {
        "at": "9–16 s",
        "description": "Succession de personnages/plans urbains, certains en voiture ou éclairés par sources ponctuelles."
      },
      {
        "at": "16–21 s",
        "description": "Nouveaux angles et coupes rapides, variation du gros plan au plan plus large."
      },
      {
        "at": "21–24,47 s",
        "description": "Derniers portraits/looks et fin de preview."
      }
    ],
    "prompt": "Réalise un reel original de mode urbaine de 24,47 s, 16:9, 30 i/s, avec des personnes et lieux autorisés. Ambiance nocturne contemporaine, noirs détaillés, lumières urbaines ponctuelles, accents chauds et froids. Monte 0–4 s sur le personnage et l’environnement, 4–9 s sur détails/portraits, 9–16 s sur une alternance de scènes et de mouvement, 16–21 s sur angles plus variés, puis termine sur un look fort entre 21 et 24,47 s. Cuts précis, changement de cadrage régulier, grade homogène et peau naturelle. N’ajoute pas de watermark; n’emploie aucun visage, plan, costume distinctif ou musique provenant de la référence.",
    "recipe": "### Reproduction\n\nFaire un montage original de 5–10 plans licenciés, conserver continuité de couleur (noirs profonds mais détail présent, accents néon chauds/froids). Couper aux changements de mouvement; ajouter aucun overlay obligatoire. Une légère vitesse variable n’est à utiliser qu’avec footage prévu pour cela.\n\n**Remotion :** séquence de vidéos avec `Sequence` et `OffthreadVideo` selon version/doc du projet; chaque plan découpé au frame. LUT/grade cohérent pré-rendu ou filtre CSS mesuré; transitions majoritairement cuts.\n\n**HyperFrames :** `<video>` préchargée dans DOM et clips avec in/out précisés, timeline GSAP paused; aucun scrubbing dépendant de la lecture réelle. Puisque le look dépend du contenu, tests sur mêmes rushes de production.\n\n### Vérification / limites\n\nComparer 0,4,9,16,21,24 s; contrôler cohérence colorimétrique, cuts et respect des droits des sujets. La valeur de la référence vient du footage; cette fiche décrit sa grammaire de montage et ne peut garantir une copie pixel-identique avec d’autres plans. Son non audité.",
    "checks": [
      "Faire un montage original de 5–10 plans licenciés, conserver continuité de couleur (noirs profonds mais détail présent, accents néon chauds/froids). Couper aux changements de mouvement; ajouter aucun overlay obligatoire. Une légère vitesse variable n’est à utiliser qu’avec footage prévu pour cela."
    ]
  }
];
