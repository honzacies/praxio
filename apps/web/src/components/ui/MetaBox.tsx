import { Card, Typography } from "@heroui/react";
import type { LucideIcon } from "lucide-react";

interface MetaBoxProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

/**
 * Drobný údaj do hlavičky stránky – popisek barvou značky a pod ním hodnota.
 * Používá se na přehledu žáka pro datum, počet dnů a podobné informace.
 */
export function MetaBox({ label, value, icon: Icon }: MetaBoxProps) {
  return (
    <Card className="gap-1.5 px-3.5 py-2.5" variant="secondary">
      <span className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-wider text-accent uppercase">
        <Icon className="size-3.5" />
        {label}
      </span>
      <Typography weight="medium">{value}</Typography>
    </Card>
  );
}
