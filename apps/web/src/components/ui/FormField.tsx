"use client";

import { Description, Input, Label, TextField } from "@heroui/react";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Typ vstupu, například "text", "number" nebo "date". */
  type?: string;
  /** Vysvětlující text pod polem. */
  hint?: string;
}

/**
 * Jedno textové pole i s popiskem.
 * Díky vlastní komponentě nemusíme u každého pole psát stejnou strukturu.
 */
export function FormField({
  label,
  value,
  onChange,
  type = "text",
  hint,
}: FormFieldProps) {
  return (
    <TextField fullWidth onChange={onChange} type={type} value={value}>
      <Label>{label}</Label>
      <Input />
      {hint ? <Description>{hint}</Description> : null}
    </TextField>
  );
}
