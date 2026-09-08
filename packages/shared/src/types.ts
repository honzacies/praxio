/**
 * Datové typy sdílené mezi frontendem a budoucím API.
 * Názvy odpovídají entitám z databázového návrhu (User, Workplace, ...),
 * aby se daly později 1:1 použít v Prisma schématu.
 */

/** Role uživatele. Určuje, co smí v aplikaci dělat. */
export type Role = "STUDENT" | "TEACHER" | "ADMIN";

/** Typ docházkového záznamu. */
export type RecordType = "ARRIVAL" | "DEPARTURE";

/** Výsledek ověření polohy při ukládání záznamu. */
export type VerificationResult = "OK" | "TOO_FAR" | "NO_LOCATION";

/** Uživatel aplikace (žák, učitel nebo admin). */
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  /** Třída žáka, u učitele a admina není vyplněná. */
  className?: string;
  createdAt: string;
}

/** Pracoviště, kde si žák odbíjí příchod a odchod. */
export interface Workplace {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  /** Povolený okruh v metrech, ve kterém lze odbít. */
  allowedRadius: number;
  isActive: boolean;
  /** Unikátní kód, který je zakódovaný v QR kódu pracoviště. */
  qrCode: string;
  /** ID učitele nebo admina, který pracoviště založil. */
  createdById: string;
}

/** Jeden docházkový záznam (příchod nebo odchod). */
export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  workplaceId: string;
  workplaceName: string;
  type: RecordType;
  /** Datum a čas v ISO formátu, např. "2026-09-07T07:32:00". */
  createdAt: string;
  latitude: number | null;
  longitude: number | null;
  /** Vzdálenost od pracoviště v metrech. */
  distance: number | null;
  verification: VerificationResult;
}

/** Zeměpisné souřadnice. Používá se pro polohu žáka i pracoviště. */
export interface Coordinates {
  latitude: number;
  longitude: number;
}
