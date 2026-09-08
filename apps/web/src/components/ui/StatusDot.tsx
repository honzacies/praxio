import type { ReactNode } from "react";

/** Barva tečky podle významu stavu. */
export type StatusTone =
  "success" | "warning" | "danger" | "accent" | "neutral";

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  accent: "bg-accent",
  neutral: "bg-border",
};

interface StatusDotProps {
  tone: StatusTone;
  children: ReactNode;
}

/**
 * Stav jako barevná tečka s popiskem.
 * Barva sama o sobě informaci nenese – vedle ní je vždy i text, takže
 * hláška zůstane srozumitelná i pro barvoslepého uživatele.
 */
export function StatusDot({ tone, children }: StatusDotProps) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 text-sm whitespace-nowrap">
      <span
        className={`size-1.5 shrink-0 rounded-full ${TONE_CLASSES[tone]}`}
      />
      {children}
    </span>
  );
}
