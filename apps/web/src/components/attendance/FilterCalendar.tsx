"use client";

import { Button, Calendar } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CalendarDate, DateValue } from "@internationalized/date";

interface FilterCalendarProps {
  /** Vybraný den, nebo null když se filtruje přes všechny dny. */
  value: CalendarDate | null;
  onChange: (date: DateValue) => void;
  onClear: () => void;
}

/** Měsíční kalendář uvnitř vyskakovacího okna u přepínače dne. */
export function FilterCalendar({
  value,
  onChange,
  onClear,
}: FilterCalendarProps) {
  return (
    <>
      <Calendar aria-label="Výběr dne" onChange={onChange} value={value}>
        <Calendar.Header>
          <Calendar.NavButton slot="previous">
            <ChevronLeft className="size-4" />
          </Calendar.NavButton>
          <Calendar.Heading />
          <Calendar.NavButton slot="next">
            <ChevronRight className="size-4" />
          </Calendar.NavButton>
        </Calendar.Header>

        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>
            {(date) => <Calendar.Cell date={date} />}
          </Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>

      <Button
        className="mt-2"
        fullWidth
        onPress={onClear}
        size="sm"
        variant="ghost"
      >
        Zobrazit všechny dny
      </Button>
    </>
  );
}
