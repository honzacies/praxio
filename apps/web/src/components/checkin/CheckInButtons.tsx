"use client";

import { Button } from "@heroui/react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { RecordType } from "@praxio/shared";

interface CheckInButtonsProps {
  /** true, když je poloha změřená a žák je v povoleném okruhu. */
  isLocationOk: boolean;
  /** true, když má žák otevřený příchod a chybí mu odchod. */
  isAtWorkplace: boolean;
  onCheckIn: (type: RecordType) => void;
}

/**
 * Dvě hlavní tlačítka formuláře pro odbití.
 * Nabízí se vždy jen ten krok, který dává smysl – kdo už má uložený
 * příchod, může jen odejít. Zabrání to dvěma příchodům po sobě.
 */
export function CheckInButtons({
  isLocationOk,
  isAtWorkplace,
  onCheckIn,
}: CheckInButtonsProps) {
  return (
    <div className="mt-5">
      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          fullWidth
          isDisabled={!isLocationOk || isAtWorkplace}
          onPress={() => onCheckIn("ARRIVAL")}
          size="lg"
          variant="primary"
        >
          <ArrowDownLeft className="size-5" />
          Příchod
        </Button>

        <Button
          fullWidth
          isDisabled={!isLocationOk || !isAtWorkplace}
          onPress={() => onCheckIn("DEPARTURE")}
          size="lg"
          variant="secondary"
        >
          <ArrowUpRight className="size-5" />
          Odchod
        </Button>
      </div>

      {isLocationOk ? (
        <p className="mt-2.5 text-center text-xs text-muted">
          {isAtWorkplace
            ? "Máte uložený příchod, teď si můžete odbít odchod."
            : "Zatím nemáte otevřený příchod, začněte tlačítkem Příchod."}
        </p>
      ) : null}
    </div>
  );
}
