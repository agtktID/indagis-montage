/**
 * Le contrat d'écriture des actions, exercé contre une vraie base.
 *
 * Ces tests ne cherchent pas à prouver que la plomberie marche — le vérificateur le
 * fait déjà, de bout en bout, par la CLI. Ils couvrent la **logique de résolution** :
 * ce qu'une action garde quand on ne lui dit rien, ce qu'elle refuse, et ce qu'elle
 * journalise. C'est là que les bugs de ce dépôt sont apparus.
 *
 * Chaque bloc nomme le bug qu'il empêche de revenir. Un test dont on ne sait pas dire
 * quel échec il attrape ne protège rien ; il ralentit juste la suite.
 */
import { beforeAll, describe, expect, it } from "vitest";

import {
  asTestUser,
  asUser,
  loadAction,
  OTHER_USER,
  setupActionTests,
  TEST_USER,
} from "../helpers/action-harness.js";

/** Démarrer PGlite prend quelques secondes ; une fois par fichier. */
const BOOT = 60_000;

let run: Record<string, (input: Record<string, unknown>) => Promise<unknown>>;

/** Crée une vidéo et renvoie son identifiant. */
async function newVideo(title = "Vidéo de test"): Promise<string> {
  const result = (await asTestUser(() => run["create-video"]({ title }))) as {
    video: { id: string };
  };
  return result.video.id;
}

beforeAll(async () => {
  await setupActionTests();
  const names = [
    "create-video",
    "update-video",
    "archive-video",
    "move-stage",
    "list-videos",
    "list-stage-events",
    "get-video",
    "set-beat",
    "get-story-map",
    "upsert-marker",
    "reorder-markers",
    "answer-prep-question",
    "create-experiment",
    "resolve-experiment",
    "upsert-publication",
    "list-publications",
    "record-metrics",
    "upsert-prompt",
    "delete-prompt",
    "list-prompts",
    "upsert-asset",
    "suggest-motion",
    "import-assets",
    "export-assets",
    "list-assets",
  ];
  const loaded = await Promise.all(names.map((name) => loadAction(name)));
  run = Object.fromEntries(names.map((name, index) => [name, loaded[index]]));
}, BOOT);

describe("une modification ne doit rien effacer de ce qu'elle ne nomme pas", () => {
  /**
   * Le bug de la PR #22, en plusieurs exemplaires. Les actions `upsert-*` posaient
   * des valeurs de repli en dur : un appel qui ne nommait pas un champ retombait sur
   * le défaut de création, jamais sur ce que la ligne portait déjà. Renommer une
   * ressource effaçait son format et ses mots-clés, en silence.
   */
  it("upsert-prompt : changer le seul corps garde le nom", async () => {
    const created = (await asTestUser(() =>
      run["upsert-prompt"]({
        name: "Mon prompt",
        body: "Corps initial",
        kind: "video",
        format: "16:9",
        tags: "test, exemple",
      }),
    )) as { prompt: { id: string } };

    const updated = (await asTestUser(() =>
      run["upsert-prompt"]({ promptId: created.prompt.id, body: "Corps modifié" }),
    )) as {
      prompt: { name: string; body: string; kind: string; format: string | null; tags: string | null };
    };

    expect(updated.prompt.body).toBe("Corps modifié");
    // Les quatre champs que l'appel ne nommait pas.
    expect(updated.prompt.name).toBe("Mon prompt");
    expect(updated.prompt.kind).toBe("video");
    expect(updated.prompt.format).toBe("16:9");
    expect(updated.prompt.tags).toBe("test, exemple");
  });

  it("upsert-prompt : renommer garde le corps et le format", async () => {
    const created = (await asTestUser(() =>
      run["upsert-prompt"]({ name: "Avant", body: "Un corps", format: "9:16" }),
    )) as { prompt: { id: string } };

    const updated = (await asTestUser(() =>
      run["upsert-prompt"]({ promptId: created.prompt.id, name: "Après" }),
    )) as { prompt: { name: string; body: string; format: string | null } };

    expect(updated.prompt.name).toBe("Après");
    expect(updated.prompt.body).toBe("Un corps");
    expect(updated.prompt.format).toBe("9:16");
  });

  it("upsert-asset : le nom reste obligatoire à chaque modification", async () => {
    /**
     * Un constat, pas un souhait. `upsert-asset` déclare `name` requis, donc changer
     * le seul état est impossible par contrat — l'écran doit renvoyer le nom avec, ce
     * qu'il fait depuis la PR #23. Ce test fige le comportement réel : si quelqu'un
     * rend `name` optionnel un jour, il devra décider sciemment du repli, au lieu de
     * laisser l'ancien défaut en dur effacer le titre.
     */
    const videoId = await newVideo();
    const created = (await asTestUser(() =>
      run["upsert-asset"]({
        name: "Ma ressource",
        url: "https://exemple.test/image.png",
        status: "draft",
        videoId,
      }),
    )) as { asset: { id: string } };

    await expect(
      asTestUser(() => run["upsert-asset"]({ assetId: created.asset.id, status: "generated" })),
    ).rejects.toThrow(/name/i);
  });

  it("upsert-asset : avec le nom renvoyé, l'URL survit au changement d'état", async () => {
    const videoId = await newVideo();
    const created = (await asTestUser(() =>
      run["upsert-asset"]({
        name: "Ma ressource",
        url: "https://exemple.test/image.png",
        status: "draft",
        videoId,
      }),
    )) as { asset: { id: string } };

    const updated = (await asTestUser(() =>
      run["upsert-asset"]({
        assetId: created.asset.id,
        name: "Ma ressource",
        status: "generated",
      }),
    )) as { asset: { name: string; url: string | null; status: string } };

    expect(updated.asset.status).toBe("generated");
    expect(updated.asset.name).toBe("Ma ressource");
    expect(updated.asset.url).toBe("https://exemple.test/image.png");
  });

  it("upsert-publication : changer le statut garde le titre SEO", async () => {
    const videoId = await newVideo();
    const created = (await asTestUser(() =>
      run["upsert-publication"]({ videoId, platform: "YouTube", seoTitle: "Un titre" }),
    )) as { publication: { id: string } };

    const updated = (await asTestUser(() =>
      run["upsert-publication"]({
        videoId,
        publicationId: created.publication.id,
        platform: "YouTube",
        status: "published",
      }),
    )) as { publication: { platform: string; seoTitle: string | null; status: string } };

    expect(updated.publication.status).toBe("published");
    expect(updated.publication.seoTitle).toBe("Un titre");
  });
});

describe("les refus — ce à quoi une action doit dire non", () => {
  it("update-video refuse de changer l'étape de production", async () => {
    // `move-stage` est le seul chemin vers `videos.stage`, parce que lui seul
    // journalise dans `stage_events` — et la détection de blocage lit ce journal.
    const videoId = await newVideo();
    await expect(
      asTestUser(() => run["update-video"]({ videoId, stage: "edit" })),
    ).rejects.toThrow(/move-stage|stage/i);
  });

  it("reorder-markers refuse une liste partielle", async () => {
    const videoId = await newVideo();
    const first = (await asTestUser(() =>
      run["upsert-marker"]({ videoId, label: "Un", startMs: 0 }),
    )) as { marker: { id: string } };
    await asTestUser(() => run["upsert-marker"]({ videoId, label: "Deux", startMs: 1000 }));

    // Un seul des deux : accepter produirait un ordre silencieusement faux.
    await expect(
      asTestUser(() => run["reorder-markers"]({ videoId, orderedMarkerIds: [first.marker.id] })),
    ).rejects.toThrow(/partielle|manquant/i);
  });

  it("resolve-experiment exige un verdict pour clore", async () => {
    const videoId = await newVideo();
    const created = (await asTestUser(() =>
      run["create-experiment"]({
        videoId,
        source: "self",
        observation: "Le milieu traîne.",
      }),
    )) as { experiment: { id: string } };

    await expect(
      asTestUser(() =>
        run["resolve-experiment"]({ experimentId: created.experiment.id, status: "kept" }),
      ),
    ).rejects.toThrow(/verdict/i);

    // Avec un verdict, la clôture passe : le refus porte sur l'absence, pas sur l'acte.
    const resolved = (await asTestUser(() =>
      run["resolve-experiment"]({
        experimentId: created.experiment.id,
        status: "kept",
        verdictNote: "Trois plans coupés, le milieu respire.",
      }),
    )) as { experiment: { status: string } };
    expect(resolved.experiment.status).toBe("kept");
  });

  it("answer-prep-question refuse une clé inconnue", async () => {
    const videoId = await newVideo();
    await expect(
      asTestUser(() =>
        run["answer-prep-question"]({ videoId, questionKey: "question-inventée", answer: "x" }),
      ),
    ).rejects.toThrow();
  });

  it("delete-prompt ne touche pas aux prompts intégrés", async () => {
    // Les prompts livrés vivent dans le code, pas en base : aucune ligne à supprimer.
    await expect(
      asTestUser(() => run["delete-prompt"]({ promptId: "hero-image-monde-ordinaire" })),
    ).rejects.toThrow(/introuvable|intégr/i);
  });
});

describe("les invariants de la méthode", () => {
  it("move-stage journalise, et c'est ce qui rend le blocage détectable", async () => {
    const videoId = await newVideo();
    const before = (await asTestUser(() => run["list-stage-events"]({ videoId }))) as {
      events: unknown[];
    };

    await asTestUser(() => run["move-stage"]({ videoId, toStage: "edit" }));

    const after = (await asTestUser(() => run["list-stage-events"]({ videoId }))) as {
      events: { toStage: string }[];
    };
    expect(after.events.length).toBe(before.events.length + 1);
    expect(after.events.some((event) => event.toStage === "edit")).toBe(true);
  });

  it("set-beat : une note blanche ne couvre pas l'étape", async () => {
    // La règle de `shared/coverage.ts`, vue depuis l'action : couverte seulement si la
    // note est non vide *après trim*. Ni une intensité seule, ni des espaces.
    const videoId = await newVideo();

    const blanche = (await asTestUser(() =>
      run["set-beat"]({ videoId, step: 1, note: "   ", intensity: 40 }),
    )) as { isCovered: boolean };
    expect(blanche.isCovered).toBe(false);

    const ecrite = (await asTestUser(() =>
      run["set-beat"]({ videoId, step: 1, note: "Le quotidien, filmé au lever." }),
    )) as { isCovered: boolean };
    expect(ecrite.isCovered).toBe(true);
  });

  it("get-story-map rend toujours les douze étapes, même sur une carte vide", async () => {
    const videoId = await newVideo();
    const map = (await asTestUser(() => run["get-story-map"]({ videoId }))) as {
      steps: unknown[];
      coverage: { covered: number; total: number };
    };
    expect(map.steps).toHaveLength(12);
    expect(map.coverage.total).toBe(12);
    expect(map.coverage.covered).toBe(0);
  });

  it("record-metrics : un seul relevé par jour, le second corrige le premier", async () => {
    const videoId = await newVideo();
    const publication = (await asTestUser(() =>
      run["upsert-publication"]({ videoId, platform: "YouTube" }),
    )) as { publication: { id: string } };

    const jour = "2026-10-10";
    await asTestUser(() =>
      run["record-metrics"]({
        publicationId: publication.publication.id,
        measuredOn: jour,
        views: 100,
      }),
    );
    await asTestUser(() =>
      run["record-metrics"]({
        publicationId: publication.publication.id,
        measuredOn: jour,
        views: 250,
      }),
    );

    const listed = (await asTestUser(() => run["list-publications"]({ videoId }))) as {
      publications: { metrics: { views: number | null }[] }[];
    };
    const metrics = listed.publications[0].metrics;
    expect(metrics).toHaveLength(1);
    expect(metrics[0].views).toBe(250);
  });

  it("archive-video fait l'aller-retour", async () => {
    // Le bug de la PR #22 : l'archivage partait sans revenir.
    const videoId = await newVideo("À archiver");

    await asTestUser(() => run["archive-video"]({ videoId, archived: true }));
    const actives = (await asTestUser(() => run["list-videos"]({}))) as {
      videos: { id: string }[];
    };
    expect(actives.videos.some((video) => video.id === videoId)).toBe(false);

    await asTestUser(() => run["archive-video"]({ videoId, archived: false }));
    const apres = (await asTestUser(() => run["list-videos"]({}))) as {
      videos: { id: string }[];
    };
    expect(apres.videos.some((video) => video.id === videoId)).toBe(true);
  });

  it("suggest-motion ne propose rien pour une étape non écrite", async () => {
    // La règle du projet, vue depuis l'action : on n'invente pas de scène. Une étape
    // vide est annoncée vide, et ne reçoit aucune recette.
    const videoId = await newVideo();
    await asTestUser(() => run["set-beat"]({ videoId, step: 8, note: "Il lâche la rampe." }));

    const suggestions = (await asTestUser(() => run["suggest-motion"]({ videoId }))) as {
      emptySteps: number[];
      steps: { step: number; isCovered: boolean; recipes: unknown[] }[];
    };

    const climax = suggestions.steps.find((entry) => entry.step === 8);
    expect(climax?.isCovered).toBe(true);
    expect(climax?.recipes.length).toBeGreaterThan(0);

    for (const entry of suggestions.steps.filter((candidate) => !candidate.isCovered)) {
      expect(entry.recipes, `étape ${entry.step}`).toEqual([]);
    }
    expect(suggestions.emptySteps).toHaveLength(11);
  });
});

describe("l'isolation entre utilisateurs", () => {
  it("une vidéo d'un autre compte n'apparaît pas dans la liste", async () => {
    // La classe de bug de la PR #22 : les lectures doivent passer par le filtre de
    // propriété. Un test qui ne crée qu'un utilisateur ne peut pas la voir.
    const sien = (await asUser(OTHER_USER, () =>
      run["create-video"]({ title: "Vidéo d'un autre" }),
    )) as { video: { id: string } };

    const miennes = (await asTestUser(() => run["list-videos"]({}))) as {
      videos: { id: string }[];
    };
    expect(miennes.videos.some((video) => video.id === sien.video.id)).toBe(false);

    const siennes = (await asUser(OTHER_USER, () => run["list-videos"]({}))) as {
      videos: { id: string }[];
    };
    expect(siennes.videos.some((video) => video.id === sien.video.id)).toBe(true);
  });

  it("on ne lit pas la vidéo d'un autre compte par son identifiant", async () => {
    const sien = (await asUser(OTHER_USER, () =>
      run["create-video"]({ title: "Privée" }),
    )) as { video: { id: string } };

    await expect(asTestUser(() => run["get-video"]({ videoId: sien.video.id }))).rejects.toThrow();
  });

  it("on n'écrit pas dans la vidéo d'un autre compte", async () => {
    const sien = (await asUser(OTHER_USER, () =>
      run["create-video"]({ title: "Privée aussi" }),
    )) as { video: { id: string } };

    await expect(
      asTestUser(() => run["set-beat"]({ videoId: sien.video.id, step: 1, note: "Intrusion" })),
    ).rejects.toThrow();
  });

  it("un prompt d'un autre compte n'est ni listé ni supprimable", async () => {
    const sien = (await asUser(OTHER_USER, () =>
      run["upsert-prompt"]({ name: "Son prompt", body: "Son corps" }),
    )) as { prompt: { id: string } };

    const miens = (await asTestUser(() => run["list-prompts"]({ source: "mine" }))) as {
      mine: { id: string }[];
    };
    expect(miens.mine.some((prompt) => prompt.id === sien.prompt.id)).toBe(false);

    await expect(
      asTestUser(() => run["delete-prompt"]({ promptId: sien.prompt.id })),
    ).rejects.toThrow();
  });

  it("l'écriture pose le propriétaire depuis la session, pas depuis l'entrée", async () => {
    const result = (await asUser(OTHER_USER, () =>
      run["create-video"]({ title: "Qui est propriétaire ?" }),
    )) as { video: { ownerEmail: string } };
    expect(result.video.ownerEmail).toBe(OTHER_USER);
    expect(result.video.ownerEmail).not.toBe(TEST_USER);
  });
});

describe("l'aller-retour de la bibliothèque", () => {
  it("la lecture à blanc n'écrit rien, et dit ce qu'elle créerait", async () => {
    const avant = (await asTestUser(() => run["list-assets"]({}))) as { shown: number };

    const rapport = (await asTestUser(() =>
      run["import-assets"]({
        content: "name,kind\nUne fiche,image",
        dryRun: true,
      }),
    )) as { imported: number; read: number; dryRun: boolean };

    expect(rapport.dryRun).toBe(true);
    expect(rapport.imported).toBe(0);
    expect(rapport.read).toBe(1);

    const apres = (await asTestUser(() => run["list-assets"]({}))) as { shown: number };
    expect(apres.shown).toBe(avant.shown);
  });

  it("importe les lignes valides et rend les autres, sans tout annuler", async () => {
    const rapport = (await asTestUser(() =>
      run["import-assets"]({
        content: ["name,kind", "Bonne,image", ",image", "Mauvaise,hologramme"].join("\n"),
      }),
    )) as { imported: number; rejected: { line: number; reason: string }[] };

    // Une ligne refusée n'annule pas l'import : la bonne passe.
    expect(rapport.imported).toBe(1);
    expect(rapport.rejected).toHaveLength(2);
    expect(rapport.rejected[0].line).toBe(3);
    expect(rapport.rejected[1].reason).toContain("hologramme");
  });

  it("fait l'aller-retour : ce qui sort rentre à l'identique", async () => {
    await asTestUser(() =>
      run["import-assets"]({
        content: 'name,kind,status,url\nAller-retour,video,reference,https://exemple.test/a.mp4',
      }),
    );

    const sortie = (await asTestUser(() => run["export-assets"]({ format: "csv" }))) as {
      content: string;
      rowCount: number;
    };
    expect(sortie.content).toContain("Aller-retour");

    const relu = (await asTestUser(() =>
      run["import-assets"]({ content: sortie.content, dryRun: true }),
    )) as { read: number; rejected: unknown[] };

    // Rien de refusé : un export que son propre import rejetterait serait inutilisable.
    expect(relu.rejected).toEqual([]);
    expect(relu.read).toBe(sortie.rowCount);
  });

  it("exporte en JSON relisible", async () => {
    const sortie = (await asTestUser(() => run["export-assets"]({ format: "json" }))) as {
      content: string;
    };
    expect(() => JSON.parse(sortie.content)).not.toThrow();
  });

  it("n'exporte que les ressources de son propre compte", async () => {
    await asUser(OTHER_USER, () =>
      run["import-assets"]({ content: "name,kind\nSecret d'un autre,image" }),
    );

    const miennes = (await asTestUser(() => run["export-assets"]({ format: "csv" }))) as {
      content: string;
    };
    expect(miennes.content).not.toContain("Secret d'un autre");

    const siennes = (await asUser(OTHER_USER, () =>
      run["export-assets"]({ format: "csv" }),
    )) as { content: string };
    expect(siennes.content).toContain("Secret d'un autre");
  });

  it("refuse un type d'export inconnu plutôt que de tout exporter", async () => {
    await expect(
      asTestUser(() => run["export-assets"]({ format: "csv", kind: "hologramme" })),
    ).rejects.toThrow(/hologramme/);
  });
});
