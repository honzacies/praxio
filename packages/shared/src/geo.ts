import type { Coordinates } from "./types";

/** Poloměr Země v metrech. */
const EARTH_RADIUS = 6371000;

/** Převede stupně na radiány, se kterými pracují goniometrické funkce. */
function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Spočítá vzdálenost dvou bodů na Zemi v metrech (Haversinova formule).
 * Používáme ji pro ověření, jestli je žák dost blízko pracovišti.
 */
export function distanceInMeters(from: Coordinates, to: Coordinates): number {
  const deltaLat = toRadians(to.latitude - from.latitude);
  const deltaLon = toRadians(to.longitude - from.longitude);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(EARTH_RADIUS * c);
}

/** Vrátí true, pokud je žák v povoleném okruhu kolem pracoviště. */
export function isWithinRadius(
  userPosition: Coordinates,
  workplacePosition: Coordinates,
  allowedRadius: number,
): boolean {
  return distanceInMeters(userPosition, workplacePosition) <= allowedRadius;
}
