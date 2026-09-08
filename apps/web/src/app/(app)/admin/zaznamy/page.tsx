"use client";

import { useOverlayState } from "@heroui/react";
import { useState } from "react";
import type { AttendanceRecord } from "@praxio/shared";

import { RecordDetailModal } from "@/components/attendance/RecordDetailModal";
import { RecordsFilters } from "@/components/attendance/RecordsFilters";
import { RecordsTable } from "@/components/attendance/RecordsTable";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHeader } from "@/components/ui/PageHeader";
import { downloadCsv } from "@/lib/csv";
import { EMPTY_FILTERS, filterRecords } from "@/lib/filters";
import { useStore } from "@/lib/store";

/** Seznam všech záznamů s filtry a exportem do CSV. */
export default function AdminRecordsPage() {
  const { records, workplaces, users } = useStore();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [selected, setSelected] = useState<AttendanceRecord | null>(null);
  const detailState = useOverlayState();

  const filtered = filterRecords(records, filters);

  function showDetail(record: AttendanceRecord) {
    setSelected(record);
    detailState.open();
  }

  return (
    <>
      <FadeIn>
        <PageHeader
          description={
            filtered.length === records.length
              ? `Celkem ${records.length} záznamů.`
              : `Filtru odpovídá ${filtered.length} z ${records.length} záznamů.`
          }
          highlight="docházky"
          title="Záznamy"
        />
      </FadeIn>

      <FadeIn delay={0.06}>
        <RecordsFilters
          canExport={filtered.length > 0}
          filters={filters}
          onChange={setFilters}
          onExport={() => downloadCsv(filtered, "dochazka.csv")}
          users={users}
          workplaces={workplaces}
        />

        <RecordsTable
          onShowDetail={showDetail}
          records={filtered}
          showDetails
          showStudent
        />
      </FadeIn>

      <RecordDetailModal record={selected} state={detailState} />
    </>
  );
}
