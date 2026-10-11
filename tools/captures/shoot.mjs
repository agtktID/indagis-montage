#!/usr/bin/env node
/**
 * Régénère les captures d'écran du README.
 *
 *   node tools/captures/shoot.mjs <binaire-chromium> [url] [dossier] [id-video-demo]
 *
 * Exemple, avec le Chromium que Playwright installe :
 *
 *   pnpm dev   # dans un autre terminal, puis laisser Vite finir de pré-bundler
 *   node tools/captures/shoot.mjs \
 *     ~/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome \
 *     http://localhost:8080 docs/captures <id-d-une-video-a-la-carte-complete>
 *
 * Aucune dépendance ajoutée au projet : le script parle au navigateur par le protocole
 * DevTools, sur le WebSocket natif de Node.
 *
 * Deux pièges, tous deux rencontrés puis traités ici :
 * - **Le mur de connexion.** Un navigateur neuf n'a pas de session et tombe sur l'écran
 *   d'accueil. Le script clique « Continuer comme développeur local » avant de capturer.
 * - **Le démarrage à froid.** Après un gros changement de dépendances, Vite met une
 *   dizaine de secondes à pré-bundler et renvoie des 504 entre-temps. Lancer le serveur
 *   d'abord, et le laisser se poser.
 *
 * Les captures sont prises en 1440×900 à l'échelle 2, soit 2880×1800.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const [chrome, base = "http://localhost:8080", outDir = "docs/captures", demoVideo] =
  process.argv.slice(2).filter((argument) => !argument.startsWith("--"));

/**
 * Le thème. `--sombre` émule `prefers-color-scheme: dark` au lieu de bricoler le
 * stockage du navigateur : le framework monte `next-themes` avec `defaultTheme: "system"`
 * et `enableSystem: true`, donc la préférence du système **est** le réglage. On
 * photographie ainsi le chemin qu'emprunte un vrai visiteur, pas un état forcé à la main.
 *
 * Les fichiers sombres prennent le suffixe `-sombre`, pour que les deux jeux cohabitent.
 */
const SOMBRE = process.argv.includes("--sombre");
const SUFFIXE = SOMBRE ? "-sombre" : "";

/**
 * Les seuls écrans photographiés aussi en thème sombre.
 *
 * Le script en produisait dix-neuf et le README en utilisait dix : neuf fichiers
 * dormaient dans le dépôt, 3,2 Mo pour rien — dont un `accueil-sombre.png` de 1,7 Mo,
 * variante sombre d'une page déjà sombre.
 *
 * Le README montre la parité des thèmes sur deux écrans, et deux suffisent à la
 * démontrer. Ajouter un nom ici quand le README en montre un de plus.
 */
const AUSSI_EN_SOMBRE = new Set(["carte-narrative", "mouvements"]);

if (!chrome) {
  console.error(
    "Usage : node tools/captures/shoot.mjs <binaire-chromium> [url] [dossier] [id-video] [--sombre]",
  );
  process.exit(1);
}

/**
 * Les écrans qui méritent une image.
 *
 * Le quatrième argument doit pointer sur une vidéo dont la carte est complète, sinon la
 * capture de la carte narrative montre un écran vide. Il est passé en argument plutôt
 * que codé en dur — chaque base locale a ses propres identifiants — et non par
 * variable d'environnement, que le garde-fou `no-env-credentials` interdit à juste
 * titre dans ce dépôt.
 */
const SHOTS = [
  ...(demoVideo
    ? [
        ["carte-narrative", `/video/${demoVideo}`],
        // Le diagnostic est la promesse de la première ligne du README : « vous dit ce
        // qui manque ». Il mérite sa propre image, et il n'appelle aucun modèle — ce
        // sont des règles appliquées à la carte.
        ["diagnostic", `/video/${demoVideo}`, "Diagnostiquer", /remarque|Avertissement/],
        ["marqueurs", `/video/${demoVideo}?tab=markers`],
      ]
    : []),
  ["catalogue-prompts", "/library?section=prompts"],
  ["mouvements", "/library?section=motion"],
  // Troisième élément : un onglet à cliquer avant de photographier. L'onglet des
  // ressources vit dans un `useState`, pas dans l'URL — on ne peut donc pas y arriver
  // par un lien. « Références » est celui qui porte les cinq types différents, donc le
  // seul qui démontre vraiment la taxonomie ; « Brouillons », ouvert par défaut, n'en
  // montre que trois.
  ["bibliotheque", "/library?section=library", "Références"],
  // La liste des vidéos et le chat plein écran ont été retirés d'ici : le README ne les
  // montre pas, et le script produisait donc deux fichiers que personne ne référençait.
  //
  // La liste n'est pas perdue pour autant — le GIF s'ouvre dessus. Le chat, lui, ne vaut
  // d'être photographié que le jour où un modèle sera connecté : sans cela, l'image
  // montre un panneau vide, ce qui dessert le produit plus que son absence.
  //
  // Les rajouter ici le jour où le README en a besoin, et pas avant.
];

if (!demoVideo) {
  console.warn(
    "  Identifiant de vidéo absent : les écrans de fiche vidéo sont ignorés.\n" +
      "  Exemple : node tools/captures/shoot.mjs <chromium> <url> <dossier> <uuid>",
  );
}

const DEBUG_PORT = 9333;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

mkdirSync(outDir, { recursive: true });

const browser = spawn(
  chrome,
  [
    "--headless=new",
    `--remote-debugging-port=${DEBUG_PORT}`,
    "--no-sandbox",
    "--hide-scrollbars",
    "--window-size=1440,900",
    "about:blank",
  ],
  { stdio: "ignore" },
);

await sleep(3000);

const { webSocketDebuggerUrl } = await fetch(
  `http://127.0.0.1:${DEBUG_PORT}/json/version`,
).then((response) => response.json());

const socket = new WebSocket(webSocketDebuggerUrl);
await new Promise((resolve) => {
  socket.onopen = resolve;
});

let nextId = 0;
const pending = new Map();
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
};

const send = (method, params = {}, sessionId) =>
  new Promise((resolve) => {
    const id = ++nextId;
    pending.set(id, resolve);
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });

const {
  result: { targetId },
} = await send("Target.createTarget", { url: "about:blank" });
const {
  result: { sessionId },
} = await send("Target.attachToTarget", { targetId, flatten: true });

await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);
await send(
  "Emulation.setDeviceMetricsOverride",
  { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false },
  sessionId,
);
if (SOMBRE) {
  await send(
    "Emulation.setEmulatedMedia",
    { features: [{ name: "prefers-color-scheme", value: "dark" }] },
    sessionId,
  );
  console.log("  thème sombre émulé");
}

const evaluate = (expression) =>
  send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, sessionId);

/* --- Franchir l'écran de connexion ---------------------------------------- */

await send("Page.navigate", { url: `${base}/` }, sessionId);
await sleep(6000);

// L'accueil se photographie ici, et nulle part ailleurs : une fois la session ouverte,
// `/` redirige et l'écran devient inatteignable. C'est pourtant la première chose qu'un
// visiteur voit de l'application.
if (!SOMBRE || AUSSI_EN_SOMBRE.has("accueil")) {
  const {
    result: { data },
  } = await send("Page.captureScreenshot", { format: "png" }, sessionId);
  writeFileSync(`${outDir}/accueil${SUFFIXE}.png`, Buffer.from(data, "base64"));
  console.log(`  ${outDir}/accueil${SUFFIXE}.png`);
}

const login = await evaluate(`
  (() => {
    const button = [...document.querySelectorAll("button, a")]
      .find((element) => /développeur local/i.test(element.textContent || ""));
    if (!button) return "déjà connecté";
    button.click();
    return "connexion développeur cliquée";
  })()
`);
console.log(`  ${login.result?.result?.value ?? "état de connexion inconnu"}`);
await sleep(8000);

/* --- Capturer -------------------------------------------------------------- */

/**
 * Attend que l'écran porte vraiment son contenu, au lieu de parier sur un délai.
 *
 * Les sept secondes d'attente fixe suffisaient d'habitude, et rataient un écran sur six
 * après un redémarrage du serveur : la capture du carnet de marqueurs est partie en
 * **squelette de chargement**, et rien ne l'a signalé — un PNG de 23 Ko au milieu de
 * fichiers de 300 Ko. On sonde donc jusqu'à voir du texte, et on le dit si on n'en voit
 * jamais, plutôt que de publier un écran vide.
 */
async function waitForContent(timeoutMs = 20_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const { result } = await evaluate(
      "(document.body.innerText || '').trim().length > 200 && !/Chargement|Loading/.test(document.body.innerText || '')",
    );
    if (result?.result?.value === true) return true;
    await sleep(400);
  }
  return false;
}

for (const [name, path, clicLabel, attendreApresClic] of SHOTS) {
  if (SOMBRE && !AUSSI_EN_SOMBRE.has(name)) continue;
  await send("Page.navigate", { url: base + path }, sessionId);
  await sleep(1500);
  if (!(await waitForContent())) {
    console.warn(`  attention : ${path} n'a jamais fini de charger — capture suspecte`);
  }
  if (clicLabel) {
    // Le clic est répété, pas tenté une fois, et la raison a coûté deux captures
    // publiées sans leur contenu.
    //
    // Le bouton existe dans le HTML rendu par le serveur bien avant que React ne
    // s'hydrate. `.click()` réussit alors — l'élément est là — mais aucun gestionnaire
    // n'écoute encore : l'événement part dans le vide, le script croit avoir cliqué, et
    // photographie un écran qui n'a jamais bougé. C'est précisément l'image du
    // diagnostic sans sa remarque qui a été livrée deux fois.
    //
    // On recommence donc jusqu'à voir le résultat attendu. Sans résultat attendu
    // déclaré, un seul clic suffit : l'onglet des ressources, lui, répond tout de suite.
    const cliquer = () =>
      evaluate(`
        (() => {
          const cible = [...document.querySelectorAll("button, a, [role=tab]")]
            .find((element) => (element.textContent || "").includes(${JSON.stringify(clicLabel)}));
          if (!cible || cible.disabled) return false;
          cible.click();
          return true;
        })()
      `);

    const premier = await cliquer();
    if (premier.result?.result?.value !== true) {
      console.warn(`  attention : « ${clicLabel} » introuvable — capture sur l'état par défaut`);
    }

    if (attendreApresClic) {
      const deadline = Date.now() + 40_000;
      let vu = false;
      let tentatives = 1;
      while (Date.now() < deadline) {
        const sonde = await evaluate(
          `${attendreApresClic}.test(document.body.innerText || "")`,
        );
        if (sonde.result?.result?.value === true) {
          vu = true;
          break;
        }
        await sleep(600);
        await cliquer();
        tentatives += 1;
      }
      if (vu) {
        if (tentatives > 1) console.log(`    (« ${clicLabel} » a pris ${tentatives} clics)`);
      } else {
        console.warn(`  attention : « ${name} » n'a jamais affiché son résultat — capture suspecte`);
      }
    }
    await sleep(900);
  }
  // Une respiration après le texte : les graphiques Recharts s'animent à l'entrée.
  await sleep(1200);
  const {
    result: { data },
  } = await send("Page.captureScreenshot", { format: "png" }, sessionId);
  writeFileSync(`${outDir}/${name}${SUFFIXE}.png`, Buffer.from(data, "base64"));
  console.log(`  ${outDir}/${name}${SUFFIXE}.png`);
}

socket.close();
browser.kill();
