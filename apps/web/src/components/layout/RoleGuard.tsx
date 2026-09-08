"use client";

import { Card, Typography } from "@heroui/react";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import type { Role } from "@praxio/shared";

import { useSession } from "@/lib/session";

interface RoleGuardProps {
  /** Funkce, která rozhodne, jestli role na stránku smí. */
  allow: (role: Role) => boolean;
  /** Komu je stránka určená – doplní se do hlášky. */
  allowedFor: string;
  children: ReactNode;
}

/**
 * Pustí dál jen uživatele s dostatečnou rolí.
 * Ostatním ukáže hlášku místo obsahu stránky. Hláška říká jen to,
 * komu je stránka určená – nic o tom, co se za ní skrývá.
 */
export function RoleGuard({ allow, allowedFor, children }: RoleGuardProps) {
  const { user } = useSession();

  if (!user) return null;

  if (!allow(user.role)) {
    return (
      <Card className="items-center p-8 text-center">
        <Lock className="size-6 text-muted" />
        <Typography className="mt-3" type="h6" weight="semibold">
          Nemáte oprávnění
        </Typography>
        <Typography color="muted" type="body-sm">
          Tato část aplikace je určená pro {allowedFor}.
        </Typography>
      </Card>
    );
  }

  return <>{children}</>;
}
