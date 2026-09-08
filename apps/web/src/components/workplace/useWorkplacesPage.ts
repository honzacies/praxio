"use client";

import { useOverlayState } from "@heroui/react";
import { useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import type { Workplace } from "@praxio/shared";

import { useStore } from "@/lib/store";
import {
  EMPTY_WORKPLACE_FILTERS,
  filterWorkplaces,
  sortWorkplaces,
} from "@/lib/workplaceFilters";
import type { WorkplaceSortKey } from "@/lib/workplaceFilters";

/**
 * Drží stav stránky se správou pracovišť: hledání, řazení a obě
 * vyskakovací okna. Stránka díky tomu zůstane krátká a jen skládá
 * komponenty dohromady.
 */
export function useWorkplacesPage(currentUserId: string) {
  const { workplaces, addWorkplace, updateWorkplace } = useStore();
  const [filters, setFilters] = useState(EMPTY_WORKPLACE_FILTERS);
  const [sort, setSort] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [edited, setEdited] = useState<Workplace | undefined>(undefined);
  const [deleted, setDeleted] = useState<Workplace | null>(null);
  const formState = useOverlayState();
  const deleteState = useOverlayState();

  const visible = sortWorkplaces(
    filterWorkplaces(workplaces, filters, currentUserId),
    sort.column as WorkplaceSortKey,
    sort.direction === "descending",
  );

  /** Otevře formulář – bez pracoviště zakládá nové, s ním upravuje. */
  function openForm(workplace?: Workplace) {
    setEdited(workplace);
    formState.open();
  }

  function openDelete(workplace: Workplace) {
    setDeleted(workplace);
    deleteState.open();
  }

  function save(workplace: Workplace) {
    if (edited) updateWorkplace(workplace);
    else addWorkplace(workplace);
  }

  return {
    visible,
    filters,
    sort,
    edited,
    deleted,
    formState,
    deleteState,
    setSort,
    openForm,
    openDelete,
    save,
    changeFilters: (change: Partial<typeof filters>) =>
      setFilters({ ...filters, ...change }),
  };
}
