import type { AttendanceRecord } from "@praxio/shared";

import { toDateKey } from "./format";

/** Vrátí jen záznamy jednoho uživatele. */
export function recordsOfUser(
  records: AttendanceRecord[],
  userId: string,
): AttendanceRecord[] {
  return records.filter((record) => record.userId === userId);
}

/** Vrátí záznamy z konkrétního dne. */
export function recordsOfDay(
  records: AttendanceRecord[],
  dateKey: string,
): AttendanceRecord[] {
  return records.filter((record) => toDateKey(record.createdAt) === dateKey);
}

/** Kolik různých dní má uživatel v záznamech. */
export function countVisitedDays(records: AttendanceRecord[]): number {
  const days = records.map((record) => toDateKey(record.createdAt));
  return new Set(days).size;
}

/**
 * Zjistí, jestli má žák otevřený příchod, tedy jestli je „na pracovišti".
 * Seznam chodí seřazený od nejnovějšího, takže stačí první záznam.
 * Díky tomu umíme zakázat dva příchody po sobě bez odchodu.
 */
export function isCheckedIn(
  records: AttendanceRecord[],
  userId: string,
): boolean {
  return recordsOfUser(records, userId)[0]?.type === "ARRIVAL";
}
