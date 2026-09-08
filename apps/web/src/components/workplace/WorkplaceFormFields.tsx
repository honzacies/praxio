"use client";

import { Label, Switch } from "@heroui/react";

import { FormField } from "@/components/ui/FormField";

import type { WorkplaceFormValues } from "./useWorkplaceForm";

interface WorkplaceFormFieldsProps {
  values: WorkplaceFormValues;
  setValue: (change: Partial<WorkplaceFormValues>) => void;
}

/** Samotná pole formuláře pracoviště. */
export function WorkplaceFormFields({
  values,
  setValue,
}: WorkplaceFormFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        label="Název pracoviště"
        onChange={(name) => setValue({ name })}
        value={values.name}
      />
      <FormField
        label="Adresa nebo popis místa"
        onChange={(address) => setValue({ address })}
        value={values.address}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          hint="Například 49.5772"
          label="GPS šířka"
          onChange={(latitude) => setValue({ latitude })}
          type="number"
          value={values.latitude}
        />
        <FormField
          hint="Například 18.7659"
          label="GPS délka"
          onChange={(longitude) => setValue({ longitude })}
          type="number"
          value={values.longitude}
        />
      </div>

      <FormField
        hint="Vzdálenost v metrech, do které lze odbít."
        label="Povolený okruh"
        onChange={(allowedRadius) => setValue({ allowedRadius })}
        type="number"
        value={values.allowedRadius}
      />

      <Switch
        isSelected={values.isActive}
        onChange={(isActive) => setValue({ isActive })}
      >
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Pracoviště je aktivní</Label>
        </Switch.Content>
      </Switch>
    </div>
  );
}
