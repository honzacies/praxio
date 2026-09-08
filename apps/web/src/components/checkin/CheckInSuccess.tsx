"use client";

import { Card, Typography } from "@heroui/react";
import { CircleCheckBig } from "lucide-react";
import * as m from "motion/react-m";
import type { AttendanceRecord } from "@praxio/shared";
import { RECORD_TYPE_LABELS } from "@praxio/shared";

import { InfoRow } from "@/components/ui/InfoRow";
import { LinkButton } from "@/components/ui/LinkButton";
import { formatDateTime, formatDistance } from "@/lib/format";

/** Potvrzení, které se ukáže po úspěšném uložení záznamu. */
export function CheckInSuccess({ record }: { record: AttendanceRecord }) {
  return (
    <Card className="items-center p-8 text-center">
      {/* Zaškrtnutí naskočí s malým přeskočením, aby uložení bylo znát. */}
      <m.span
        animate={{ scale: 1 }}
        initial={{ scale: 0.6 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
      >
        <CircleCheckBig className="size-8 text-success" />
      </m.span>

      <Card.Header className="mt-3 items-center">
        <Typography type="h5" weight="semibold">
          Záznam byl uložen
        </Typography>
        <Typography className="mt-1" color="muted" type="body-sm">
          {RECORD_TYPE_LABELS[record.type]} na pracovišti {record.workplaceName}
        </Typography>
      </Card.Header>

      <Card.Content className="mt-3 w-full gap-0 text-left">
        <InfoRow label="Datum a čas">
          {formatDateTime(record.createdAt)}
        </InfoRow>
        <InfoRow label="Vzdálenost od pracoviště">
          {formatDistance(record.distance)}
        </InfoRow>
      </Card.Content>

      <Card.Footer className="mt-4 w-full">
        <LinkButton className="w-full" href="/moje-zaznamy" variant="primary">
          Zobrazit moje záznamy
        </LinkButton>
      </Card.Footer>
    </Card>
  );
}
