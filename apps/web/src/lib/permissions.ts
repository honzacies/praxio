import type { Role, User, Workplace } from "@praxio/shared";

/**
 * Kdo co smí. Pravidla máme na jednom místě, aby se nedala omylem
 * napsat na každé stránce jinak.
 *
 * - žák si jen odbíjí docházku a vidí své vlastní záznamy,
 * - učitel navíc zakládá pracoviště a kontroluje docházku žáků,
 * - administrátor dohlíží na všechno a přiděluje uživatelům role.
 */

/** Učitel i admin vidí administraci, žák ne. */
export function canAccessAdmin(role: Role): boolean {
  return role === "TEACHER" || role === "ADMIN";
}

/** Zakládat pracoviště smí učitel i administrátor. */
export function canCreateWorkplaces(role: Role): boolean {
  return role === "TEACHER" || role === "ADMIN";
}

/** Uživatele a jejich role spravuje pouze administrátor. */
export function canManageUsers(role: Role): boolean {
  return role === "ADMIN";
}

/**
 * Upravit nebo smazat pracoviště smí jeho zakladatel a administrátor.
 * Učitel tedy vidí i cizí pracoviště, ale sáhnout může jen na svá.
 */
export function canEditWorkplace(user: User, workplace: Workplace): boolean {
  if (user.role === "ADMIN") return true;
  return user.role === "TEACHER" && workplace.createdById === user.id;
}
