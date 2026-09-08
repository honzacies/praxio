"use client";

import type { User, Workplace } from "@praxio/shared";

import { FilterSelect } from "@/components/ui/FilterSelect";
import type { RecordFilters } from "@/lib/filters";

import {
  buildStudentOptions,
  buildWorkplaceOptions,
  DISTANCE_OPTIONS,
  STATUS_OPTIONS,
  toDistanceFilter,
  toStatusFilter,
  TYPE_OPTIONS,
} from "./recordFilterOptions";

interface RecordsFilterSelectsProps {
  filters: RecordFilters;
  /** Změní jednu položku filtru a zbytek nechá beze změny. */
  onChange: (change: Partial<RecordFilters>) => void;
  workplaces: Workplace[];
  users: User[];
}

/** Rozbalovací seznamy, kterými se zužuje výběr záznamů. */
export function RecordsFilterSelects({
  filters,
  onChange,
  workplaces,
  users,
}: RecordsFilterSelectsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterSelect
        label="Žák"
        onChange={(studentId) => onChange({ studentId })}
        options={buildStudentOptions(users)}
        value={filters.studentId}
      />
      <FilterSelect
        label="Stav odbití"
        onChange={(value) => onChange({ status: toStatusFilter(value) })}
        options={STATUS_OPTIONS}
        value={filters.status}
      />
      <FilterSelect
        label="Typ záznamu"
        onChange={(type) => onChange({ type })}
        options={TYPE_OPTIONS}
        value={filters.type}
      />
      <FilterSelect
        label="Vzdálenost od pracoviště"
        onChange={(value) => onChange({ distance: toDistanceFilter(value) })}
        options={DISTANCE_OPTIONS}
        value={filters.distance}
      />
      <FilterSelect
        label="Pracoviště"
        onChange={(workplaceId) => onChange({ workplaceId })}
        options={buildWorkplaceOptions(workplaces)}
        value={filters.workplaceId}
      />
    </div>
  );
}
