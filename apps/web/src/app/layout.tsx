import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { LocaleProvider } from "@/components/ui/LocaleProvider";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { PrototypeNotice } from "@/components/ui/PrototypeNotice";
import { SessionProvider } from "@/lib/session";
import { StoreProvider } from "@/lib/store";

import "./globals.css";

/**
 * Písmo Inter. Next.js ho při sestavení stáhne a přibalí k aplikaci,
 * takže se nenačítá z cizího serveru a stránka se nikde „necukne".
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Praxio – evidence docházky na pracovišti",
  description:
    "Školní aplikace pro evidenci příchodů a odchodů žáků pomocí QR kódu a ověření GPS polohy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.variable} lang="cs">
      <body className="bg-background text-foreground antialiased">
        <LocaleProvider>
          <MotionProvider>
            <SessionProvider>
              <StoreProvider>
                {children}
                <PrototypeNotice />
              </StoreProvider>
            </SessionProvider>
          </MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
