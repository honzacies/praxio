import type { AttendanceRecord } from "@praxio/shared";
import { RECORD_TYPE_LABELS, VERIFICATION_LABELS } from "@praxio/shared";

import { formatDate, formatTime } from "./format";

/** Hlavička CSV souboru podle tabulky ze zadání. */
const CSV_HEADER = [
  "Jméno žáka",
  "E-mail",
  "Datum",
  "Čas",
  "Typ záznamu",
  "Pracoviště",
  "GPS šířka",
  "GPS délka",
  "Vzdálenost od pracoviště",
  "Ověření polohy",
];

/**
 * Hodnotu obalíme uvozovkami, aby středník nebo čárka uvnitř textu
 * nerozbily strukturu sloupců. Uvozovky uvnitř se zdvojují.
 */
function escapeValue(value: string | number | null): string {
  const text = value === null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

/**
 * Souřadnici zapisujeme vždy na šest desetinných míst, stejně jako ji
 * ukazujeme v aplikaci. Sloupec pak má v tabulce jednotnou šířku.
 */
function coordinate(value: number | null): string | null {
  return value === null ? null : value.toFixed(6);
}

/** Převede jeden záznam na řádek CSV. */
function toRow(record: AttendanceRecord): string {
  return [
    record.userName,
    record.userEmail,
    formatDate(record.createdAt),
    formatTime(record.createdAt),
    RECORD_TYPE_LABELS[record.type],
    record.workplaceName,
    coordinate(record.latitude),
    coordinate(record.longitude),
    record.distance,
    VERIFICATION_LABELS[record.verification],
  ]
    .map(escapeValue)
    .join(";");
}

/**
 * Sestaví obsah CSV souboru.
 * Používáme středník, protože český Excel s ním počítá jako s oddělovačem.
 */
export function buildCsv(records: AttendanceRecord[]): string {
  const rows = [CSV_HEADER.map(escapeValue).join(";"), ...records.map(toRow)];
  return rows.join("\n");
}

/** Nabídne prohlížeči stažení souboru s vygenerovaným CSV. */
export function downloadCsv(
  records: AttendanceRecord[],
  fileName: string,
): void {
  // Znak \uFEFF (BOM) na začátku souboru řekne Excelu, že jde o UTF-8,
  // jinak by české znaky zobrazil špatně.
  const blob = new Blob(["\uFEFF" + buildCsv(records)], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}
