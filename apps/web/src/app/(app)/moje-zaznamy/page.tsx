"use client";

import { Button, useOverlayState } from "@heroui/react";
import { Download } from "lucide-react";
import { useState } from "react";
import type { AttendanceRecord } from "@praxio/shared";

import { RecordDetailModal } from "@/components/attendance/RecordDetailModal";
import { RecordsTable } from "@/components/attendance/RecordsTable";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHeader } from "@/components/ui/PageHeader";
import { downloadCsv } from "@/lib/csv";
import { recordsOfUser } from "@/lib/records";
import { useSession } from "@/lib/session";
import { useStore } from "@/lib/store";

/** Stránka, kde žák vidí kompletní historii svých vlastních záznamů. */
export default function MyRecordsPage() {
  const { user } = useSession();
  const { records } = useStore();
  const detailState = useOverlayState();
  const [selected, setSelected] = useState<AttendanceRecord | null>(null);

  if (!user) return null;

  const myRecords = recordsOfUser(records, user.id);

  function showDetail(record: AttendanceRecord) {
    setSelected(record);
    detailState.open();
  }

  return (
    <>
      <FadeIn>
        <PageHeader
          actions={
            <Button
              isDisabled={myRecords.length === 0}
              onPress={() => downloadCsv(myRecords, "moje-dochazka.csv")}
              variant="secondary"
            >
              <Download className="size-4" />
              Export do CSV
            </Button>
          }
          description={`Všechny vaše příchody a odchody – celkem ${myRecords.length}.`}
          highlight="záznamy"
          title="Moje"
        />
      </FadeIn>

      <FadeIn delay={0.06}>
        <RecordsTable
          emptyMessage="Zatím nemáte žádný záznam docházky."
          onShowDetail={showDetail}
          records={myRecords}
        />
      </FadeIn>

      <RecordDetailModal record={selected} state={detailState} />
    </>
  );
}
