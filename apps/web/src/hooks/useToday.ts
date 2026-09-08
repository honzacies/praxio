"use client";

import { useEffect, useState } from "react";

import { nowIso, toDateKey } from "@/lib/format";

/**
 * Vrátí dnešní datum ve tvaru "2026-09-07", nebo null při prvním vykreslení.
 * Datum zjišťujeme až v prohlížeči, aby se HTML ze serveru shodovalo s tím,
 * co se nakonec zobrazí uživateli.
 */
export function useToday(): string | null {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(toDateKey(nowIso()));
  }, []);

  return today;
}
