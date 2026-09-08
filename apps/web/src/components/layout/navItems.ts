import type { LucideIcon } from "lucide-react";
import { ClipboardList, House, MapPin, ScrollText, Users } from "lucide-react";
import type { Role } from "@praxio/shared";

import { canAccessAdmin, canManageUsers } from "@/lib/permissions";

/** Jedna položka navigace. */
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Odkazy, které vidí každý přihlášený uživatel. */
export const STUDENT_LINKS: NavItem[] = [
  { href: "/", label: "Přehled", icon: House },
  { href: "/moje-zaznamy", label: "Moje záznamy", icon: ClipboardList },
];

/** Odkazy do administrace pro učitele a admina. */
const ADMIN_LINKS: NavItem[] = [
  { href: "/admin", label: "Souhrn", icon: ScrollText },
  { href: "/admin/zaznamy", label: "Záznamy docházky", icon: ClipboardList },
  { href: "/admin/pracoviste", label: "Pracoviště", icon: MapPin },
];

/** Odkaz jen pro admina. */
const OWNER_LINKS: NavItem[] = [
  { href: "/admin/uzivatele", label: "Uživatelé", icon: Users },
];

/** Poskládá seznam odkazů administrace podle role. */
export function getAdminItems(role: Role): NavItem[] {
  if (!canAccessAdmin(role)) return [];
  return canManageUsers(role) ? [...ADMIN_LINKS, ...OWNER_LINKS] : ADMIN_LINKS;
}

/** Odkaz je aktivní, pokud odpovídá aktuální adrese. */
export function isActive(pathname: string, href: string): boolean {
  // Souhrn a Přehled porovnáváme přesně, jinak by svítily i na podstránkách.
  if (href === "/admin") return pathname === "/admin";
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
