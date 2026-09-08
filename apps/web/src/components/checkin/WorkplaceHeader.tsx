import { MapPin } from "lucide-react";
import type { Workplace } from "@praxio/shared";

/** Hlavička formuláře pro odbití – kam žák právě dorazil. */
export function WorkplaceHeader({ workplace }: { workplace: Workplace }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border">
        <MapPin className="size-4 text-accent" />
      </span>

      <span className="min-w-0">
        <span className="block font-medium">{workplace.name}</span>
        <span className="block text-sm text-muted">{workplace.address}</span>
        <span className="mt-0.5 block text-xs text-muted">
          Odbít lze do {workplace.allowedRadius} m od pracoviště
        </span>
      </span>
    </div>
  );
}
