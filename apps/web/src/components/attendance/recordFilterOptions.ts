import type { User, Workplace } from "@praxio/shared";

import type { SelectOption } from "@/components/ui/FilterSelect";
import { getStudents } from "@/data/users";
import { ALL } from "@/lib/filters";
import type { DistanceFilter, StatusFilter } from "@/lib/filters";

/**
 * Volby jednotlivých filtrů. První položka vždy znamená „bez omezení"
 * a je pojmenovaná podle filtru, takže seznam v nevybraném stavu
 * sám říká, co filtruje.
 */
function withAllOption(label: string, options: SelectOption[]): SelectOption[] {
  return [{ id: ALL, label }, ...options];
}

/** Seznam žáků skládáme až za běhu, role se dají měnit v administraci. */
export function buildStudentOptions(users: User[]): SelectOption[] {
  return withAllOption(
    "Žák",
    getStudents(users).map((s) => ({ id: s.id, label: s.name })),
  );
}

export const STATUS_OPTIONS: SelectOption[] = [
  { id: ALL, label: "Stav" },
  { id: "done", label: "Odbito" },
  { id: "failed", label: "Neodbito" },
];

export const TYPE_OPTIONS: SelectOption[] = [
  { id: ALL, label: "Typ" },
  { id: "ARRIVAL", label: "Příchod" },
  { id: "DEPARTURE", label: "Odchod" },
];

export const DISTANCE_OPTIONS: SelectOption[] = [
  { id: ALL, label: "Vzdálenost" },
  { id: "60", label: "Do 60 m" },
  { id: "100", label: "Do 100 m" },
  { id: "200", label: "Do 200 m" },
  { id: "300plus", label: "300 m a více" },
];

/** Seznam pracovišť skládáme až za běhu, může přibýt nové. */
export function buildWorkplaceOptions(workplaces: Workplace[]): SelectOption[] {
  return withAllOption(
    "Pracoviště",
    workplaces.map((workplace) => ({
      id: workplace.id,
      label: workplace.name,
    })),
  );
}

/**
 * Ze seznamu chodí hodnota jako obyčejný text. Tyto dvě funkce ověří,
 * že jde o povolenou volbu, a tím ji převedou na správný typ filtru.
 */
export function toStatusFilter(value: string): StatusFilter {
  return value === "done" || value === "failed" ? value : ALL;
}

export function toDistanceFilter(value: string): DistanceFilter {
  const allowed = ["60", "100", "200", "300plus"];
  return allowed.includes(value) ? (value as DistanceFilter) : ALL;
}
