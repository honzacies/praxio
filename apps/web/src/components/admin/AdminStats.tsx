import { CircleAlert, ClipboardList, MapPin, Users } from "lucide-react";
import type { AttendanceRecord, User, Workplace } from "@praxio/shared";

import { StatCard } from "@/components/ui/StatCard";
import { getStudents } from "@/data/users";

interface AdminStatsProps {
  records: AttendanceRecord[];
  workplaces: Workplace[];
  users: User[];
  /** Záznamy z dnešního dne. */
  todayRecords: AttendanceRecord[];
}

/** Čtyři čísla, která učitele zajímají hned po otevření administrace. */
export function AdminStats({
  records,
  workplaces,
  users,
  todayRecords,
}: AdminStatsProps) {
  const problematic = records.filter(
    (record) => record.verification !== "OK",
  ).length;
  const activeCount = workplaces.filter(
    (workplace) => workplace.isActive,
  ).length;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        hint="Příchody i odchody"
        icon={ClipboardList}
        label="Dnešní záznamy"
        value={todayRecords.length}
      />
      <StatCard
        hint="Účty s rolí žák"
        icon={Users}
        label="Žáků v systému"
        value={getStudents(users).length}
      />
      <StatCard
        hint={`${activeCount} aktivních`}
        icon={MapPin}
        label="Pracovišť"
        value={workplaces.length}
      />
      <StatCard
        hint="Mimo okruh nebo bez polohy"
        icon={CircleAlert}
        label="Neověřené záznamy"
        value={problematic}
      />
    </div>
  );
}
