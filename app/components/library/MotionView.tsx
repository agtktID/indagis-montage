import { useActionMutation, useActionQuery } from "@agent-native/core/client/hooks";
import { useT } from "@agent-native/core/client/i18n";
import { useState } from "react";

import { Badge, EmptyState } from "@/components/studio/primitives";
import { CopyButton, CopyTextButton } from "@/components/library/CopyButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MOTION_ENGINES,
  MOTION_FAMILIES,
  type MotionEngine,
  type MotionRecipe,
} from "@shared/motion-grammar/types";

interface NarrativeEntry {
  step: number;
  movement: string;
  families: string[];
  primitives: string[];
}

interface Primitive {
  key: string;
  label: string;
  when: string;
  how: string;
}

interface MotionResponse {
  recipes: MotionRecipe[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  facets: { families: { key: string; label: string; count: number }[] };
  primitives: Primitive[];
  enginePorting: { remotion: string; hyperframes: string }[];
  determinismRules: string[];
  narrativeMap: NarrativeEntry[];
  counts: { total: number; withPrompt: number; withBeats: number };
}

/** Les douze étapes, pour le filtre narratif. */
const STEPS = Array.from({ length: 12 }, (_, index) => index + 1);

/**
 * La grammaire de mouvement : 121 chorégraphies déconstruites.
 *
 * Elles vivent dans le code, en lecture seule, comme le catalogue de prompts et les
 * ressources de départ. « Copier en prompt » en fait une entrée modifiable dans les
 * prompts de l'utilisateur, l'original reste intact — le même chemin que partout
 * ailleurs dans la bibliothèque, et c'est ce qui protège l'original.
 *
 * Le filtre qui compte est **l'étape** : il ne demande pas « montre-moi les cartes »
 * mais « qu'est-ce qui sert mon climax ? ». C'est la seule question qu'un monteur se
 * pose vraiment devant sa timeline, et aucune autre bibliothèque de motion design ne
 * sait y répondre, parce qu'aucune ne connaît la carte narrative.
 */
export function MotionView() {
  const t = useT();
  const [family, setFamily] = useState<string | null>(null);
  const [engine, setEngine] = useState<MotionEngine | null>(null);
  const [step, setStep] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState<string | null>(null);

  const { data, isLoading } = useActionQuery("list-motion-recipes", {
    ...(family ? { family } : {}),
    ...(engine ? { engine } : {}),
    ...(step ? { step } : {}),
    ...(search.trim() ? { search: search.trim() } : {}),
    offset,
    limit: 24,
  });
  const response = data as MotionResponse | undefined;
  const copyToPrompts = useActionMutation("upsert-prompt");

  /** Changer un filtre remet la pagination à zéro : sinon on arrive sur une page vide. */
  function pick<T>(setter: (value: T) => void, value: T) {
    setter(value);
    setOffset(0);
  }

  const narrative = step
    ? response?.narrativeMap.find((entry) => entry.step === step)
    : undefined;

  return (
    <div className="flex flex-col gap-5 p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{t("motion.title")}</h2>
          <p className="text-muted-foreground max-w-prose text-sm">{t("motion.description")}</p>
        </div>
        <Input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setOffset(0);
          }}
          placeholder={t("motion.search")}
          className="w-56"
        />
      </header>

      {/* --- L'axe narratif, d'abord : c'est celui qui distingue cette bibliothèque. --- */}
      <section className="border-border bg-muted/30 flex flex-col gap-2 rounded-lg border p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium">{t("motion.byStep")}</span>
          <button
            type="button"
            onClick={() => pick(setStep, null)}
            aria-pressed={step === null}
            className={chip(step === null)}
          >
            {t("motion.allSteps")}
          </button>
          {STEPS.map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => pick(setStep, candidate === step ? null : candidate)}
              aria-pressed={step === candidate}
              className={chip(step === candidate)}
            >
              {candidate}
            </button>
          ))}
        </div>
        {narrative ? (
          <p className="text-sm">
            <span className="font-medium">{t("motion.stepAsks", { step: String(step) })}</span>{" "}
            {narrative.movement}
          </p>
        ) : (
          <p className="text-muted-foreground text-xs">{t("motion.byStepHint")}</p>
        )}
      </section>

      {/* --- Famille et moteur : de quoi le plan est fait, et qui sait le rendre. --- */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => pick(setFamily, null)}
          aria-pressed={family === null}
          className={chip(family === null)}
        >
          {t("motion.allFamilies", { total: String(response?.total ?? 0) })}
        </button>
        {(response?.facets.families ?? MOTION_FAMILIES.map((entry) => ({ ...entry, count: 0 }))).map(
          (facet) => (
            <button
              key={facet.key}
              type="button"
              onClick={() => pick(setFamily, facet.key === family ? null : facet.key)}
              aria-pressed={family === facet.key}
              className={chip(family === facet.key)}
            >
              {t(`motion.family_${facet.key}`)}
              <span className="text-muted-foreground ml-1 tabular-nums">{facet.count}</span>
            </button>
          ),
        )}

        <span className="border-border mx-1 h-5 border-l" aria-hidden="true" />

        {MOTION_ENGINES.filter((entry) => entry.key !== "both").map((entry) => (
          <button
            key={entry.key}
            type="button"
            onClick={() =>
              pick(setEngine, entry.key === engine ? null : (entry.key as MotionEngine))
            }
            aria-pressed={engine === entry.key}
            className={chip(engine === entry.key)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">{t("studio.loading")}</p>
      ) : (response?.recipes.length ?? 0) === 0 ? (
        <EmptyState title={t("motion.emptyTitle")} hint={t("motion.emptyHint")} />
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {response?.recipes.map((recipe) => (
            <li key={recipe.key}>
              <article className="border-border bg-card flex h-full flex-col gap-2 rounded-lg border p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold">{recipe.title}</h3>
                  <Badge>{t(`motion.engine_${recipe.engines}`)}</Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge tone="accent">{t(`motion.family_${recipe.family}`)}</Badge>
                  {recipe.format ? <Badge tone="muted">{recipe.format}</Badge> : null}
                  {recipe.durationSeconds ? (
                    <Badge tone="muted">
                      {t("motion.seconds", { value: String(recipe.durationSeconds) })}
                    </Badge>
                  ) : null}
                  {recipe.beats.length > 0 ? (
                    <Badge tone="muted">
                      {t("motion.beatCount", { beats: String(recipe.beats.length) })}
                    </Badge>
                  ) : null}
                </div>

                <p className="text-muted-foreground text-xs">{recipe.summary}</p>

                {recipe.palette.length > 0 ? (
                  <ul className="flex flex-wrap gap-1" aria-label={t("motion.palette")}>
                    {recipe.palette.slice(0, 8).map((color) => (
                      <li
                        key={color}
                        className="border-border size-5 rounded border"
                        style={{ backgroundColor: color }}
                        title={color}
                      >
                        <span className="sr-only">{color}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setOpen(open === recipe.key ? null : recipe.key)}
                    aria-expanded={open === recipe.key}
                  >
                    {open === recipe.key ? t("motion.hideRecipe") : t("motion.showRecipe")}
                  </Button>
                  {recipe.prompt ? (
                    <>
                      <CopyButton
                        variant="ghost"
                        label={t("motion.copyToPrompts")}
                        doneLabel={t("motion.copiedToPrompts")}
                        onCopy={() => copyToPrompts.mutateAsync({ fromMotion: recipe.key })}
                      />
                      <CopyTextButton text={recipe.prompt} />
                    </>
                  ) : (
                    <Badge tone="muted">{t("motion.noPrompt")}</Badge>
                  )}
                </div>

                {open === recipe.key ? <RecipeDetail recipe={recipe} /> : null}
              </article>
            </li>
          ))}
        </ul>
      )}

      {response?.hasMore ? (
        <Button
          variant="outline"
          size="sm"
          className="self-center"
          onClick={() => setOffset(offset + (response.limit ?? 24))}
        >
          {t("motion.loadMore")}
        </Button>
      ) : null}

      {/* --- Le vocabulaire, sous les recettes : utile sans en ouvrir une seule. --- */}
      {response ? <Vocabulary response={response} /> : null}
    </div>
  );
}

/** Le détail d'une recette : le découpage, les notes de métier, les points à vérifier. */
function RecipeDetail({ recipe }: { recipe: MotionRecipe }) {
  const t = useT();
  return (
    <div className="border-border mt-1 flex flex-col gap-3 border-t pt-3 text-xs">
      {recipe.beats.length > 0 ? (
        <div>
          <h4 className="mb-1 font-medium">{t("motion.beats")}</h4>
          <table className="w-full">
            <thead className="sr-only">
              <tr>
                <th scope="col">{t("motion.beatAt")}</th>
                <th scope="col">{t("motion.beatWhat")}</th>
              </tr>
            </thead>
            <tbody>
              {recipe.beats.map((beat, index) => (
                <tr key={`${beat.at}-${index}`} className="align-top">
                  <th
                    scope="row"
                    className="text-muted-foreground w-28 pr-2 text-left font-normal tabular-nums"
                  >
                    {beat.at}
                  </th>
                  <td className="pb-1">{beat.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {recipe.prompt ? (
        <div>
          <h4 className="mb-1 font-medium">{t("motion.prompt")}</h4>
          <p className="bg-muted/50 rounded p-2 italic">{recipe.prompt}</p>
        </div>
      ) : null}

      <div>
        <h4 className="mb-1 font-medium">{t("motion.craft")}</h4>
        <pre className="bg-muted/50 max-h-64 overflow-auto rounded p-2 whitespace-pre-wrap">
          {recipe.recipe}
        </pre>
      </div>

      {recipe.checks.length > 0 ? (
        <div>
          <h4 className="mb-1 font-medium">{t("motion.checks")}</h4>
          <ul className="text-muted-foreground list-inside list-disc">
            {recipe.checks.map((check, index) => (
              <li key={`${check}-${index}`}>{check}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Les six primitives, la table de portage et les trois interdits.
 *
 * Replié par défaut : c'est de la référence, pas le contenu principal de l'écran. Mais
 * c'est ce qu'il faut lire avant les recettes — six gestes recombinés 121 fois.
 */
function Vocabulary({ response }: { response: MotionResponse }) {
  const t = useT();
  return (
    <details className="border-border rounded-lg border p-4">
      <summary className="cursor-pointer text-sm font-semibold select-none">
        {t("motion.vocabularyTitle")}
      </summary>

      <p className="text-muted-foreground mt-1 text-xs">{t("motion.vocabularyHint")}</p>

      <ul className="mt-3 flex flex-col gap-3">
        {response.primitives.map((primitive) => (
          <li key={primitive.key}>
            <p className="text-sm font-medium">{primitive.label}</p>
            <p className="text-muted-foreground text-xs italic">{primitive.when}</p>
            <p className="text-xs">{primitive.how}</p>
          </li>
        ))}
      </ul>

      <h4 className="mt-4 text-sm font-medium">{t("motion.portingTitle")}</h4>
      <div className="overflow-x-auto">
        <table className="mt-1 w-full text-xs">
          <thead>
            <tr className="text-muted-foreground text-left">
              <th scope="col" className="pr-3 font-normal">
                Remotion
              </th>
              <th scope="col" className="font-normal">
                HyperFrames
              </th>
            </tr>
          </thead>
          <tbody>
            {response.enginePorting.map((row) => (
              <tr key={row.remotion}>
                <td className="pr-3 font-mono">{row.remotion}</td>
                <td className="font-mono">{row.hyperframes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="mt-4 text-sm font-medium">{t("motion.determinismTitle")}</h4>
      <ul className="mt-1 list-inside list-disc text-xs">
        {response.determinismRules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </details>
  );
}

/** Une puce de filtre, active ou non. */
function chip(active: boolean): string {
  return [
    "rounded-full border px-2.5 py-1 text-xs transition",
    active
      ? "border-primary bg-primary/10 font-medium"
      : "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground",
  ].join(" ");
}
