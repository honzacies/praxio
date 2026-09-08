"use client";

import { Avatar, Dropdown } from "@heroui/react";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import type { User } from "@praxio/shared";
import { ROLE_LABELS } from "@praxio/shared";

import { useSession } from "@/lib/session";

/** Z "Jan Cieslar" udělá "JC" pro zobrazení v kolečku avataru. */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface UserMenuProps {
  user: User;
  /** V mobilní liště ukazujeme jen avatar, není tam místo na jméno. */
  compact?: boolean;
}

export function UserMenu({ user, compact = false }: UserMenuProps) {
  const { signOut } = useSession();
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.push("/prihlaseni");
  }

  return (
    <Dropdown>
      <Dropdown.Trigger
        className={`flex items-center gap-2.5 rounded-md p-1.5 transition-colors hover:bg-surface-secondary ${
          compact ? "" : "w-full"
        }`}
      >
        <Avatar size="sm">
          <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
        </Avatar>

        {compact ? null : (
          <>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-sm font-medium">
                {user.name}
              </span>
              <span className="block truncate text-xs text-muted">
                {ROLE_LABELS[user.role]}
              </span>
            </span>
            <ChevronsUpDown className="size-3.5 shrink-0 text-muted" />
          </>
        )}
      </Dropdown.Trigger>

      <Dropdown.Popover placement={compact ? "bottom end" : "top start"}>
        <Dropdown.Menu>
          <Dropdown.Item onAction={handleSignOut}>
            <LogOut className="size-4" />
            Odhlásit se
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
