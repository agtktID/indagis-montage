# Les captures du README — régénération

Les images de `docs/captures/` ne sont pas des photos d'un état de travail : **le contenu
qu'elles montrent est du code**. `seed-demo.mjs` pose un récit de démonstration complet,
et n'importe qui peut refaire les mêmes images à l'identique.

C'est volontaire. Une capture qui ment sur l'état du produit est pire que pas de capture,
et une capture qu'on ne sait plus refaire vieillit sans que personne ne s'en aperçoive.

## Refaire les images

Lancer `pnpm dev` dans un autre terminal, puis, **sur une base vierge** :

```bash
node tools/captures/seed-demo.mjs <chromium> http://localhost:8080
node tools/captures/shoot.mjs     <chromium> http://localhost:8080 docs/captures <id-video>
node tools/captures/shoot.mjs     <chromium> http://localhost:8080 docs/captures <id-video> --sombre
node tools/captures/demo.mjs      <chromium> <ffmpeg> http://localhost:8080 docs/captures/demo.gif <id-video>
```

`seed-demo.mjs` imprime l'identifiant de vidéo à passer aux deux autres commandes.

Les deux binaires sont ceux que Playwright installe dans `~/.cache/ms-playwright/` :
aucune dépendance n'est ajoutée au projet pour fabriquer des captures. Ils sont passés en
**argument positionnel**, jamais par une variable d'environnement — le garde
`no-env-credentials` du doctor l'interdit.

## Ce que chaque script fait, et pourquoi

| Script | Rôle |
| --- | --- |
| `seed-demo.mjs` | Écrit le récit de démonstration **par les actions, en HTTP**, exactement comme l'interface |
| `shoot.mjs` | Visite des URL et photographie les écrans ; `--sombre` bascule le thème |
| `demo.mjs` | **Joue le parcours** et en fait un GIF — la seule façon de montrer qu'un bouton agit |

Le jeu de démonstration passe par les mêmes règles métier que n'importe quelle saisie
utilisateur. Conséquence utile : **une capture ne peut pas montrer un état que
l'application refuserait**.

## Deux garde-fous

**`seed-demo.mjs` refuse de tourner sur une base qui contient déjà des vidéos.** Écraser
un vrai travail pour fabriquer une capture serait un mauvais échange ; `--force` rend ce
geste délibéré.

**L'identifiant passé à `shoot.mjs` doit désigner une vidéo à la carte complète**, sinon
les images montrent un écran vide — et un écran vide dans un README donne l'impression
d'un produit vide.

## Deux détails appris à la dure

Ils sont commentés dans `seed-demo.mjs`, et valent d'être connus avant de le modifier :

- Le mur de connexion est servi **à `/`, pas à `/sign-in`**.
- Après `create-video`, l'application navigue et détruit le contexte CDP. Toutes les
  écritures suivantes partent donc depuis une page de réponse d'action — même origine,
  même cookie, aucun React monté.
