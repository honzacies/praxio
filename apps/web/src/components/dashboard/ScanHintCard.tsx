import { Card, Typography } from "@heroui/react";
import { QrCode } from "lucide-react";
import Link from "next/link";
import type { Workplace } from "@praxio/shared";

/**
 * Návod, jak si odbít docházku. Odkazy na pracoviště tu jsou jen proto,
 * aby šla aplikace vyzkoušet i bez vytištěného QR kódu.
 */
export function ScanHintCard({ workplaces }: { workplaces: Workplace[] }) {
  const activeWorkplaces = workplaces.filter((workplace) => workplace.isActive);

  return (
    <Card className="p-5">
      <Card.Header>
        <Card.Title className="flex flex-row items-center gap-2">
          <QrCode className="size-4 text-accent" />
          Jak si odbít docházku
        </Card.Title>
        <Card.Description className="mt-1">
          Naskenujte mobilem QR kód vyvěšený na pracovišti. Aplikace ověří vaši
          polohu a uloží příchod nebo odchod.
        </Card.Description>
      </Card.Header>

      <Card.Content className="mt-2 gap-2">
        <Typography
          className="font-semibold tracking-wider text-accent uppercase"
          type="body-xs"
        >
          Vyzkoušet bez skenování
        </Typography>

        <div className="flex flex-wrap gap-1.5">
          {activeWorkplaces.map((workplace) => (
            <Link
              key={workplace.id}
              className="rounded-md border border-border px-2.5 py-1 text-sm text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
              href={`/odbiti/${workplace.qrCode}`}
            >
              {workplace.name}
            </Link>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
