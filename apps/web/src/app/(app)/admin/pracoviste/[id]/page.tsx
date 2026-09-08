"use client";

import { Card, Spinner } from "@heroui/react";
import { use } from "react";

import { InfoRow } from "@/components/ui/InfoRow";
import { NoData } from "@/components/ui/NoData";
import { PageHeader } from "@/components/ui/PageHeader";
import { QrCodePanel } from "@/components/workplace/QrCodePanel";
import { findWorkplace } from "@/data/workplaces";
import { formatCoordinates } from "@/lib/format";
import { useStore } from "@/lib/store";

/** Detail jednoho pracoviště i s jeho QR kódem ke stažení. */
export default function WorkplaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { workplaces, isReady } = useStore();

  // Dokud se data nenačtou z prohlížeče, je seznam prázdný – v tu chvíli
  // ještě nemůžeme tvrdit, že pracoviště neexistuje.
  if (!isReady) {
    return <Spinner size="lg" />;
  }

  const workplace = findWorkplace(workplaces, id);

  if (!workplace) {
    return <NoData message="Takové pracoviště v systému není." />;
  }

  return (
    <>
      <PageHeader description={workplace.address} title={workplace.name} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5 praxio-print-hidden">
          <Card.Header>
            <Card.Title>Údaje o pracovišti</Card.Title>
          </Card.Header>

          <Card.Content className="gap-0">
            <InfoRow label="Adresa">{workplace.address}</InfoRow>
            <InfoRow label="GPS souřadnice">
              {formatCoordinates(workplace.latitude, workplace.longitude)}
            </InfoRow>
            <InfoRow label="Povolený okruh">
              {workplace.allowedRadius} m
            </InfoRow>
            <InfoRow label="Stav">
              {workplace.isActive ? "Aktivní" : "Neaktivní"}
            </InfoRow>
            <InfoRow label="Kód pracoviště">
              <span className="font-mono text-xs">{workplace.qrCode}</span>
            </InfoRow>
          </Card.Content>
        </Card>

        <QrCodePanel workplace={workplace} />
      </div>
    </>
  );
}
