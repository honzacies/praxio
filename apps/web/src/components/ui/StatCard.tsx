import { Card, Typography } from "@heroui/react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  /** Doplňující text pod hodnotou. */
  hint?: string;
}

/**
 * Karta s jedním číslem – používá se na přehledových stránkách.
 * Číslo je největší prvek, popisek a ikona jsou schválně nenápadné,
 * aby oko šlo rovnou na hodnotu.
 */
export function StatCard({ label, value, icon: Icon, hint }: StatCardProps) {
  return (
    <Card className="gap-0 px-4 py-3.5">
      <span className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-wider text-accent uppercase">
        <Icon className="size-3.5" />
        {label}
      </span>

      <p className="mt-2 text-3xl leading-none font-semibold tabular-nums">
        {value}
      </p>

      {hint ? (
        <Typography className="mt-2" color="muted" type="body-xs">
          {hint}
        </Typography>
      ) : null}
    </Card>
  );
}
