"use client";

import Link from "next/link";
import type { User } from "@praxio/shared";

import { LogoWithName } from "@/components/ui/Logo";

import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";

/**
 * Lišta pro mobil a tablet. Na širší obrazovce se schová (md:hidden),
 * protože tam navigaci přebírá postranní panel.
 */
export function MobileHeader({ user }: { user: User }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <Link href="/">
          <LogoWithName size={24} />
        </Link>
        <UserMenu compact user={user} />
      </div>

      <div className="px-2 pb-2">
        <NavLinks isHorizontal role={user.role} />
      </div>
    </header>
  );
}
