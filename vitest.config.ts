import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  test: {
    /**
     * La base des tests, posée ici plutôt que mutée à l'exécution.
     *
     * Le noyau ne reconnaît une base de test isolée que si `DATABASE_URL` est une URL
     * PGlite **et** que le processus est un processus de test. Le harnais le faisait
     * en écrivant dans `process.env`, ce que le guard `no-env-mutation` du doctor
     * refuse à juste titre : `process.env` est à portée de processus, pas de requête.
     *
     * Le poser pour toute la suite est en outre plus sûr qu'un réglage par fichier :
     * un test qui toucherait la base sans le vouloir tombe sur celle-ci, en mémoire,
     * et jamais sur la base de travail de l'utilisateur.
     */
    env: {
      DATABASE_URL: "pglite:memory",
      NODE_ENV: "test",
    },
    exclude: [
      "**/node_modules/**",
      "**/.git/**",
      "**/dist/**",
      "**/.react-router/**",
      // Les worktrees d'agents sont montés DANS le projet. Sans cette exclusion, vitest
      // ramasse leurs fichiers de test en plus des nôtres et le compte devient faux —
      // 165 au lieu de 89, constaté au premier travail en parallèle.
      "**/.claude/worktrees/**",
    ],
  },
});
