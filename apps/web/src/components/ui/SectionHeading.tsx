import { Typography } from "@heroui/react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  icon: LucideIcon;
  /** Nepovinný obsah vpravo, například odkaz na celý seznam. */
  action?: ReactNode;
}

/** Nadpis oddílu uvnitř stránky – ikona barvou značky a vedle ní název. */
export function SectionHeading({
  title,
  icon: Icon,
  action,
}: SectionHeadingProps) {
  return (
    <div className="mt-10 mb-3.5 flex items-center justify-between gap-4">
      <span className="flex items-center gap-2">
        <Icon className="size-4 text-accent" />
        <Typography type="h6" weight="semibold">
          {title}
        </Typography>
      </span>
      {action}
    </div>
  );
}
