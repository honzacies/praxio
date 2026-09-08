"use client";

import { Button, Card, Typography } from "@heroui/react";
import { Download, Printer } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import type { Workplace } from "@praxio/shared";

/** Velikost vykresleného QR kódu v pixelech. */
const QR_SIZE = 200;

/** Zobrazí QR kód pracoviště a umožní ho stáhnout nebo vytisknout. */
export function QrCodePanel({ workplace }: { workplace: Workplace }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [checkInUrl, setCheckInUrl] = useState("");

  // Adresu složíme až v prohlížeči, protože na serveru doménu neznáme.
  useEffect(() => {
    setCheckInUrl(`${window.location.origin}/odbiti/${workplace.qrCode}`);
  }, [workplace.qrCode]);

  /** Vezme obrázek z plátna (canvas) a nabídne ho ke stažení jako PNG. */
  function handleDownload() {
    const canvas = containerRef.current?.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `qr-${workplace.qrCode}.png`;
    link.click();
  }

  return (
    <Card className="p-5">
      <Card.Header className="praxio-print-hidden">
        <Card.Title>QR kód pracoviště</Card.Title>
        <Card.Description className="mt-0.5">
          Vytiskněte kód a vyvěste ho na pracovišti. Žák si ho načte mobilem.
        </Card.Description>
      </Card.Header>

      {/*
        Oblast, která jediná se dostane na papír. Pravidla pro tisk
        jsou v souboru globals.css u třídy praxio-print-area.
      */}
      <div className="praxio-print-area mt-2 rounded-lg border border-separator p-6 text-center">
        <Typography weight="medium">{workplace.name}</Typography>

        <div className="mt-4 flex justify-center bg-white" ref={containerRef}>
          {checkInUrl ? (
            <QRCodeCanvas size={QR_SIZE} value={checkInUrl} />
          ) : (
            <div style={{ height: QR_SIZE, width: QR_SIZE }} />
          )}
        </div>

        <p className="mt-4 font-mono text-sm tracking-wide">
          {workplace.qrCode}
        </p>
        <Typography className="mt-1" color="muted" type="body-xs">
          Naskenujte mobilem a odbijte si příchod nebo odchod.
        </Typography>
      </div>

      <Typography
        className="mt-3 break-all praxio-print-hidden"
        color="muted"
        type="body-xs"
      >
        {checkInUrl}
      </Typography>

      <Card.Footer className="mt-3 gap-2 praxio-print-hidden">
        <Button onPress={handleDownload} variant="secondary">
          <Download className="size-4" />
          Stáhnout PNG
        </Button>
        <Button onPress={() => window.print()} variant="secondary">
          <Printer className="size-4" />
          Vytisknout
        </Button>
      </Card.Footer>
    </Card>
  );
}
