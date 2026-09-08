import type { AttendanceRecord } from "@praxio/shared";

import { matchesDistance, matchesStatus } from "./filterMatchers";
import { ALL } from "./filterTypes";
import type { RecordFilters } from "./filterTypes";
import { toDateKey } from "./format";

export { ALL, EMPTY_FILTERS } from "./filterTypes";
export type {
  DistanceFilter,
  RecordFilters,
  StatusFilter,
} from "./filterTypes";

/**
 * Vybere záznamy, které odpovídají nastaveným filtrům.
 * Nevyplněný filtr znamená, že se podle daného sloupce nefiltruje.
 */
export function filterRecords(
  records: AttendanceRecord[],
  filters: RecordFilters,
): AttendanceRecord[] {
  return records.filter((record) => {
    if (filters.studentId !== ALL && record.userId !== filters.studentId) {
      return false;
    }
    if (
      filters.workplaceId !== ALL &&
      record.workplaceId !== filters.workplaceId
    ) {
      return false;
    }
    if (filters.type !== ALL && record.type !== filters.type) return false;
    if (filters.date && toDateKey(record.createdAt) !== filters.date) {
      return false;
    }
    if (!matchesStatus(record, filters.status)) return false;
    return matchesDistance(record.distance, filters.distance);
  });
}

/** Kolik filtrů je právě zapnutých – pro popisek u tlačítka na vyčištění. */
export function countActiveFilters(filters: RecordFilters): number {
  const values = [
    filters.studentId,
    filters.workplaceId,
    filters.status,
    filters.type,
    filters.distance,
  ];
  const active = values.filter((value) => value !== ALL).length;
  return filters.date ? active + 1 : active;
}
