"use client";

import type { Role } from "@praxio/shared";
import { ROLE_LABELS } from "@praxio/shared";

import { FilterSelect } from "@/components/ui/FilterSelect";
import type { SelectOption } from "@/components/ui/FilterSelect";

const ROLE_OPTIONS: SelectOption[] = [
  { id: "STUDENT", label: ROLE_LABELS.STUDENT },
  { id: "TEACHER", label: ROLE_LABELS.TEACHER },
  { id: "ADMIN", label: ROLE_LABELS.ADMIN },
];

/** Ověří, že vybraná hodnota je opravdu jedna z rolí. */
function toRole(value: string): Role {
  if (value === "TEACHER" || value === "ADMIN") return value;
  return "STUDENT";
}

interface RoleSelectProps {
  userName: string;
  value: Role;
  onChange: (role: Role) => void;
}

/** Rozbalovací seznam, kterým administrátor přiděluje uživateli roli. */
export function RoleSelect({ userName, value, onChange }: RoleSelectProps) {
  return (
    <FilterSelect
      label={`Role uživatele ${userName}`}
      onChange={(next) => onChange(toRole(next))}
      options={ROLE_OPTIONS}
      value={value}
    />
  );
}
