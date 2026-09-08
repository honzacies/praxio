"use client";

import { Button } from "@heroui/react";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

import { useStore } from "@/lib/store";

/**
 * Vrátí ukázková data do výchozího stavu. Slouží k předvádění aplikace –
 * po zkoušení odbíjení a zakládání pracovišť se dá vše rychle uklidit.
 * První kliknutí se jen zeptá, druhé data opravdu přepíše.
 */
export function ResetDataButton() {
  const { resetToSampleData } = useStore();
  const [isConfirming, setIsConfirming] = useState(false);

  function handlePress() {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    resetToSampleData();
    setIsConfirming(false);
  }

  return (
    <Button
      onPress={handlePress}
      variant={isConfirming ? "danger" : "secondary"}
    >
      <RotateCcw className="size-4" />
      {isConfirming ? "Opravdu obnovit?" : "Obnovit ukázková data"}
    </Button>
  );
}
