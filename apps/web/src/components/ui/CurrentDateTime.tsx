"use client";

import { useEffect, useState } from "react";

import { formatDateTime, nowIso } from "@/lib/format";

/**
 * Aktuální datum a čas. Hodnotu nastavíme až v prohlížeči,
 * jinak by se čas ze serveru lišil od času u uživatele.
 */
export function CurrentDateTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    setNow(nowIso());
    const timer = setInterval(() => setNow(nowIso()), 30_000);
    return () => clearInterval(timer);
  }, []);

  return <>{now ? formatDateTime(now) : "–"}</>;
}
