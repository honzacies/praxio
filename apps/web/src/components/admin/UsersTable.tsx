"use client";

import { Table } from "@heroui/react";
import type { Role, User } from "@praxio/shared";
import { ROLE_LABELS } from "@praxio/shared";

import { StatusDot } from "@/components/ui/StatusDot";
import type { StatusTone } from "@/components/ui/StatusDot";
import { formatDate } from "@/lib/format";

import { RoleSelect } from "./RoleSelect";

/** Každá role má svou barvu tečky, ať se v tabulce dobře hledá. */
const ROLE_TONES: Record<Role, StatusTone> = {
  STUDENT: "neutral",
  TEACHER: "accent",
  ADMIN: "success",
};

interface UsersTableProps {
  users: User[];
  /** ID přihlášeného admina – vlastní roli si měnit nemůže. */
  currentUserId: string;
  onRoleChange: (userId: string, role: Role) => void;
}

/** Tabulka uživatelů. Administrátor tu každému přiděluje roli. */
export function UsersTable({
  users,
  currentUserId,
  onRoleChange,
}: UsersTableProps) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Seznam uživatelů">
          <Table.Header>
            <Table.Column isRowHeader>Jméno</Table.Column>
            <Table.Column>E-mail</Table.Column>
            <Table.Column>Třída</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Změnit roli</Table.Column>
            <Table.Column>Vytvořen</Table.Column>
          </Table.Header>

          <Table.Body items={users}>
            {(user) => (
              <Table.Row id={user.id}>
                <Table.Cell className="font-medium">{user.name}</Table.Cell>
                <Table.Cell className="text-muted">{user.email}</Table.Cell>
                <Table.Cell>{user.className ?? "–"}</Table.Cell>
                <Table.Cell>
                  <StatusDot tone={ROLE_TONES[user.role]}>
                    {ROLE_LABELS[user.role]}
                  </StatusDot>
                </Table.Cell>
                <Table.Cell>
                  {user.id === currentUserId ? (
                    <span className="text-sm text-muted">vlastní účet</span>
                  ) : (
                    <RoleSelect
                      onChange={(role) => onRoleChange(user.id, role)}
                      userName={user.name}
                      value={user.role}
                    />
                  )}
                </Table.Cell>
                <Table.Cell className="tabular-nums">
                  {formatDate(user.createdAt)}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
