import type { User } from "@praxio/shared";

/**
 * Výchozí uživatelé aplikace. Ve finální verzi budou vznikat sami
 * při prvním přihlášení školním Google účtem – a to vždy v roli žáka.
 * Povýšit někoho na učitele může jen administrátor.
 */
export const DEFAULT_USERS: User[] = [
  {
    id: "u-1",
    name: "Jan Cieslar",
    email: "jan.cieslar@sosjablunkov.cz",
    role: "STUDENT",
    className: "4.A",
    createdAt: "2026-09-01T08:00:00",
  },
  {
    id: "u-2",
    name: "Tomas Rusz",
    email: "tomas.rusz@sosjablunkov.cz",
    role: "TEACHER",
    createdAt: "2025-09-01T08:00:00",
  },
  {
    id: "u-3",
    name: "Roman Karczmarczyk",
    email: "roman.karczmarczyk@sosjablunkov.cz",
    role: "ADMIN",
    createdAt: "2025-09-01T08:00:00",
  },
];

/** Najde uživatele podle ID v zadaném seznamu. */
export function findUser(users: User[], id: string): User | undefined {
  return users.find((user) => user.id === id);
}

/** Vrátí jen žáky, například pro filtr v administraci. */
export function getStudents(users: User[]): User[] {
  return users.filter((user) => user.role === "STUDENT");
}

/** Jméno uživatele podle ID, pro sloupec „Vytvořil" u pracoviště. */
export function getUserName(users: User[], id: string): string {
  return findUser(users, id)?.name ?? "–";
}
