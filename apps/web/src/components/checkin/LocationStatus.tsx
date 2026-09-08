"use client";

import type { Workplace } from "@praxio/shared";

import { InfoRow } from "@/components/ui/InfoRow";
import { formatCoordinates, formatDistance } from "@/lib/format";
import type { GeolocationState } from "@/hooks/useGeolocation";

import { LocationAlert } from "./LocationAlert";

interface LocationStatusProps {
  geo: GeolocationState;
  workplace: Workplace;
  /** Vzdálenost od pracoviště, null dokud neznáme polohu. */
  distance: number | null;
  isAllowed: boolean;
}

/** Hláška o poloze a k ní naměřené údaje. */
export function LocationStatus({
  geo,
  workplace,
  distance,
  isAllowed,
}: LocationStatusProps) {
  return (
    <div className="space-y-3">
      <LocationAlert
        allowedRadius={workplace.allowedRadius}
        geo={geo}
        isAllowed={isAllowed}
      />

      {geo.status === "success" && geo.position ? (
        <div className="rounded-md bg-surface-secondary px-4 py-1">
          <InfoRow label="Vaše souřadnice">
            <span className="font-mono text-xs">
              {formatCoordinates(geo.position.latitude, geo.position.longitude)}
            </span>
          </InfoRow>
          <InfoRow label="Přesnost měření">
            {formatDistance(geo.accuracy)}
          </InfoRow>
          <InfoRow label="Vzdálenost od pracoviště">
            {formatDistance(distance)}
          </InfoRow>
        </div>
      ) : null}
    </div>
  );
}
