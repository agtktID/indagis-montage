/**
 * Migrations Indagis Studio — exécution au démarrage.
 *
 * Un seul propriétaire de schéma : les entrées manuscrites de
 * `server/db/migrations.ts`. Pas de `pnpm db:generate` ni de `runDrizzleMigrations()`
 * — la documentation du framework interdit de donner à un même schéma deux
 * propriétaires de migrations indépendants, et le chargeur Drizzle lit ses fichiers
 * sur disque, ce qui le rend indisponible sur les runtimes edge sans système de
 * fichiers. Le chemin manuscrit garde ouvertes toutes les cibles Nitro.
 *
 * Ce fichier ne contient plus les migrations elles-mêmes : les tests doivent pouvoir
 * dresser le schéma sur une base vierge sans démarrer Nitro.
 */

import { runMigrations } from "@agent-native/core/db";

import { MIGRATIONS_TABLE, STUDIO_MIGRATIONS } from "../db/migrations.ts";

export default runMigrations(STUDIO_MIGRATIONS, { table: MIGRATIONS_TABLE });
