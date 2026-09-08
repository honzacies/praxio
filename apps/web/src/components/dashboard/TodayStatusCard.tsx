import { Card } from "@heroui/react";
import type { AttendanceRecord } from "@praxio/shared";

import { InfoRow } from "@/components/ui/InfoRow";
import { StatusDot } from "@/components/ui/StatusDot";
import { formatTime } from "@/lib/format";

/** Karta se stavem dnešního dne – kdy žák přišel a jestli je na pracovišti. */
export function TodayStatusCard({
  todayRecords,
}: {
  todayRecords: AttendanceRecord[];
}) {
  // Záznamy chodí seřazené od nejnovějšího, poslední z nich určuje stav.
  const latest = todayRecords[0];
  const isAtWorkplace = latest?.type === "ARRIVAL";

  const arrival = todayRecords.find((record) => record.type === "ARRIVAL");
  const departure = todayRecords.find((record) => record.type === "DEPARTURE");

  return (
    <Card className="p-5">
      <Card.Header className="flex-row items-start justify-between gap-3">
        <div>
          <Card.Title>Dnešní docházka</Card.Title>
          <Card.Description>
            {latest ? latest.workplaceName : "Zatím žádný dnešní záznam"}
          </Card.Description>
        </div>

        <StatusDot tone={isAtWorkplace ? "success" : "neutral"}>
          {isAtWorkplace ? "Na pracovišti" : "Mimo pracoviště"}
        </StatusDot>
      </Card.Header>

      <Card.Content className="gap-0">
        <InfoRow label="Příchod">
          {arrival ? formatTime(arrival.createdAt) : "–"}
        </InfoRow>
        <InfoRow label="Odchod">
          {departure ? formatTime(departure.createdAt) : "–"}
        </InfoRow>
      </Card.Content>
    </Card>
  );
}
