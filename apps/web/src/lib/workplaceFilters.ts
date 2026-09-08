import type { Workplace } from "@praxio/shared";

/** Podle čeho jde seznam pracovišť seřadit. */
export type WorkplaceSortKey =
  "name" | "address" | "allowedRadius" | "isActive";

/** Nastavení hledání a filtrů nad seznamem pracovišť. */
export interface WorkplaceFilters {
  /** Hledaný text – porovnává se s názvem, adresou i kódem. */
  search: string;
  /** "all", "active" nebo "inactive". */
  state: string;
  /** "all", nebo "mine" pro pracoviště přihlášeného uživatele. */
  owner: string;
}

export const EMPTY_WORKPLACE_FILTERS: WorkplaceFilters = {
  search: "",
  state: "all",
  owner: "all",
};

/** Hledáme bez ohledu na velikost písmen a diakritiku. */
function normalize(text: string): string {
  return text.toLocaleLowerCase("cs-CZ").normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Vybere pracoviště, která odpovídají hledání a filtrům. */
export function filterWorkplaces(
  workplaces: Workplace[],
  filters: WorkplaceFilters,
  currentUserId: string,
): Workplace[] {
  const query = normalize(filters.search.trim());

  return workplaces.filter((workplace) => {
    if (filters.state === "active" && !workplace.isActive) return false;
    if (filters.state === "inactive" && workplace.isActive) return false;
    if (filters.owner === "mine" && workplace.createdById !== currentUserId) {
      return false;
    }
    if (!query) return true;

    const haystack = normalize(
      `${workplace.name} ${workplace.address} ${workplace.qrCode}`,
    );
    return haystack.includes(query);
  });
}

/** Seřadí pracoviště podle zvoleného sloupce. */
export function sortWorkplaces(
  workplaces: Workplace[],
  key: WorkplaceSortKey,
  isDescending: boolean,
): Workplace[] {
  const sorted = [...workplaces].sort((a, b) => {
    if (key === "allowedRadius") return a.allowedRadius - b.allowedRadius;
    if (key === "isActive") return Number(b.isActive) - Number(a.isActive);
    return a[key].localeCompare(b[key], "cs-CZ");
  });

  return isDescending ? sorted.reverse() : sorted;
}
