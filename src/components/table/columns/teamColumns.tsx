'use client';

import { ColumnDef } from '@tanstack/react-table';
import { createSortableHeader } from '@/components/table/dataTable';
import { Team } from '@/types/team';
import { FaTrashAlt } from 'react-icons/fa';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';

/**
 * Function that creates the columns of the team table.
 * @returns An array of ColumnDef<Team>.
 */
export const teamColumns = (
  onEdit: (id: number) => void,
  onDelete: (id: number) => Promise<void>
): ColumnDef<Team>[] => {
  return [
    {
      header: 'Num',
      cell: ({ row }) => (
        <div className="flex justify-start font-medium text-center">
          {row.index + 1}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => createSortableHeader(column, 'Nombre'),
    },
    {
      accessorKey: 'profession',
      header: ({ column }) => createSortableHeader(column, 'Profesión'),
    },
    {
      id: 'edit-action',
      header: 'Editar',
      cell: ({ row }) => {
        const teamMemberId = Number(row.original.id);

        return (
          <div className="flex justify-start">
            <BlackButton
              value="Editar"
              onClick={() => onEdit(teamMemberId)}
              type="button"
              className="w-fit"
            />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      id: 'delete-action',
      header: 'Eliminar',
      cell: ({ row }) => {
        const teamMemberId = Number(row.original.id);

        return (
          <div className="flex justify-start">
            <GrayButton
              value={<FaTrashAlt className="h-5 w-5" />}
              onClick={() => onDelete(teamMemberId)}
              className="w-fit"
            />
          </div>
        );
      },
      enableSorting: false,
    },
  ];
};
