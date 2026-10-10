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

/** typography — 25 recettes. */
export const MOTION_TYPOGRAPHY: readonly MotionRecipe[] = [
  {
    "key": "bounce-text-animations",
    "title": "Rebondissant — reconstruction Remotion / HyperFrames",
    "summary": "Titres lettre par lettre rebondissant en Remotion ou HyperFrames, avec entrée rebondissante, décalage séquentiel et variantes de couleur.",
    "family": "typography",
    "engines": "both",
    "format": null,
    "durationSeconds": 69.4,
    "fps": 59,
    "palette": [],
    "beats": [],
    "prompt": "> Produit un titre animé autonome de 5,83 secondes, 1920×1080, 30 i/s, inspiré d’un preset typographique bounce : grand texte modifiable, graisse forte, alignement centré, entrée caractère par caractère de gauche à droite. Chaque glyphe monte depuis environ 42 px sous sa position, dépasse sa ligne de base d’au plus 12 px, puis amortit jusqu’à l’arrêt; délai entre lettres réglable de 2 à 5 frames. Donne aussi les contrôles pour sens inversé, amplitude plus forte/faible, vitesse et fond/cartouche coloré. Le texte d’exemple doit être remplaçable et ne doit pas conserver « Leany made it. ». Ne suppose pas de droits pour la police Gilroy : utiliser une police locale/licenciée ou un fallback. Timeline frame-based, seekable, sans horloge système, appels réseau ni hasard non seedé. Livre une composition Remotion de 175 frames et une page HyperFrames/GSAP avec timeline paused et seekFrame(frame), un manifeste éditable des 30 préréglages, et des captures aux frames 0, 6, 15, 30, 60, 120 et 174. Pour les variantes 16–30, ajouter une plaque arrondie ou forme de couleur derrière le texte; la couleur doit être choisie dans une palette fournie explicitement et rester contrastée.",
    "recipe": "### Inventaire vidéo source\n\nArchive la référence; extraction d’analyse sous `/tmp/template-packs/bounce/` uniquement.\n\n**1/1 vidéo réelle couverte.** Le ZIP contient aussi une entrée la référence, fork AppleDouble de métadonnées, pas une seconde vidéo. Les 30 dossiers `Bounce - 01` à `Bounce - 30` contiennent chacun un preset Motion la référence et des vignettes `large.png`/`small.png`. Les dossiers `Media` ne contiennent pas de rushes: il s’agit d’animations de texte. Les vignettes ne sont pas des scènes source. Le texte d’exemple XML est `Leany made it.`; le template cite Gilroy ExtraBold dans ses informations de police, avec un lien externe mais sans preuve de droits d’incorporation.\n\n### Analyse temporelle du tutoriel\n\nLa vidéo tutorielle a été décodée intégralement; inspection visuelle par contact sheet à 1 i/s. Repères approximatifs :\n\n- `00:00–00:09` : navigateur des titres FCP et choix d’un preset Bounce.\n- `00:09–00:20` : dépôt du titre au-dessus de la timeline, aperçu du texte d’exemple animé.\n- `00:20–00:34` : remplacement du texte dans l’inspecteur; vérification de la composition dans le visualiseur.\n- `00:34–00:49` : réglage de l’apparence (couleur/fond, alignement, taille, style); l’interface montre les contrôles d’édition du titre.\n- `00:49–01:09` : comparaison des presets et aperçu final. La capture ne contient aucune scène filmée externe ni voix à reproduire.\n\nLes XML déclarent un texte 3D, dimensions de référence 1920×1080 et taille de texte 110; timing autour de 175/177 images à base 30 i/s (soit environ 5,83–5,90 s). Les éléments d’animation sont des comportements attachés au texte, avec paramètres `Animate`, `Spread`, `Direction`, `Speed` et des entrées/sorties réparties sur quelques images. Les identifiants de paramètres ne donnent pas directement un easing CSS universel; les courbes ci-dessous sont un proxy visuel déterministe, à ajuster au rendu de comparaison.\n\n### Langage du mouvement\n\n- Départ compact ou décalé; les glyphes arrivent en séquence plutôt qu’en bloc.\n- Chaque caractère dépasse légèrement sa position finale vers le haut, puis revient avec amortissement. Un décalage de 2–5 frames par caractère donne l’effet cascade; inverser l’ordre pour certaines variantes.\n- Le texte reste lisible et immobile jusqu’à la fin du clip. La sortie ne doit pas être inventée si le titre est destiné à rester affiché.\n- Composition centrée, grande graisse; échelle de référence environ 110 dans un canvas 1920×1080, à adapter proportionnellement.\n- Les vignettes 01–15 montrent principalement du texte clair sans plaque colorée visible; 16–30 montrent un fond/trait coloré type pastille ou cartouche. Les couleurs exactes se lisent au rendu, pas comme des noms dans le XML.\n\n### Catalogue des 30 variantes\n\nLes noms sont conservés tels qu’identifiés dans les dossiers du ZIP. On peut reproduire un catalogue fonctionnel avec profils d’animation « sobre », « ample », « rapide », « inversé » et profils de cartouche, sans prétendre que les paramètres propriétaires sont identiques. La distinction visible la plus stable est 01–15 texte simple / 16–30 texte avec cartouche ou forme colorée. Pour vérifier un preset précis, consulter sa vignette originale localement et régler `staggerFrames`, `overshoot` et direction par comparaison.\n\nCouleurs distinctes visibles dans le montage de vignettes du ZIP : vert/citron, cyan/bleu, rose/magenta, jaune, turquoise et rouge. Il faut choisir la valeur en échantillonnant la vignette du preset, pas associer une valeur hexadécimale inventée. Une version d’implémentation peut stocker pour chaque ID `direction`, `staggerFrames`, `overshoot`, `settleFrames`, `plateColor`, `plateRadius` dans un manifeste éditable.\n\n### Recette Remotion seekable\n\nLe composant calcule la position de chaque lettre depuis `useCurrentFrame`. `spring` est déterministe en frame, mais l’interpolation ci-dessous donne un overshoot simple et reproductible. Le texte est segmenté en graphèmes Unicode pour préserver accents/emoji.\n\n```tsx\nimport {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';\nconst clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};\nfunction Glyph({char, index, start, stagger, overshoot}: any) {\n const f = useCurrentFrame - start - index * stagger;\n const y = interpolate(f, [0, 7, 15, 23], [42, -overshoot, 0, 0], {\n ...clamp, easing: Easing.bezier(0.2, 0.8, 0.25, 1),\n });\n const opacity = interpolate(f, [0, 3, 10], [0, 1, 1], clamp);\n const scale = interpolate(f, [0, 7, 15], [0.88, 1.04, 1], clamp);\n return <span style={{display: 'inline-block', opacity, transform: `translateY(${y}px) scale(${scale})`}}>{char === ' ' ? '\\u00a0' : char}</span>;\n}\nexport const BounceTitle = ({text, start=0, stagger=3, overshoot=12}: any) => {\n const glyphs = Array.from(new Intl.Segmenter('fr', {granularity: 'grapheme'}).segment(text), x => x.segment);\n return <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>\n <h1 style={{fontFamily: 'Gilroy, Arial, sans-serif', fontSize: 110, fontWeight: 800}}>\n {glyphs.map((c, i) => <Glyph key={`${i}-${c}`} char={c} index={i} start={start} stagger={stagger} overshoot={overshoot}/>)}</h1>\n </AbsoluteFill>;\n};\n```\n\nChaque `Sequence` dure 175 frames à 30fps. Pour le preset avec cartouche, dessiner un `span`/SVG derrière le titre et faire apparaître son opacité depuis le même frame local. Aucun font non licencié ne doit être inclus; remplacez-le par une graisse sans sérif autorisée si besoin.\n\n### Recette HyperFrames / GSAP seekable\n\nConstruire une timeline `paused`; un tween par lettre, avec position `start + i * stagger/fps`. Sur demande de rendu, `seekFrame(frame)` fixe la timeline à `frame/fps`. Éviter les callbacks qui dépendent du temps réel.\n\n```js\nconst fps = 30, stagger = 3 / fps;\nconst tl = gsap.timeline({paused: true});\nconst letters = [...document.querySelectorAll('[data-glyph]')];\nletters.forEach((el, i) => tl.fromTo(el,\n {y: 42, scale: .88, autoAlpha: 0},\n {y: 0, scale: 1, autoAlpha: 1, duration: .75, ease: 'elastic.out(1.62)'},\n i * stagger));\nfunction seekFrame(frame) { tl.pause.seek(frame / fps, false); }\n```\n\nPour un résultat plus strictement déterministe entre moteurs, remplacer `elastic.out` par keyframes explicites calculées par interpolation. Tester frame aléatoire (ex. 73), puis revenir à 0 et re-seeker 73 : les pixels doivent être identiques.\n\n### Validation et limites\n\n- Tester texte court/long, espaces, accents français et emoji, pour éviter des sauts de largeur.\n- Vérifier qu’aucun caractère ne se coupe sur les bords et que la plaque suit exactement le bloc typographique.\n- Les exports sont déterministes au même fps; pour 25fps, recalculer les durées en secondes et les décalages selon le nouveau fps.\n- L’analyse couvre la vidéo unique et les 30 fichiers la référence/vignettes. Le tutoriel a été décodé en entier et examiné à 1 image/s; l’audio n’existe pas dans ce clip.\n- Les valeurs d’easing/décalage décrites ici sont des paramètres de reconstruction visuelle, pas une extraction exacte de la courbe propriétaire Motion. La licence du pack et de la police demeure non vérifiée.",
    "checks": [
      "Tester texte court/long, espaces, accents français et emoji, pour éviter des sauts de largeur.",
      "Vérifier qu’aucun caractère ne se coupe sur les bords et que la plaque suit exactement le bloc typographique.",
      "Les exports sont déterministes au même fps; pour 25fps, recalculer les durées en secondes et les décalages selon le nouveau fps.",
      "L’analyse couvre la vidéo unique et les 30 fichiers la référence/vignettes. Le tutoriel a été décodé en entier et examiné à 1 image/s; l’audio n’existe pas dans ce clip.",
      "Les valeurs d’easing/décalage décrites ici sont des paramètres de reconstruction visuelle, pas une extraction exacte de la courbe propriétaire Motion. La licence du pack et de la police demeure non vérifiée."
    ]
  },
  {
    "key": "chrome-gothic-lettering-atlas",
    "title": "Atlas de lettrage gothique chrome",
    "summary": "Présentation d’une fonte gothique chrome, chiffres et ornements sur rouge et noir.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 32.5,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "Chiffre/lettre chrome se dessine en halo sur noir; morph vers mot gothique central."
      },
      {
        "at": "3–9 s",
        "description": "Grand wordmark sur rouge et couronne décorative en haut; reflets chrome balaient les traits."
      },
      {
        "at": "9–15 s",
        "description": "Planche A–Z en groupes, police gothique argent, détails calligraphiques lisibles."
      },
      {
        "at": "15–20 s",
        "description": "Planche chiffres en deux lignes; cartouches et ornements rouges/noirs autour."
      },
      {
        "at": "20–26 s",
        "description": "Catalogue d’ornements sur rouge/bordeaux : encadrements, motifs symétriques, croissants, étoiles, détails floraux."
      },
      {
        "at": "26–32,5 s",
        "description": "Fondu vers statue sombre, titre “THANK YOU” chrome, puis vue d’ornements en rouge, sortie au noir."
      }
    ],
    "prompt": "Atlas vidéo 16:9 de 32,5 s, 24 i/s pour une identité typographique gothique originale en chrome argent. Ouvre sur un glyphe qui apparaît dans un halo monochrome, puis composition monumentale sur fond bordeaux et ornement abstrait inspiré de symétries baroques, sans emblème héraldique. Révèle alphabet A–Z, ensuite les chiffres, puis un catalogue de cadres, étoiles, lunes et motifs floraux en SVG. Fais glisser un reflet argent contrôlé sur les caractères; laisse les glyphes stables pour inspection. Termine sur une sculpture abstraite monochrome avec THANK YOU, puis quelques ornements et fondu au noir. Utilise des glyphes et décor originaux/licenciés, n’imite ni couronne, statue, police, symbole ou watermark identifiable du preview. Source muette.",
    "recipe": "### Recette\n\nChoisir une fonte blackletter sous licence compatible ou concevoir glyphes originaux; chrome simulé par gradient linéaire argent/noir, double contour, bevel/highlight très fin et reflet mobile. Pour HyperFrames/Remotion 2D, faire passer une bande de highlight par masque plutôt qu’un vrai shader non déterministe. Ornements SVG symétriques originaux.\n\n**Remotion :** 780 frames/24 fps. SVG texte et ornements, gradient spéculaire évolue suivant frame; `Sequence` aux beats. Composition du mot centre, alphabets en lignes régulières, chiffres séparés; fade/reveal linéaire sur 10f. Statue remplacée par sculpture abstraite originale.\n\n**HyperFrames :** DOM/SVG, GSAP timeline `paused:true`, labels 0,3,9,15,20,26; animer bande specular via `xPercent`, `clipPath` des glyphes, holds lisibles. Scrub `tl.time(frame/24,false)`.\n\n### Validation / limites\n\nComparer 0,3,9,15,20,26,31 s; vérifier alphabet/chiffres complets, reflets métalliques lisibles, symétrie ornementale et fade final. Source muette. Chrome ici est une approximation graphique 2D; droits et identité de la police source restent inconnus.",
    "checks": [
      "Comparer 0,3,9,15,20,26,31 s; vérifier alphabet/chiffres complets, reflets métalliques lisibles, symétrie ornementale et fade final. Source muette. Chrome ici est une approximation graphique 2D; droits et identité de la police source restent inconnus."
    ]
  },
  {
    "key": "colorful-cutout-alphabet-and-symbols",
    "title": "Alphabet découpé multicolore",
    "summary": "Planche de lettres découpées multicolores et de symboles.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 10,
    "fps": 1,
    "palette": [],
    "beats": [
      {
        "at": "0–1 s",
        "description": "Premières capitales A–G colorées espacées sur fond bleu vif; apparition de quelques blocs auxiliaires."
      },
      {
        "at": "1–4 s",
        "description": "Alphabet complet en rangées, diversité de textures, de couleurs et de styles par lettre; certains glyphes se rajoutent par pop rapide."
      },
      {
        "at": "4–6 s",
        "description": "Remplacement par chiffres 0–9 en deux lignes, tailles et matériaux volontairement variés."
      },
      {
        "at": "6–8 s",
        "description": "Planche de signes de ponctuation, opérateurs et symboles; compositions compactes."
      },
      {
        "at": "8–10,04 s",
        "description": "Maintien de la planche symboles avec changements mineurs/fin de preview."
      }
    ],
    "prompt": "Crée un aperçu 16:9 d’environ 10,04 secondes, 29,97 i/s, pour un kit typographique original en lettres découpées comme des fragments de papier imprimé. Fond bleu électrique uni. 0–4 s : alphabet capital A–Z en plusieurs rangées, chaque lettre ayant sa propre combinaison de papiers colorés, contours décalés et petites ombres; révéler les glyphes par groupes avec des pops doux. 4–6 s : remplacer proprement par les chiffres 0–9. 6–10 s : afficher ponctuation et symboles mathématiques en composition serrée mais lisible, puis tenir. Dessiner toutes les lettres et textures soi-même, sans utiliser la police ou les fragments de la référence. Fournir les calques avec alpha uniquement si l’export le confirme; pas de faux damier dans l’alpha. Animation déterministe et arrêt propre sur dernière frame.",
    "recipe": "### Réalisation concrète\n\nPréparer des SVG au masque de glyphes avec textures papier indépendantes, ombres courtes et bords irréguliers; fond bleu chroma observé, mais pour livrer un asset générique proposer aussi l’alpha vérifié. Éviter les mentions « chroma » confondues avec alpha: la transparence réelle du fichier source n’est pas prouvée.\n\n**Remotion :** 301 frames à 29,97 fps (utiliser `fps=30` avec durée calée sur le temps source, ou rationaliser à 30000/1001 au pipeline). `GlyphGrid` data-driven; entrées stagger 2 frames, déplacements de 10–18 px, rotation ±3° puis settle en 6 frames. Cross-transition entre trois grilles sur 8 frames; conserver chaque cellule centrée.\n\n**HyperFrames :** SVG inline et divs aux coordonnées normalisées; GSAP timeline pausée avec labels 0,1,4,6,8. Chaque caractère a une entrée explicite, texture en `clipPath`; seek par `tl.time(frame/29.97,false)` ou horloge frame rationnelle documentée. Aucun `repeat` libre.\n\n### Validation / limites\n\nComparer 0, 1, 4, 6, 8 et 9 s; l’alphabet, les chiffres et les signes doivent occuper successivement l’écran. Contrôler glyphes manquants, collisions et fond bleu résiduel à l’export transparent. Piste audio présente mais non caractérisée.",
    "checks": [
      "Comparer 0, 1, 4, 6, 8 et 9 s; l’alphabet, les chiffres et les signes doivent occuper successivement l’écran. Contrôler glyphes manquants, collisions et fond bleu résiduel à l’export transparent. Piste audio présente mais non caractérisée."
    ]
  },
  {
    "key": "digital-distortion-alpha-type-kit",
    "title": "Pack typo digitale distordue",
    "summary": "Pack de typographie numérique glitch bleu, ses variantes alpha et ses démonstrations.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 9.1,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "Fond noir/grille; fragment de titre se recompose en DIGITAL DISTORTED TYPE et flèche, bruit de scan horizontal."
      },
      {
        "at": "3–6 s",
        "description": "Alphabet A/B/C en grande taille, contour bleu froid et lignes interrompues."
      },
      {
        "at": "6–9 s",
        "description": "Présentation du canal alpha : message « WITH ALPHA FOR EASY DRAG AND DROP! » sur damier, glitch bref au changement."
      },
      {
        "at": "9–12 s",
        "description": "Alphabet complet sur grille, légère dislocation horizontale puis stabilisation."
      },
      {
        "at": "12–15 s",
        "description": "Gros caractères et promesse de pack/téléchargement; hold final sur “DOWNLOAD THE FULL PACK!”."
      }
    ],
    "prompt": "Produit une démo 16:9 de 15 s à 25 i/s pour une famille typographique digitale originale. Décor noir quadrillé, lettre bleu pâle avec segments manquants et bandes horizontales légèrement décalées. Révèle le titre DIGITAL DISTORTED TYPE, puis A/B/C et l’alphabet complet. Démontre le vrai canal alpha sur un damier neutre, avec un titre modifiable “WITH ALPHA FOR EASY DRAG AND DROP”; finis sur une carte “DOWNLOAD THE FULL PACK”. Limite le glitch à de courtes interruptions de quelques frames, puis stabilise chaque mot. Utilise des glyphes et un wording originaux, ne récupère ni police, ni watermark, ni preview. Assure-toi qu’un export transparent est réellement transparent et documente le codec.",
    "recipe": "### Méthode de reconstruction\n\nDessiner les glyphes en SVG avec texture pixel horizontale: segments masqués, barres de décalage et scanlines; l’alpha doit réellement être transparent. Exporter une précomposition alpha vérifiée plutôt qu’un faux damier incrusté.\n\n**Remotion :** 375 frames / 25 fps. `GlitchGlyph` divise la lettre en bandes indexées à partir de frame; déplacement limité à quelques px sur fenêtres de 2–4 frames, puis repos. Alphabet construit depuis liste stable et accessible; `Sequence` de sections. Export RGBA seulement si le codec/conteneur le supporte et test compositing sur deux fonds.\n\n**HyperFrames :** SVG/HTML avec `clipPath` par bande et canaux alpha; GSAP timeline pausée, labels 0,3,6,9,12 s; offsets bornés par timeline, pas d’oscillateur CSS. `tl.time(frame/25,false)`.\n\n### Contrôle / limites\n\nComparer 0,3,6,9,12,14 s; tester l’alpha sur fonds noir/blanc, limites de déplacement, lisibilité et dernière carte. Source muette. La présence d’un damier dans la vidéo ne prouve pas que le fichier source est transparent.",
    "checks": [
      "Comparer 0,3,6,9,12,14 s; tester l’alpha sur fonds noir/blanc, limites de déplacement, lisibilité et dernière carte. Source muette. La présence d’un damier dans la vidéo ne prouve pas que le fichier source est transparent."
    ]
  },
  {
    "key": "digital-pixel-typeface-promo",
    "title": "Police pixel numérique",
    "summary": "Promo sombre d’une police pixel numérique et de ses variantes.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": null,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "A lumineuse, fragments RGB/pixel qui perturbent l’apparition; fond noir et cadre fin."
      },
      {
        "at": "3–6 s",
        "description": "Footage monochrome d’un sportif/architecture; superposition du titre digital pixel en deux lignes, construction lettre par lettre."
      },
      {
        "at": "6–10 s",
        "description": "Grandes lettres de l’alphabet par dessus plans urbains noirs et blancs; alternance spécimen/glyphes."
      },
      {
        "at": "10–12 s",
        "description": "Chiffres isolés sur noir, petites corruptions pixel colorées."
      },
      {
        "at": "12–15 s",
        "description": "Ensemble alphabet/chiffres/pictogrammes et carton « THANKS FOR WATCHING » sur noir."
      },
      {
        "at": "15–19 s",
        "description": "Alphabet en grille sur d’autres plans en N&B, tenue et variations de glitch très brèves."
      },
      {
        "at": "19–20 s",
        "description": "Maintien du dernier spécimen jusqu’à la coupe finale."
      }
    ],
    "prompt": "Bande-annonce de spécimen typographique 16:9, 20 s à 25 i/s, identité numérique sombre. Ouvre sur une lettre pixel originale qui se recompose depuis quelques fragments RVB. Utilise ensuite du footage monochrome dûment licencié ou une silhouette illustrée, avec cadres fins. Révèle en lignes le titre DIGITAL PIXEL TYPO, puis présente l’alphabet, les chiffres et une planche de symboles en gros caractères pixel, parfois superposés au footage. Illustre une version sur fond transparent seulement avec un vrai export alpha vérifié. Termine par un carton sobre “THANKS FOR WATCHING”, puis un bref retour à la planche. Glitch modéré, par blocs et très bref, aucune distorsion longue qui nuit à la lecture. Ne reprends aucun nom, logo, personne, plan, police ou watermark de la vidéo de référence.",
    "recipe": "### Recette moteur\n\nConstruire grille 8-bit de pixels et fontes vectorielles originales; glitch court par blocs masqués, séparation RVB et lignes de balayage, avec contrôle strict d’intensité. Footage facultatif : substituer une silhouette abstraite ou un rush autorisé, en monochrome à contraste élevé.\n\n**Remotion :** 500 frames / 25 fps. Composant `PixelGlyph` (grille entière), transitions glitch pilotées par seed et frame; title reveal par rangée en masques 8–12 frames, cut aux temps du tableau. N’appliquer aucun glitch pendant les holds de lecture.\n\n**HyperFrames :** calques HTML/SVG et texture de grille; `gsap.timeline({paused:true})`, labels 0,3,6,10,12,15,19; glitches comme sous-clips déterministes de 3–5 frames, scrubbing `tl.time(frame/25,false)`. Précomposer les photos pour transparence/licences contrôlées.\n\n### Vérifications / limites\n\nComparer aux secondes 0,3,6,10,12,15,19; contrôler glyphes, niveaux de noir, lisibilité du titre et durée des glitches. Audio présent mais non écouté; ne pas prétendre que les cuts sont synchronisés à la musique. Les plans de sportifs sont protégés et doivent être substitués.",
    "checks": [
      "Comparer aux secondes 0,3,6,10,12,15,19; contrôler glyphes, niveaux de noir, lisibilité du titre et durée des glitches. Audio présent mais non écouté; ne pas prétendre que les cuts sont synchronisés à la musique. Les plans de sportifs sont protégés et doivent être substitués."
    ]
  },
  {
    "key": "editorial-collage-font-long-showreel",
    "title": "Showreel typographique collage éditorial",
    "summary": "Showreel de fonte-collage découpée sur portraits mode, modèles et slogans.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 66.6,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "Illustration de chats cartoon, carton jaune et signature « framecraft »; fondu vers portrait mode."
      },
      {
        "at": "3–12 s",
        "description": "Visages et grandes lettres faites de collages imprimés; titre COLLAGE FONT sur herbes puis initiales B/C en portrait."
      },
      {
        "at": "12–23 s",
        "description": "Grandes lettres B–G et changements portrait/pose; glyphes et fragments de texture défilent sur les modèles."
      },
      {
        "at": "23–34 s",
        "description": "J/K/L et caractères suivants sur portrait à ombrelle, avec accessoires papier; parfois retour au modèle sans overlay."
      },
      {
        "at": "34–41 s",
        "description": "Modèles marchant dans un champ; M/N/O, puis groupe P/Q/R/S; lettres découpées avec imprimés divers."
      },
      {
        "at": "41–51 s",
        "description": "Séquences P–U puis S/T sur mannequins, grands caractères et bandes verticales de collage."
      },
      {
        "at": "51–60 s",
        "description": "V/W/X/Y/Z en surimpression et spécimens; alternance sujet seul et grandes lettres."
      },
      {
        "at": "60–66,63 s",
        "description": "Groupe de modèles avec lettres, grille complète et messages sociaux; fin fixe sur invitation à interagir."
      }
    ],
    "prompt": "Réalise un showreel éditorial de 66,63 s, 16:9 à 30 i/s, pour une fonte collage originale. Ouvre sur un dessin cartoon inédit et une carte de titre très courte. Passe à un shooting mode avec modèles autorisés et lettres monumentales remplies de fragments de papier, motifs et photos dont tu possèdes les droits. Montre le mot COLLAGE FONT, puis fais défiler les glyphes B à Z dans des scènes alternant portraits, poses plein pied en champ et arrière-plans champêtres. Conserve les lettres bien découpées, chaque texture limitée à son masque; termine avec une grille alphabétique complète et de courts CTA éditables. Donne un rythme de catalogue vivant, mouvements latéraux/coupes, mais conserve des holds pour voir les détails. Aucun modèle, vêtement identifiant, collage, police, logo ou filigrane du preview.",
    "recipe": "### Recette de montage\n\nPour chaque glyph, construire un `clipPath` à partir de la lettre et remplir de blocs photo/papier originaux, masqués, avec bord net et textures imprimées. Faire entrer/sortir les grands glyphes par cut ou translation latérale; alterner champ large sujet et crop typographique. Garder messages CTA éditables et consentis.\n\n**Remotion :** 1999 frames à 30 fps. Fiche de scène comme tableau de données (time, portraits, glyph, scale, crop); `Sequence` pour groupes ci-dessus. Générer mosaïque texturée depuis images autorisées; animer l’opacité/crop/position avec `interpolate`, mouvements caméra lents sur les holds. Visages jamais occultés par défaut.\n\n**HyperFrames :** HTML absolu + SVG clip-path et images ; timeline paused avec labels 0,3,12,23,34,41,51,60 s, tracks séparés pour les sujets, lettres et CTA. Seek `tl.time(frame/30,false)`; pas de boucles ou déclenchement par temps réel.\n\n### Validation / limites\n\nComparer chaque section autour de 0,3,12,23,34,41,51,60,65 s; vérifier le passage A–Z sans omissions, masque propre et respect du visage/safe area. Source muette. La liste exacte de glyphes par frame est estimée depuis les planches à la seconde; vérifier source frame par frame lors d’une reproduction rapprochée.",
    "checks": [
      "Comparer chaque section autour de 0,3,12,23,34,41,51,60,65 s; vérifier le passage A–Z sans omissions, masque propre et respect du visage/safe area. Source muette. La liste exacte de glyphes par frame est estimée depuis les planches à la seconde; vérifier source frame par frame lors d’une reproduction rapprochée."
    ]
  },
  {
    "key": "fur-texture-font-showreel",
    "title": "Police fourrure",
    "summary": "Spécimen de police en fourrure, messages et tableaux de glyphes.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 29,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "WILD en lettres duveteuses sur bison/forêt; reveal lié au mouvement du décor."
      },
      {
        "at": "3–7 s",
        "description": "WOO(L) sur yack/bovin; le volume poilu se lit sur la silhouette."
      },
      {
        "at": "7–11 s",
        "description": "Carte noire « FONT » avec petites lueurs et cadre/glyphes."
      },
      {
        "at": "11–16 s",
        "description": "Planche alphabétique complète en fourrure sur image de végétation, caméra quasi fixe."
      },
      {
        "at": "16–20 s",
        "description": "« ON ALPHA » sur scène montagnarde et feu, exemple d’utilisation du canal alpha."
      },
      {
        "at": "20–23 s",
        "description": "« LOOPED » en gros sur loup, boucle visuelle de texture/poils."
      },
      {
        "at": "23–28,96 s",
        "description": "« THANK YOU » sur vallée brumeuse, lettres fourrure maintenues puis fin."
      }
    ],
    "prompt": "Vitrine typographique cinématographique de 28,96 secondes à 24 i/s, 16:9, consacrée à une police originale couverte de fourrure courte et dense. 0–3 s : WILD sur forêt au petit matin. 3–7 s : WOOL sur bovidé générique; 7–11 s : carton FONT; 11–16 s : planche A–Z complète. 16–20 s : ON ALPHA au-dessus d’un paysage de montagne et feu de camp; montrer une couche alpha propre. 20–23 s : LOOPED avec silhouette animale stylisée; 23–28,96 s : THANK YOU sur vallée brumeuse. Modélise une matière douce avec fibres courtes, lumière rasante et ombres diffuses; mouvement lent, pas d’animation nerveuse. Utilise seulement décors/animaux originaux ou sous licence, aucune scène, personne, font asset ou logo du preview. Audio absent.",
    "recipe": "### Recette\n\nMaillage de glyphes extrudé avec couche de fibres courtes; approximation 2D possible via SVG + noise texture et contours multiples. Produire la fourrure animée comme séquence alpha ou sprite sheet rendu à l’avance; éviter cheveux individuels animés au hasard. Fonds naturels à produire ou licencier.\n\n**Remotion :** 695 frames à 24 fps. Titres via composant `FurWord`; texture statique stable, fibres secondaires en boucle indexée par modulo(frame, loopFrames). Révéler la fonte en wipes entre scènes et le spécimen en lignes; pas de particules non déterministes.\n\n**HyperFrames :** typographie SVG/vidéo alpha au-dessus d’images; GSAP paused, labels 0,3,7,11,16,20,23; map la séquence fur à la frame exacte. Seek `tl.time(frame/24,false)`. Garder les clips de fond indépendants.\n\n### Validation et limites\n\nComparer 0,3,7,11,16,20,23,28 s; vérifier densité des fibres, contour net, alpha sans halo, transition de chaque démonstration. Source muette. Fiche décrit l’apparence, non une reconstruction du modèle 3D ou des photographies d’origine.",
    "checks": [
      "Comparer 0,3,7,11,16,20,23,28 s; vérifier densité des fibres, contour net, alpha sans halo, transition de chaque démonstration. Source muette. Fiche décrit l’apparence, non une reconstruction du modèle 3D ou des photographies d’origine."
    ]
  },
  {
    "key": "grunge-stencil-type-kit",
    "title": "Kit typographique stencil grunge",
    "summary": "Spécimen de typographie stencil grunge et les compositions urbaines.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 17.2,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "Fond ivoire, « UNIQUE » en capitales condensées noires, éclats papier rose/noir; petit sous-titre manuscrit; maintien quasi fixe avec micro décalages d’impression."
      },
      {
        "at": "3–5 s",
        "description": "« 44 » géant vert et magenta, puis caractères pâles en arrière-plan; passage par coupes franches."
      },
      {
        "at": "5–7 s",
        "description": "« COLLAGE » sur paysage urbain très délavé; texture papier et bordures déchirées."
      },
      {
        "at": "7–9 s",
        "description": "Montage photo urbain avec personne, panneaux graphiques et fragments découpés; entrée en couches et recadrage énergique."
      },
      {
        "at": "9–12 s",
        "description": "Planche de spécimen : alphabet réparti en deux lignes, caractères espacés, alternance de variantes/détails."
      },
      {
        "at": "12–17,17 s",
        "description": "Suite de lettres, chiffres et ponctuation isolés sur fond clair; rythme de catalogue, fin sur glyphes sans outro narrative."
      }
    ],
    "prompt": "Produis un spécimen vidéo 16:9 de 17,17 secondes à 30 i/s pour une famille typographique stencil grunge originale. Ouvre sur un carton ivoire, le mot UNIQUE en capitales noires irrégulières, petites déchirures rose/noir et une légende manuscrite; passe à un grand 44 vert et magenta; montre ensuite COLLAGE sur une ville pâle. Entre vers 7 s dans un montage de photographie urbaine sous licence et morceaux de papier découpé qui glissent en profondeur. De 9 s jusqu’à la fin, présente distinctement lettres, chiffres et ponctuation en planche de spécimen, avec un espacement généreux et de petites variations d’impression. Reproduis la cadence en blocs et les textures, dessine un alphabet inédit; ne copie ni police, mots de marque, photos, personne, filigrane, ni assets de la référence. Animation déterministe et seekable, lisibilité prioritaire.",
    "recipe": "### Recette de reconstruction\n\nCréer alphabet SVG original avec contours irréguliers stencil, texture de fibres en masque et petites lacunes répétables. Palette ivoire/noir avec rose désaturé, vert acide uniquement sur le carton « 44 ». Préparer 1 image urbaine autorisée ou remplacer par un fond illustré; le personnage visible est un élément de prévisualisation soumis à droits.\n\n**Remotion (30 fps, 516 frames).** Composition `StencilSpecimen`; `Sequence` par beat. Animer `opacity` et `translateY` sur 6–10 frames, micro-jitter déterministe borné (graine fixe), masque SVG pour les lacunes, `interpolate(frame,[in,in+8],[0,1])`; carton « 44 » par scale 0.88→1.04→1 sur 14 frames. Grille de glyphes alimentée par tableau, sans aléatoire à l’exécution.\n\n**HyperFrames.** HTML/SVG en calques absolus, alphabet et texture dans des groupes séparés; `gsap.timeline({paused:true})`, labels aux temps du tableau, stagger explicite des glyphes de 0,025 s; relief papier en `<filter>` léger. Le contrôleur seeke avec `tl.time(frame/30,false)`; aucune animation CSS infinie.\n\n### Validation / limites\n\nComparer à 0, 3, 5, 7, 9, 12 et 16 s : ordre des cartons, passage au montage, densité des glyphes et fin. Vérifier chaque glyphe, bords sûrs et texture non scintillante. Ressemblance visuelle à une famille originale seulement; identité de police, alpha/transparence et audio non confirmés.",
    "checks": [
      "Comparer à 0, 3, 5, 7, 9, 12 et 16 s : ordre des cartons, passage au montage, densité des glyphes et fin. Vérifier chaque glyphe, bords sûrs et texture non scintillante. Ressemblance visuelle à une famille originale seulement; identité de police, alpha/transparence et audio non confirmés."
    ]
  },
  {
    "key": "hand-drawn-streetwear-alphabet-promo",
    "title": "Alphabet manuel en contexte streetwear",
    "summary": "Présentation streetwear d’un alphabet dessiné à la main.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 26.2,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–2 s",
        "description": "Grand chiffre 1 peint blanc sur vidéo de cour urbaine avec plusieurs personnes."
      },
      {
        "at": "2–7 s",
        "description": "Assemblage du titre « HAND DRAWN ALPHABET », plans de groupe et petit mouvement caméra; tracé manuscrit épais."
      },
      {
        "at": "7–9 s",
        "description": "Nouveau chiffre/lettre peint en grand au-dessus d’un plan skate/cour."
      },
      {
        "at": "9–12 s",
        "description": "Expressions « DRAG & DROP » puis « ANY SOFTWARE » au-dessus de b-roll urbain."
      },
      {
        "at": "12–16 s",
        "description": "Chiffres 0–9 dessinés au crayon blanc sur noir, lignes irrégulières."
      },
      {
        "at": "16–20 s",
        "description": "Alphabet A–Z en grille sur fond noir, trait crayeux, légère variation d’épaisseur."
      },
      {
        "at": "20–26,17 s",
        "description": "Ponctuation et symboles mathématiques/monétaires en grands glyphes; légère animation de trait puis hold."
      }
    ],
    "prompt": "Crée une promo 16:9 de 26,17 secondes à 24 i/s pour un alphabet streetwear dessiné à la main. Utilise des scènes de cour urbaine et de skate avec interprètes consentants ou images sous licence. 0–2 s : un chiffre peint au pinceau sur le plan. 2–7 s : titre HAND DRAWN ALPHABET écrit au trait, posé sur le groupe. 7–12 s : quelques gestes de graffiti non-marque puis mots DRAG & DROP et ANY SOFTWARE. 12–16 s : chiffres au crayon blanc sur fond noir, 16–20 s : alphabet complet en grille; 20–26,17 s : symboles. Les contours doivent se dessiner réellement, à main levée, avec texture de craie/pinceau, sans reproduire les personnes, lieux, signes, glyphes exacts, watermark ou musique de la référence. Fournis tous les caractères manquants de façon cohérente, termine sur symbole stable.",
    "recipe": "### Implémentation\n\nDessiner chaque glyph en chemin SVG dont la progression est animée via `strokeDasharray/strokeDashoffset`; conserver petits écarts et terminaisons de pinceau. Footage live-action licencié facultatif; prévoir version neutre sans personne.\n\n**Remotion :** 628 frames/24 fps. Glyphs en SVG paths, reveal de tracé 8–20 frames selon complexité, puis remplissage blanc crayeux avec texture stable. B-roll segmenté `Sequence`; texte reste dans safe area. Construire grille des chiffres, lettres, signes depuis dataset.\n\n**HyperFrames :** paths SVG par caractères; GSAP timeline pausée avec labels 0,2,7,9,12,16,20 s; animer `strokeDashoffset` et ensuite `fill/autoAlpha`; scrubbing `tl.time(frame/24,false)`. Pas de dessin par timer actif.\n\n### Contrôle / droits\n\nComparer 0,2,7,9,12,16,20,25 s; vérifier que l’alphabet est complet, que le trait suit la forme et qu’aucun texte ne masque les visages. Piste audio présente, contenu non identifié. Licence du b-roll et droits à l’image non vérifiés; la musique n’est pas incluse dans la recette.",
    "checks": [
      "Comparer 0,2,7,9,12,16,20,25 s; vérifier que l’alphabet est complet, que le trait suit la forme et qu’aucun texte ne masque les visages. Piste audio présente, contenu non identifié. Licence du b-roll et droits à l’image non vérifiés; la musique n’est pas incluse dans la recette."
    ]
  },
  {
    "key": "inflatable-3d-font-portfolio-showreel",
    "title": "Typographie 3D gonflable",
    "summary": "Showreel coloré de lettres gonflables, mises en pages portfolio et spécimens.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 27.6,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Carte éditoriale pale, gros mots noirs recadrés; lettres gonflables colorées surgissent en groupe, badge et barre de progression."
      },
      {
        "at": "4–9 s",
        "description": "Diptyque portraits fashion; mot FASHION construit en lettres ballon, léger flottement puis settle."
      },
      {
        "at": "9–14 s",
        "description": "Carte portfolio foncée et page jaune avec portraits, “GROW YOUR NETWORK”; pan/zoom de mise en page."
      },
      {
        "at": "14–18 s",
        "description": "Mur de lettres ballon qui chevauchent le cadre et affiches colorées; impression de profondeur."
      },
      {
        "at": "18–22 s",
        "description": "Carton de type magazine avec phrase en arrière-plan; grands glyphes transparents au premier plan."
      },
      {
        "at": "22–27,625 s",
        "description": "Grille exhaustive de glyphes multicolores sur papier sombre, puis maintien final."
      }
    ],
    "prompt": "Showreel typographique 16:9 de 27,625 s à 24 i/s présentant une famille inédite de lettres 3D gonflables. Ouvre sur un layout éditorial crème avec titres noirs partiellement recadrés, puis fait entrer des lettres ballon brillantes à motifs géométriques originaux. Montre le mot FASHION dans un shooting avec portraits autorisés; passe à des cartes portfolio élégantes, une composition “GROW YOUR NETWORK” et une page plus dense en lettres chevauchées. Termine par une grille complète A–Z, chiffres et ponctuation sur fond sombre. Les objets ont reflets doux, coutures discrètes, flottement lent et settle propre. Crée formes, textures, textes et portraits indépendants de la référence; aucune photo, personne, vêtement, police ou layout du preview.",
    "recipe": "### Construction\n\nRendre chaque lettre comme mesh souple avec reflets de studio et couture/texture spécifique par matériau; conserver volume et ombre contact. Options sans 3D : SVG avec dégradé, highlight, contour et déformation souple minime; éviter l’effet de ballon réaliste si mesh non disponible.\n\n**Remotion :** 663 frames à 24 fps. Pré-rendre assets alpha de glyphes/lettres, mouvements définis par tableaux `x,y,rotation,scale` et easing amorti; `Sequence` par mise en page. Grille finale alimentée par font glyph IDs, pas par image aplatie seule.\n\n**HyperFrames :** images alpha/HTML dans tracks; timeline GSAP `paused:true`, labels 0,4,9,14,18,22 s. Animation flottante périodique dépendante de `frame`, `tl.time(frame/24,false)`. Caméra est un parent transform et le texte dans une couche distincte.\n\n### Validation\n\nComparer 0,4,9,14,18,22,26 s; vérifier le relief, les motifs, le contraste, l’ordre des layouts et l’alphabet complet. Source muette. La géométrie 3D d’origine et les fontes ne sont pas disponibles; sprites alpha nécessaires pour un volume fidèle.",
    "checks": [
      "Comparer 0,4,9,14,18,22,26 s; vérifier le relief, les motifs, le contraste, l’ordre des layouts et l’alphabet complet. Source muette. La géométrie 3D d’origine et les fontes ne sont pas disponibles; sprites alpha nécessaires pour un volume fidèle."
    ]
  },
  {
    "key": "marble-tube-lettering-fashion-promo",
    "title": "Lettrage tubulaire « marble »",
    "summary": "Lettres tubulaires blanches à connecteurs bleus sur plateau mode jaune.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 20.2,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "« MARBLE FONT » géant construit par segments blancs; embouts bleus ponctuels; cercle rouge derrière le modèle."
      },
      {
        "at": "3–7 s",
        "description": "Gros plan portrait/mode; lettres individuelles se recomposent autour de la figure, tubes arrondis."
      },
      {
        "at": "7–10 s",
        "description": "Les fragments s’éloignent; planche A–Z sur jaune avec ombres discrètes."
      },
      {
        "at": "10–13 s",
        "description": "Fin de la grille alphabétique en trois lignes, tenu propre."
      },
      {
        "at": "13–17 s",
        "description": "« SUBSCRIBE FOR MORE CONTENT » en lettrage tube sur scènes studio floues et stylisme coloré."
      },
      {
        "at": "17–20 s",
        "description": "« SWIPE UP » sur plan rouge et chaise/lignes noires; animation verticale de quelques segments."
      },
      {
        "at": "20–25 s",
        "description": "Retour au carton MARBLE FONT avec personne/cercle rouge, puis état stable."
      }
    ],
    "prompt": "Promo typographique 16:9, 25 secondes, 25 i/s. Crée une fonte d’affichage originale faite de tubes blancs arrondis aux extrémités, avec petits connecteurs sphériques bleu pâle aux croisements. Fond jaune vif, cercle rouge et studio stylisé. 0–3 s : le titre MARBLE FONT se construit par segments. 3–7 s : détail des lettres dans un shooting mode à interprètes consentants ou silhouettes stylisées. 7–13 s : planche A–Z sur le jaune. 13–17 s : message SUBSCRIBE FOR MORE CONTENT sur plateau abstrait; 17–20 s : SWIPE UP avec déplacement vertical; 20–25 s : rappel du titre et tenue. Tracé vectoriel précis, ombres contrôlées et embouts qui suivent leurs chemins. Crée ta propre fonte; n’utilise ni modèle, image, lettre exacte ou identité du clip. Source muette.",
    "recipe": "### Recette Remotion et HyperFrames\n\nChaque glyphe = SVG stroke blanc de forte épaisseur, round caps, avec pastilles bleues aux nœuds; effets de relief par highlight gris fin et ombre légère. Éviter l’effet réellement marbré si ce n’est pas ce que montre le lettrage; le texte affiché semble un nom de fonte, la matière est surtout tubulaire.\n\n**Remotion :** 625 frames/25 fps. Paths SVG séquencés, reveal par `strokeDashoffset` sur 10–18f puis embout se déplace jusqu’au point final; lignes de grille par `Sequence`. Le cercle rouge en arrière-plan reste un masque simple.\n\n**HyperFrames :** SVG nodes et strokes séparés, timeline pausée labels 0,3,7,10,13,17,20; anime dashoffset des traits et `x/y` des embouts. Scrub `tl.time(frame/25,false)`.\n\n### Validation\n\nComparer 0,3,7,10,13,17,20,24 s; chaque tube doit être continu, embouts attachés, alpha/contraste vérifiés, visages laissés lisibles. Source muette. Titre exact de la police probablement preview-only; ne pas la fournir sans licence.",
    "checks": [
      "Comparer 0,3,7,10,13,17,20,24 s; chaque tube doit être continu, embouts attachés, alpha/contraste vérifiés, visages laissés lisibles. Source muette. Titre exact de la police probablement preview-only; ne pas la fournir sans licence."
    ]
  },
  {
    "key": "neon-marker-font-nightlife-promo",
    "title": "Fonte marqueur néon",
    "summary": "Promo-clip à lettrage manuscrit orange lumineux sur scènes de nightlife.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 18.6,
    "fps": 1,
    "palette": [],
    "beats": [
      {
        "at": "0–2 s",
        "description": "Chiffre orange manuscrit isolé; cut sur portrait club, “PIXFLOW PRESENTS”, puis “CUE MARKS”."
      },
      {
        "at": "2–5 s",
        "description": "Couches de rubans lumineux et mot “LETTERS” dessiné par-dessus scène rouge/violette."
      },
      {
        "at": "5–8 s",
        "description": "Grande forme de lettre qui cadre personnage; transition par mouvement; femme en couloir néon."
      },
      {
        "at": "8–11 s",
        "description": "« BE HAPPY » puis « FOREVER » manuscrits lumineux sur portraits et danse."
      },
      {
        "at": "11–14 s",
        "description": "“LET’S GO” sur scènes de groupe, alphabet A–Z affiché en planche noire."
      },
      {
        "at": "14–18,55 s",
        "description": "Quelques grandes initiales écrites sur images et dernier X rouge incandescent qui remplit l’écran."
      }
    ],
    "prompt": "Clip promotionnel 16:9 de 18,55 s à 29,97 i/s autour d’une écriture marqueur lumineuse faite maison. Ouvre sur un chiffre orange sur noir, titre fictif très bref et des scènes club originales ou licenciées en rouge/magenta/bleu. Trace des mots manuscrits comme LETTERS, BE HAPPY, FOREVER et LET’S GO en gros ruban de lumière orange-crème, avec un halo modéré, puis montre une planche A–Z. Fais interagir quelques lettres géantes avec les silhouettes dans un couloir néon et termine par un X chaud sur noir. Le trait doit s’écrire continûment, avec glow lisible et cuts rapides mais propres. N’imite pas le branding, les danseurs, plans ou caractères de la référence. Muet, mouvements seekables.",
    "recipe": "### Réalisation\n\nChaque mot est chemin brush/SVG avec round joins; reveal du trait suivi d’un glow crème-orange et petite diffusion magenta. Rendre le glow en blur léger dupliqué, garder tracé principal net. Footage original/autorisé en rouge/bleu très contrasté.\n\n**Remotion :** 557 frames à 29,97 fps (durée native rationalisée). `strokeDashoffset` par glyph; lumière dérivée uniquement de `frame`, aucune flicker random. `Sequence` aux repères du tableau; fin X est tracée en 8–12 frames puis garde 6f.\n\n**HyperFrames :** footage/typo séparés; GSAP paused labels 0,2,5,8,11,14,18; `strokeDashoffset` et glow dupliqué synchronisé, texte suit l’écran par coordonnées fixes. Scrub `tl.time(frame/29.97,false)`; veille aux variations de ratio cadence.\n\n### Vérification\n\nComparer 0,2,5,8,11,14,17,18 s; vérifier la cohérence du trait, son attachement aux mots, glow non surexposé et ending. Source muette. Pas de tracking de caméra réel établi; utiliser un texte fixe ou une trajectoire manuelle validée.",
    "checks": [
      "Comparer 0,2,5,8,11,14,17,18 s; vérifier la cohérence du trait, son attachement aux mots, glow non surexposé et ending. Source muette. Pas de tracking de caméra réel établi; utiliser un texte fixe ou une trajectoire manuelle validée."
    ]
  },
  {
    "key": "organic-sculpted-font-showcase",
    "title": "Fonte sculptée organique",
    "summary": "Spécimen de typographie organique gonflée couleur terre sur paysage et fonds noirs.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 9.1,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Motif « organic letters type » en pile sur paysage pastel, première lecture inversée puis rotation/redressement."
      },
      {
        "at": "4–6 s",
        "description": "Alphabet A–E et premiers groupes de lettres sur noir, épaisseur arrondie, teinte caramel."
      },
      {
        "at": "6–9 s",
        "description": "Suite alphabétique en planches, caractères isolés ou petits ensembles espacés."
      },
      {
        "at": "9–13 s",
        "description": "Minuscules, fins de lignes et lettres X/Y/Z en différentes orientations; maintien catalogue jusqu’à coupe."
      }
    ],
    "prompt": "Vidéo de spécimen 16:9, 13 secondes à 25 i/s, pour une police organique originale: lettres volumineuses, asymétriques et souples, comme sculptées en pâte mate brun caramel, avec highlights doux. Ouvre sur un paysage côtier pastel et un titre organique empilé qui se retourne pour devenir lisible; passe ensuite sur fond noir. Présente méthodiquement l’alphabet A–Z puis des glyphes supplémentaires en groupes espacés, sans déformation pendant les holds. Modèle chaque lettre à partir de formes originales, lumière latérale douce, ombre de contact, aucune texture excessive. N’utilise pas les formes exactes, la police, le paysage ou le preview de référence. Pas de logo, aucune affirmation de transparence si le rendu alpha n’est pas réellement exporté.",
    "recipe": "### Construction Remotion / HyperFrames\n\nLettrage en meshes 3D rendus en sprites ou SVG organique (paths gonflés, highlights et ombre intégrée). Pour éviter morphing instable, chaque glyph est un asset fixe; ne déformer que l’ensemble et l’échelle. Fond noir assure séparation; introduction paysage pastel reste optionnelle et doit être originale.\n\n**Remotion :** 325 frames/25 fps. Entrée de wordmark avec rotation 180°→0 sur 24 frames, puis scale stabilisée; planches via dataset et `Sequence`; fondu de fond 5f. Chaque caractère a silhouette, baseline et boîte propre.\n\n**HyperFrames :** groupes SVG/HTML positionnés, timeline GSAP `paused:true`, labels 0,4,6,9; anime rotation du groupe et opacité de planches, jamais rotation individuelle au hasard. Scrub `tl.time(frame/25,false)`.\n\n### Validation\n\nComparer 0,3,4,6,9,12 s; vérifier sens de lecture du titre, lisibilité/complétude de glyphes, silhouettes non collées et dernière planche. Piste audio présente non évaluée; ne pas tenter de synchro inventée.",
    "checks": [
      "Comparer 0,3,4,6,9,12 s; vérifier sens de lecture du titre, lisibilité/complétude de glyphes, silhouettes non collées et dernière planche. Piste audio présente non évaluée; ne pas tenter de synchro inventée."
    ]
  },
  {
    "key": "pixel-arcade-type-family-promo",
    "title": "Famille typographique arcade pixel",
    "summary": "Film de présentation d’une famille typographique arcade pixel et de ses styles.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 46.5,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "Titre PIXEL / TYPOGRAPHY se révèle en pixels avec mini-icônes étoiles; fond quadrillé noir."
      },
      {
        "at": "3–7 s",
        "description": "Alphabet en gradient multicolore et ombre pixel décalée; bascule entre 3 styles du A."
      },
      {
        "at": "7–12 s",
        "description": "« 3 VERSIONS », exemples A, puis « FLAT & GRADIENT »; montrer construction sans contour."
      },
      {
        "at": "12–19 s",
        "description": "Planche symboles défilante, puis caractères avec ombres et bordures; transitions de palette."
      },
      {
        "at": "19–27 s",
        "description": "Fond cyan, mot FLAT et fragments de pixel; puis exemple bureau/éducation et passage à tunnel gradient."
      },
      {
        "at": "27–33 s",
        "description": "Alphabet gradient, cadre néon et carte « STARTING SOON… »."
      },
      {
        "at": "33–39 s",
        "description": "Démonstration de style sans stroke, grandes lettres sur fond cyan puis gradient pastel; alphabet stable."
      },
      {
        "at": "39–46 s",
        "description": "« SUMMER » devant plage/ciel, cut vers panneau rose PIXEL TYPOGRAPHY."
      },
      {
        "at": "46–50 s",
        "description": "« TRY IT NOW! » entouré de symboles pixels."
      },
      {
        "at": "50–55 s",
        "description": "« THANK YOU! » au centre, étoiles pixels en périphérie, hold jusqu’à fin."
      }
    ],
    "prompt": "Film de présentation 16:9 de 55 s à 24 i/s d’une fonte arcade pixel originale. Fond noir quadrillé; ouverture PIXEL TYPOGRAPHY avec étoiles et pixels décoratifs. Présente alphabet multicolore, trois rendus d’une même lettre, comparatif flat/gradient et version sans stroke. Fais défiler symboles et exemples éditoriaux; montre brièvement un carton STARTING SOON encadré de néon, puis un mot SUMMER sur plage illustrée originale, le panneau principal et TRY IT NOW. Termine par THANK YOU avec étoiles, en laissant le message lisible. Utilise des glyphes de grille distincts et des pixels aux bords nets, animations par apparition de cellules et non flou. Aucun logo de banque, police, image, mot de CTA ou watermark issu du preview; muet.",
    "recipe": "### Reproduction\n\nGlyphes sur grille entière, chaque contour constitué de segments à angles de 90°; variantes flat, gradient, extrusion pixel à construire en calques. Les petits éléments décoratifs sont également SVG à pixels nets (pas d’antialias flou).\n\n**Remotion :** 1320 frames/24 fps. `PixelGlyph` calcule par grille; aucun scale fractionnaire hors transition. Animer le nombre de cellules révélées pour apparition/dissolution, `Sequence` par beat; gradient CSS statique, ombre rendue par double silhouette décalée de 2–4 pixels.\n\n**HyperFrames :** SVG `shape-rendering:crispEdges`, trois groupes de styles; `gsap.timeline({paused:true})`, labels 0,3,7,12,19,27,33,39,46,50 s. Blocs de couleur et groupes typographiques découpés par clips; seek `tl.time(frame/24,false)`.\n\n### Validation\n\nComparer aux 0,3,7,12,19,27,33,39,46,50,54 s; vérifier états flat/gradient/no-stroke distincts, pixel grid nette, symboles et CTA finaux. Source muette. Reconstruction approximative des transitions internes; la police exacte n’est ni incluse ni identifiée.",
    "checks": [
      "Glyphes sur grille entière, chaque contour constitué de segments à angles de 90°; variantes flat, gradient, extrusion pixel à construire en calques. Les petits éléments décoratifs sont également SVG à pixels nets (pas d’antialias flou)."
    ]
  },
  {
    "key": "pyro-fire-font-sales-showreel",
    "title": "Showreel de police pyrotechnique",
    "summary": "Longue vitrine d’une police enflammée, de glyphes et d’exemples commerciaux.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 62.7,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "Signature script « Piro… Studio » sombre, apparition puis fondu."
      },
      {
        "at": "3–10 s",
        "description": "Fond de montagnes rouge/orange, flammes derrière le titre PYROFONT; lettres et variantes se consument/révèlent."
      },
      {
        "at": "10–27 s",
        "description": "Alphabets, chiffres et symboles présentés en séries sur fond noir; glyphes individuellement associés à flammes verticales."
      },
      {
        "at": "27–34 s",
        "description": "Mockup shopping rose, grands sacs, « MASSIVE DISCOUNT »; transition par wipe/brûlure."
      },
      {
        "at": "34–40 s",
        "description": "Caractères U–Z/chiffres sur fond sombre, flamme soutenue."
      },
      {
        "at": "40–50 s",
        "description": "Mots promotionnels (“THE FIRST SPARK”), séquences lifestyle/sport/voyage avec titres courts en surimpression."
      },
      {
        "at": "50–53 s",
        "description": "Vue aérienne resort et « TOP RATED », étoiles en incrustation."
      },
      {
        "at": "54–62 s",
        "description": "Suite signes et icônes cœur/étoile/croix en feu."
      },
      {
        "at": "62–71 s",
        "description": "Verbes d’action (dont FLY, GLIDE, RIDE, DIVE, RUN, OVERCOME) sur rushes sportifs; collage d’actions."
      },
      {
        "at": "71–73 s",
        "description": "Fondu sombre vers mention de téléchargement/CTA."
      }
    ],
    "prompt": "Crée une vitrine typographique 16:9 de 73 secondes, 30 i/s, pour une police display pyrotechnique originale. Début sobre en signature fictive et titre PYROFONT; fais ensuite apparaître chaque lettre, chiffre et symbole, comme s’il s’allumait puis restait lisible devant flammes verticales. Organise le catalogue en sections : alphabet, signes, annonce de soldes sur sacs fictifs, slogans d’impact, exemple de notation cinq étoiles avec resort imaginaire, puis courts verbes d’action en scènes sportives sous licence. Termine par une carte CTA neutre, sans logo de place de marché. Utilise des glyphes, footage, marque et compo inédits; aucune reprise de l’identité la référence, des photos ou de la police de référence. Feu masqué au texte, lumière réaliste mais aucun flash agressif, cadence précisément déterministe.",
    "recipe": "### Réalisation\n\nLa flamme est un asset animé indépendant masqué par les caractères; pour résultat exact préparer renders alpha originaux (simulation 2D ou particules) puis les seek par frame. En DOM, dégradé rouge/jaune, déplacement de turbulence déterministe et masque SVG constituent un substitut graphique, pas une vraie simulation physique. Employer photos lifestyle dûment licenciées.\n\n**Remotion :** 2190 frames à 30 fps. Sections comme données avec `from/duration`; `Sequence` pour chaque catégorie; `FireGlyph` expose couleur, alpha et boucle d’images calculée par frame. Séparer les 73 s en beats courts et inspecter points de coupe; ne pas baisser le frame-rate du rendu.\n\n**HyperFrames :** un calque par section, GSAP `paused:true`, labels 0,3,10,27,34,40,50,54,62,71 s. Masques `clipPath`, feu en sprite/vidéo seekable; `tl.time(frame/30,false)`. Durée longue = gouverner cache et RAM, pas de boucle autonome.\n\n### Contrôle / limites\n\nComparer toutes les sections aux 0,3,10,27,34,40,50,54,62,71–72 s; vérifier catalogue exhaustif, flamme attachée au glyph et transitions. Source muette. Le CTA source semble promotionnel et contient identité protégée : le remplacer. Pas de preuve sur les assets livrés par la marketplace; aucun portrait/clip ne doit être extrait du MP4.",
    "checks": [
      "Comparer toutes les sections aux 0,3,10,27,34,40,50,54,62,71–72 s; vérifier catalogue exhaustif, flamme attachée au glyph et transitions. Source muette. Le CTA source semble promotionnel et contient identité protégée : le remplacer. Pas de preuve sur les assets livrés par la marketplace; aucun portrait/clip ne doit être extrait du MP4."
    ]
  },
  {
    "key": "retro-synthwave-font-specimen",
    "title": "Spécimen de police synthwave",
    "summary": "Spécimen de police synthwave avec soleil, grille perspective et titres rétro.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 16.5,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "0–1 s",
        "description": "Soleil apparaît au centre de l’horizon; grille turquoise approche du bas, ciel violet avec bandes horizontales."
      },
      {
        "at": "1–2 s",
        "description": "Titre rétro « RETRO » s’assemble en grandes capitales inclinées, intérieur crème, contour clair, ombre cyan/rouge."
      },
      {
        "at": "2–7 s",
        "description": "Sous-titre « ALPHANUMERIC » se révèle; maintien sur l’emblème typographique, grille et soleil animés subtilement."
      },
      {
        "at": "7–9 s",
        "description": "Titre s’efface en fragments, retour au décor, puis préparation d’une planche de glyphes."
      },
      {
        "at": "9–15 s",
        "description": "Alphabet en rangées, puis chiffres; aperçu de versions colorées/ombres, progression du haut vers le bas."
      },
      {
        "at": "15–16,5 s",
        "description": "Le spécimen sort, le soleil et la grille seuls restent en hold final."
      }
    ],
    "prompt": "Vidéo spécimen 16:9, 16,5 s, 30 i/s, décor synthwave nocturne: soleil rond jaune-orange coupé par l’horizon, ciel magenta et violet avec lignes horizontales, grille filaire cyan en perspective vers un point de fuite. À 1 s, révèle un titre rétro original, capitales inclinées crème, double contour blanc et ombres cyan/rouge, puis un sous-titre alphanumérique. Garde le paysage vivant mais lent. Vers 7 s, dissous le titre en blocs; de 9 à 15 s, montre alphabet puis chiffres en rangées avec exemples de variantes d’ombre. Termine par le décor seul. Crée des glyphes inédits et un lettrage de substitution; ne copie pas la police, ses formes exactes, un logo, ou les éléments de la preview. Tout doit être frame-seekable et lisible.",
    "recipe": "### Recette\n\nCréer soleil en cercle radial (jaune→orange) masqué à l’horizon, bandes du ciel dans SVG et grille en lignes convergeant vers un point de fuite. Typographie de remplacement originale, italique géométrique, contour ivoire et ombre cyan/rouge; pas d’imitation de logo connu.\n\n**Remotion :** 495 frames à 30 fps. Grille calculée en SVG; défilement `strokeDashoffset`/perspective depuis la frame; soleil monte de 3% sur 20 frames. Titre: masque horizontal 0→100% en 12 frames avec petite overshoot contrôlée; maintenir par couches. Glyphes en tableau avec reveal par rangée.\n\n**HyperFrames :** SVG pour décor, polices en CSS, timeline `gsap.timeline({paused:true})`; labels 0,1,2,7,9,15. Anime le groupe grille en `translateY/scale`, masque SVG du soleil et clip-path du titre. Scrub `tl.time(frame/30,false)`.\n\n### Validation et limite\n\nComparer à 0, 1, 2, 7, 9, 12, 15 et 16 s; vérifier la ligne d’horizon, le point de fuite, la hiérarchie titre/sous-titre et le hold final. Source muette. La police exacte n’est pas récupérable ni identifiée; la fiche reproduit la grammaire visuelle, non un fichier de police.",
    "checks": [
      "Comparer à 0, 1, 2, 7, 9, 12, 15 et 16 s; vérifier la ligne d’horizon, le point de fuite, la hiérarchie titre/sous-titre et le hold final. Source muette. La police exacte n’est pas récupérable ni identifiée; la fiche reproduit la grammaire visuelle, non un fichier de police."
    ]
  },
  {
    "key": "slime-horror-font-promo",
    "title": "Promo typographique slime",
    "summary": "Lettrage visqueux vert fluo et les cartons Halloween.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 30.5,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–4 s",
        "description": "Fond forêt bleuté, silhouette costumée/fantôme et citrouille; HELLO vert visqueux se forme au-dessus, gouttes tombent."
      },
      {
        "at": "4–7 s",
        "description": "Coupe sur intérieur sombre et citrouille sculptée; « MEET » se révèle par gouttes."
      },
      {
        "at": "7–10 s",
        "description": "« SLIME FONT » géant sur arbre/citrouilles et brume basse; maintien."
      },
      {
        "at": "10–14 s",
        "description": "Introduction de l’alphabet vert puis retrait de quelques caractères; fumée et yeux de citrouille restent."
      },
      {
        "at": "14–19 s",
        "description": "Grille A–Z compacte sur décor sombre; les gouttes et scintillements restent subtils."
      },
      {
        "at": "19–24 s",
        "description": "Personnages costumés à la bougie; « ON ALPHA » apparaît et se stabilise."
      },
      {
        "at": "24–30,54 s",
        "description": "« THANK YOU » s’étire en gouttes devant un bocal/gobelet éclairé, puis hold jusqu’à la fin."
      }
    ],
    "prompt": "Construis un spot de 30,54 s, 16:9, 24 i/s pour une fonte Halloween inédite, lettres épaisses vert slime sur décors bleus/noirs. 0–4 s : forêt brumeuse et apparition de HELLO, avec quelques gouttes. 4–7 s : citrouille originale, reveal de MEET. 7–10 s : SLIME FONT en grande échelle au-dessus de citrouilles et brume. 10–19 s : alphabet présenté en grand puis en grille lisible. 19–24 s : vignette festive avec silhouettes costumées originales et ON ALPHA. 24–30,54 s : THANK YOU sur fond bocal éclairé, lettres qui coulent puis hold. Modélise des caractères et décors originaux; utilise des personnes/illustrations licenciées ou silhouettes simples, jamais les personnages, photos, police, logo ou éléments reconnaissables du preview. Mouvement doux et déterministe, absence de flashs rapides.",
    "recipe": "### Recette des moteurs\n\nLettres SVG extrudées, vert citron fluorescent, intérieur en petites taches/globs; gouttes séparées animées par paths Bézier, qui oscillent puis s’allongent sous gravité simulée. Brume basse pré-calculée ou faite d’une texture à opacité constante. Pas de scintillement stroboscopique.\n\n**Remotion :** 733 frames à 24 fps. `Sequence` aux entrées 0/4/7/10/14/19/24 s. Masque de reveal progressif par ligne; gouttes ont trajectoires `spring` amorties puis `interpolate` jusqu’au bas, mêmes coordonnées pour chaque rendu. Lampes/fog ne dépendent que de `frame`.\n\n**HyperFrames :** SVG lettres et drips distincts; timeline GSAP pausée, labels identiques; animer `scaleY/transformOrigin:'50% 0%'` sur gouttes, `strokeDashoffset` de masque, halo CSS constant. Scrub `tl.time(frame/24,false)`.\n\n### Validation / droits\n\nComparer 0,4,7,10,14,19,24,29 s; contrôler contraste du vert, forme des gouttes, alphabet complet, brume et hold final. Source muette. Aucune licence de scène ou fonte vérifiée; toute fidélité texturale doit être recréée indépendamment.",
    "checks": [
      "Comparer 0,4,7,10,14,19,24,29 s; contrôler contraste du vert, forme des gouttes, alphabet complet, brume et hold final. Source muette. Aucune licence de scène ou fonte vérifiée; toute fidélité texturale doit être recréée indépendamment."
    ]
  },
  {
    "key": "smooth-letter-color-mask-wipes",
    "title": "Lettrage progressif — wipes à panneaux couleur",
    "summary": "Wipes éditoriaux à panneaux rouges et gris observés dans les assets Color Mask de lettrage progressif.",
    "family": "typography",
    "engines": "both",
    "format": null,
    "durationSeconds": 8.1,
    "fps": 25,
    "palette": [
      "#9D1021",
      "#D7D6D2"
    ],
    "beats": [],
    "prompt": "Compose un bumper mode de 6–8 secondes : photographie originale autorisée, titrage serif fort et panneaux verticaux rouge profond/ivoire/gris. Les panneaux coulissent par groupes à vitesses proches mais décalées, révèlent successivement photo et titre, puis composent un tableau final net. Utilise une animation déterministe calculée à partir du frame, transitions calmes, aucun flash, pas de logo, visuel, texte ou frame réutilisé de la source. Donne un composant Remotion et un graphe SVG+timeline HyperFrames avec 4 points de contrôle.",
    "recipe": "### Recette\n\nConstruire un masque de quatre panneaux SVG à largeurs inégales, teintes rouge profond et gris clair. Faire entrer le panneau principal depuis gauche/droite, puis révéler le titre/photo en clip-path. Stagger fixe de 2–5 images entre colonnes; cadence constante à 24 ou 25 i/s selon master. Garder `hold` sans dérive. Les durées par clip sont connues, mais la synchronisation de sous-mouvement n’est pas précisément mesurée : base 20 images d’entrée, 60–100 images de tenue, 20 de sortie, réglables.\n\nRemotion : `useCurrentFrame`, `interpolate` avec extrapolation clamp, `Sequence` indépendante pour photo, titre et panneaux. HyperFrames : une timeline GSAP pausée et labels `wipe.in`, `reveal`, `wipe.out`; une fonction de seek par frame doit restituer le même état après navigation aléatoire.\n\n```jsx\nconst x = interpolate(frame, [0, 22], [-520, 0], {extrapolateRight:'clamp'});\n<rect x={x} y={0} width={520} height={1080} fill=\"#9d1021\" />\n<rect x={x+520} y={0} width={220} height={1080} fill=\"#d7d6d2\" />\n```\n\n### Droits et limites\n\nLa source ne fournit pas de preuve de licence exploitable hors projet la référence; les droits des previews, clips, fontes et éventuelle musique restent à vérifier. Décrire et réimplémenter l’idée du wipe avec assets propres, ne pas redistribuer les la référence.",
    "checks": [
      "La source ne fournit pas de preuve de licence exploitable hors projet la référence; les droits des previews, clips, fontes et éventuelle musique restent à vérifier. Décrire et réimplémenter l’idée du wipe avec assets propres, ne pas redistribuer les la référence."
    ]
  },
  {
    "key": "smooth-letter-line-reveals",
    "title": "Lettrage progressif — reveals de lettres et lignes",
    "summary": "Reveals typographiques doux et leurs overlays de lignes issus des assets lettrage progressif.",
    "family": "typography",
    "engines": "both",
    "format": null,
    "durationSeconds": 11,
    "fps": 24,
    "palette": [],
    "beats": [],
    "prompt": "Réalise un titre éditorial original de 8 secondes, 16:9. Fond photo autorisé. Grand titre serif ivoire en capitales, découpé par 6 à 10 bandes verticales qui se révèlent alternativement du centre vers les bords; lignes fines discrètes suivent le mouvement sans distraire. Entrée douce sur environ 24 frames, tenue stable, sortie par déplacement des panneaux. Le timing peut être ajusté au rythme du film, mais chaque état doit être déterministe au numéro de frame. Garde le titre lisible, pas d’effet glitch, pas de textes ou d’images tirés du template. Génère le code Remotion et une timeline HyperFrames équivalente, avec captures au début, entrée, tenue et sortie.",
    "recipe": "### Grammaire d’animation\n\n1. Fond photo plein cadre avec recadrage stable.\n2. Titre typographique très grand, parfois coupé au bord du cadre; révélation par bandes verticales à décalages alternés.\n3. Lignes fines et formes géométriques restent secondaires; montée fluide, maintien, puis déplacement/masquage.\n4. Les mots se lisent comme un montage éditorial, pas comme une animation de caractères rebondissants.\nRéglages de départ (estimés) : entrée 18–30 images, décalage par bande 2–4 images, tenue 1–2 s, sortie 16–24 images. Ajuster après visionnage.\n\n### Recette Remotion\n\nSVG text + `clipPath` à bandes fixes; animer une largeur de masque via `interpolate(frame,[start,start+24],[0,1])`. Les offsets de lignes sont constants et stockés dans un tableau. Une image de ligne peut être dessinée en SVG ou utilisée comme overlay alpha. Pour les la référence, respecter chaque cadence ou utiliser un master fixe et vérifier le frame mapping. Pas de `Math.random`.\n\n```jsx\nconst progress = interpolate(frame, [start, start + 24], [0, 1], {extrapolateRight: 'clamp'});\nconst bars = Array.from({length: 8}, (_, i) => ({x: i*240, delay: i%2 ? 3 : 0}));\n{bars.map((b,i) => <rect key={i} x={b.x} y={0} width={240*progressAt(frame-b.delay)} height={1080} />)}\n```\nEn HyperFrames, associer chaque bande à un tween GSAP de timeline paused, labels `title.in`, `title.hold`, `title.out`; seek explicite sur le frame demandé.",
    "checks": []
  },
  {
    "key": "smooth-letter-slideshow",
    "title": "Lettrage progressif — guide du pack",
    "summary": "Analyse le pack lettrage progressif et orchestre les reveals typographiques, masques couleur et scènes au montage.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 329.9,
    "fps": 29,
    "palette": [],
    "beats": [
      {
        "at": "0–55 s",
        "description": "Parcours de fichiers et installation/chargement du projet dans Final Cut Pro."
      },
      {
        "at": "55–110 s",
        "description": "Ouverture d’une séquence, ajout du titre et aperçu de la révélation typographique."
      },
      {
        "at": "110–190 s",
        "description": "Assemblage des scènes; grands caractères serif sont révélés par panneaux verticaux rouges/gris."
      },
      {
        "at": "190–260 s",
        "description": "Insertion/remplacement de prises mode et alternance couleur/noir et blanc."
      },
      {
        "at": "260–329,86 s",
        "description": "Affinage du montage, vérification de titres/scènes, écran final « Fashion Show »."
      }
    ],
    "prompt": "Crée un diaporama éditorial de mode original, durée cible 25–35 secondes, 16:9, cadence constante 24 i/s. Utilise uniquement les photos et polices dont les droits sont confirmés. Palette noir, ivoire, rouge profond et gris; titres serif élégants, grands mots coupés par un panneau vertical qui balaie l’écran, quelques reveals de lettres par masques et une alternance mesurée entre images couleur et monochrome. Structure : 0–2 s titre sur fond sombre; 2–8 s première photo et mot révélé; 8–18 s trois plans mode avec variations de position du panneau et titres originaux; 18–26 s séquence plus rapide de photos avec transitions assorties; 26–30 s dernier titre/signe et sortie calme. Maintiens les titres lisibles, laisse 8% de marge, n’imite aucune marque, phrase, photo, fonte propriétaire, ni frame exacte de la référence. Anime par fonctions déterministes de frame, sans hasard d’exécution; fournir timeline JSON, sources licenciées, master et captures aux beats.",
    "recipe": "### Provenance et limites\n\nArchive  Analyse issue du projet Motion la référence, des documents/images inclus et du décodage intégral du tutoriel et de son inspection visuelle par échantillons temporels (329,863 s, 1920×1080, 29,97 i/s, 9 886 images), avec planches à 1 i/s. Le projet comporte environ 96 scènes et 13 728 nœuds XML; ce comptage indique une structure complexe, pas une mesure de chaque keyframe. Le tutoriel montre l’ouverture du projet, le remplacement des médias, l’édition/inspection de titres puis un diaporama mode avec panneaux rouges/gris, titres serif blancs/rouges, images mode couleur et noir et blanc, et un écran final. Les paramètres de timing exacts ne sont pas lisibles dans le tutoriel : valeurs fournies ci-dessous sont des points de départ à ajuster au rendu comparatif.\n\nLes fichiers du pack, ses images d’aperçu, ses vidéos, polices et la musique éventuellement référencée ont des droits non établis ici. Une liste Pexels est fournie pour les images de preview, ce qui ne prouve pas les droits des clips embarqués ni ceux d’un usage redistribué. Ne pas republier les sources ou extraire les médias du pack pour un autre projet. Remplacer par des photos/typos/audio autorisés. Reproduire la grammaire générale avec textes, palette et assets propres; ne pas promettre une copie image à image.\n\n### Beats du tutoriel (temps approximatifs)\n\nLes repères viennent d’une inspection par échantillons temporels, pas d’une lecture des keyframes individuels du logiciel source.\n\n### Matrice des sources vidéo intégrées — 14/14\n\nLe chemin est relatif au répertoire extrait `/tmp/template-packs-c/smooth-letter-slideshow/lettrage progressif/lettrage progressif/lettrage progressif/` sauf le tutoriel (chemin explicitement noté).\n\n### Routage vers les skills précis\n\n- **Lettres/lignes en reveal et répétitions typographiques** → `smooth-letter-line-reveals/SKILL.md`.\n- **Aplats rouges/gris qui glissent en masque de transition** → `smooth-letter-color-mask-wipes/SKILL.md`.\n- Ce guide assemble les scènes, media, titres et plan de contrôle complet; les deux skills spécialisés règlent les deux familles d’animation observées.\n\n### Recette déterministe Remotion + HyperFrames\n\nComposition suggérée : 1920×1080, 24 i/s pour un montage commun; si l’export doit conserver l’horloge des assets 25 i/s, créer toute la séquence en 25 i/s et convertir les assets 24 i/s via `OffthreadVideo`/source FFmpeg avec conversion explicitée. Choisir une seule cadence de master et ne pas mélanger `durationInFrames` en secondes flottantes. Construire chaque plan dans `Sequence`, poser photo derrière le masque, titre SVG au-dessus. Les Media la référence en 3840×2160 ProRes `yuva444p12le` confirment un canal alpha; vérifier l’interprétation alpha après transcodage.\n\nDans Remotion, calculer toute position depuis `useCurrentFrame` et `interpolate`, `Easing`; jamais d’horloge réelle ou random non seedé. In/hold/out comme segments (ex. 0–18, 18–72, 72–96 frames à 24 i/s), valeurs d’exemple et non timings extraits. Dans HyperFrames, même graphe SVG/DOM, GSAP en timeline paused, labels explicites, `seek(frame/fps)` et transitions associées aux labels. Le rendu doit être reproductible en demandant le même frame, y compris après seeks non séquentiels.\n\n### Exemple SVG de panneau révélateur\n```jsx\nconst p = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: 'clamp' });\n<svg viewBox=\"0 0 1920 1080\">\n <defs><clipPath id=\"reveal\"><rect x=\"0\" y=\"0\" width={1920*p} height=\"1080\"/></clipPath></defs>\n <image href={photo} width=\"1920\" height=\"1080\" preserveAspectRatio=\"xMidYMid slice\"/>\n <text x=\"960\" y=\"570\" textAnchor=\"middle\" clipPath=\"url(#reveal)\" className=\"serifTitle\">NOUVELLE SAISON</text>\n</svg>\n```\nDupliquer le masque en bandes avec retards fixes (ex. rangée i déclenchée à `i*3` frames), et ajouter un panneau rouge séparé à `translateX` calculé depuis la frame. Tester le cadrage visage sur portrait et format vertical.\n\n### Contrôle\n\nVisionner le rendu entier et vérifier les plans; comparer les frames à 0, 25%, 50%, 75%, 100% de chaque scène; transparence et matte sans halo; titre lisible à taille mobile; absence de flash; conformité droits des images, musique et fonte. Le décodage couvre toute la durée du tutoriel et les planches en donnent des échantillons temporels, mais elles ne révèlent pas les paramètres exacts de l’éditeur.",
    "checks": [
      "Archive source : `la référence`. Analyse issue du projet Motion la référence, des documents/images inclus et du décodage intégral du tutoriel et de son inspection visuelle par échantillons temporels (329,863 s, 1920×1080, 29,97 i/s, 9 886 images), avec planches à 1 i/s. Le projet comporte environ 96 scènes et 13 728 nœuds XML; ce comptage indique une structure complexe, pas une mesure de chaque keyframe. Le tutoriel montre l’ouverture du projet, le remplacement des médias, l’édition/inspection de titres puis un diaporama mode avec panneaux rouges/gris, titres serif blancs/rouges, images mode couleur et noir et blanc, et un écran final. Les paramètres de timing exacts ne sont pas lisibles dans le tutoriel : valeurs fournies ci-dessous sont des points de départ à ajuster au rendu comparatif."
    ]
  },
  {
    "key": "social-titles",
    "title": "Titres sociaux — titres éditoriaux/citations",
    "summary": "12 compositions de titres citation de titres sociaux en styles contrôlables et animation déterministe.",
    "family": "typography",
    "engines": "both",
    "format": null,
    "durationSeconds": 93.8,
    "fps": 60,
    "palette": [],
    "beats": [
      {
        "at": "0–15 s",
        "description": "Présentation/accès au pack et ouverture du projet dans l’interface de montage."
      },
      {
        "at": "15–38 s",
        "description": "Sélection du titre, glisser dans timeline et aperçu du modèle."
      },
      {
        "at": "38–67 s",
        "description": "Modification des champs de texte et changements de style/couleur dans l’inspecteur."
      },
      {
        "at": "67–83 s",
        "description": "Duplication et création d’un compound clip, inversion de direction par Reverse Clip."
      },
      {
        "at": "83–93,75 s",
        "description": "Vérification des variantes et fin du tutoriel."
      }
    ],
    "prompt": "Crée une carte de titre citation originale de 5–7 s, ratio [format], sur fond noir mat. Compo [A empilement gauche / B accent couleur / C colonne courte / D phrase ample], typographie sans-serif contemporaine et lisible, 3–6 lignes éditoriales fournies par l’utilisateur, une couleur accent choisie dans [palette]. Anime les lignes l’une après l’autre avec fade + translation subtile, maintien stable pour la lecture puis sortie propre. Permets une variante reverse en inversant la timeline; garde le même résultat à tout seek/frame. Aucun texte de citation provenant du template, aucun logo ni fonte sans licence confirmée. Fournis code Remotion, timeline HyperFrames, valeurs modifiables texte/couleur/vitesse et frames de contrôle.",
    "recipe": "### Beats tutoriel\n\nRepères estimés via planches à 1 i/s; ils ne remplacent pas le visionnage dans l’éditeur source.\n\n### Recette d’animation\n\nCanvas 1920×1080 ou 1080×1920; utiliser marges généreuses, lignes de texte séparées pour animer par ligne, accent couleur appliqué à un mot choisi par l’éditorialiste. Base test 60 i/s : 10–18 frames d’entrée par ligne, retard 3–5 frames, maintien 1,5–3 s, sortie 10–16 frames. Valeurs paramétriques estimées. Entrée par translation 18 px + opacity 0→1, léger masque horizontal; éviter de faire danser chaque lettre pour préserver lecture.\n\nRemotion `Sequence`, `useCurrentFrame`, interpolation bornée. HyperFrames DOM/SVG, timeline GSAP paused et seek frame/fps; l’inversion doit inverser l’ordre de la fonction temporelle, pas dépendre de lecture précédente. `quoteLines` doit être donné comme données, jamais codé dans l’animation.\n\n### Contrôle/droits\n\nContrôler lecture sur téléphone et sous-titres, longueur de ligne, contraste, ordre logique, respect de la zone sûre. Polices du pack citées seulement par liens: vérifier licences actuelles avant toute utilisation. Droits du projet Motion et de ses aperçus inconnus; ne pas exporter/redistribuer des éléments inclus.",
    "checks": [
      "Contrôler lecture sur téléphone et sous-titres, longueur de ligne, contraste, ordre logique, respect de la zone sûre. Polices du pack citées seulement par liens: vérifier licences actuelles avant toute utilisation. Droits du projet Motion et de ses aperçus inconnus; ne pas exporter/redistribuer des éléments inclus."
    ]
  },
  {
    "key": "sponge-textured-font-showcase",
    "title": "Typographie éponge poreuse",
    "summary": "Spécimen de lettres poreuses façon éponge et paysages.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 26.1,
    "fps": 24,
    "palette": [],
    "beats": [
      {
        "at": "0–2 s",
        "description": "Chiffres « 20 » en matière spongieuse contre coucher de soleil/plage; volume et ombres douces."
      },
      {
        "at": "2–6 s",
        "description": "Gros titre « SPONGE NUMBERS » sur image d’été, léger mouvement de caméra; la matière absorbe la lumière."
      },
      {
        "at": "6–10 s",
        "description": "« PLUS SYMBOLS » sur feuillage tropical, maintien qui montre les aspérités et l’épaisseur."
      },
      {
        "at": "10–14 s",
        "description": "Planche de chiffres et ponctuation, présentée sur fonds clairs et naturels."
      },
      {
        "at": "14–18 s",
        "description": "« ON ALPHA » devant ballons, puis changements de scène vers reflets urbains."
      },
      {
        "at": "18–22 s",
        "description": "« LOOPED » sur image nocturne; mouvement de lettre bouclée suggéré, lettres restent stable en planche."
      },
      {
        "at": "22–26,125 s",
        "description": "« THANK YOU » devant océan/crépuscule, silhouette au loin, tenue finale."
      }
    ],
    "prompt": "Réalise une démonstration typographique 16:9 de 26,125 s à 24 i/s autour d’une police de lettres 3D poreuses, comme une éponge dorée et moelleuse. Affiche successivement chiffres sur plage au soleil, le titre SPONGE NUMBERS, PLUS SYMBOLS devant des plantes, une grille lisible de glyphes, ON ALPHA devant une scène de fête, LOOPED sur un fond urbain nocturne, puis THANK YOU sur océan au crépuscule. Les lettres ont des trous, une extrusion douce, de la lumière chaude et des ombres de contact; les mots glissent ou prennent une légère profondeur mais ne se déforment pas au point de devenir illisibles. Utilise des backgrounds et assets originaux/autorisés, pas les personnes, décors, scènes ou formes de police exacts du preview. Muet.",
    "recipe": "### Construction\n\nTexturer un mesh extrudé (géométrie propre ou rendu pré-calculé) avec pores alvéolaires irréguliers, bords arrondis, lumière chaude latérale et AO discrète. En pur DOM, utiliser lettres SVG extrudées par doubles contours et une texture procédurale basse fréquence; pour un relief crédible, produire des sprites originaux avec alpha. Ne pas utiliser d’images sources.\n\n**Remotion :** 627 frames à 24 fps. Chaque scène `Sequence`, transformation par `interpolate`; une légère oscillation de caméra est une fonction périodique de la frame. Le titre vient du bas de 40 px en 12 frames, scale .96→1. Faire défiler spécimens par masque, garder les holds de matière.\n\n**HyperFrames :** calques vidéo/illustration sous SVG du texte; timeline GSAP pausée et labels 0,2,6,10,14,18,22 s. Animer camera-plate et titre séparément; `tl.time(frame/24,false)`. Boucle « LOOPED » par animation périodique déterministe sur frames, pas d’horloge réelle.\n\n### Validation\n\nComparer 0,2,6,10,14,18,22,25 s; vérifier progression des sections, lisibilité des signes, contact/ombres du relief et fin à 26,125 s. Source muette. Alpha réel, assets 3D et boucle du modèle original non vérifiés.",
    "checks": [
      "Comparer 0,2,6,10,14,18,22,25 s; vérifier progression des sections, lisibilité des signes, contact/ombres du relief et fin à 26,125 s. Source muette. Alpha réel, assets 3D et boucle du modèle original non vérifiés."
    ]
  },
  {
    "key": "thermal-glitch-display-type-kit",
    "title": "Lettrage thermal/glitch",
    "summary": "Promo de lettrage néon à aberration thermique, automobile et spécimens.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 22,
    "fps": 25,
    "palette": [],
    "beats": [
      {
        "at": "0–3 s",
        "description": "Fragments flottants convergent et révèlent GASOLINE en lettres épaisses; halo chromatique."
      },
      {
        "at": "3–6 s",
        "description": "Grand G, A, S puis autres glyphes isolés, fond noir; lueur thermique très saturée."
      },
      {
        "at": "6–10 s",
        "description": "Transition vers carrosserie/vitre automobile colorée; lettre E agrandie sur le verre, tenue."
      },
      {
        "at": "10–15 s",
        "description": "Grille de l’alphabet, lignes de glyphes crème bordées de rouge/bleu; reveal léger."
      },
      {
        "at": "15–18 s",
        "description": "Lettres isolées sur footage autorisé, ex. environnement urbain; transitions brèves et recadrage."
      },
      {
        "at": "18–22,04 s",
        "description": "Carton final « THANKS FOR WATCHING » en typographie épaisse, puis maintien."
      }
    ],
    "prompt": "Vidéo 16:9 de 22,04 secondes à 25 i/s pour présenter une fonte display originale inspirée des enseignes lumineuses et des aberrations thermiques. Sur fond noir, des fragments colorés se rassemblent pour former GASOLINE; les glyphes apparaissent ensuite seuls en crème lumineux avec contours magenta, cyan et vert légèrement désaxés. Vers 6 s, place une lettre géante dans la fenêtre d’une voiture générique filmée dans un plateau autorisé; remplace ensuite par la grille alphabétique. Fais quelques coupes vers des images originales/placées sous licence et termine par THANKS FOR WATCHING. Halo fort mais contours lisibles, mouvement bref et cadencé. Ne copie pas les glyphes, la voiture, la photographie ou le mot de marque du preview. Sans son.",
    "recipe": "### Exécution\n\nConstruire chaque caractère en SVG avec intérieur crème, contours RGB décalés (1–3 px) et glow modulé; le « thermal » est un halo coloré, non un filtre lourd plein écran. Découper le titre en morceaux géométriques pour l’entrée.\n\n**Remotion :** 551 frames à 25 fps. Utiliser `interpolate` sur la position des fragments jusqu’à leur ancrage; `drop-shadow` RGB et masque du glyph. Appliquer les distorsions en clips de 4–6 frames seulement. Scènes/boutons par `Sequence`, lettre E liée au cadre de la vitre; aucun effet à base d’horloge.\n\n**HyperFrames :** SVG/DOM en couches; `gsap.timeline({paused:true})`, labels 0,3,6,10,15,18; `fromTo` des fragments, offset des ombres RGB, image masquée par fenêtre; seek `tl.time(frame/25,false)`.\n\n### Validation et limites\n\nComparer 0,3,6,10,15,18,21 s; vérifier color fringing sans doublage illisible, scène auto licite, ordre des sections et fin. Fichier muet. Ce traitement traduit le look thermal, sans identifier la police ou les assets exacts.",
    "checks": [
      "Comparer 0,3,6,10,15,18,21 s; vérifier color fringing sans doublage illisible, scène auto licite, ordre des sections et fin. Fichier muet. Ce traitement traduit le look thermal, sans identifier la police ou les assets exacts."
    ]
  },
  {
    "key": "unique-typography-v2",
    "title": "Typographie singulière — système de titres",
    "summary": "Quatorze styles typographiques éditoriaux de typographie singulière avec titres originaux.",
    "family": "typography",
    "engines": "both",
    "format": null,
    "durationSeconds": 129,
    "fps": 59,
    "palette": [],
    "beats": [
      {
        "at": "0–20 s",
        "description": "Ouverture/présentation du pack et prévisualisation des titres."
      },
      {
        "at": "20–45 s",
        "description": "Insertion d’un titre dans le montage, ajustement et aperçu."
      },
      {
        "at": "45–82 s",
        "description": "Edition des textes, onglets Font/couleurs et options exposées."
      },
      {
        "at": "82–108 s",
        "description": "Duplication/variation du titre et contrôle du sens de lecture."
      },
      {
        "at": "108–128,996 s",
        "description": "Révision de plusieurs compositions, conclusion."
      }
    ],
    "prompt": "Crée un pack de titre éditorial moderne de 4–6 s, fond [clair/sombre], contenu entièrement original. Choisis l’une des recettes : titre géant en deux lignes, accent jaune sous un mot, barre graphique, composition asymétrique, ou empilement condensé. Utilise une fonte libre confirmée qui convient à l’identité, contraste AA, marge sûre et animation sobre : révélation par ligne, underscore qui s’étend ou panneau qui se déplace. Donne début/entrée/tenue/sortie, code Remotion déterministe et équivalent HyperFrames seekable. Pas de copie des slogans, logos, polices non autorisées ou frames de preview.",
    "recipe": "### Beats approximatifs du tutoriel\n\nRepères approximatifs, échantillonnage visuel complet mais pas mesure frame par frame du projet Motion.\n\n### Recette Remotion/HyperFrames\n\nUtiliser texte segmenté par lignes et accents SVG. Animer avec `useCurrentFrame`, durée explicite en frames, `interpolate` clamp; différer les lignes 2–4 frames. Soulignement: rectangle se développe de gauche à droite. Barre verticale/horizontale: largeur/position bornées. Arrêter les titres avant le cut avec 6–12 frames de hold. Dans HyperFrames, construire exactement les mêmes segments en timeline GSAP paused avec labels, seek direct et aucune progression par horloge réelle.\n\n### Asset et droits\n\nLes liens du paquet mentionnent Montserrat (Google Fonts), Bebas Neue/Fontfabric et un clip Pixabay; cette mention ne prouve pas les droits ou la licence des sources jointes. Valider avant usage commercial et préférer du texte/image originaux. Pas de fichier vidéo preview de rendu par titre; seul le tutoriel la référence est source vidéo dans ce pack.",
    "checks": []
  },
  {
    "key": "vhs-typeface-analog-demo",
    "title": "Typeface VHS analogique",
    "summary": "Démonstration de caractères VHS, scanlines et commandes vidéo.",
    "family": "typography",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 19.9,
    "fps": 23,
    "palette": [],
    "beats": [
      {
        "at": "0–2 s",
        "description": "CRT centré dans décor rétro géométrique; le texte VHS TYPE se construit en deux lignes; curseur triangulaire clignote."
      },
      {
        "at": "2–3 s",
        "description": "Perte de synchronisation : neige/bruit puis balayage coloré, écran bleu qui prend le cadre."
      },
      {
        "at": "3–5 s",
        "description": "Planche alphabet blanc sur bleu, apparition en groupes; petite icône avance rapide en coin."
      },
      {
        "at": "5–9 s",
        "description": "Chiffres, puis démonstration d’alpha par séparation diagonale entre bleu et damier; décalage chromatique et tracking instable bref."
      },
      {
        "at": "9–12 s",
        "description": "Planche de symboles; glyphes et ponctuation en gros, alternance d’interférence discrète et image stable."
      },
      {
        "at": "12–15 s",
        "description": "Rangée de commandes média stylisées en blanc sur bleu, glitches de transition."
      },
      {
        "at": "15–19,895 s",
        "description": "« THANK YOU!! » et cœur pixel blanc; bref bruit/glitch puis maintien stable jusqu’à fin."
      }
    ],
    "prompt": "Recrée une démonstration typographique vidéo 16:9 d’environ 19,9 secondes, 24 i/s, ambiance signal vidéo analogique. 0–2 s : petit téléviseur CRT générique au cadre bois dans un papier peint rétro, titre original “VHS TYPE” et curseur de lecture. 2–3 s : synchronisation perdue, neige et bande colorée balayée; couper vers écran bleu saturé. 3–5 s : alphabet géométrique blanc centré apparaît en lignes. 5–9 s : chiffres et effet de transparence montré par moitié damier, moitié bleu. 9–12 s : ponctuation en planche. 12–15 s : icônes simples play, pause, avance, retour et éjection. 15–19,9 s : carton “THANK YOU!” et cœur pixel. Utilise un bruit léger, scanlines et séparations RVB courtes, mais préserve la lecture; dessine le téléviseur, les glyphes et icônes toi-même, sans reprendre la police, assets ni marque de la référence. Muet.",
    "recipe": "### Mise en œuvre Remotion / HyperFrames\n\n**Remotion :** rendre 478 frames en 24 fps (durée arrondie au frame près, conserver durée cible 19,895 s). CRT CSS/SVG vectoriel inédit, bruit en texture déterministe pré-rendue ou bruit calculé à partir de `frame`; changements de fréquence d’interférence par fenêtres de frames. Alpha: même alphabet rendu sur deux demi-écrans, un damier CSS et un fond bleu. Stagger des glyphes 1–2 frames.\n\n**HyperFrames :** DOM/SVG; timeline GSAP pausée et labels 0, 2, 3, 5, 9, 12, 15 s. L’interférence s’active par segments avec `autoAlpha`, `x`, `skewX`, déplacements RGB séparés; aucune boucle native ni `Math.random`. Scrub déterministe `tl.time(frame/24,false)`.\n\n### Contrôle\n\nComparer aux timecodes 0, 2, 3, 5, 9, 12, 15, 19 s; vérifier le comportement damier/alpha, l’apparition des symboles et la stabilité du carton final. Aucun son dans le fichier analysé; la cadence source est non entière, donc conversion temporelle peut introduire un écart inférieur à une frame. Pas de preuve de transparence réelle dans la source.",
    "checks": [
      "Comparer aux timecodes 0, 2, 3, 5, 9, 12, 15, 19 s; vérifier le comportement damier/alpha, l’apparition des symboles et la stabilité du carton final. Aucun son dans le fichier analysé; la cadence source est non entière, donc conversion temporelle peut introduire un écart inférieur à une frame. Pas de preuve de transparence réelle dans la source."
    ]
  }
];
