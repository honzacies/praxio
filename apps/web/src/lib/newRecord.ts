import type {
  AttendanceRecord,
  Coordinates,
  RecordType,
  User,
  Workplace,
} from "@praxio/shared";

import { nowIso } from "./format";

/**
 * Poskládá nový docházkový záznam z přihlášeného uživatele, pracoviště
 * a změřené polohy. Jméno a název pracoviště se do záznamu opisují schválně –
 * díky tomu zůstane čitelný i po přejmenování nebo smazání pracoviště.
 */
export function buildRecord(
  user: User,
  workplace: Workplace,
  type: RecordType,
  position: Coordinates,
  distance: number,
): AttendanceRecord {
  return {
    id: `r-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    workplaceId: workplace.id,
    workplaceName: workplace.name,
    type,
    createdAt: nowIso(),
    latitude: position.latitude,
    longitude: position.longitude,
    distance,
    verification: "OK",
  };
}
