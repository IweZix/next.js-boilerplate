import { Table } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface DataTableRow {
  id: string;
  cells: ReactNode[];
}

export interface DataTableProps {
  headers: string[];
  rows: DataTableRow[];
}

export default function DataTable({ headers, rows }: DataTableProps) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {headers.map((header) => (
            <Table.ColumnHeader key={header}>{header}</Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            {row.cells.map((cell, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: cells are positional, matched to `headers` by index
              <Table.Cell key={index}>{cell}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
