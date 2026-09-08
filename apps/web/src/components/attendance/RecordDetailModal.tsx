"use client";

import { Button, Modal, Separator } from "@heroui/react";
import type { UseOverlayStateReturn } from "@heroui/react";
import type { AttendanceRecord } from "@praxio/shared";

import { InfoRow } from "@/components/ui/InfoRow";
import {
  formatCoordinates,
  formatDateTime,
  formatDistance,
} from "@/lib/format";

import { RecordTypeLabel } from "./RecordTypeLabel";
import { VerificationLabel } from "./VerificationLabel";

interface RecordDetailModalProps {
  record: AttendanceRecord | null;
  state: UseOverlayStateReturn;
}

/** Vyskakovací okno s podrobnostmi jednoho docházkového záznamu. */
export function RecordDetailModal({ record, state }: RecordDetailModalProps) {
  if (!record) return null;

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container size="md">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Detail záznamu</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <InfoRow label="Žák">{record.userName}</InfoRow>
              <InfoRow label="E-mail">{record.userEmail}</InfoRow>
              <Separator />
              <InfoRow label="Pracoviště">{record.workplaceName}</InfoRow>
              <InfoRow label="Datum a čas">
                {formatDateTime(record.createdAt)}
              </InfoRow>
              <InfoRow label="Typ záznamu">
                <RecordTypeLabel type={record.type} />
              </InfoRow>
              <Separator />
              <InfoRow label="GPS souřadnice">
                {formatCoordinates(record.latitude, record.longitude)}
              </InfoRow>
              <InfoRow label="Vzdálenost od pracoviště">
                {formatDistance(record.distance)}
              </InfoRow>
              <InfoRow label="Ověření polohy">
                <VerificationLabel result={record.verification} />
              </InfoRow>
            </Modal.Body>

            <Modal.Footer>
              <Button onPress={state.close} variant="secondary">
                Zavřít
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
