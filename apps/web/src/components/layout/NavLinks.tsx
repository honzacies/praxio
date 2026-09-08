"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@praxio/shared";

import { getAdminItems, isActive, STUDENT_LINKS } from "./navItems";
import type { NavItem } from "./navItems";

interface NavLinksProps {
  role: Role;
  /** Na mobilu vykreslíme odkazy vedle sebe místo pod sebou. */
  isHorizontal?: boolean;
}

export function NavLinks({ role, isHorizontal = false }: NavLinksProps) {
  const pathname = usePathname();
  const adminItems = getAdminItems(role);

  /** Vykreslí jeden odkaz i s ikonou a zvýrazněním aktivní stránky. */
  function renderItem(item: NavItem) {
    const Icon = item.icon;
    const active = isActive(pathname, item.href);

    return (
      <Link
        key={item.href}
        className={`flex shrink-0 items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
          active
            ? "bg-surface font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            : "text-muted hover:bg-surface-tertiary hover:text-foreground"
        }`}
        href={item.href}
      >
        <Icon className={`size-4 ${active ? "text-accent" : ""}`} />
        {item.label}
      </Link>
    );
  }

  if (isHorizontal) {
    return (
      <nav className="flex items-center gap-1 overflow-x-auto">
        {[...STUDENT_LINKS, ...adminItems].map(renderItem)}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-0.5">
      {STUDENT_LINKS.map(renderItem)}

      {adminItems.length > 0 ? (
        <>
          <p className="mt-6 mb-1 px-2.5 text-xs font-medium tracking-wide text-muted uppercase">
            Správa
          </p>
          {adminItems.map(renderItem)}
        </>
      ) : null}
    </nav>
  );
}
