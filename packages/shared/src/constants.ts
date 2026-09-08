import type { RecordType, Role, VerificationResult } from "./types";

/** Přihlásit se smí pouze školní účty z této domény. */
export const SCHOOL_DOMAIN = "sosjablunkov.cz";

/** České popisky rolí pro zobrazení v rozhraní. */
export const ROLE_LABELS: Record<Role, string> = {
  STUDENT: "Žák",
  TEACHER: "Učitel",
  ADMIN: "Administrátor",
};

/** České popisky typů záznamu. */
export const RECORD_TYPE_LABELS: Record<RecordType, string> = {
  ARRIVAL: "Příchod",
  DEPARTURE: "Odchod",
};

/** České popisky výsledku ověření polohy. */
export const VERIFICATION_LABELS: Record<VerificationResult, string> = {
  OK: "Poloha ověřena",
  TOO_FAR: "Mimo povolený okruh",
  NO_LOCATION: "Poloha nezískána",
};
