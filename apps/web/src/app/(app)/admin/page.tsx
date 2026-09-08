"use client";

import { History } from "lucide-react";

import { AdminStats } from "@/components/admin/AdminStats";
import { ResetDataButton } from "@/components/admin/ResetDataButton";
import { RecordsTable } from "@/components/attendance/RecordsTable";
import { FadeIn } from "@/components/ui/FadeIn";
import { LinkButton } from "@/components/ui/LinkButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useToday } from "@/hooks/useToday";
import { recordsOfDay } from "@/lib/records";
import { useStore } from "@/lib/store";

/** Kolik posledních záznamů se vejde na úvodní stránku administrace. */
const RECENT_COUNT = 8;

/** Úvodní stránka administrace se souhrnem a nejnovějšími záznamy. */
export default function AdminPage() {
  const { records, workplaces, users } = useStore();
  const today = useToday();
  const todayRecords = today ? recordsOfDay(records, today) : [];

  return (
    <>
      <FadeIn>
        <PageHeader
          actions={
            <>
              <ResetDataButton />
              <LinkButton href="/admin/zaznamy" variant="primary">
                Všechny záznamy
              </LinkButton>
            </>
          }
          description="Souhrn docházky žáků na pracovištích."
          highlight="docházky"
          title="Souhrn"
        />
      </FadeIn>

      <FadeIn delay={0.06}>
        <AdminStats
          records={records}
          todayRecords={todayRecords}
          users={users}
          workplaces={workplaces}
        />
      </FadeIn>

      <FadeIn delay={0.12}>
        <SectionHeading icon={History} title="Nejnovější záznamy" />
        <RecordsTable
          emptyMessage="Zatím tu není žádný záznam docházky."
          records={records.slice(0, RECENT_COUNT)}
          showStudent
        />
      </FadeIn>
    </>
  );
}
