"use client";

import { Button } from "@heroui/react";
import { Pencil, QrCode, Trash2 } from "lucide-react";
import Link from "next/link";
import type { User, Workplace } from "@praxio/shared";

import { canEditWorkplace } from "@/lib/permissions";

interface WorkplaceRowActionsProps {
  workplace: Workplace;
  currentUser: User;
  onEdit: (workplace: Workplace) => void;
  onDelete: (workplace: Workplace) => void;
}

/**
 * Tlačítka na konci řádku tabulky. Odkaz na QR kód vidí každý,
 * kdo se dostane do administrace; upravit a smazat smí jen zakladatel
 * pracoviště a administrátor.
 */
export function WorkplaceRowActions({
  workplace,
  currentUser,
  onEdit,
  onDelete,
}: WorkplaceRowActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <Link
        aria-label={`Detail a QR kód – ${workplace.name}`}
        className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-surface-secondary"
        href={`/admin/pracoviste/${workplace.id}`}
      >
        <QrCode className="size-4" />
      </Link>

      {canEditWorkplace(currentUser, workplace) ? (
        <>
          <Button
            aria-label={`Upravit ${workplace.name}`}
            isIconOnly
            onPress={() => onEdit(workplace)}
            size="sm"
            variant="ghost"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            aria-label={`Smazat ${workplace.name}`}
            isIconOnly
            onPress={() => onDelete(workplace)}
            size="sm"
            variant="ghost"
          >
            <Trash2 className="size-4" />
          </Button>
        </>
      ) : null}
    </div>
  );
}
