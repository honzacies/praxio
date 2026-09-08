"use client";

import { Table } from "@heroui/react";

interface RecordsTableHeaderProps {
  showStudent: boolean;
  showDetails: boolean;
  showDetailButton: boolean;
}

/** Hlavička tabulky záznamů. Nepovinné sloupce se přidají podle propů. */
export function RecordsTableHeader({
  showStudent,
  showDetails,
  showDetailButton,
}: RecordsTableHeaderProps) {
  return (
    <Table.Header>
      <Table.Column isRowHeader>Datum</Table.Column>
      <Table.Column>Čas</Table.Column>
      {showStudent ? <Table.Column>Žák</Table.Column> : null}
      {showDetails ? <Table.Column>E-mail</Table.Column> : null}
      <Table.Column>Pracoviště</Table.Column>
      <Table.Column>Typ</Table.Column>
      {showDetails ? <Table.Column>GPS souřadnice</Table.Column> : null}
      <Table.Column>Vzdálenost</Table.Column>
      <Table.Column>Ověření</Table.Column>
      {showDetailButton ? <Table.Column>Detail</Table.Column> : null}
    </Table.Header>
  );
}
