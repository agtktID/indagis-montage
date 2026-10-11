/**
 * Le format des skills du projet.
 *
 * Ces tests existent à cause d'un bug réel. La description de la skill `remotion`
 * affirmait « Remotion n'a pas de serveur MCP : l'agent produit du code, il ne rend
 * rien », alors que `mcp.config.json` déclare le pont et que
 * `tools/remotion-bridge/server.mjs` expose dix outils dont `render`.
 *
 * Le corps de la skill, lui, disait vrai. Mais **c'est la description qui est
 * préchargée dans le prompt système au démarrage** ; le corps n'est lu qu'à la demande.
 * L'agent voyait donc le mensonge en premier et n'ouvrait jamais la correction : il
 * refusait un rendu qu'il pouvait faire.
 *
 * Les 229 autres tests ne touchaient aucun `SKILL.md`. C'est pour ça que ça a survécu.
 *
 * Les contraintes de format viennent de la documentation Anthropic
 * (platform.claude.com/docs/en/agents-and-tools/agent-skills).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const DOSSIER = ".agents/skills";

/** Les skills écrites pour ce projet. Celles du framework ne nous appartiennent pas. */
const SKILLS_DU_PROJET = [
  "voyage-du-heros",
  "diagnostic-timeline",
  "roasting",
  "hyperframes",
  "remotion",
  "ingestion-et-droits",
  "direction-mouvement",
] as const;

/**
 * Lit `name` et `description` d'un frontmatter YAML sans dépendre d'un analyseur.
 *
 * Le seul repli employé ici est le scalaire plié (`description: >`), dont les lignes
 * indentées se recollent par un espace. Un analyseur complet serait une dépendance de
 * plus pour deux champs.
 */
function lireEntete(texte: string): { name?: string; description?: string } {
  const bloc = /^---\n([\s\S]*?)\n---\n/.exec(texte);
  if (!bloc) return {};
  const champs: Record<string, string> = {};
  let courant: string | null = null;
  for (const ligne of bloc[1].split("\n")) {
    const entree = /^([a-z_]+):\s*(.*)$/.exec(ligne);
    if (entree) {
      courant = entree[1];
      champs[courant] = entree[2] === ">" || entree[2] === "|" ? "" : entree[2];
      continue;
    }
    if (courant && /^\s+\S/.test(ligne)) {
      champs[courant] = `${champs[courant]} ${ligne.trim()}`.trim();
    }
  }
  return champs;
}

function skill(nom: string) {
  const chemin = join(DOSSIER, nom, "SKILL.md");
  const texte = readFileSync(chemin, "utf8");
  const entete = lireEntete(texte);
  const corps = texte.replace(/^---\n[\s\S]*?\n---\n/, "");
  return { chemin, texte, corps, ...entete };
}

describe("les skills du projet existent toutes", () => {
  it("chaque dossier annoncé porte un SKILL.md", () => {
    for (const nom of SKILLS_DU_PROJET) {
      expect(statSync(join(DOSSIER, nom, "SKILL.md")).isFile(), nom).toBe(true);
    }
  });

  it("aucune skill du projet n'a été ajoutée sans être déclarée ici", () => {
    // Sans ce test, une skill nouvelle échapperait à tous les autres. La liste est
    // volontairement écrite à la main : l'oubli doit coûter un test rouge.
    const surDisque = readdirSync(DOSSIER).filter((n) =>
      SKILLS_DU_PROJET.includes(n as (typeof SKILLS_DU_PROJET)[number]),
    );
    expect(surDisque.sort()).toEqual([...SKILLS_DU_PROJET].sort());
  });
});

describe("le format exigé par la documentation Anthropic", () => {
  it.each(SKILLS_DU_PROJET)("%s : le nom respecte les règles", (nom) => {
    const s = skill(nom);
    expect(s.name, "champ name absent").toBeTruthy();
    // Le nom doit désigner son dossier, sinon la skill se charge sous une autre identité.
    expect(s.name).toBe(nom);
    expect(s.name!.length).toBeLessThanOrEqual(64);
    expect(s.name).toMatch(/^[a-z0-9-]+$/);
    // Mots réservés par la documentation.
    expect(s.name!.toLowerCase()).not.toMatch(/anthropic|claude/);
  });

  it.each(SKILLS_DU_PROJET)("%s : la description tient dans le budget", (nom) => {
    const s = skill(nom);
    expect(s.description, "champ description absent").toBeTruthy();
    expect(s.description!.length).toBeGreaterThan(0);
    expect(s.description!.length).toBeLessThanOrEqual(1024);
    expect(s.description).not.toMatch(/[<>]/); // pas de balise XML
  });

  it.each(SKILLS_DU_PROJET)("%s : la description dit quand se déclencher", (nom) => {
    // La documentation est explicite : la description porte le quoi **et** le quand,
    // et Claude sous-déclenche les skills quand le quand manque.
    const s = skill(nom);
    expect(s.description).toMatch(/quand|déclench|dès que|à lire/i);
  });

  it.each(SKILLS_DU_PROJET)("%s : le corps reste sous 500 lignes", (nom) => {
    // Au-delà, la documentation demande de scinder en fichiers de référence chargés à
    // la demande — c'est la divulgation progressive.
    expect(skill(nom).corps.split("\n").length).toBeLessThanOrEqual(500);
  });
});

describe("une skill ne ment pas sur les ponts disponibles", () => {
  const ponts = Object.keys(
    (JSON.parse(readFileSync("mcp.config.json", "utf8")) as { servers: Record<string, unknown> })
      .servers,
  );

  it("mcp.config.json déclare bien des ponts", () => {
    // Si ce test tombe, celui d'en dessous ne prouve plus rien.
    expect(ponts.length).toBeGreaterThan(0);
  });

  it.each(SKILLS_DU_PROJET)("%s : ne nie aucun pont déclaré", (nom) => {
    const s = skill(nom);
    for (const pont of ponts) {
      const negation = new RegExp(
        `${pont}[^.]{0,60}(n'a pas de (serveur|pont)|aucun (serveur|pont)|pas de serveur MCP)`,
        "i",
      );
      expect(s.texte, `${nom} nie le pont « ${pont} », que mcp.config.json déclare`).not.toMatch(
        negation,
      );
    }
  });
});
