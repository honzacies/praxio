"use client";

import { Button, Separator } from "@heroui/react";
import { Download, FilterX } from "lucide-react";
import type { User, Workplace } from "@praxio/shared";

import { countActiveFilters, EMPTY_FILTERS } from "@/lib/filters";
import type { RecordFilters } from "@/lib/filters";

import { DateStepper } from "./DateStepper";
import { RecordsFilterSelects } from "./RecordsFilterSelects";

interface RecordsFiltersProps {
  filters: RecordFilters;
  onChange: (filters: RecordFilters) => void;
  /** Pracoviště bereme zvenčí, ať je v nabídce i to nově založené. */
  workplaces: Workplace[];
  users: User[];
  /** Spustí stažení CSV se záznamy, které projdou filtrem. */
  onExport: () => void;
  canExport: boolean;
}

/**
 * Řádek nad tabulkou záznamů: vlevo filtry, uprostřed přepínání dne,
 * vpravo export. Na užší obrazovce se části zalomí pod sebe.
 */
export function RecordsFilters({
  filters,
  onChange,
  workplaces,
  users,
  onExport,
  canExport,
}: RecordsFiltersProps) {
  const activeCount = countActiveFilters(filters);

  /** Změní jednu položku filtru a zbytek nechá beze změny. */
  function update(change: Partial<RecordFilters>) {
    onChange({ ...filters, ...change });
  }

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface-secondary p-2.5">
      <RecordsFilterSelects
        filters={filters}
        onChange={update}
        users={users}
        workplaces={workplaces}
      />

      <DateStepper onChange={(date) => update({ date })} value={filters.date} />

      <div className="flex items-center gap-1.5">
        {activeCount > 0 ? (
          <>
            <Button
              onPress={() => onChange(EMPTY_FILTERS)}
              size="sm"
              variant="ghost"
            >
              <FilterX className="size-4" />
              Zrušit filtry ({activeCount})
            </Button>
            <Separator className="h-5" orientation="vertical" />
          </>
        ) : null}

        <Button
          isDisabled={!canExport}
          onPress={onExport}
          size="sm"
          variant="primary"
        >
          <Download className="size-4" />
          Export do CSV
        </Button>
      </div>
    </div>
  );
}
