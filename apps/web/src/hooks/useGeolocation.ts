"use client";

import { useCallback, useState } from "react";
import type { Coordinates } from "@praxio/shared";

/** Ve kterém stavu se právě nachází zjišťování polohy. */
export type GeolocationStatus = "idle" | "loading" | "success" | "error";

export interface GeolocationState {
  status: GeolocationStatus;
  position: Coordinates | null;
  /** Přesnost měření v metrech, kterou hlásí prohlížeč. */
  accuracy: number | null;
  errorMessage: string | null;
}

const INITIAL_STATE: GeolocationState = {
  status: "idle",
  position: null,
  accuracy: null,
  errorMessage: null,
};

/** Přeloží kód chyby z prohlížeče na srozumitelnou hlášku pro uživatele. */
function describeError(error: GeolocationPositionError): string {
  if (error.code === error.PERMISSION_DENIED) {
    return "Přístup k poloze byl zamítnut. Povolte polohu v nastavení prohlížeče.";
  }
  if (error.code === error.POSITION_UNAVAILABLE) {
    return "Polohu se nepodařilo zjistit. Zkuste to venku nebo u okna.";
  }
  return "Zjišťování polohy trvalo příliš dlouho. Zkuste to prosím znovu.";
}

/**
 * Obaluje prohlížečové API navigator.geolocation.
 * Funkce `request` požádá o polohu, `setPosition` umí polohu nastavit ručně
 * (využívá se v demo režimu, kde si polohu simulujeme).
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>(INITIAL_STATE);

  const request = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setState({
        ...INITIAL_STATE,
        status: "error",
        errorMessage: "Tento prohlížeč neumí zjistit polohu.",
      });
      return;
    }

    setState({ ...INITIAL_STATE, status: "loading" });

    navigator.geolocation.getCurrentPosition(
      (result) =>
        setState({
          status: "success",
          position: {
            latitude: result.coords.latitude,
            longitude: result.coords.longitude,
          },
          accuracy: Math.round(result.coords.accuracy),
          errorMessage: null,
        }),
      (error) =>
        setState({
          ...INITIAL_STATE,
          status: "error",
          errorMessage: describeError(error),
        }),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  /** Ručně nastaví polohu – slouží k předvedení aplikace bez cestování. */
  const setPosition = useCallback((position: Coordinates, accuracy = 10) => {
    setState({ status: "success", position, accuracy, errorMessage: null });
  }, []);

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return { ...state, request, setPosition, reset };
}
