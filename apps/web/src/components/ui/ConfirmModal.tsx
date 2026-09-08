"use client";

import { Button, Modal } from "@heroui/react";
import type { UseOverlayStateReturn } from "@heroui/react";

interface ConfirmModalProps {
  state: UseOverlayStateReturn;
  title: string;
  description: string;
  /** Text potvrzovacího tlačítka, například "Smazat". */
  confirmLabel: string;
  onConfirm: () => void;
}

/**
 * Okno s dotazem "opravdu?" před akcí, kterou nejde vzít zpět.
 * Používá se před smazáním pracoviště.
 */
export function ConfirmModal({
  state,
  title,
  description,
  confirmLabel,
  onConfirm,
}: ConfirmModalProps) {
  function handleConfirm() {
    onConfirm();
    state.close();
  }

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container size="sm">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-sm text-muted">{description}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button onPress={state.close} variant="secondary">
                Zrušit
              </Button>
              <Button onPress={handleConfirm} variant="danger">
                {confirmLabel}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
