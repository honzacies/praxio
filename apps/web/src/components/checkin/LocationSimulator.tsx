"use client";

import { Button } from "@heroui/react";
import { FlaskConical } from "lucide-react";
import type { Coordinates, Workplace } from "@praxio/shared";

interface LocationSimulatorProps {
  workplace: Workplace;
  onSimulate: (position: Coordinates) => void;
}

/** O kolik stupňů se posuneme na sever, abychom byli cca 800 m daleko. */
const FAR_AWAY_OFFSET = 0.0072;

/**
 * Pomůcka pro předvedení aplikace. Umožňuje nastavit polohu ručně,
 * takže se dá vyzkoušet i situace "žák je moc daleko" bez cestování.
 * V ostré verzi by se tato část do aplikace nedostala.
 */
export function LocationSimulator({
  workplace,
  onSimulate,
}: LocationSimulatorProps) {
  function simulate(isNearby: boolean) {
    onSimulate({
      latitude: workplace.latitude + (isNearby ? 0 : FAR_AWAY_OFFSET),
      longitude: workplace.longitude,
    });
  }

  return (
    <div className="mt-6 rounded-md border border-dashed border-border p-4">
      <p className="mb-3 flex items-center gap-2 text-xs tracking-wide text-muted uppercase">
        <FlaskConical className="size-3.5" />
        Ukázkový režim – simulace polohy
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          fullWidth
          onPress={() => simulate(true)}
          size="sm"
          variant="outline"
        >
          Jsem na pracovišti
        </Button>
        <Button
          fullWidth
          onPress={() => simulate(false)}
          size="sm"
          variant="outline"
        >
          Jsem 800 m daleko
        </Button>
      </div>
    </div>
  );
}
