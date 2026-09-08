"use client";

import { Toast, toast } from "@heroui/react";
import { useEffect, useRef } from "react";

/** Jak dlouho hláška zůstane na obrazovce (v milisekundách). */
const NOTICE_TIMEOUT = 9000;

/**
 * Upozornění, že aplikace je zatím prototyp. Ukáže se dole na obrazovce
 * hned po otevření a po chvíli samo zmizí; zavřít jde i křížkem.
 *
 * Komponenta zároveň vykresluje <Toast.Provider>, tedy místo, kam se
 * vyskakovací hlášky vykreslují. Vlastní obsah skládáme proto, abychom
 * křížku dali český popisek pro odečítač obrazovky.
 */
export function PrototypeNotice() {
  // Ve vývojovém režimu React spouští efekty dvakrát, aby odhalil chyby.
  // Tahle značka zajistí, že se hláška přesto ukáže jen jednou.
  const wasShown = useRef(false);

  useEffect(() => {
    if (wasShown.current) return;
    wasShown.current = true;

    toast.warning("Praxio stále roste", {
      description: "Jedná se pouze o prototyp. Jeho funkčnost se bude měnit.",
      timeout: NOTICE_TIMEOUT,
    });
  }, []);

  return (
    <Toast.Provider>
      {({ toast: item }) => (
        <Toast toast={item} variant={item.content.variant}>
          <Toast.Indicator variant={item.content.variant}>
            {item.content.indicator}
          </Toast.Indicator>

          <Toast.Content>
            <Toast.Title>{item.content.title}</Toast.Title>
            <Toast.Description>{item.content.description}</Toast.Description>
          </Toast.Content>

          <Toast.CloseButton aria-label="Zavřít oznámení" />
        </Toast>
      )}
    </Toast.Provider>
  );
}
