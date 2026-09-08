"use client";

/** Značka Praxio – mapový špendlík s vyříznutým písmenem P. */

import { useId } from "react";

interface LogoProps {
  /** Velikost v pixelech (šířka i výška). */
  size?: number;
  className?: string;
}

/** Obrys špendlíku i s vyříznutým písmenem P. */
const PIN_PATH =
  "M175.77 42.82C130.21 63.31 96.16 102.43 81.68 150.57C77.1 165.82 74.65 181.35 74.69 197.32C74.82 246.8 103.54 298.82 132.2 337.81C145.88 356.43 160.29 374.34 176.14 390.95L188.11 403.49L188.33 193.27C188.34 175.6 196.16 158.68 208.59 146.65C227.36 128.48 255.88 124.57 278.59 137.16C295.11 146.33 306.66 162.27 310.64 181.01C316.56 206.83 306.16 232.98 284.8 247.97C269.17 258.93 249.77 261.85 231.53 256.06L231.52 450.94L250.17 472.98C267.54 452.44 285.08 432.9 303.52 413.65L332.99 381.52C345.7 367.67 357.05 352.99 368.03 337.71C394.98 300.21 422.54 251.34 425.1 204.36C425.91 189.4 424.31 174.8 420.79 160.23C412.11 124.35 391.68 92.11 363.66 68.63C330.95 41.2 290.34 27.02 249.26 27.02C224.39 27.02 199.35 32.22 175.77 42.82Z";

/** Tečka uprostřed písmene P. */
const DOT_PATH =
  "M224.11 196.21C224.11 210.03 235.31 221.23 249.13 221.23C262.95 221.23 274.15 210.03 274.15 196.21C274.15 182.39 262.95 171.19 249.13 171.19C235.31 171.19 224.11 182.39 224.11 196.21Z";

export function Logo({ size = 32, className }: LogoProps) {
  // Logo se na stránce může objevit vícekrát, proto potřebuje pokaždé jiné id
  // přechodu. useId nám ho vyrobí, jen z něj odstraníme zvláštní znaky,
  // aby se dalo použít v odkazu url(#...).
  const gradientId = `praxio-logo-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      className={className}
      height={size}
      role="img"
      viewBox="0 0 500 500"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Praxio</title>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#BC1C21" />
          <stop offset="1" stopColor="#ED1C24" />
        </linearGradient>
      </defs>
      <path d={PIN_PATH} fill={`url(#${gradientId})`} />
      <path d={DOT_PATH} fill={`url(#${gradientId})`} />
    </svg>
  );
}

/** Logo i s názvem aplikace. Používá se v hlavičce a na přihlašovací stránce. */
export function LogoWithName({ size = 32 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2">
      <Logo size={size} />
      <span className="text-lg font-semibold tracking-tight">Praxio</span>
    </span>
  );
}
