import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { RecordType } from "@praxio/shared";
import { RECORD_TYPE_LABELS } from "@praxio/shared";

/**
 * Popisek "Příchod" / "Odchod" se šipkou.
 * Místo barevné bubliny používáme jen ikonu a text – v dlouhé tabulce
 * je to klidnější a barvy zůstanou volné pro upozornění.
 */
export function RecordTypeLabel({ type }: { type: RecordType }) {
  const isArrival = type === "ARRIVAL";
  const Icon = isArrival ? ArrowDownLeft : ArrowUpRight;

  return (
    <span className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap">
      <Icon
        className={`size-3.5 ${isArrival ? "text-success" : "text-muted"}`}
      />
      {RECORD_TYPE_LABELS[type]}
    </span>
  );
}
