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

/** identity-logo — 16 recettes. */
export const MOTION_IDENTITYLOGO: readonly MotionRecipe[] = [
  {
    "key": "gradient-ribbon-logo-reveal",
    "title": "Gradient ribbon révélation de logo",
    "summary": "Reveal de ruban gradient et emblème abstrait.",
    "family": "identity-logo",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 28.1,
    "fps": 30,
    "palette": [
      "#090A1C",
      "#ECEAF1",
      "#7955FF",
      "#E94A97",
      "#C8FD21"
    ],
    "beats": [
      {
        "at": "0–120 / 0–4 s",
        "description": "Fond navy `#090A1C`, texte centre blur 16→0 et `scale .96→1`."
      },
      {
        "at": "120–240 / 4–8 s",
        "description": "Phrase/mot accent violet, halo elliptique `opacity 0→.45`, 18f."
      },
      {
        "at": "240–360 / 8–12 s",
        "description": "Faux écran dashboard passe depuis profondeur `scale .74→1`, y 70→0, 24f cubic-out."
      },
      {
        "at": "360–480 / 12–16 s",
        "description": "Traits/pastilles UI s'éjectent vers le haut; blur progressif et champ de profondeur."
      },
      {
        "at": "480–600 / 16–20 s",
        "description": "Texte latéral/globe abstrait, caméra dolly `scale 1→1.08`."
      },
      {
        "at": "600–720 / 20–24 s",
        "description": "Plans tarif de remplacement; cartes y 35→0, 6f stagger."
      },
      {
        "at": "720–810 / 24–27 s",
        "description": "Mot final, halo/filaments violet."
      },
      {
        "at": "810–842 / 27–28.054 s",
        "description": "Emblème rose facetté + ruban lime/violet, `stroke-dashoffset` 0.6s, fade."
      }
    ],
    "prompt": "Reveal 16:9 de 28 secondes pour un logiciel fictif, arrière-plan navy très sombre, brume violet profond, mots blancs minimalistes, dashboard abstrait en perspective, cartes de prix fictives, final avec emblème géométrique rose créé sur mesure et long ruban SVG gradient lime-violet qui se dessine. Mouvement premium, lumière douce, sans aucune marque ou logo existant.",
    "recipe": "### Contrat et plan\n\n Reproduire l'énergie et les transitions mais générer un ruban et un emblème entièrement originaux; aucun logo/nom/textures de la référence.\n\nPalette `#090A1C,#ECEAF1,#7955FF,#E94A97,#C8FD21`; sans-serif moderne; calques fond radial, fog subtil, texte, écrans fictifs, ruban SVG, logo abstraction.\n\n**Remotion** : utiliser un SVG maison pour ribbon path et facettes; `strokeDasharray:pathLength`, `interpolate` pour dashoffset; sources d'écrans en composants, pas captures tiers.\n\n**HyperFrames** : `gsap.timeline({paused:true})`, labels 0,4,8,12,16,20,24,27; `drawSVG` simulé avec dashoffset; `tl.time(frame/30,false)`.",
    "checks": []
  },
  {
    "key": "logo-reveal-pack",
    "title": "Pack de révélation de logo — routeur six presets",
    "summary": "Choisir puis reproduire l'une des six compositions indépendantes révélation de logo Apple Motion.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 88.8,
    "fps": 60,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:12",
        "description": "navigation des templates et palettes"
      },
      {
        "at": "00:12–00:35",
        "description": "signe central et particules radiales révèlent l'ident"
      },
      {
        "at": "00:35–00:56",
        "description": "variations de couleurs/densité et position"
      },
      {
        "at": "00:56–01:18",
        "description": "signature texte apparaît en relation au logo"
      },
      {
        "at": "01:18–01:28",
        "description": "réglages finaux et contrôle d'aperçu"
      }
    ],
    "prompt": "Crée un ident cinématique sur fond presque noir. Le logo autorisé donné par le client se révèle au centre par une petite montée d'échelle avec overshoot amorti. De petits points élégants s'allument en couronne régulière et un halo discret souligne le signe. Fais ensuite entrer une très courte signature, alignée optiquement au logo. Maintiens les deux entièrement lisibles, puis diminue la lumière et coupe vers le noir. Mouvement fluide, mesuré et premium, palette fournie paramétrable, aucun logo tiers ni particule aléatoire. Pose l'état depuis l'image demandée afin que chaque frame soit déterministe.",
    "recipe": "### Matrice source → skill / section\n\nTous les films sont sous `la référence`. Dans la matrice, les chemins `pack de révélation de logo/Logo NN/` sont relatifs à cette racine; le chemin du tuto l’est également. Chaque dossier logo contient aussi `large.png`/`small.png`. Les IDs 01–03 référencent l’icône Twitter, 04–05 Facebook, 06 YouTube dans le XML; ce sont des placeholders, pas les éléments à livrer.\n\n### Tutoriel intégral (échantillonné visuellement)\n\nLe tuto a été parcouru en planches à pas de 0,5 s de 00:00 à 01:28. Il montre les presets, l'emblème centré sur fond noir, des points/particules en couronnes, variation de palette, puis signe associé à une courte ligne de texte et ajustements inspecteur. Il ne comporte pas six rendus vidéos isolés; les beats enfant sont la reconstruction proposée, pas des keyframes mesurées du tuto.\n\n### Règles des enfants\n\nLes XML donnent cadence et durées, pas les paramètres visuels complets. À reproduire : fond très sombre, logo clair centré, points radiaux réguliers, halo discret, signature de marque très courte, hold lisible et disparition sobre. Les sous-skills décrivent recette frame-based Remotion et GSAP pausée HyperFrames, prompt et timecodes QA. Pour chaque variante, coordonner taille logo/texte et palette plutôt que recoller iconographie sociale.\n\n### Remotion/HyperFrames\nComposition 1920×1080/30. État calculé exclusivement à partir de `frame`. Logo opacity/scale environ 15–42f, particules 24–90f, signature 90–116f; ces repères sont des hypothèses à confronter à un export natif. Coordonnées de points statiques/précalculées. Dans HyperFrames, GSAP timeline `paused:true`, et `time(frame/30,false)` à chaque image; pas de timers/horloge/animation libre.\n\n### Prompt directeur\n« Crée un ident cinématique sur fond presque noir. Le logo autorisé donné par le client se révèle au centre par une petite montée d'échelle avec overshoot amorti. De petits points élégants s'allument en couronne régulière et un halo discret souligne le signe. Fais ensuite entrer une très courte signature, alignée optiquement au logo. Maintiens les deux entièrement lisibles, puis diminue la lumière et coupe vers le noir. Mouvement fluide, mesuré et premium, palette fournie paramétrable, aucun logo tiers ni particule aléatoire. Pose l'état depuis l'image demandée afin que chaque frame soit déterministe.»\n\n### Droits et limitations\n\n`Fonts/Font Link.rtf` recommande Gilroy depuis FontSquirrel; vérifier la version/licence exacte et si la redistribution est permise. Une présence locale d'icônes Twitter/Facebook/YouTube n'accorde aucun droit de marque. Licence de la source la référence, assets, police et éventuelle musique à confirmer. Les captures de tutoriel sont une interface FCP/Motion; pas preuve des valeurs exactes. Pour une correspondance pixel, exporter les six compositions Apple Motion puis mesurer/aligner les frames; non réalisé sur cette machine.",
    "checks": []
  },
  {
    "key": "logo-reveal-pack-logo-01",
    "title": "Révélation de logo 01 — twitter preset",
    "summary": "Preset révélation de logo 01, avec marque d'exemple remplacée par un logo autorisé.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 6.3,
    "fps": 30,
    "palette": [
      "#101116"
    ],
    "beats": [
      {
        "at": "00:00–00:00.50 (0–14)",
        "description": "Noir, point focal très discret — inféré"
      },
      {
        "at": "00:00.50–00:01.40 (15–41)",
        "description": "logo centré, opacity 0→1, scale ~0,65→1 avec overshoot léger — entrée vue en tuto; timing estimé"
      },
      {
        "at": "00:01.40–00:03.00 (42–89)",
        "description": "couronne/nuage radial de particules s'allume puis s'établit — motif observé; durée estimée"
      },
      {
        "at": "00:03.00–00:04.40 (90–131)",
        "description": "signature courte arrive sous ou à droite du logo — relation observée; placement à valider"
      },
      {
        "at": "00:04.40–6.33 (132–189)",
        "description": "pose de marque lisible, léger affaiblissement et fin sobre — estimé"
      }
    ],
    "prompt": "Crée un ident premium et minimal de 6.33 s, 1920×1080, 30 fps, fond presque noir. Révèle l'emblème original autorisé du client au centre, petit puis agrandi par un overshoot doux qui se stabilise. Des points très fins s'allument en couronnes radiales équilibrées autour du signe, avec halo faible et net. Fais ensuite apparaître une signature courte et éditable sous ou à droite du logo, en sans sérif propre, avec un déplacement vertical subtil. Maintiens une lecture claire du couple signe/texte avant d'éteindre doucement la lumière vers le noir. Palette paramétrable, particules organisées, pas de bruit, pas d'icônes ou marques tierces, pas de mouvement erratique. Chaque pose, particule et transition est indexée sur la frame et doit rester seekable.",
    "recipe": "### Remotion déterministe\n\n1920×1080, 30fps, 190 images. `logoScale=interpolate(frame,[15,42],[0.65,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.back(1.2))})`. Fondu logo frames 10–32; tagline sur 90–116 avec `translateY` de +14px à 0. Générer explicitement une liste fixe de positions de particules `(x,y,r,phase)` et animer chaque apparition de frame 24 à 90; aucune `Math.random` pendant le rendu. Palette, tagline, emblème SVG/PNG sont props. Le léger retour du logo/hold se calibre contre export Motion.\n\n### HyperFrames déterministe\n\nBloc SVG pour logo et particules, texte HTML, fond `#101116`. Timeline GSAP `paused:true`, transitions prédéfinies, l'adaptateur pose `timeline.time(frame/30,false)`; en rendu frame-server, dériver les styles directement du `frame`. Aucune boucle requestAnimationFrame autonome, minuterie ou animation temporelle système.\n\n### QC, droits et preuves\n\nCapturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette.",
    "checks": [
      "Capturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette."
    ]
  },
  {
    "key": "logo-reveal-pack-logo-02",
    "title": "Révélation de logo 02 — twitter preset",
    "summary": "Preset révélation de logo 02, avec marque d'exemple remplacée par un logo autorisé.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 6.3,
    "fps": 30,
    "palette": [
      "#101116"
    ],
    "beats": [
      {
        "at": "00:00–00:00.50 (0–14)",
        "description": "Noir, point focal très discret — inféré"
      },
      {
        "at": "00:00.50–00:01.40 (15–41)",
        "description": "logo centré, opacity 0→1, scale ~0,65→1 avec overshoot léger — entrée vue en tuto; timing estimé"
      },
      {
        "at": "00:01.40–00:03.00 (42–89)",
        "description": "couronne/nuage radial de particules s'allume puis s'établit — motif observé; durée estimée"
      },
      {
        "at": "00:03.00–00:04.40 (90–131)",
        "description": "signature courte arrive sous ou à droite du logo — relation observée; placement à valider"
      },
      {
        "at": "00:04.40–6.33 (132–189)",
        "description": "pose de marque lisible, léger affaiblissement et fin sobre — estimé"
      }
    ],
    "prompt": "Crée un ident premium et minimal de 6.33 s, 1920×1080, 30 fps, fond presque noir. Révèle l'emblème original autorisé du client au centre, petit puis agrandi par un overshoot doux qui se stabilise. Des points très fins s'allument en couronnes radiales équilibrées autour du signe, avec halo faible et net. Fais ensuite apparaître une signature courte et éditable sous ou à droite du logo, en sans sérif propre, avec un déplacement vertical subtil. Maintiens une lecture claire du couple signe/texte avant d'éteindre doucement la lumière vers le noir. Palette paramétrable, particules organisées, pas de bruit, pas d'icônes ou marques tierces, pas de mouvement erratique. Chaque pose, particule et transition est indexée sur la frame et doit rester seekable.",
    "recipe": "### Remotion déterministe\n\n1920×1080, 30fps, 190 images. `logoScale=interpolate(frame,[15,42],[0.65,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.back(1.2))})`. Fondu logo frames 10–32; tagline sur 90–116 avec `translateY` de +14px à 0. Générer explicitement une liste fixe de positions de particules `(x,y,r,phase)` et animer chaque apparition de frame 24 à 90; aucune `Math.random` pendant le rendu. Palette, tagline, emblème SVG/PNG sont props. Le léger retour du logo/hold se calibre contre export Motion.\n\n### HyperFrames déterministe\n\nBloc SVG pour logo et particules, texte HTML, fond `#101116`. Timeline GSAP `paused:true`, transitions prédéfinies, l'adaptateur pose `timeline.time(frame/30,false)`; en rendu frame-server, dériver les styles directement du `frame`. Aucune boucle requestAnimationFrame autonome, minuterie ou animation temporelle système.\n\n### QC, droits et preuves\n\nCapturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette.",
    "checks": [
      "Capturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette."
    ]
  },
  {
    "key": "logo-reveal-pack-logo-03",
    "title": "Révélation de logo 03 — twitter preset",
    "summary": "Preset révélation de logo 03, avec marque d'exemple remplacée par un logo autorisé.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 6.3,
    "fps": 30,
    "palette": [
      "#101116"
    ],
    "beats": [
      {
        "at": "00:00–00:00.50 (0–14)",
        "description": "Noir, point focal très discret — inféré"
      },
      {
        "at": "00:00.50–00:01.40 (15–41)",
        "description": "logo centré, opacity 0→1, scale ~0,65→1 avec overshoot léger — entrée vue en tuto; timing estimé"
      },
      {
        "at": "00:01.40–00:03.00 (42–89)",
        "description": "couronne/nuage radial de particules s'allume puis s'établit — motif observé; durée estimée"
      },
      {
        "at": "00:03.00–00:04.40 (90–131)",
        "description": "signature courte arrive sous ou à droite du logo — relation observée; placement à valider"
      },
      {
        "at": "00:04.40–6.33 (132–189)",
        "description": "pose de marque lisible, léger affaiblissement et fin sobre — estimé"
      }
    ],
    "prompt": "Crée un ident premium et minimal de 6.33 s, 1920×1080, 30 fps, fond presque noir. Révèle l'emblème original autorisé du client au centre, petit puis agrandi par un overshoot doux qui se stabilise. Des points très fins s'allument en couronnes radiales équilibrées autour du signe, avec halo faible et net. Fais ensuite apparaître une signature courte et éditable sous ou à droite du logo, en sans sérif propre, avec un déplacement vertical subtil. Maintiens une lecture claire du couple signe/texte avant d'éteindre doucement la lumière vers le noir. Palette paramétrable, particules organisées, pas de bruit, pas d'icônes ou marques tierces, pas de mouvement erratique. Chaque pose, particule et transition est indexée sur la frame et doit rester seekable.",
    "recipe": "### Remotion déterministe\n\n1920×1080, 30fps, 190 images. `logoScale=interpolate(frame,[15,42],[0.65,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.back(1.2))})`. Fondu logo frames 10–32; tagline sur 90–116 avec `translateY` de +14px à 0. Générer explicitement une liste fixe de positions de particules `(x,y,r,phase)` et animer chaque apparition de frame 24 à 90; aucune `Math.random` pendant le rendu. Palette, tagline, emblème SVG/PNG sont props. Le léger retour du logo/hold se calibre contre export Motion.\n\n### HyperFrames déterministe\n\nBloc SVG pour logo et particules, texte HTML, fond `#101116`. Timeline GSAP `paused:true`, transitions prédéfinies, l'adaptateur pose `timeline.time(frame/30,false)`; en rendu frame-server, dériver les styles directement du `frame`. Aucune boucle requestAnimationFrame autonome, minuterie ou animation temporelle système.\n\n### QC, droits et preuves\n\nCapturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette.",
    "checks": [
      "Capturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette."
    ]
  },
  {
    "key": "logo-reveal-pack-logo-04",
    "title": "Révélation de logo 04 — facebook preset",
    "summary": "Preset révélation de logo 04, avec marque d'exemple remplacée par un logo autorisé.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 6.3,
    "fps": 30,
    "palette": [
      "#101116"
    ],
    "beats": [
      {
        "at": "00:00–00:00.50 (0–14)",
        "description": "Noir, point focal très discret — inféré"
      },
      {
        "at": "00:00.50–00:01.40 (15–41)",
        "description": "logo centré, opacity 0→1, scale ~0,65→1 avec overshoot léger — entrée vue en tuto; timing estimé"
      },
      {
        "at": "00:01.40–00:03.00 (42–89)",
        "description": "couronne/nuage radial de particules s'allume puis s'établit — motif observé; durée estimée"
      },
      {
        "at": "00:03.00–00:04.40 (90–131)",
        "description": "signature courte arrive sous ou à droite du logo — relation observée; placement à valider"
      },
      {
        "at": "00:04.40–6.33 (132–189)",
        "description": "pose de marque lisible, léger affaiblissement et fin sobre — estimé"
      }
    ],
    "prompt": "Crée un ident premium et minimal de 6.33 s, 1920×1080, 30 fps, fond presque noir. Révèle l'emblème original autorisé du client au centre, petit puis agrandi par un overshoot doux qui se stabilise. Des points très fins s'allument en couronnes radiales équilibrées autour du signe, avec halo faible et net. Fais ensuite apparaître une signature courte et éditable sous ou à droite du logo, en sans sérif propre, avec un déplacement vertical subtil. Maintiens une lecture claire du couple signe/texte avant d'éteindre doucement la lumière vers le noir. Palette paramétrable, particules organisées, pas de bruit, pas d'icônes ou marques tierces, pas de mouvement erratique. Chaque pose, particule et transition est indexée sur la frame et doit rester seekable.",
    "recipe": "### Remotion déterministe\n\n1920×1080, 30fps, 190 images. `logoScale=interpolate(frame,[15,42],[0.65,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.back(1.2))})`. Fondu logo frames 10–32; tagline sur 90–116 avec `translateY` de +14px à 0. Générer explicitement une liste fixe de positions de particules `(x,y,r,phase)` et animer chaque apparition de frame 24 à 90; aucune `Math.random` pendant le rendu. Palette, tagline, emblème SVG/PNG sont props. Le léger retour du logo/hold se calibre contre export Motion.\n\n### HyperFrames déterministe\n\nBloc SVG pour logo et particules, texte HTML, fond `#101116`. Timeline GSAP `paused:true`, transitions prédéfinies, l'adaptateur pose `timeline.time(frame/30,false)`; en rendu frame-server, dériver les styles directement du `frame`. Aucune boucle requestAnimationFrame autonome, minuterie ou animation temporelle système.\n\n### QC, droits et preuves\n\nCapturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette.",
    "checks": [
      "Capturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette."
    ]
  },
  {
    "key": "logo-reveal-pack-logo-05",
    "title": "Révélation de logo 05 — facebook preset",
    "summary": "Preset révélation de logo 05, avec marque d'exemple remplacée par un logo autorisé.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 6.3,
    "fps": 30,
    "palette": [
      "#101116"
    ],
    "beats": [
      {
        "at": "00:00–00:00.50 (0–14)",
        "description": "Noir, point focal très discret — inféré"
      },
      {
        "at": "00:00.50–00:01.40 (15–41)",
        "description": "logo centré, opacity 0→1, scale ~0,65→1 avec overshoot léger — entrée vue en tuto; timing estimé"
      },
      {
        "at": "00:01.40–00:03.00 (42–89)",
        "description": "couronne/nuage radial de particules s'allume puis s'établit — motif observé; durée estimée"
      },
      {
        "at": "00:03.00–00:04.40 (90–131)",
        "description": "signature courte arrive sous ou à droite du logo — relation observée; placement à valider"
      },
      {
        "at": "00:04.40–6.33 (132–189)",
        "description": "pose de marque lisible, léger affaiblissement et fin sobre — estimé"
      }
    ],
    "prompt": "Crée un ident premium et minimal de 6.33 s, 1920×1080, 30 fps, fond presque noir. Révèle l'emblème original autorisé du client au centre, petit puis agrandi par un overshoot doux qui se stabilise. Des points très fins s'allument en couronnes radiales équilibrées autour du signe, avec halo faible et net. Fais ensuite apparaître une signature courte et éditable sous ou à droite du logo, en sans sérif propre, avec un déplacement vertical subtil. Maintiens une lecture claire du couple signe/texte avant d'éteindre doucement la lumière vers le noir. Palette paramétrable, particules organisées, pas de bruit, pas d'icônes ou marques tierces, pas de mouvement erratique. Chaque pose, particule et transition est indexée sur la frame et doit rester seekable.",
    "recipe": "### Remotion déterministe\n\n1920×1080, 30fps, 190 images. `logoScale=interpolate(frame,[15,42],[0.65,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.back(1.2))})`. Fondu logo frames 10–32; tagline sur 90–116 avec `translateY` de +14px à 0. Générer explicitement une liste fixe de positions de particules `(x,y,r,phase)` et animer chaque apparition de frame 24 à 90; aucune `Math.random` pendant le rendu. Palette, tagline, emblème SVG/PNG sont props. Le léger retour du logo/hold se calibre contre export Motion.\n\n### HyperFrames déterministe\n\nBloc SVG pour logo et particules, texte HTML, fond `#101116`. Timeline GSAP `paused:true`, transitions prédéfinies, l'adaptateur pose `timeline.time(frame/30,false)`; en rendu frame-server, dériver les styles directement du `frame`. Aucune boucle requestAnimationFrame autonome, minuterie ou animation temporelle système.\n\n### QC, droits et preuves\n\nCapturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette.",
    "checks": [
      "Capturer f=0,20,48,92,120,189; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette."
    ]
  },
  {
    "key": "logo-reveal-pack-logo-06",
    "title": "Révélation de logo 06 — youtube preset",
    "summary": "Preset révélation de logo 06, avec marque d'exemple remplacée par un logo autorisé.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 10,
    "fps": 30,
    "palette": [
      "#101116"
    ],
    "beats": [
      {
        "at": "00:00–00:00.50 (0–14)",
        "description": "Noir, point focal très discret — inféré"
      },
      {
        "at": "00:00.50–00:01.40 (15–41)",
        "description": "logo centré, opacity 0→1, scale ~0,65→1 avec overshoot léger — entrée vue en tuto; timing estimé"
      },
      {
        "at": "00:01.40–00:03.00 (42–89)",
        "description": "couronne/nuage radial de particules s'allume puis s'établit — motif observé; durée estimée"
      },
      {
        "at": "00:03.00–00:04.40 (90–131)",
        "description": "signature courte arrive sous ou à droite du logo — relation observée; placement à valider"
      },
      {
        "at": "00:04.40–10.03 (132–300)",
        "description": "pose de marque lisible, léger affaiblissement et fin sobre — estimé"
      }
    ],
    "prompt": "Crée un ident premium et minimal de 10.03 s, 1920×1080, 30 fps, fond presque noir. Révèle l'emblème original autorisé du client au centre, petit puis agrandi par un overshoot doux qui se stabilise. Des points très fins s'allument en couronnes radiales équilibrées autour du signe, avec halo faible et net. Fais ensuite apparaître une signature courte et éditable sous ou à droite du logo, en sans sérif propre, avec un déplacement vertical subtil. Maintiens une lecture claire du couple signe/texte avant d'éteindre doucement la lumière vers le noir. Palette paramétrable, particules organisées, pas de bruit, pas d'icônes ou marques tierces, pas de mouvement erratique. Chaque pose, particule et transition est indexée sur la frame et doit rester seekable.",
    "recipe": "### Remotion déterministe\n\n1920×1080, 30fps, 301 images. `logoScale=interpolate(frame,[15,42],[0.65,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.back(1.2))})`. Fondu logo frames 10–32; tagline sur 90–116 avec `translateY` de +14px à 0. Générer explicitement une liste fixe de positions de particules `(x,y,r,phase)` et animer chaque apparition de frame 24 à 90; aucune `Math.random` pendant le rendu. Palette, tagline, emblème SVG/PNG sont props. Le léger retour du logo/hold se calibre contre export Motion.\n\n### HyperFrames déterministe\n\nBloc SVG pour logo et particules, texte HTML, fond `#101116`. Timeline GSAP `paused:true`, transitions prédéfinies, l'adaptateur pose `timeline.time(frame/30,false)`; en rendu frame-server, dériver les styles directement du `frame`. Aucune boucle requestAnimationFrame autonome, minuterie ou animation temporelle système.\n\n### QC, droits et preuves\n\nCapturer f=0,20,48,92,120,300; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette.",
    "checks": [
      "Capturer f=0,20,48,92,120,300; contrôler le centrage, les marges, l'équilibre logo/signature et le hold. Pour exactitude, exporter ce numéro dans Apple Motion/FCP, inspecter les images et comparer; le runtime source n'est pas disponible ici. Le tutoriel partagé a été inspecté en planches 0,5 s sur toute sa durée; cadence/durée du la référence sont vérifiées. Gilroy est suggérée dans le RTF du pack, licence et variante précise à confirmer. Ne redistribuer ni cette marque d'exemple, ni l'icône sociale, ni fichier la référence sans les droits adaptés; musique/voix ne sont pas incluses dans cette animation muette."
    ]
  },
  {
    "key": "luxury-organic-brand-reveal",
    "title": "Luxury organic brand reveal",
    "summary": "Montage de brand board organique.",
    "family": "identity-logo",
    "engines": "both",
    "format": "16:9",
    "durationSeconds": 30,
    "fps": 30,
    "palette": [
      "#F4F0EA",
      "#252525",
      "#10352F",
      "#B44736",
      "#D5C6B4"
    ],
    "beats": [
      {
        "at": "0–120 / 0–4 s",
        "description": "Titre et bloc organique sombre; masque blob `scale .4→1`, 24f `sine.out`."
      },
      {
        "at": "120–270 / 4–9 s",
        "description": "Petit médaillon portrait, drift x 0→18 px et y 0→-8 px; dissolve 12f."
      },
      {
        "at": "270–420 / 9–14 s",
        "description": "Grand ovale vert sombre avec portrait éditorial; zoom image 1→1.05 sur 150f."
      },
      {
        "at": "420–570 / 14–19 s",
        "description": "Composition objets/couleurs dans blob gris; deux stickers entrent `rotate -8→0` 16f."
      },
      {
        "at": "570–690 / 19–23 s",
        "description": "Médaillon clair et photo abstraite; wipe organique `clip-path` 20f."
      },
      {
        "at": "690–810 / 23–27 s",
        "description": "Grille de six vignettes; scale .92→1 par 5f de décalage."
      },
      {
        "at": "810–901 / 27–30.047 s",
        "description": "Planche de palette, logo placeholder puis fond ivoire."
      }
    ],
    "prompt": "Film 16:9 de 30 secondes pour une identité beauté fictive, papier ivoire, blobs organiques, portraits éditoriaux autorisés, objets sculpturaux, nuances vert forêt, brique et beige, grille de moodboard puis palette. Camera lente, masques biomorphiques, quiet luxury, sans nom/logo/photo de référence.",
    "recipe": "### Contrat et découpage\n\n Reproduire le montage d'identité, pas le nom ni les photos. Assets : portraits, objets et nuanciers exclusivement produits/licenciés.\n\nFond `#F4F0EA`, noir chaud `#252525`, vert `#10352F`, rouge brique `#B44736`, beige `#D5C6B4`; sérif éditoriale autorisée pour titre et sans-serif fine pour légendes. Calques : papier, blobs clip-path, photo, ombre douce, texte, grain 2 %.\n\n### Moteurs, prompt, check\n\n**Remotion** : `clipPath: path(...)` pour blobs, `interpolate` pour opacity/scale, un `Sequence` par beat; photos positionnées en `object-fit:cover` et panifiées par transform.\n\n**HyperFrames** : formes SVG au-dessus d'images, `gsap.timeline({paused:true})` labels `0,4,9,14,19,23,27`; animer `clipPath`, scale/rotation et `autoAlpha`; `tl.time(frame/30)`.",
    "checks": []
  },
  {
    "key": "silhouette-openings",
    "title": "Ouvertures en silhouette — routeur des six variantes",
    "summary": "Sélectionner et recréer une ouverture/fermeture typographique avec vidéo masquée.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 364.9,
    "fps": 10,
    "palette": [],
    "beats": [],
    "prompt": "Réalise un reveal typographique où une vidéo fournie est visible dans les lettres capitales d’un titre. Fais ouvrir le matte sur fond noir, laisse l’image remplir chaque glyphe, puis conserve une pose lisible avec le plan en mouvement. Prévois six exports vraiment distincts : In et Out en paysage, carré et vertical, avec mise à l’échelle et composition adaptées plutôt qu’un recadrage aveugle. Permets le remplacement du texte, logo SVG autorisé, vidéo, police et couleurs. L’animation est indexée sur les frames, seekable, sans marque ni média protégé du pack; respecte le sens d’ouverture de la variante sélectionnée et compare chaque ratio à ses images de référence.",
    "recipe": "### Matrice de traçabilité\n\nSources sous `la référence Openings Main Files/`. Chaque la référence est XML, 450 frames à 30fps; chacun lie `Media/Logo.png`. Six la référence sont des previews H.264/yuv420p aplatis (sans alpha), pas un matte transparent utilisable.\n\n### Tutoriel complet, échantillonné 0,5 seconde (00:00–06:05)\n\nL'interface montre pose d'un titre/générateur sur timeline, réglages de texte, masque texte ou logo, remplacement du média d'arrière-plan, changements de couleur, ratios paysage/carré/vertical et titre « Your Title ». Une fenêtre circulaire et les lettres révèlent un rush skyline. Les six previews ont été échantillonnés à 1 image/s de leur début à leur fin.\n\n### Contrat de reproduction\n\n`In` développe le champ/matte pour introduire le titre rempli par l'image, `Out` retire l'image par fermeture du matte; ce sont des directions distinctes. Garder une pose centrale noire et le masque typographique fort, footage recadré proprement, puis une seconde de hold lisible. Les previews donnent la forme et la cadence générale, pas l'alpha, les keyframes cachées ni les réglages natifs exacts.\n\n### Remotion et HyperFrames\n\nCanevas choisi à partir du ratio de variante; 450f/30fps, temps entièrement depuis `frame`. Mettre l'image derrière un SVG `<mask>` ou `<clipPath>` alimenté par du texte blanc ou un logo autorisé; `object-fit:cover` et aucun étirement. Progression segmentée à frames fixes, par exemple `[0,32,118,230,360,449]` avec mouvement d'ouverture puis hold. Pour Out inverser la progression du matte. Exposer `ratio,title,logoSrc,footage,background,maskMode`. HyperFrames: HTML/SVG/CSS + GSAP `paused:true`, timeline réglée à `time(frame/30,false)`; pas de temporisateur, horloge réelle ni RAF automatique. Verify clip-path/mask et typo navigateur par snapshots.\n\n### Droits/limites\n\nLe document inclus attribue les médias Pexels à CC0, mais c'est seulement la revendication du pack; vérifier la licence du média réellement employé. Le RTF présente un conflit de référence (URL Azo Sans chez Adobe, libellé Montserrat Google Fonts): police exacte inconnue. `Logo.png`, footage des previews, musique, police et droits du pack à confirmer. Pas de rendu Apple Motion réalisé; pour prétendre à une correspondance exacte, exporter chaque la référence dans l'application native et comparer.",
    "checks": [
      "`In` développe le champ/matte pour introduire le titre rempli par l'image, `Out` retire l'image par fermeture du matte; ce sont des directions distinctes. Garder une pose centrale noire et le masque typographique fort, footage recadré proprement, puis une seconde de hold lisible. Les previews donnent la forme et la cadence générale, pas l'alpha, les keyframes cachées ni les réglages natifs exacts."
    ]
  },
  {
    "key": "silhouette-openings-opening-in-landscape",
    "title": "Silhouette in — landscape",
    "summary": "Variante silhouette in landscape avec vidéo découpée dans les glyphes.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 364.9,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:01 / 0–29",
        "description": "fond noir/masque étroit, première fenêtre de clip"
      },
      {
        "at": "00:01–00:04 / 30–119",
        "description": "expansion organique du champ, début de lecture dans les glyphes"
      },
      {
        "at": "00:04–00:08 / 120–239",
        "description": "mots capitales lisibles; le paysage remplit le matte"
      },
      {
        "at": "00:08–00:13 / 240–389",
        "description": "pose stable du texte-image, fond noir"
      },
      {
        "at": "00:13–00:15 / 390–449",
        "description": "fin de mouvement/hold; valider le sens selon variante et export natif"
      }
    ],
    "prompt": "Crée une animation title-mask in de 15 s, 30fps, format landscape. Fond noir profond; le texte modifiable “Votre titre”, capitales fortes et lisibles, sert de fenêtre dans une vidéo d'action/paysage autorisée recadrée cover. Commence avec une petite fenêtre, ouvre progressivement le masque par un mouvement circulaire souple qui se transforme en glyphes. Stabilise le mot entièrement rempli d'image pendant un hold lisible. Pour la variante Out, pars du mot plein et referme le matte jusqu'au noir; pour In, fais l'inverse et termine sur le titre révélé. Laisse les couleurs/logo/source modifiables, protège marges et proportions, contours propres et animés sans saccades. N'intègre aucun logo/footage du bundle sans permission. Chaque frame doit être calculée à partir de son index, seekable à volonté et reproductible.",
    "recipe": "### Beats complets du preview (échantillons 1fps sur 15s)\n\nLe preview associe une vidéo de paysage à un matte texte noir; le rendu, cadré au ratio landscape, illustre le développement du masque. Le texte de démonstration s'apparente à « SILHOUTTE »; remplace-le par contenu fourni.\n\n`In` développe le matte de noir à une pose texte/image; `Out` effectue le mouvement inverse. Ces répartitions de beats sont lues visuellement; la structure de keyframes et easing exacte du la référence n'a pas été rendue pour comparaison.\n\n### Recette Remotion\n\nComposition 450 frames, 30fps; ratio adapté au profil, pas au proxy basse résolution. Superposer SVG `<mask>` de capitales/forme logo autorisé à la vidéo source, recadrée `cover`, avec fond noir. Progression frame-driven par `interpolate(frame,[0,32,118,230,360,449],[0,0.08,0.78,1,1,0.98],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})`; pour `Out`, inverser le sens d'ouverture/fermeture sans réordonner arbitrairement le clip. `title`, `maskMode`, `logo`, `image`, `crop` et couleur sont props. Éviter le stretch, clipping et flash noir intermittent.\n\n### Recette HyperFrames\n\nInline SVG mask + élément vidéo seekable et fond. Timeline GSAP `paused:true`; contrôler le rayon, masque et texte par les frames, poser la timeline à `frame/30` via seek avant capture. Pas de `Date.now`, timers ou animation libre. Capturer aux frames 0, 30, 90, 150, 240, 360, 449.\n\n### QC / droits\n\nContrôler ratio landscape, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable.",
    "checks": [
      "Contrôler ratio landscape, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable."
    ]
  },
  {
    "key": "silhouette-openings-opening-in-square",
    "title": "Silhouette in — square",
    "summary": "Variante silhouette in square avec vidéo découpée dans les glyphes.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 364.9,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:01 / 0–29",
        "description": "fond noir/masque étroit, première fenêtre de clip"
      },
      {
        "at": "00:01–00:04 / 30–119",
        "description": "expansion organique du champ, début de lecture dans les glyphes"
      },
      {
        "at": "00:04–00:08 / 120–239",
        "description": "mots capitales lisibles; le paysage remplit le matte"
      },
      {
        "at": "00:08–00:13 / 240–389",
        "description": "pose stable du texte-image, fond noir"
      },
      {
        "at": "00:13–00:15 / 390–449",
        "description": "fin de mouvement/hold; valider le sens selon variante et export natif"
      }
    ],
    "prompt": "Crée une animation title-mask in de 15 s, 30fps, format square. Fond noir profond; le texte modifiable “Votre titre”, capitales fortes et lisibles, sert de fenêtre dans une vidéo d'action/paysage autorisée recadrée cover. Commence avec une petite fenêtre, ouvre progressivement le masque par un mouvement circulaire souple qui se transforme en glyphes. Stabilise le mot entièrement rempli d'image pendant un hold lisible. Pour la variante Out, pars du mot plein et referme le matte jusqu'au noir; pour In, fais l'inverse et termine sur le titre révélé. Laisse les couleurs/logo/source modifiables, protège marges et proportions, contours propres et animés sans saccades. N'intègre aucun logo/footage du bundle sans permission. Chaque frame doit être calculée à partir de son index, seekable à volonté et reproductible.",
    "recipe": "### Beats complets du preview (échantillons 1fps sur 15s)\n\nLe preview associe une vidéo de paysage à un matte texte noir; le rendu, cadré au ratio square, illustre le développement du masque. Le texte de démonstration s'apparente à « SQUARE »; remplace-le par contenu fourni.\n\n`In` développe le matte de noir à une pose texte/image; `Out` effectue le mouvement inverse. Ces répartitions de beats sont lues visuellement; la structure de keyframes et easing exacte du la référence n'a pas été rendue pour comparaison.\n\n### Recette Remotion\n\nComposition 450 frames, 30fps; ratio adapté au profil, pas au proxy basse résolution. Superposer SVG `<mask>` de capitales/forme logo autorisé à la vidéo source, recadrée `cover`, avec fond noir. Progression frame-driven par `interpolate(frame,[0,32,118,230,360,449],[0,0.08,0.78,1,1,0.98],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})`; pour `Out`, inverser le sens d'ouverture/fermeture sans réordonner arbitrairement le clip. `title`, `maskMode`, `logo`, `image`, `crop` et couleur sont props. Éviter le stretch, clipping et flash noir intermittent.\n\n### Recette HyperFrames\n\nInline SVG mask + élément vidéo seekable et fond. Timeline GSAP `paused:true`; contrôler le rayon, masque et texte par les frames, poser la timeline à `frame/30` via seek avant capture. Pas de `Date.now`, timers ou animation libre. Capturer aux frames 0, 30, 90, 150, 240, 360, 449.\n\n### QC / droits\n\nContrôler ratio square, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable.",
    "checks": [
      "Contrôler ratio square, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable."
    ]
  },
  {
    "key": "silhouette-openings-opening-in-vertical",
    "title": "Silhouette in — vertical",
    "summary": "Variante silhouette in vertical avec vidéo découpée dans les glyphes.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 364.9,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:01 / 0–29",
        "description": "fond noir/masque étroit, première fenêtre de clip"
      },
      {
        "at": "00:01–00:04 / 30–119",
        "description": "expansion organique du champ, début de lecture dans les glyphes"
      },
      {
        "at": "00:04–00:08 / 120–239",
        "description": "mots capitales lisibles; le paysage remplit le matte"
      },
      {
        "at": "00:08–00:13 / 240–389",
        "description": "pose stable du texte-image, fond noir"
      },
      {
        "at": "00:13–00:15 / 390–449",
        "description": "fin de mouvement/hold; valider le sens selon variante et export natif"
      }
    ],
    "prompt": "Crée une animation title-mask in de 15 s, 30fps, format vertical. Fond noir profond; le texte modifiable “Votre titre”, capitales fortes et lisibles, sert de fenêtre dans une vidéo d'action/paysage autorisée recadrée cover. Commence avec une petite fenêtre, ouvre progressivement le masque par un mouvement circulaire souple qui se transforme en glyphes. Stabilise le mot entièrement rempli d'image pendant un hold lisible. Pour la variante Out, pars du mot plein et referme le matte jusqu'au noir; pour In, fais l'inverse et termine sur le titre révélé. Laisse les couleurs/logo/source modifiables, protège marges et proportions, contours propres et animés sans saccades. N'intègre aucun logo/footage du bundle sans permission. Chaque frame doit être calculée à partir de son index, seekable à volonté et reproductible.",
    "recipe": "### Beats complets du preview (échantillons 1fps sur 15s)\n\nLe preview associe une vidéo de paysage à un matte texte noir; le rendu, cadré au ratio vertical, illustre le développement du masque. Le texte de démonstration s'apparente à « FREE »; remplace-le par contenu fourni.\n\n`In` développe le matte de noir à une pose texte/image; `Out` effectue le mouvement inverse. Ces répartitions de beats sont lues visuellement; la structure de keyframes et easing exacte du la référence n'a pas été rendue pour comparaison.\n\n### Recette Remotion\n\nComposition 450 frames, 30fps; ratio adapté au profil, pas au proxy basse résolution. Superposer SVG `<mask>` de capitales/forme logo autorisé à la vidéo source, recadrée `cover`, avec fond noir. Progression frame-driven par `interpolate(frame,[0,32,118,230,360,449],[0,0.08,0.78,1,1,0.98],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})`; pour `Out`, inverser le sens d'ouverture/fermeture sans réordonner arbitrairement le clip. `title`, `maskMode`, `logo`, `image`, `crop` et couleur sont props. Éviter le stretch, clipping et flash noir intermittent.\n\n### Recette HyperFrames\n\nInline SVG mask + élément vidéo seekable et fond. Timeline GSAP `paused:true`; contrôler le rayon, masque et texte par les frames, poser la timeline à `frame/30` via seek avant capture. Pas de `Date.now`, timers ou animation libre. Capturer aux frames 0, 30, 90, 150, 240, 360, 449.\n\n### QC / droits\n\nContrôler ratio vertical, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable.",
    "checks": [
      "Contrôler ratio vertical, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable."
    ]
  },
  {
    "key": "silhouette-openings-opening-out-landscape",
    "title": "Silhouette out — landscape",
    "summary": "Variante silhouette out landscape avec vidéo découpée dans les glyphes.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 364.9,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:01 / 0–29",
        "description": "fond noir/masque étroit, première fenêtre de clip"
      },
      {
        "at": "00:01–00:04 / 30–119",
        "description": "expansion organique du champ, début de lecture dans les glyphes"
      },
      {
        "at": "00:04–00:08 / 120–239",
        "description": "mots capitales lisibles; le paysage remplit le matte"
      },
      {
        "at": "00:08–00:13 / 240–389",
        "description": "pose stable du texte-image, fond noir"
      },
      {
        "at": "00:13–00:15 / 390–449",
        "description": "fin de mouvement/hold; valider le sens selon variante et export natif"
      }
    ],
    "prompt": "Crée une animation title-mask out de 15 s, 30fps, format landscape. Fond noir profond; le texte modifiable “Votre titre”, capitales fortes et lisibles, sert de fenêtre dans une vidéo d'action/paysage autorisée recadrée cover. Commence avec une petite fenêtre, ouvre progressivement le masque par un mouvement circulaire souple qui se transforme en glyphes. Stabilise le mot entièrement rempli d'image pendant un hold lisible. Pour la variante Out, pars du mot plein et referme le matte jusqu'au noir; pour In, fais l'inverse et termine sur le titre révélé. Laisse les couleurs/logo/source modifiables, protège marges et proportions, contours propres et animés sans saccades. N'intègre aucun logo/footage du bundle sans permission. Chaque frame doit être calculée à partir de son index, seekable à volonté et reproductible.",
    "recipe": "### Beats complets du preview (échantillons 1fps sur 15s)\n\nLe preview associe une vidéo de paysage à un matte texte noir; le rendu, cadré au ratio landscape, illustre le développement du masque. Le texte de démonstration s'apparente à « SILHOUTTE »; remplace-le par contenu fourni.\n\n`In` développe le matte de noir à une pose texte/image; `Out` effectue le mouvement inverse. Ces répartitions de beats sont lues visuellement; la structure de keyframes et easing exacte du la référence n'a pas été rendue pour comparaison.\n\n### Recette Remotion\n\nComposition 450 frames, 30fps; ratio adapté au profil, pas au proxy basse résolution. Superposer SVG `<mask>` de capitales/forme logo autorisé à la vidéo source, recadrée `cover`, avec fond noir. Progression frame-driven par `interpolate(frame,[0,32,118,230,360,449],[0,0.08,0.78,1,1,0.98],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})`; pour `Out`, inverser le sens d'ouverture/fermeture sans réordonner arbitrairement le clip. `title`, `maskMode`, `logo`, `image`, `crop` et couleur sont props. Éviter le stretch, clipping et flash noir intermittent.\n\n### Recette HyperFrames\n\nInline SVG mask + élément vidéo seekable et fond. Timeline GSAP `paused:true`; contrôler le rayon, masque et texte par les frames, poser la timeline à `frame/30` via seek avant capture. Pas de `Date.now`, timers ou animation libre. Capturer aux frames 0, 30, 90, 150, 240, 360, 449.\n\n### QC / droits\n\nContrôler ratio landscape, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable.",
    "checks": [
      "Contrôler ratio landscape, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable."
    ]
  },
  {
    "key": "silhouette-openings-opening-out-square",
    "title": "Silhouette out — square",
    "summary": "Variante silhouette out square avec vidéo découpée dans les glyphes.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 364.9,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:01 / 0–29",
        "description": "fond noir/masque étroit, première fenêtre de clip"
      },
      {
        "at": "00:01–00:04 / 30–119",
        "description": "expansion organique du champ, début de lecture dans les glyphes"
      },
      {
        "at": "00:04–00:08 / 120–239",
        "description": "mots capitales lisibles; le paysage remplit le matte"
      },
      {
        "at": "00:08–00:13 / 240–389",
        "description": "pose stable du texte-image, fond noir"
      },
      {
        "at": "00:13–00:15 / 390–449",
        "description": "fin de mouvement/hold; valider le sens selon variante et export natif"
      }
    ],
    "prompt": "Crée une animation title-mask out de 15 s, 30fps, format square. Fond noir profond; le texte modifiable “Votre titre”, capitales fortes et lisibles, sert de fenêtre dans une vidéo d'action/paysage autorisée recadrée cover. Commence avec une petite fenêtre, ouvre progressivement le masque par un mouvement circulaire souple qui se transforme en glyphes. Stabilise le mot entièrement rempli d'image pendant un hold lisible. Pour la variante Out, pars du mot plein et referme le matte jusqu'au noir; pour In, fais l'inverse et termine sur le titre révélé. Laisse les couleurs/logo/source modifiables, protège marges et proportions, contours propres et animés sans saccades. N'intègre aucun logo/footage du bundle sans permission. Chaque frame doit être calculée à partir de son index, seekable à volonté et reproductible.",
    "recipe": "### Beats complets du preview (échantillons 1fps sur 15s)\n\nLe preview associe une vidéo de paysage à un matte texte noir; le rendu, cadré au ratio square, illustre le développement du masque. Le texte de démonstration s'apparente à « ASPECT »; remplace-le par contenu fourni.\n\n`In` développe le matte de noir à une pose texte/image; `Out` effectue le mouvement inverse. Ces répartitions de beats sont lues visuellement; la structure de keyframes et easing exacte du la référence n'a pas été rendue pour comparaison.\n\n### Recette Remotion\n\nComposition 450 frames, 30fps; ratio adapté au profil, pas au proxy basse résolution. Superposer SVG `<mask>` de capitales/forme logo autorisé à la vidéo source, recadrée `cover`, avec fond noir. Progression frame-driven par `interpolate(frame,[0,32,118,230,360,449],[0,0.08,0.78,1,1,0.98],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})`; pour `Out`, inverser le sens d'ouverture/fermeture sans réordonner arbitrairement le clip. `title`, `maskMode`, `logo`, `image`, `crop` et couleur sont props. Éviter le stretch, clipping et flash noir intermittent.\n\n### Recette HyperFrames\n\nInline SVG mask + élément vidéo seekable et fond. Timeline GSAP `paused:true`; contrôler le rayon, masque et texte par les frames, poser la timeline à `frame/30` via seek avant capture. Pas de `Date.now`, timers ou animation libre. Capturer aux frames 0, 30, 90, 150, 240, 360, 449.\n\n### QC / droits\n\nContrôler ratio square, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable.",
    "checks": [
      "Contrôler ratio square, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable."
    ]
  },
  {
    "key": "silhouette-openings-opening-out-vertical",
    "title": "Silhouette out — vertical",
    "summary": "Variante silhouette out vertical avec vidéo découpée dans les glyphes.",
    "family": "identity-logo",
    "engines": "both",
    "format": null,
    "durationSeconds": 364.9,
    "fps": 30,
    "palette": [],
    "beats": [
      {
        "at": "00:00–00:01 / 0–29",
        "description": "fond noir/masque étroit, première fenêtre de clip"
      },
      {
        "at": "00:01–00:04 / 30–119",
        "description": "expansion organique du champ, début de lecture dans les glyphes"
      },
      {
        "at": "00:04–00:08 / 120–239",
        "description": "mots capitales lisibles; le paysage remplit le matte"
      },
      {
        "at": "00:08–00:13 / 240–389",
        "description": "pose stable du texte-image, fond noir"
      },
      {
        "at": "00:13–00:15 / 390–449",
        "description": "fin de mouvement/hold; valider le sens selon variante et export natif"
      }
    ],
    "prompt": "Crée une animation title-mask out de 15 s, 30fps, format vertical. Fond noir profond; le texte modifiable “Votre titre”, capitales fortes et lisibles, sert de fenêtre dans une vidéo d'action/paysage autorisée recadrée cover. Commence avec une petite fenêtre, ouvre progressivement le masque par un mouvement circulaire souple qui se transforme en glyphes. Stabilise le mot entièrement rempli d'image pendant un hold lisible. Pour la variante Out, pars du mot plein et referme le matte jusqu'au noir; pour In, fais l'inverse et termine sur le titre révélé. Laisse les couleurs/logo/source modifiables, protège marges et proportions, contours propres et animés sans saccades. N'intègre aucun logo/footage du bundle sans permission. Chaque frame doit être calculée à partir de son index, seekable à volonté et reproductible.",
    "recipe": "### Beats complets du preview (échantillons 1fps sur 15s)\n\nLe preview associe une vidéo de paysage à un matte texte noir; le rendu, cadré au ratio vertical, illustre le développement du masque. Le texte de démonstration s'apparente à « IGTV. »; remplace-le par contenu fourni.\n\n`In` développe le matte de noir à une pose texte/image; `Out` effectue le mouvement inverse. Ces répartitions de beats sont lues visuellement; la structure de keyframes et easing exacte du la référence n'a pas été rendue pour comparaison.\n\n### Recette Remotion\n\nComposition 450 frames, 30fps; ratio adapté au profil, pas au proxy basse résolution. Superposer SVG `<mask>` de capitales/forme logo autorisé à la vidéo source, recadrée `cover`, avec fond noir. Progression frame-driven par `interpolate(frame,[0,32,118,230,360,449],[0,0.08,0.78,1,1,0.98],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})`; pour `Out`, inverser le sens d'ouverture/fermeture sans réordonner arbitrairement le clip. `title`, `maskMode`, `logo`, `image`, `crop` et couleur sont props. Éviter le stretch, clipping et flash noir intermittent.\n\n### Recette HyperFrames\n\nInline SVG mask + élément vidéo seekable et fond. Timeline GSAP `paused:true`; contrôler le rayon, masque et texte par les frames, poser la timeline à `frame/30` via seek avant capture. Pas de `Date.now`, timers ou animation libre. Capturer aux frames 0, 30, 90, 150, 240, 360, 449.\n\n### QC / droits\n\nContrôler ratio vertical, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable.",
    "checks": [
      "Contrôler ratio vertical, sens In/Out, transitions sans trous, centrage, lisibilité et crop des plans. Une reproduction exacte exige comparaison à l'export natif Motion du la référence, non disponible. Le pack affirme CC0 pour des liens Pexels : ne pas considérer cela comme validation du clip distribué. RTF ambigu entre URL Adobe Azo Sans et nom Montserrat; choisir une police permise et noter fallback. Droits pack, logo, footage et fontes à confirmer; la vidéo preview aplatie n'est pas un alpha overlay exploitable."
    ]
  }
];
