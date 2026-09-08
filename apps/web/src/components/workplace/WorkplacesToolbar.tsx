"use client";

import { Button, SearchField } from "@heroui/react";
import { Plus } from "lucide-react";

import { FilterSelect } from "@/components/ui/FilterSelect";
import type { SelectOption } from "@/components/ui/FilterSelect";
import type { WorkplaceFilters } from "@/lib/workplaceFilters";

const STATE_OPTIONS: SelectOption[] = [
  { id: "all", label: "Stav" },
  { id: "active", label: "Aktivní" },
  { id: "inactive", label: "Neaktivní" },
];

const OWNER_OPTIONS: SelectOption[] = [
  { id: "all", label: "Kdo založil" },
  { id: "mine", label: "Moje pracoviště" },
];

interface WorkplacesToolbarProps {
  filters: WorkplaceFilters;
  onChange: (change: Partial<WorkplaceFilters>) => void;
  /** Tlačítko pro nové pracoviště vidí jen učitel a administrátor. */
  canCreate: boolean;
  onCreate: () => void;
}

/** Řádek nad tabulkou pracovišť: vlevo hledání a filtry, vpravo nové. */
export function WorkplacesToolbar({
  filters,
  onChange,
  canCreate,
  onCreate,
}: WorkplacesToolbarProps) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface-secondary p-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <SearchField
          aria-label="Hledat pracoviště"
          onChange={(search) => onChange({ search })}
          value={filters.search}
        >
          <SearchField.Group className="h-9 w-56">
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Hledat název, adresu, kód…" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <FilterSelect
          label="Stav pracoviště"
          onChange={(state) => onChange({ state })}
          options={STATE_OPTIONS}
          value={filters.state}
        />
        <FilterSelect
          label="Kdo pracoviště založil"
          onChange={(owner) => onChange({ owner })}
          options={OWNER_OPTIONS}
          value={filters.owner}
        />
      </div>

      {canCreate ? (
        <Button onPress={onCreate} size="sm" variant="primary">
          <Plus className="size-4" />
          Nové pracoviště
        </Button>
      ) : null}
    </div>
  );
}
