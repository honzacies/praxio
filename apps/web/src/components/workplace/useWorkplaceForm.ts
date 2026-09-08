"use client";

import { useState } from "react";
import type { Workplace } from "@praxio/shared";

/** Hodnoty formuláře držíme jako text, protože z <input> chodí vždy text. */
export interface WorkplaceFormValues {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  allowedRadius: string;
  isActive: boolean;
}

const EMPTY_VALUES: WorkplaceFormValues = {
  name: "",
  address: "",
  latitude: "",
  longitude: "",
  allowedRadius: "50",
  isActive: true,
};

/** Znaky pro kód. Chybí 0, O, 1 a I, aby se při přepisu nepletly. */
const CODE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Náhodný kód pro QR ve tvaru PRX-XXXX-XXXX. */
function generateQrCode(): string {
  const randomPart = (length: number) =>
    Array.from(
      { length },
      () => CODE_CHARACTERS[Math.floor(Math.random() * CODE_CHARACTERS.length)],
    ).join("");

  return `PRX-${randomPart(4)}-${randomPart(4)}`;
}

/** Předvyplní formulář údaji upravovaného pracoviště. */
function toFormValues(workplace: Workplace): WorkplaceFormValues {
  return {
    name: workplace.name,
    address: workplace.address,
    latitude: String(workplace.latitude),
    longitude: String(workplace.longitude),
    allowedRadius: String(workplace.allowedRadius),
    isActive: workplace.isActive,
  };
}

/** Formulář jde odeslat, jen když jsou vyplněná všechna povinná pole. */
function isComplete(values: WorkplaceFormValues): boolean {
  return Boolean(
    values.name && values.address && values.latitude && values.longitude,
  );
}

/**
 * Stará se o stav formuláře pracoviště. Bez `edited` zakládá nové,
 * s ním ho upravuje – ID, kód pro QR i zakladatel pak zůstávají stejné,
 * aby už vytištěný QR kód dál fungoval.
 */
export function useWorkplaceForm(currentUserId: string, edited?: Workplace) {
  const [values, setValues] = useState<WorkplaceFormValues>(
    edited ? toFormValues(edited) : EMPTY_VALUES,
  );

  /** Změní jednu položku formuláře, ostatní nechá být. */
  function setValue(change: Partial<WorkplaceFormValues>) {
    setValues((current) => ({ ...current, ...change }));
  }

  /** Z textových hodnot poskládá hotové pracoviště. */
  function build(): Workplace {
    return {
      id: edited ? edited.id : `w-${Date.now()}`,
      name: values.name.trim(),
      address: values.address.trim(),
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
      allowedRadius: Number(values.allowedRadius),
      isActive: values.isActive,
      qrCode: edited ? edited.qrCode : generateQrCode(),
      createdById: edited ? edited.createdById : currentUserId,
    };
  }

  return { values, setValue, build, isValid: isComplete(values) };
}
