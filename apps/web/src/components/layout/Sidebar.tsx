"use client";

import Link from "next/link";
import type { User } from "@praxio/shared";

import { LogoWithName } from "@/components/ui/Logo";

import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";

/**
 * Postranní panel s navigací. Zobrazuje se jen na širších obrazovkách
 * (třída hidden md:flex), na mobilu ho nahradí lišta nahoře.
 */
export function Sidebar({ user }: { user: User }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface-secondary md:sticky md:top-0 md:flex md:h-dvh">
      <div className="px-4 py-5">
        <Link className="inline-flex" href="/">
          <LogoWithName size={26} />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <NavLinks role={user.role} />
      </div>

      <div className="border-t border-border p-3">
        <UserMenu user={user} />
      </div>
    </aside>
  );
}
