import type { VerificationResult } from "@praxio/shared";
import { VERIFICATION_LABELS } from "@praxio/shared";

import { StatusDot } from "@/components/ui/StatusDot";
import type { StatusTone } from "@/components/ui/StatusDot";

/** Ke každému výsledku ověření patří jiná barva tečky. */
const TONES: Record<VerificationResult, StatusTone> = {
  OK: "success",
  TOO_FAR: "danger",
  NO_LOCATION: "warning",
};

/** Výsledek ověření polohy jako barevná tečka s popiskem. */
export function VerificationLabel({ result }: { result: VerificationResult }) {
  return (
    <StatusDot tone={TONES[result]}>{VERIFICATION_LABELS[result]}</StatusDot>
  );
}
