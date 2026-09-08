"use client";

import { ListBox, Select } from "@heroui/react";

export interface SelectOption {
  id: string;
  label: string;
}

interface FilterSelectProps {
  /**
   * Název filtru. Nezobrazuje se, slouží jako popisek pro odečítač obrazovky –
   * vidoucí uživatel pozná filtr podle vybrané hodnoty ("Do 60 m").
   */
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * Rozbalovací seznam pro filtry nad tabulkou záznamů.
 * Máme ho jako vlastní komponentu, abychom stejné nastavení nemuseli
 * psát u každého filtru znovu.
 */
export function FilterSelect({
  label,
  options,
  value,
  onChange,
}: FilterSelectProps) {
  return (
    <Select
      aria-label={label}
      onSelectionChange={(key) => onChange(String(key))}
      selectedKey={value}
    >
      <Select.Trigger className="h-9 min-w-0 gap-1.5 px-2.5 text-sm">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox items={options}>
          {(option) => (
            <ListBox.Item id={option.id}>{option.label}</ListBox.Item>
          )}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
