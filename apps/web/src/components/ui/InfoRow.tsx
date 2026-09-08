import { Typography } from "@heroui/react";
import type { ReactNode } from "react";

/**
 * Jeden řádek "popisek – hodnota", používá se v detailech a kartách.
 * Řádky odděluje tenká linka, poslední ji už nemá (třída last:border-0).
 */
export function InfoRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-separator py-2.5 last:border-0">
      <Typography className="shrink-0" color="muted" type="body-sm">
        {label}
      </Typography>
      <span className="text-right text-sm font-medium">{children}</span>
    </div>
  );
}
