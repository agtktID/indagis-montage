import { useT } from "@agent-native/core/client/i18n";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

/**
 * Un bouton qui dit ce qu'il a fait.
 *
 * Trois boutons de la bibliothèque — « Copier chez moi » dans les prompts, « Copier en
 * prompt » dans les mouvements, « Installer » dans les ressources de départ —
 * lançaient leur mutation et **n'affichaient rien**. L'écriture réussissait, l'élément
 * atterrissait dans un autre onglet, et l'utilisateur voyait un bouton inerte. Un
 * geste dont rien ne confirme l'effet est indiscernable d'un geste cassé.
 *
 * Ce composant porte les trois états que l'interaction a réellement : en cours, fait,
 * échoué. L'état « fait » s'efface au bout de deux secondes et demie — assez pour être
 * lu, assez peu pour laisser croire que le bouton est désormais désactivé.
 *
 * L'erreur, elle, **reste**. Elle ne s'efface pas toute seule : si une copie a échoué,
 * l'utilisateur doit pouvoir le lire après avoir regardé ailleurs.
 */
export function CopyButton({
  onCopy,
  label,
  doneLabel,
  icon,
  variant = "outline",
  size = "sm",
}: {
  /** L'écriture à faire. Doit lever en cas d'échec pour que l'erreur s'affiche. */
  onCopy: () => Promise<unknown>;
  label: string;
  /** Ce qui s'affiche une fois fait ; « Copié » par défaut. */
  doneLabel?: string;
  icon?: ReactNode;
  variant?: "outline" | "ghost" | "default";
  size?: "sm" | "default";
}) {
  const t = useT();
  const [state, setState] = useState<"idle" | "pending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  // Le minuteur est annulé au démontage : sans ça, un `setState` arrive sur un
  // composant parti, et la carte qui l'héberge peut disparaître d'un changement de
  // filtre pendant les deux secondes et demie.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function handle() {
    if (state === "pending") return;
    setState("pending");
    setError(null);
    try {
      await onCopy();
      setState("done");
      timer.current = setTimeout(() => setState("idle"), 2500);
    } catch (cause) {
      setState("idle");
      setError((cause as Error)?.message ?? t("library.copyFailed"));
    }
  }

  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <Button
        size={size}
        variant={variant}
        disabled={state === "pending"}
        onClick={handle}
        // Le lecteur d'écran doit entendre le changement, pas seulement le voir.
        aria-live="polite"
      >
        {state === "done" ? (
          <>
            <IconCheck size={13} /> {doneLabel ?? t("library.copied")}
          </>
        ) : state === "pending" ? (
          t("library.copying")
        ) : (
          <>
            {icon ?? <IconCopy size={13} />} {label}
          </>
        )}
      </Button>
      {error ? (
        <span role="alert" className="text-destructive text-[11px]">
          {error}
        </span>
      ) : null}
    </span>
  );
}

/**
 * Copier un texte dans le presse-papiers.
 *
 * Distinct de `CopyButton` : celui-ci n'écrit rien en base, il met le texte à
 * disposition pour le coller ailleurs — dans un autre outil, dans un carnet, dans une
 * conversation. C'est ce qu'on attend d'un bouton nommé « copier » quand on regarde un
 * prompt affiché à l'écran.
 *
 * `navigator.clipboard` n'existe pas partout — contexte non sécurisé, permission
 * refusée. L'échec est dit, jamais avalé : un presse-papiers silencieusement vide est
 * pire qu'un message.
 */
export function CopyTextButton({
  text,
  label,
  variant = "ghost",
}: {
  text: string;
  label?: string;
  variant?: "outline" | "ghost" | "default";
}) {
  const t = useT();
  return (
    <CopyButton
      variant={variant}
      label={label ?? t("library.copyText")}
      doneLabel={t("library.textCopied")}
      onCopy={async () => {
        if (!navigator.clipboard?.writeText) {
          throw new Error(t("library.clipboardUnavailable"));
        }
        await navigator.clipboard.writeText(text);
      }}
    />
  );
}
