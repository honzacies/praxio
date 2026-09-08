import type { Workplace } from "@praxio/shared";

/**
 * Výchozí ukázková pracoviště v okolí Jablunkova.
 * Použijí se při prvním spuštění, dál už aplikace pracuje s tím,
 * co je uložené v prohlížeči. `createdById` říká, kdo pracoviště založil –
 * jen ten (a administrátor) ho smí upravit nebo smazat.
 */
export const DEFAULT_WORKPLACES: Workplace[] = [
  {
    id: "w-1",
    name: "Školní dílny SOŠ Jablunkov",
    address: "Školní 416, Jablunkov",
    latitude: 49.5772,
    longitude: 18.7659,
    allowedRadius: 75,
    isActive: true,
    qrCode: "PRX-7QK2-M4XA",
    createdById: "u-2",
  },
  {
    id: "w-2",
    name: "Autoservis Kufa",
    address: "Bezručova 122, Jablunkov",
    latitude: 49.5801,
    longitude: 18.7612,
    allowedRadius: 60,
    isActive: true,
    qrCode: "PRX-3BN8-R1TD",
    createdById: "u-2",
  },
  {
    id: "w-3",
    name: "Hotel Grůň",
    address: "Mosty u Jablunkova 500",
    latitude: 49.5228,
    longitude: 18.758,
    allowedRadius: 120,
    isActive: true,
    qrCode: "PRX-9WE5-L6HZ",
    createdById: "u-2",
  },
  {
    id: "w-4",
    name: "Pekárna Nowak",
    address: "Návsí 210",
    latitude: 49.59,
    longitude: 18.753,
    allowedRadius: 50,
    isActive: true,
    qrCode: "PRX-5JD1-Y8VC",
    createdById: "u-3",
  },
  {
    id: "w-5",
    name: "Kadeřnictví Styl",
    address: "Dukelská 45, Jablunkov",
    latitude: 49.5765,
    longitude: 18.7671,
    allowedRadius: 40,
    isActive: false,
    qrCode: "PRX-2FP6-Q3SN",
    createdById: "u-2",
  },
];

/** Najde pracoviště podle ID v zadaném seznamu. */
export function findWorkplace(
  workplaces: Workplace[],
  id: string,
): Workplace | undefined {
  return workplaces.find((workplace) => workplace.id === id);
}

/**
 * Najde pracoviště podle kódu z QR.
 * Přesně tohle bude po naskenování QR kódu dělat backend.
 */
export function findWorkplaceByQrCode(
  workplaces: Workplace[],
  qrCode: string,
): Workplace | undefined {
  return workplaces.find((workplace) => workplace.qrCode === qrCode);
}
