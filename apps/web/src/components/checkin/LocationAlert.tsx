"use client";

import { Alert, Spinner } from "@heroui/react";

import type { GeolocationState } from "@/hooks/useGeolocation";

interface LocationAlertProps {
  geo: GeolocationState;
  isAllowed: boolean;
  allowedRadius: number;
}

/** Hláška o stavu ověření polohy – mění se podle toho, jak dopadlo měření. */
export function LocationAlert({
  geo,
  isAllowed,
  allowedRadius,
}: LocationAlertProps) {
  if (geo.status === "idle") {
    return (
      <Alert status="default">
        <Alert.Content>
          <Alert.Title>Nejdřív ověříme vaši polohu</Alert.Title>
          <Alert.Description>
            Bez GPS souřadnic nelze záznam uložit.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  if (geo.status === "loading") {
    return (
      <Alert status="default">
        <Alert.Indicator>
          <Spinner size="sm" />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title>Zjišťuji polohu…</Alert.Title>
        </Alert.Content>
      </Alert>
    );
  }

  if (geo.status === "error") {
    return (
      <Alert status="danger">
        <Alert.Content>
          <Alert.Title>Polohu se nepodařilo zjistit</Alert.Title>
          <Alert.Description>{geo.errorMessage}</Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  return (
    <Alert status={isAllowed ? "success" : "danger"}>
      <Alert.Content>
        <Alert.Title>
          {isAllowed
            ? "Jste v povoleném okruhu pracoviště"
            : "Jste mimo povolený okruh pracoviště"}
        </Alert.Title>
        <Alert.Description>
          {isAllowed
            ? "Můžete uložit příchod nebo odchod."
            : `Přesuňte se blíž. Odbít lze do ${allowedRadius} m od pracoviště.`}
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
