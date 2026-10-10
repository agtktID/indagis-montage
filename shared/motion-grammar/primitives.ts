/**
 * Les primitives de mouvement : le vocabulaire sous les 123 recettes.
 *
 * C'est du contenu figé, transcrit de la bibliothèque de l'utilisateur, exactement
 * comme `shared/hero-journey.ts` transcrit la méthode. Les reformuler creuserait un
 * écart entre ce qu'il a écrit et ce que l'outil lui répond.
 *
 * Six primitives, et c'est peu — c'est le point. Les 123 recettes les recombinent ; ce
 * sont les mêmes gestes avec d'autres durées et d'autres matières. Un agent qui connaît
 * les six peut composer sans recette, et une recette lui sert alors de calibrage.
 */

export interface MotionPrimitive {
  key: string;
  label: string;
  /** Quand l'employer. */
  when: string;
  /** Comment, avec les valeurs mesurées. */
  how: string;
}

export const MOTION_PRIMITIVES: readonly MotionPrimitive[] = [
  {
    key: "entree-premium",
    label: "Entrée premium",
    when: "Tout élément qui arrive à l'écran et doit se faire remarquer sans être brusque.",
    how: "12–18 frames d'easing cubique sortant : opacité 0→1, translateY 20px→0, échelle 0,96→1. Un ressort amorti (damping 16–20, stiffness 120–180) seulement si un impact est réellement observé — sinon il fabrique une énergie qui n'est pas dans le plan.",
  },
  {
    key: "path-draw",
    label: "Tracé et déplacement de point",
    when: "Un trajet, une liaison, une progression qu'on veut voir se construire.",
    how: "Le trait se dessine par strokeDasharray/strokeDashoffset. Un point se déplace le long d'une courbe de Bézier depuis une fonction de coordonnées ou des échantillons calculés. Doubler le tracé avec un flou pour la lueur.",
  },
  {
    key: "camera-2d",
    label: "Caméra 2D",
    when: "Parcourir une carte, un plan, une planche plus grande que le cadre.",
    how: "Regrouper fond, tracés et libellés dans un parent unique. Interpoler l'échelle puis les translations entre deux positions de caméra ; ancrer les libellés à la même coordonnée logique, sinon ils glissent.",
  },
  {
    key: "device-2-5d",
    label: "Appareil en 2,5D",
    when: "Montrer un écran et garder son contenu lisible.",
    how: "Poser la capture dans un masque d'appareil, animer le parent en perspective, rotateX/Y, translateZ et ombre. Three.js ou un pré-rendu seulement si une géométrie ou un reflet fidèles sont nécessaires : la 2,5D suffit presque toujours et reste lisible.",
  },
  {
    key: "collage-papier",
    label: "Collage papier",
    when: "Donner une matière d'archive, de carnet, de coupure.",
    how: "Les déchirures et les brosses exigent des textures alpha ou SVG. Animer l'ombre et le masque séparément. Un simple clip-path convient à une version graphique, jamais à une illusion de papier photoréaliste.",
  },
  {
    key: "graphiques-compteurs",
    label: "Graphiques et compteurs",
    when: "Une quantité, une évolution, un chiffre qui monte.",
    how: "Les nombres viennent des données passées en propriétés, jamais d'une valeur écrite dans la composition. Échantillonner le compteur à la frame. Graphiques en tracés et barres SVG, entrée décalée de 4 à 7 frames.",
  },
];

/**
 * Le passage d'un moteur à l'autre.
 *
 * Les deux ponts du projet rendent la même chorégraphie par deux mécaniques
 * différentes : Remotion évalue une fonction du numéro de frame, HyperFrames déplace
 * une timeline GSAP arrêtée. Cette table est ce qui rend une recette portable.
 */
export interface EnginePorting {
  remotion: string;
  hyperframes: string;
}

export const ENGINE_PORTING: readonly EnginePorting[] = [
  { remotion: "useCurrentFrame()", hyperframes: "timeline GSAP paused: true" },
  {
    remotion: "Sequence",
    hyperframes: "clip avec data-start, data-duration, data-track-index",
  },
  { remotion: "interpolate", hyperframes: "keyframes ou fromTo à un temps explicite" },
  {
    remotion: "spring",
    hyperframes: "ease: 'back.out(…)' seulement si le dépassement est observé",
  },
  { remotion: "strokeDashoffset en SVG", hyperframes: "raw track de stroke-dashoffset" },
];

/**
 * Les trois interdits, communs aux deux moteurs.
 *
 * Ils ne sont pas une préférence de style : un rendu doit pouvoir être relancé sur
 * n'importe quelle frame et donner exactement la même image. Une horloge réelle ou un
 * `Math.random()` non graine casse cette propriété, et avec elle toute comparaison de
 * frames — donc toute vérification.
 */
export const DETERMINISM_RULES: readonly string[] = [
  "Aucune horloge réelle : le temps vient de la frame ou du temps demandé à la timeline.",
  "Aucun hasard non graine : un bruit, une particule, un grain se calculent depuis la frame.",
  "Aucune animation autonome : rien ne démarre seul, ni CSS, ni GSAP sans seek.",
];
