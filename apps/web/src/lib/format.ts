/** Pomocné funkce pro hezké zobrazení dat v českém formátu. */

/** "2026-09-07T07:28:00" -> "7. 9. 2026" */
export function formatDate(isoDateTime: string): string {
  return new Date(isoDateTime).toLocaleDateString("cs-CZ");
}

/** "2026-09-07T07:28:00" -> "7:28" */
export function formatTime(isoDateTime: string): string {
  return new Date(isoDateTime).toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "2026-09-07T07:28:00" -> "7. 9. 2026 7:28" */
export function formatDateTime(isoDateTime: string): string {
  return `${formatDate(isoDateTime)} ${formatTime(isoDateTime)}`;
}

/** Vrátí jen datovou část ISO řetězce, hodí se pro filtrování podle dne. */
export function toDateKey(isoDateTime: string): string {
  return isoDateTime.slice(0, 10);
}

/** 1240 -> "1,2 km", 85 -> "85 m", null -> "–" */
export function formatDistance(meters: number | null): string {
  if (meters === null) return "–";
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
}

/** Souřadnice zobrazujeme na 6 desetinných míst, což je přesnost cca 0,1 m. */
export function formatCoordinates(
  latitude: number | null,
  longitude: number | null,
): string {
  if (latitude === null || longitude === null) return "–";
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
}

/**
 * Aktuální datum a čas ve stejném tvaru, jaký mají ukázková data
 * ("2026-09-07T07:28:00"). Odečtením časového posunu dostaneme místní čas.
 */
export function nowIso(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 19);
}

/** Vrátí true pro sobotu a neděli. */
function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6;
}

/** Z data udělá klíč "2026-09-07" podle místního kalendáře. */
function toLocalDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * Složí datum a čas pro pracovní den vzdálený `daysBack` kroků zpět.
 * Nula znamená dnešek (nebo nejbližší předchozí všední den), jednička den
 * před ním. Víkendy přeskakujeme, na pracovišti se docházka neeviduje.
 */
export function workdayIso(daysBack: number, time: string): string {
  const date = new Date();
  let remaining = daysBack;

  while (isWeekend(date) || remaining > 0) {
    if (!isWeekend(date)) remaining -= 1;
    date.setDate(date.getDate() - 1);
  }

  return `${toLocalDateKey(date)}T${time}:00`;
}
