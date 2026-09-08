"use client";

import type { AttendanceRecord, User, Workplace } from "@praxio/shared";

/**
 * Ukládání dat do localStorage prohlížeče.
 * Nahrazuje databázi, dokud aplikace nemá backend – díky tomu pracoviště
 * i docházkové záznamy přežijí obnovení stránky.
 */

const WORKPLACES_KEY = "praxio-workplaces";
const RECORDS_KEY = "praxio-records";
const USERS_KEY = "praxio-users";

/**
 * Přečte seznam uložený pod daným klíčem.
 * Vrátí null, pokud tam nic není nebo je obsah poškozený – volající pak
 * použije výchozí ukázková data.
 */
function readList(key: string): unknown[] | null {
  try {
    const text = localStorage.getItem(key);
    if (!text) return null;

    const value = JSON.parse(text);
    return Array.isArray(value) ? value : null;
  } catch {
    // Prohlížeč může mít úložiště zakázané nebo plné. Aplikace i tak poběží.
    return null;
  }
}

/** Uloží seznam pod daný klíč. Případnou chybu úložiště jen ignorujeme. */
function writeList(key: string, list: unknown[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Aplikace funguje dál, data se jen neuloží natrvalo.
  }
}

/** Načte uložená pracoviště, nebo null když ještě žádná nejsou. */
export function loadWorkplaces(): Workplace[] | null {
  return readList(WORKPLACES_KEY) as Workplace[] | null;
}

/** Uloží aktuální seznam pracovišť. */
export function saveWorkplaces(workplaces: Workplace[]): void {
  writeList(WORKPLACES_KEY, workplaces);
}

/** Načte uložené docházkové záznamy, nebo null když ještě žádné nejsou. */
export function loadRecords(): AttendanceRecord[] | null {
  return readList(RECORDS_KEY) as AttendanceRecord[] | null;
}

/** Uloží aktuální seznam docházkových záznamů. */
export function saveRecords(records: AttendanceRecord[]): void {
  writeList(RECORDS_KEY, records);
}

/** Načte uložené uživatele, nebo null když ještě žádní nejsou. */
export function loadUsers(): User[] | null {
  return readList(USERS_KEY) as User[] | null;
}

/** Uloží aktuální seznam uživatelů i s přidělenými rolemi. */
export function saveUsers(users: User[]): void {
  writeList(USERS_KEY, users);
}

/** Smaže uložená data, takže se příště načtou výchozí ukázková. */
export function clearStoredData(): void {
  try {
    localStorage.removeItem(WORKPLACES_KEY);
    localStorage.removeItem(RECORDS_KEY);
    localStorage.removeItem(USERS_KEY);
  } catch {
    // Nevadí, uživatel může úložiště vymazat i ručně v prohlížeči.
  }
}
