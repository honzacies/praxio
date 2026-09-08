/** Hodnota, kterou filtr používá pro "bez omezení". */
export const ALL = "all";

/** Stav odbití: povedlo se ověřit polohu, nebo ne. */
export type StatusFilter = typeof ALL | "done" | "failed";

/** Pásmo vzdálenosti od pracoviště. */
export type DistanceFilter = typeof ALL | "60" | "100" | "200" | "300plus";

/** Nastavení filtrů nad seznamem záznamů. */
export interface RecordFilters {
  studentId: string;
  workplaceId: string;
  status: StatusFilter;
  /** "all", nebo hodnota typu záznamu (ARRIVAL / DEPARTURE). */
  type: string;
  distance: DistanceFilter;
  /** Datum ve tvaru "2026-09-07", prázdný řetězec znamená všechna data. */
  date: string;
}

/** Výchozí stav filtrů – nic není omezené. */
export const EMPTY_FILTERS: RecordFilters = {
  studentId: ALL,
  workplaceId: ALL,
  status: ALL,
  type: ALL,
  distance: ALL,
  date: "",
};
