"use client";

import { UsersTable } from "@/components/admin/UsersTable";
import { RoleGuard } from "@/components/layout/RoleGuard";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHeader } from "@/components/ui/PageHeader";
import { canManageUsers } from "@/lib/permissions";
import { useSession } from "@/lib/session";
import { useStore } from "@/lib/store";

/** Seznam uživatelů a přidělování rolí. Vidí ho pouze administrátor. */
export default function UsersPage() {
  const { user } = useSession();
  const { users, updateUserRole } = useStore();

  return (
    <RoleGuard allow={canManageUsers} allowedFor="administrátory">
      <FadeIn>
        <PageHeader
          description="Nový účet vzniká vždy v roli žáka. Učitele z něj uděláte změnou role."
          highlight="a role"
          title="Uživatelé"
        />
      </FadeIn>
      <FadeIn delay={0.06}>
        <UsersTable
          currentUserId={user?.id ?? ""}
          onRoleChange={updateUserRole}
          users={users}
        />
      </FadeIn>
    </RoleGuard>
  );
}
