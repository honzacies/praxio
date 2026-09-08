"use client";

import {
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  History,
} from "lucide-react";

import { RecordsTable } from "@/components/attendance/RecordsTable";
import { ScanHintCard } from "@/components/dashboard/ScanHintCard";
import { TodayStatusCard } from "@/components/dashboard/TodayStatusCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { MetaBox } from "@/components/ui/MetaBox";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { useToday } from "@/hooks/useToday";
import { formatDate } from "@/lib/format";
import { countVisitedDays, recordsOfDay, recordsOfUser } from "@/lib/records";
import { useSession } from "@/lib/session";
import { useStore } from "@/lib/store";

/** Kolik posledních záznamů ukážeme v přehledu. */
const RECENT_COUNT = 5;

/** Hlavní stránka žáka – co má dnes odbité a jaké jsou jeho poslední záznamy. */
export default function DashboardPage() {
  const { user } = useSession();
  const { records, workplaces } = useStore();
  const today = useToday();

  if (!user) return null;

  const myRecords = recordsOfUser(records, user.id);
  const todayRecords = today ? recordsOfDay(myRecords, today) : [];
  const lastRecord = myRecords[0];

  return (
    <>
      <FadeIn>
        <PageHeader
          description="Přehled vaší docházky na pracovišti."
          highlight={user.name.split(" ")[0]}
          meta={
            <>
              <MetaBox
                icon={CalendarDays}
                label="Dnešní datum"
                value={today ? formatDate(today) : "–"}
              />
              <MetaBox
                icon={History}
                label="Poslední záznam"
                value={lastRecord ? formatDate(lastRecord.createdAt) : "–"}
              />
              <MetaBox
                icon={CalendarCheck}
                label="Třída"
                value={user.className ?? "–"}
              />
            </>
          }
          title="Dobrý den,"
        />
      </FadeIn>

      <FadeIn className="grid gap-3 lg:grid-cols-2" delay={0.06}>
        <TodayStatusCard todayRecords={todayRecords} />
        <ScanHintCard workplaces={workplaces} />
      </FadeIn>

      <FadeIn className="mt-3 grid gap-3 sm:grid-cols-2" delay={0.12}>
        <StatCard
          hint="Dny, kdy jste si něco odbil"
          icon={CalendarCheck}
          label="Odpracované dny"
          value={countVisitedDays(myRecords)}
        />
        <StatCard
          hint="Příchody i odchody dohromady"
          icon={ClipboardList}
          label="Celkem záznamů"
          value={myRecords.length}
        />
      </FadeIn>

      <FadeIn delay={0.18}>
        <SectionHeading icon={ClipboardList} title="Poslední záznamy" />
        <RecordsTable
          emptyMessage="Zatím nemáte žádný záznam docházky."
          records={myRecords.slice(0, RECENT_COUNT)}
        />
      </FadeIn>
    </>
  );
}
