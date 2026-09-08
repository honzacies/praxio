"use client";

import { Table } from "@heroui/react";
import type { SortDescriptor } from "react-aria-components";
import type { User, Workplace } from "@praxio/shared";

import { NoData } from "@/components/ui/NoData";
import { StatusDot } from "@/components/ui/StatusDot";
import { getUserName } from "@/data/users";

import { WorkplaceRowActions } from "./WorkplaceRowActions";

interface WorkplacesTableProps {
  workplaces: Workplace[];
  users: User[];
  currentUser: User;
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  onEdit: (workplace: Workplace) => void;
  onDelete: (workplace: Workplace) => void;
}

export function WorkplacesTable({
  workplaces,
  users,
  currentUser,
  sortDescriptor,
  onSortChange,
  onEdit,
  onDelete,
}: WorkplacesTableProps) {
  if (workplaces.length === 0) {
    return <NoData message="Žádné pracoviště neodpovídá hledání." />;
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Seznam pracovišť"
          onSortChange={onSortChange}
          sortDescriptor={sortDescriptor}
        >
          <Table.Header>
            <Table.Column allowsSorting id="name" isRowHeader>
              Název
            </Table.Column>
            <Table.Column allowsSorting id="address">
              Adresa
            </Table.Column>
            <Table.Column allowsSorting id="allowedRadius">
              Okruh
            </Table.Column>
            <Table.Column allowsSorting id="isActive">
              Stav
            </Table.Column>
            <Table.Column>Založil</Table.Column>
            <Table.Column>Kód</Table.Column>
            <Table.Column>Akce</Table.Column>
          </Table.Header>

          <Table.Body items={workplaces}>
            {(workplace) => (
              <Table.Row id={workplace.id}>
                <Table.Cell className="font-medium">
                  {workplace.name}
                </Table.Cell>
                <Table.Cell className="text-muted">
                  {workplace.address}
                </Table.Cell>
                <Table.Cell className="tabular-nums">
                  {workplace.allowedRadius} m
                </Table.Cell>
                <Table.Cell>
                  <StatusDot tone={workplace.isActive ? "success" : "neutral"}>
                    {workplace.isActive ? "Aktivní" : "Neaktivní"}
                  </StatusDot>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {getUserName(users, workplace.createdById)}
                </Table.Cell>
                <Table.Cell className="font-mono text-xs">
                  {workplace.qrCode}
                </Table.Cell>
                <Table.Cell>
                  <WorkplaceRowActions
                    currentUser={currentUser}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    workplace={workplace}
                  />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
