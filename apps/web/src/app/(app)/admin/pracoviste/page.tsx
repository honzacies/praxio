"use client";

import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHeader } from "@/components/ui/PageHeader";
import { useWorkplacesPage } from "@/components/workplace/useWorkplacesPage";
import { WorkplaceFormModal } from "@/components/workplace/WorkplaceFormModal";
import { WorkplacesTable } from "@/components/workplace/WorkplacesTable";
import { WorkplacesToolbar } from "@/components/workplace/WorkplacesToolbar";
import { canCreateWorkplaces } from "@/lib/permissions";
import { useSession } from "@/lib/session";
import { useStore } from "@/lib/store";

/** Správa pracovišť – hledání, řazení, zakládání, úprava a mazání. */
export default function WorkplacesPage() {
  const { user } = useSession();
  const { users, removeWorkplace } = useStore();
  // Hook musí běžet při každém vykreslení, proto ho nesmíme volat
  // až za podmínkou. Bez přihlášení mu předáme prázdné ID.
  const page = useWorkplacesPage(user?.id ?? "");

  if (!user) return null;

  return (
    <>
      <FadeIn>
        <PageHeader
          description="Místa, kde si žáci odbíjí příchod a odchod. Upravovat můžete ta, která jste založili."
          highlight="pracovišť"
          title="Správa"
        />
      </FadeIn>

      <FadeIn delay={0.06}>
        <WorkplacesToolbar
          canCreate={canCreateWorkplaces(user.role)}
          filters={page.filters}
          onChange={page.changeFilters}
          onCreate={() => page.openForm()}
        />

        <WorkplacesTable
          currentUser={user}
          onDelete={page.openDelete}
          onEdit={page.openForm}
          onSortChange={page.setSort}
          sortDescriptor={page.sort}
          users={users}
          workplaces={page.visible}
        />
      </FadeIn>

      {/* Klíč zajistí, že se formulář při každém otevření předvyplní znovu. */}
      <WorkplaceFormModal
        key={page.edited ? page.edited.id : "new"}
        currentUserId={user.id}
        edited={page.edited}
        onSave={page.save}
        state={page.formState}
      />

      <ConfirmModal
        confirmLabel="Smazat pracoviště"
        description={`Pracoviště „${page.deleted?.name}" zmizí ze seznamu a jeho QR kód přestane fungovat. Už uložené záznamy docházky zůstanou zachované.`}
        onConfirm={() => page.deleted && removeWorkplace(page.deleted.id)}
        state={page.deleteState}
        title="Smazat pracoviště?"
      />
    </>
  );
}
