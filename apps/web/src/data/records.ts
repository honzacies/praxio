import type {
  AttendanceRecord,
  RecordType,
  VerificationResult,
} from "@praxio/shared";

import { workdayIso } from "@/lib/format";

import { DEFAULT_USERS, findUser } from "./users";
import { DEFAULT_WORKPLACES, findWorkplace } from "./workplaces";

/** Zjednodušený zápis jednoho záznamu, ze kterého níže složíme celý objekt. */
interface RecordSeed {
  id: string;
  userId: string;
  workplaceId: string;
  type: RecordType;
  /** 0 = dnes, 1 = předchozí pracovní den, 2 = ten před ním a tak dál. */
  daysBack: number;
  time: string;
  /** Vzdálenost žáka od pracoviště v metrech, null = poloha se nezískala. */
  distance: number | null;
}

/** O kolik stupňů zeměpisné šířky se posuneme, když ujdeme jeden metr. */
const METERS_PER_DEGREE = 111320;

/**
 * Ukázková docházka žáka za posledních pět pracovních dnů.
 * Schválně obsahuje i záznamy mimo povolený okruh a jeden bez získané
 * polohy, aby šlo předvést filtrování podle stavu a vzdálenosti.
 */
const SEEDS: RecordSeed[] = [
  {
    id: "r-1",
    userId: "u-1",
    workplaceId: "w-1",
    type: "ARRIVAL",
    daysBack: 0,
    time: "07:28",
    distance: 18,
  },
  {
    id: "r-2",
    userId: "u-1",
    workplaceId: "w-1",
    type: "DEPARTURE",
    daysBack: 0,
    time: "14:05",
    distance: 25,
  },
  {
    id: "r-3",
    userId: "u-1",
    workplaceId: "w-2",
    type: "ARRIVAL",
    daysBack: 1,
    time: "07:40",
    distance: 55,
  },
  {
    id: "r-4",
    userId: "u-1",
    workplaceId: "w-2",
    type: "DEPARTURE",
    daysBack: 1,
    time: "15:03",
    distance: 48,
  },
  {
    id: "r-5",
    userId: "u-1",
    workplaceId: "w-1",
    type: "ARRIVAL",
    daysBack: 2,
    time: "07:30",
    distance: 14,
  },
  {
    id: "r-6",
    userId: "u-1",
    workplaceId: "w-1",
    type: "DEPARTURE",
    daysBack: 2,
    time: "14:02",
    distance: 16,
  },
  {
    id: "r-7",
    userId: "u-1",
    workplaceId: "w-3",
    type: "ARRIVAL",
    daysBack: 3,
    time: "08:01",
    distance: 240,
  },
  {
    id: "r-8",
    userId: "u-1",
    workplaceId: "w-3",
    type: "DEPARTURE",
    daysBack: 3,
    time: "14:44",
    distance: 110,
  },
  {
    id: "r-9",
    userId: "u-1",
    workplaceId: "w-4",
    type: "ARRIVAL",
    daysBack: 4,
    time: "07:55",
    distance: 420,
  },
  {
    id: "r-10",
    userId: "u-1",
    workplaceId: "w-4",
    type: "DEPARTURE",
    daysBack: 4,
    time: "14:30",
    distance: null,
  },
];

/**
 * Určí výsledek ověření polohy stejně, jak to bude dělat backend:
 * bez souřadnic je záznam neověřený, jinak rozhoduje povolený okruh.
 */
function verify(
  distance: number | null,
  allowedRadius: number,
): VerificationResult {
  if (distance === null) return "NO_LOCATION";
  return distance <= allowedRadius ? "OK" : "TOO_FAR";
}

/** Doplní k zjednodušenému zápisu jména, souřadnice a výsledek ověření. */
function toRecord(seed: RecordSeed): AttendanceRecord {
  const user = findUser(DEFAULT_USERS, seed.userId)!;
  const workplace = findWorkplace(DEFAULT_WORKPLACES, seed.workplaceId)!;
  const hasLocation = seed.distance !== null;

  return {
    id: seed.id,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    workplaceId: workplace.id,
    workplaceName: workplace.name,
    type: seed.type,
    createdAt: workdayIso(seed.daysBack, seed.time),
    latitude: hasLocation
      ? Number(
          (workplace.latitude + seed.distance! / METERS_PER_DEGREE).toFixed(6),
        )
      : null,
    longitude: hasLocation ? workplace.longitude : null,
    distance: seed.distance,
    verification: verify(seed.distance, workplace.allowedRadius),
  };
}

/**
 * Vyrobí ukázkové záznamy vždy k aktuálnímu datu, aby přehled „dnešní
 * docházky" nezůstal prázdný. Skládají se čerstvě při každém spuštění.
 */
export function createSeedRecords(): AttendanceRecord[] {
  return SEEDS.map(toRecord);
}
