"use client";

import { ROLE_LABELS } from "@praxio/shared";

import { DEFAULT_USERS } from "@/data/users";
import { Avatar, AvatarFallback, AvatarImage } from "@heroui/react";

/**
 * Seznam ukázkových účtů. Nahrazuje výběr školního Google účtu,
 * dokud nemáme napojené skutečné přihlášení.
 */
export function DemoAccountList({
  onSelect,
}: {
  onSelect: (userId: string) => void;
}) {
  return (
    <ul>
      {DEFAULT_USERS.map((user) => (
        <li key={user.id}>
          <button
            className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition-colors hover:bg-accent/10 cursor-pointer"
            onClick={() => onSelect(user.id)}
            type="button"
          >
            <Avatar color="accent">
              {/* Jan Cieslar -> JC */}
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((part) => {
                    return part.split("")[0];
                  })
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">
                {user.name}
              </span>
              <span className="block truncate text-xs text-muted">
                {user.email}
              </span>
            </span>
            <span className="shrink-0 text-xs text-muted">
              {ROLE_LABELS[user.role]}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
