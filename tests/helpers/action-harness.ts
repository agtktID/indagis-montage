/**
 * De quoi exécuter une action contre une vraie base, dans un test.
 *
 * Les 44 actions n'avaient aucun test. Le vérificateur en exerce une vingtaine de bout
 * en bout par la CLI, mais un parcours complet est lent et ne dit pas *pourquoi* il
 * casse : il refait une vidéo entière pour prouver qu'un champ n'est pas écrasé.
 *
 * Ce qui manquait n'est pas un test de plomberie — la plomberie, le vérificateur la
 * prouve. Ce qui manquait est la couverture de la **logique de résolution** : les
 * replis d'`upsert-*`, les refus de validation, le filtrage par propriétaire. C'est là
 * que les bugs de ce dépôt sont apparus, et c'est précisément ce qu'un test rapide
 * attrape.
 *
 * ## Comment ça marche
 *
 * `DATABASE_URL=pglite:memory` est posé par `vitest.config.ts`, pour toute la suite :
 * le noyau reconnaît alors une base de test isolée (`getIsolatedTestDatabaseUrl`) et
 * n'ira jamais toucher la base de travail de l'utilisateur. Dans la configuration et
 * non ici, parce que muter `process.env` à l'exécution est à portée de processus, pas
 * de requête — le guard `no-env-mutation` du doctor le refuse, à juste titre.
 *
 * Le schéma est dressé depuis `server/db/migrations.ts` — les mêmes entrées que le
 * plugin exécute au démarrage. Une table créée à la main dans les tests dériverait du
 * schéma réel sans que rien ne le signale.
 *
 * ## Le coût, dit franchement
 *
 * Démarrer PGlite prend six à sept secondes. C'est pour cela que le harnais s'installe
 * **une fois par fichier** et que les tests se partagent la base : isoler chaque test
 * dans sa propre instance multiplierait la durée par le nombre de tests. En échange,
 * chaque test doit créer ses propres lignes plutôt que de compter sur une base vide.
 */
import { runWithRequestContext } from "@agent-native/core/server";

import { MIGRATIONS_TABLE, STUDIO_MIGRATIONS } from "../../server/db/migrations.ts";

/** L'utilisateur par défaut des tests. Un autre sert à prouver l'isolation. */
export const TEST_USER = "testeuse@local.test";
export const OTHER_USER = "quelquun-dautre@local.test";

/**
 * Prépare la base de test. À appeler dans un `beforeAll`.
 *
 * Renvoie le `getDb` du projet — déjà typé sur notre schéma — pour que les tests
 * puissent vérifier l'état en base après une action, plutôt que de croire sa valeur
 * de retour. Une action qui renvoie la bonne chose sans l'avoir écrite est exactement
 * le genre de bug qu'un test doit voir.
 */
export async function setupActionTests() {
  // Garde-fou, pas configuration : si `vitest.config.ts` cessait de poser la variable,
  // les actions taperaient dans la base de travail de l'utilisateur sans rien dire.
  // Mieux vaut un échec net au premier test.
  if (process.env.DATABASE_URL !== "pglite:memory") {
    throw new Error(
      "DATABASE_URL n'est pas la base de test en mémoire — vérifier `test.env` dans vitest.config.ts avant de lancer des tests d'action.",
    );
  }

  const { getDb } = await import("../../server/db/index.ts");
  const db = getDb();

  // Le framework note les migrations appliquées dans sa propre table ; sur une base
  // neuve elle n'existe pas, et on applique donc tout, dans l'ordre des versions.
  await db.execute(
    `CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (version INTEGER PRIMARY KEY, name TEXT)` as never,
  );
  for (const migration of [...STUDIO_MIGRATIONS].sort((a, b) => a.version - b.version)) {
    // Une migration porte souvent plusieurs instructions — un `CREATE TABLE` suivi de
    // ses index. PGlite les refuse d'un bloc : « cannot insert multiple commands into
    // a prepared statement ». On les sépare donc, ce que `runMigrations` fait aussi de
    // son côté au démarrage.
    //
    // Découpage sur `;` sans analyser le SQL : aucune de nos migrations ne met de
    // point-virgule dans un littéral. Si l'une venait à le faire, ce découpage la
    // casserait franchement — une erreur de syntaxe, pas un schéma à moitié dressé.
    for (const statement of migration.sql.split(";")) {
      if (statement.trim().length === 0) continue;
      await db.execute(statement as never);
    }
    await db.execute(
      `INSERT INTO ${MIGRATIONS_TABLE} (version, name) VALUES (${migration.version}, '${migration.name}')
       ON CONFLICT (version) DO NOTHING` as never,
    );
  }

  return db;
}

/**
 * Exécute une fonction comme si la requête venait de cet utilisateur.
 *
 * Sans ce contexte, `requireOwnerEmail()` lève « Non authentifié » — et c'est voulu :
 * le noyau refuse d'écrire sans session plutôt que de ranger toutes les écritures
 * anonymes dans un locataire partagé. Les tests d'isolation s'en servent pour vérifier
 * qu'un utilisateur ne voit pas les lignes d'un autre.
 */
export function asUser<T>(email: string, fn: () => T | Promise<T>): Promise<T> {
  return Promise.resolve(runWithRequestContext({ userEmail: email }, fn));
}

/** Raccourci : la plupart des tests n'ont besoin que de l'utilisateur par défaut. */
export function asTestUser<T>(fn: () => T | Promise<T>): Promise<T> {
  return asUser(TEST_USER, fn);
}

/**
 * Le `run` d'une action, importée par son nom de fichier.
 *
 * Les actions exportent `{ tool, run, schema }`. On appelle `run` directement : la
 * route HTTP, la commande CLI et l'outil d'agent en sont trois habillages, et c'est
 * `run` qui porte la logique qu'on veut couvrir.
 *
 * **La validation du schéma s'applique.** Le noyau la fait tourner *à l'intérieur*
 * de `run`, pas dans les habillages : un argument hors contrat est rejeté avant que
 * la moindre ligne de la fonction métier ne s'exécute. C'est utile à savoir, et
 * contre-intuitif — on peut donc tester les refus de validation d'ici, et un test qui
 * passe une valeur invalide échouera sur la garde, pas sur la logique.
 */
export async function loadAction(
  name: string,
): Promise<(input: Record<string, unknown>) => Promise<unknown>> {
  const module = (await import(`../../actions/${name}.ts`)) as {
    default: { run: (input: never) => Promise<unknown> };
  };
  return (input) => module.default.run(input as never);
}
