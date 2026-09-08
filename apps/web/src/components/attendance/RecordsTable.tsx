"use client";

import { Button, Table } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import type { AttendanceRecord } from "@praxio/shared";

import { NoData } from "@/components/ui/NoData";
import {
  formatCoordinates,
  formatDate,
  formatDistance,
  formatTime,
} from "@/lib/format";

import { RecordsTableHeader } from "./RecordsTableHeader";
import { RecordTypeLabel } from "./RecordTypeLabel";
import { VerificationLabel } from "./VerificationLabel";

/** Nepovinné sloupce se zapínají propy, viz RecordsTableHeader. */
interface RecordsTableProps {
  records: AttendanceRecord[];
  showStudent?: boolean;
  showDetails?: boolean;
  onShowDetail?: (record: AttendanceRecord) => void;
  emptyMessage?: string;
}

export function RecordsTable({
  records,
  showStudent = false,
  showDetails = false,
  onShowDetail,
  emptyMessage = "Žádné záznamy neodpovídají zvolenému filtru.",
}: RecordsTableProps) {
  if (records.length === 0) return <NoData message={emptyMessage} />;

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Seznam docházkových záznamů">
          <RecordsTableHeader
            showDetailButton={Boolean(onShowDetail)}
            showDetails={showDetails}
            showStudent={showStudent}
          />
          <Table.Body items={records}>
            {(record) => (
              <Table.Row id={record.id}>
                <Table.Cell className="whitespace-nowrap tabular-nums">
                  {formatDate(record.createdAt)}
                </Table.Cell>
                <Table.Cell className="tabular-nums">
                  {formatTime(record.createdAt)}
                </Table.Cell>
                {showStudent ? (
                  <Table.Cell className="whitespace-nowrap">
                    {record.userName}
                  </Table.Cell>
                ) : null}
                {showDetails ? (
                  <Table.Cell className="text-muted">
                    {record.userEmail}
                  </Table.Cell>
                ) : null}
                <Table.Cell>{record.workplaceName}</Table.Cell>
                <Table.Cell>
                  <RecordTypeLabel type={record.type} />
                </Table.Cell>
                {showDetails ? (
                  <Table.Cell className="font-mono text-xs whitespace-nowrap">
                    {formatCoordinates(record.latitude, record.longitude)}
                  </Table.Cell>
                ) : null}
                <Table.Cell className="tabular-nums">
                  {formatDistance(record.distance)}
                </Table.Cell>
                <Table.Cell>
                  <VerificationLabel result={record.verification} />
                </Table.Cell>
                {onShowDetail ? (
                  <Table.Cell>
                    <Button
                      aria-label="Zobrazit detail záznamu"
                      isIconOnly
                      onPress={() => onShowDetail(record)}
                      size="sm"
                      variant="ghost"
                    >
                      <ArrowRight className="size-4" />
                    </Button>
                  </Table.Cell>
                ) : null}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
