"use client";

import { Button, Modal } from "@heroui/react";
import type { UseOverlayStateReturn } from "@heroui/react";
import type { Workplace } from "@praxio/shared";

import { useWorkplaceForm } from "./useWorkplaceForm";
import { WorkplaceFormFields } from "./WorkplaceFormFields";

interface WorkplaceFormModalProps {
  state: UseOverlayStateReturn;
  /** ID přihlášeného uživatele – zapíše se k nově založenému pracovišti. */
  currentUserId: string;
  /** Vyplněné pracoviště znamená úpravu, prázdné zakládání nového. */
  edited?: Workplace;
  /** Zavolá se s hotovým pracovištěm po potvrzení formuláře. */
  onSave: (workplace: Workplace) => void;
}

/** Vyskakovací okno s formulářem pracoviště. */
export function WorkplaceFormModal({
  state,
  currentUserId,
  edited,
  onSave,
}: WorkplaceFormModalProps) {
  const form = useWorkplaceForm(currentUserId, edited);

  function handleSave() {
    onSave(form.build());
    state.close();
  }

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container size="lg">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>
                {edited ? "Úprava pracoviště" : "Nové pracoviště"}
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <WorkplaceFormFields
                setValue={form.setValue}
                values={form.values}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button onPress={state.close} variant="secondary">
                Zrušit
              </Button>
              <Button
                isDisabled={!form.isValid}
                onPress={handleSave}
                variant="primary"
              >
                {edited ? "Uložit změny" : "Založit pracoviště"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
