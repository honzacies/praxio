"use client";

import { Button, Card, Separator } from "@heroui/react";
import { Crosshair } from "lucide-react";
import { useState } from "react";
import type { AttendanceRecord, RecordType, Workplace } from "@praxio/shared";
import { distanceInMeters } from "@praxio/shared";

import { CurrentDateTime } from "@/components/ui/CurrentDateTime";
import { useGeolocation } from "@/hooks/useGeolocation";
import { buildRecord } from "@/lib/newRecord";
import { isCheckedIn } from "@/lib/records";
import { useSession } from "@/lib/session";
import { useStore } from "@/lib/store";

import { CheckInButtons } from "./CheckInButtons";
import { CheckInSuccess } from "./CheckInSuccess";
import { LocationSimulator } from "./LocationSimulator";
import { LocationStatus } from "./LocationStatus";
import { WorkplaceHeader } from "./WorkplaceHeader";

/**
 * Formulář, který žák uvidí po naskenování QR kódu.
 * Uložit záznam jde jen tehdy, když je přihlášený a v povoleném okruhu.
 */
export function CheckInCard({ workplace }: { workplace: Workplace }) {
  const { user } = useSession();
  const { records, addRecord } = useStore();
  const geo = useGeolocation();
  const [savedRecord, setSavedRecord] = useState<AttendanceRecord | null>(null);

  // Vzdálenost počítáme stejnou funkcí, jakou bude používat i backend.
  const distance = geo.position
    ? distanceInMeters(geo.position, workplace)
    : null;
  const isAllowed = distance !== null && distance <= workplace.allowedRadius;
  const isAtWorkplace = user ? isCheckedIn(records, user.id) : false;

  /** Uloží záznam do dat aplikace a přepne na potvrzovací obrazovku. */
  function handleCheckIn(type: RecordType) {
    if (!user || !geo.position || distance === null) return;

    const record = buildRecord(user, workplace, type, geo.position, distance);
    addRecord(record);
    setSavedRecord(record);
  }

  if (savedRecord) {
    return <CheckInSuccess record={savedRecord} />;
  }

  return (
    <Card className="p-5">
      <WorkplaceHeader workplace={workplace} />
      <Separator className="my-5" />

      <div className="rounded-md bg-surface-secondary px-4 py-3 text-sm">
        <p className="font-medium">{user?.name}</p>
        <p className="text-muted">
          <CurrentDateTime />
        </p>
      </div>

      <Button
        className="mt-4"
        fullWidth
        onPress={geo.request}
        variant="outline"
      >
        <Crosshair className="size-4" />
        {geo.status === "success" ? "Změřit polohu znovu" : "Zjistit polohu"}
      </Button>

      <div className="mt-4">
        <LocationStatus
          distance={distance}
          geo={geo}
          isAllowed={isAllowed}
          workplace={workplace}
        />
      </div>

      <CheckInButtons
        isAtWorkplace={isAtWorkplace}
        isLocationOk={isAllowed}
        onCheckIn={handleCheckIn}
      />

      <LocationSimulator onSimulate={geo.setPosition} workplace={workplace} />
    </Card>
  );
}
