"use client";

import { Spinner } from "@heroui/react";

import { findWorkplaceByQrCode } from "@/data/workplaces";
import { useSession } from "@/lib/session";
import { useStore } from "@/lib/store";

import { CheckInCard } from "./CheckInCard";
import { CheckInNotice } from "./CheckInNotice";

/**
 * Rozhodne, jestli žákovi ukážeme formulář, nebo vysvětlení, co chybí.
 * Pracoviště hledáme podle kódu z QR – přesně tohle bude dělat backend.
 */
export function CheckInScreen({ qrCode }: { qrCode: string }) {
  const { user, isLoading } = useSession();
  const { workplaces, isReady } = useStore();

  if (isLoading || !isReady) {
    return (
      <div className="flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );
  }

  const workplace = findWorkplaceByQrCode(workplaces, qrCode);

  if (!workplace) {
    return (
      <CheckInNotice
        action={{ href: "/", label: "Zpět na přehled" }}
        description="QR kód je neplatný nebo pracoviště už neexistuje."
        title="Pracoviště nenalezeno"
      />
    );
  }

  if (!workplace.isActive) {
    return (
      <CheckInNotice
        action={{ href: "/", label: "Zpět na přehled" }}
        description="Na tomto pracovišti se momentálně docházka neeviduje."
        title="Pracoviště je neaktivní"
      />
    );
  }

  if (!user) {
    return (
      <CheckInNotice
        action={{ href: "/prihlaseni", label: "Přihlásit se" }}
        description="Docházku lze uložit jen přihlášenému žákovi."
        title="Nejste přihlášeni"
      />
    );
  }

  return <CheckInCard workplace={workplace} />;
}
