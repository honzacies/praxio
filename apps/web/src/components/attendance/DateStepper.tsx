"use client";

import { Button, Popover } from "@heroui/react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { parseDate, today } from "@internationalized/date";
import type { CalendarDate } from "@internationalized/date";

import { formatDate } from "@/lib/format";

import { FilterCalendar } from "./FilterCalendar";

interface DateStepperProps {
  /** Vybraný den ve tvaru "2026-09-08", prázdný řetězec = všechny dny. */
  value: string;
  onChange: (date: string) => void;
}

/** Časové pásmo pro výpočet dnešního data. */
const TIME_ZONE = "UTC";

/** Posune datum o zadaný počet dní. Bez vybraného dne začneme dneškem. */
function shiftDate(value: string, days: number): string {
  const start = value ? parseDate(value) : today(TIME_ZONE);
  return start.add({ days }).toString();
}

/**
 * Přepínač dne se šipkami: ‹ 8. 9. 2026 ›
 * Kliknutí na datum otevře kalendář, šipky posunou o den zpět nebo vpřed.
 */
export function DateStepper({ value, onChange }: DateStepperProps) {
  const selected: CalendarDate | null = value ? parseDate(value) : null;

  return (
    <div className="flex items-center gap-0.5">
      <Button
        aria-label="Předchozí den"
        isIconOnly
        onPress={() => onChange(shiftDate(value, -1))}
        size="sm"
        variant="ghost"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <Popover>
        <Button className="min-w-36 gap-2" size="sm" variant="ghost">
          <CalendarDays className="size-4 text-accent" />
          {value ? formatDate(value) : "Všechny dny"}
        </Button>

        <Popover.Content placement="bottom">
          <Popover.Dialog className="p-3">
            <FilterCalendar
              onChange={(date) => onChange(date.toString())}
              onClear={() => onChange("")}
              value={selected}
            />
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <Button
        aria-label="Následující den"
        isIconOnly
        onPress={() => onChange(shiftDate(value, 1))}
        size="sm"
        variant="ghost"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
