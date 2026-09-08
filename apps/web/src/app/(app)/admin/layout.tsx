"use client";

import { RoleGuard } from "@/components/layout/RoleGuard";
import { canAccessAdmin } from "@/lib/permissions";

/** Do administrace se dostane jen učitel nebo administrátor. */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allow={canAccessAdmin} allowedFor="učitele a administrátory">
      {children}
    </RoleGuard>
  );
}
