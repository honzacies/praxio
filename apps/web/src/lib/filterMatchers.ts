import type { AttendanceRecord } from "@praxio/shared";

import { ALL } from "./filterTypes";
import type { DistanceFilter, StatusFilter } from "./filterTypes";

/** Horní hranice jednotlivých pásem v metrech. */
const DISTANCE_LIMITS: Record<string, number> = {
  "60": 60,
  "100": 100,
  "200": 200,
};

/**
 * Rozhodne, jestli záznam spadá do zvoleného pásma vzdálenosti.
 * Záznam bez souřadnic (distance je null) do žádného pásma nepatří.
 */
export function matchesDistance(
  distance: number | null,
  filter: DistanceFilter,
): boolean {
  if (filter === ALL) return true;
  if (distance === null) return false;

  if (filter === "300plus") return distance >= 300;
  return distance <= DISTANCE_LIMITS[filter];
}

/**
 * Rozhodne, jestli záznam odpovídá zvolenému stavu odbití.
 * „Odbito" znamená, že se povedlo ověřit polohu žáka.
 */
export function matchesStatus(
  record: AttendanceRecord,
  filter: StatusFilter,
): boolean {
  if (filter === ALL) return true;
  return filter === "done"
    ? record.verification === "OK"
    : record.verification !== "OK";
}
