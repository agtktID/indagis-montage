/**
 * L'aller-retour du catalogue de ressources.
 *
 * Le principe que ces tests protègent : **rejeter plutôt que deviner.** Une ligne
 * incompréhensible est rendue avec son numéro et sa raison, jamais devinée à moitié ni
 * rangée dans « autre » en silence. Un catalogue à moitié faux coûte plus cher qu'un
 * catalogue vide, parce qu'on ne sait pas quelle moitié.
 */
import { describe, expect, it } from "vitest";

import { ASSET_STATUSES } from "../../server/db/schema.js";
import {
  ASSET_IO_STATUSES,
  assetFromFilename,
  assetsToCsv,
  assetsToJson,
  detectAssetFormat,
  parseAssetManifest,
  type AssetRecord,
} from "../../shared/asset-io.js";

describe("les états connus", () => {
  it("sont les mêmes des deux côtés", () => {
    // `shared/` ne peut pas importer `server/` — l'interface l'importerait avec. La
    // liste y est donc recopiée, et ce test est ce qui empêche les deux de diverger :
    // sans lui, l'import refuserait un état que la base accepte.
    expect([...ASSET_IO_STATUSES]).toEqual([...ASSET_STATUSES]);
  });
});

describe("sortir le catalogue", () => {
  const assets: AssetRecord[] = [
    {
      name: "Rush d'ouverture",
      kind: "video",
      category: "hero",
      format: "16:9",
      status: "reference",
      url: "https://exemple.test/rush.mp4",
      thumbnailUrl: null,
      tags: "ouverture, extérieur",
      description: null,
    },
  ];

  it("écrit un CSV à en-tête nommé", () => {
    const csv = assetsToCsv(assets);
    const [header, row] = csv.split("\n");
    expect(header).toBe("name,kind,category,format,status,url,thumbnailUrl,tags,description");
    expect(row).toContain("Rush d'ouverture");
    // Les virgules du champ `tags` ne doivent pas casser les colonnes.
    expect(row).toContain('"ouverture, extérieur"');
  });

  it("écrit un JSON sans les champs vides", () => {
    const parsed = JSON.parse(assetsToJson(assets)) as Record<string, unknown>[];
    expect(parsed[0].name).toBe("Rush d'ouverture");
    // `thumbnailUrl` et `description` sont nuls : une forêt de `null` n'apprend rien.
    expect(parsed[0]).not.toHaveProperty("thumbnailUrl");
    expect(parsed[0]).not.toHaveProperty("description");
  });

  it("neutralise ce qu'un tableur prendrait pour une formule", () => {
    // La protection vient de `shared/csv.ts` ; ce test vérifie qu'elle s'applique bien
    // par ce chemin-ci. Un nom commençant par `=` est une injection de formule.
    const csv = assetsToCsv([{ name: "=SOMME(A1:A9)" }]);
    expect(csv).not.toMatch(/^=SOMME/m);
  });
});

describe("faire rentrer un catalogue", () => {
  it("fait l'aller-retour en CSV sans rien perdre", () => {
    const original: AssetRecord[] = [
      {
        name: "Plan large",
        kind: "video",
        category: "hero",
        format: "16:9",
        status: "reference",
        url: "https://exemple.test/a.mp4",
        thumbnailUrl: null,
        tags: "jour, large",
        description: "Le toit, au lever.",
      },
    ];
    const report = parseAssetManifest(assetsToCsv(original));
    expect(report.rejected).toEqual([]);
    expect(report.assets).toEqual(original);
  });

  it("fait l'aller-retour en JSON", () => {
    const original: AssetRecord[] = [{ name: "Nappe sonore", kind: "audio", status: "draft" }];
    const report = parseAssetManifest(assetsToJson(original));
    expect(report.format).toBe("json");
    expect(report.assets[0].name).toBe("Nappe sonore");
    expect(report.assets[0].kind).toBe("audio");
  });

  it("reconnaît le format sur le premier caractère", () => {
    expect(detectAssetFormat('[{"name":"x"}]')).toBe("json");
    expect(detectAssetFormat('  \n  {"name":"x"}')).toBe("json");
    expect(detectAssetFormat("name,kind\nx,image")).toBe("csv");
  });

  it("lit une colonne entre guillemets contenant une virgule", () => {
    const report = parseAssetManifest('name,tags\n"Plan, serré","jour, nuit"');
    expect(report.assets[0].name).toBe("Plan, serré");
    expect(report.assets[0].tags).toBe("jour, nuit");
  });
});

describe("ce qui est refusé, et pourquoi", () => {
  it("rend le numéro de ligne et la raison, et garde le reste", () => {
    const csv = [
      "name,kind",
      "Bon fichier,image",
      ",image", // sans nom
      "Autre,hologramme", // type inconnu
      "Encore un,audio",
    ].join("\n");

    const report = parseAssetManifest(csv);

    // Les deux lignes valides passent : un refus n'annule pas l'import entier.
    expect(report.assets.map((asset) => asset.name)).toEqual(["Bon fichier", "Encore un"]);
    expect(report.rejected).toHaveLength(2);

    // Le numéro est celui que l'utilisateur voit dans son fichier, en-tête comprise.
    expect(report.rejected[0].line).toBe(3);
    expect(report.rejected[0].reason).toMatch(/nom/i);
    expect(report.rejected[1].line).toBe(4);
    expect(report.rejected[1].reason).toContain("hologramme");
  });

  it("refuse une taxonomie inconnue au lieu de la ranger dans « autre »", () => {
    for (const [column, valeur] of [
      ["kind", "hologramme"],
      ["category", "bannière"],
      ["format", "42:1"],
      ["status", "brouillonné"],
    ]) {
      const report = parseAssetManifest(`name,${column}\nUne fiche,${valeur}`);
      expect(report.assets, `${column}=${valeur}`).toEqual([]);
      expect(report.rejected[0].reason, `${column}=${valeur}`).toContain(valeur);
    }
  });

  it("dit qu'un en-tête sans « name » est inutilisable", () => {
    const report = parseAssetManifest("intitulé,type\nUne fiche,image");
    expect(report.assets).toEqual([]);
    expect(report.rejected[0].reason).toMatch(/name/);
  });

  it("dit qu'un JSON est illisible plutôt que de rendre zéro ligne en silence", () => {
    const report = parseAssetManifest('[{"name": "cassé"');
    expect(report.format).toBe("json");
    expect(report.rejected[0].reason).toMatch(/illisible/i);
  });

  it("refuse une entrée JSON qui n'est pas un objet", () => {
    const report = parseAssetManifest('["juste une chaîne"]');
    expect(report.assets).toEqual([]);
    expect(report.rejected[0].reason).toMatch(/objet/);
  });

  it("ignore les lignes vides sans les compter comme des refus", () => {
    const report = parseAssetManifest("name,kind\nUne fiche,image\n\n\nUne autre,audio\n");
    expect(report.assets).toHaveLength(2);
    expect(report.rejected).toEqual([]);
  });
});

describe("cataloguer un fichier choisi", () => {
  it("prend le nom sans l'extension et déduit le type", () => {
    expect(assetFromFilename("rush-01.mp4")).toEqual({
      name: "rush-01",
      kind: "video",
      status: "reference",
    });
    expect(assetFromFilename("logo.svg").kind).toBe("image");
    expect(assetFromFilename("nappe.wav").kind).toBe("audio");
    expect(assetFromFilename("brief.pdf").kind).toBe("document");
    expect(assetFromFilename("Inter.woff2").kind).toBe("font");
  });

  it("retombe sur « autre » pour une extension inconnue, sans inventer", () => {
    const record = assetFromFilename("archive.xyz");
    expect(record.kind).toBe("other");
    // Ni catégorie ni format : les deviner depuis un nom produirait un catalogue
    // plausible et faux.
    expect(record.category).toBeUndefined();
    expect(record.format).toBeUndefined();
  });

  it("ne garde que le nom du fichier, jamais le chemin", () => {
    // Un chemin révélerait l'arborescence de l'utilisateur dans son catalogue.
    expect(assetFromFilename("/home/quelquun/Vidéos/rush.mp4").name).toBe("rush");
    expect(assetFromFilename("C:\\Users\\quelquun\\clip.mov").name).toBe("clip");
  });

  it("garde un nom sans extension tel quel", () => {
    expect(assetFromFilename("LISEZMOI").name).toBe("LISEZMOI");
    expect(assetFromFilename("LISEZMOI").kind).toBe("other");
  });

  it("produit un CSV que l'import relit", () => {
    // Le chemin réel de l'interface : des fichiers choisis deviennent un CSV, qui part
    // en lecture à blanc. Si ce tour de passe-passe cassait, l'écran ne montrerait rien.
    const csv = assetsToCsv(["a.mp4", "b.png"].map(assetFromFilename));
    const report = parseAssetManifest(csv);
    expect(report.rejected).toEqual([]);
    expect(report.assets.map((asset) => asset.kind)).toEqual(["video", "image"]);
  });
});
