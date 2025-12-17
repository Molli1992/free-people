'use client';

import { ColumnDef } from '@tanstack/react-table';
import { createSortableHeader } from '@/components/table/dataTable';
import { Project } from '@/types/projects';
import { FaTrashAlt } from 'react-icons/fa';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';

/**
 * Function that creates the columns of the projects table.
 * @returns An array of ColumnDef<Project>.
 */
export const projectsColumns = (
  onEdit: (id: number) => void,
  onDelete: (id: number) => Promise<void>
): ColumnDef<Project>[] => {
  return [
    {
      header: 'Num',
      cell: ({ row }) => (
        <div className="font-medium text-center">{row.index + 1}</div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => createSortableHeader(column, 'Nombre'),
    },
    {
      accessorKey: 'type',
      header: ({ column }) => createSortableHeader(column, 'Tipo '),
    },
    {
      id: 'edit-action',
      header: 'Edit',
      cell: ({ row }) => {
        const projectId = Number(row.original.id);

        return (
          <div className="flex justify-start">
            <BlackButton
              value="Editar"
              onClick={() => onEdit(projectId)}
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
      header: 'Delete',
      cell: ({ row }) => {
        const projectId = Number(row.original.id);

        return (
          <div className="flex justify-start">
            <GrayButton
              value={<FaTrashAlt className="h-5 w-5" />}
              onClick={() => onDelete(projectId)}
              className="w-fit"
            />
          </div>
        );
      },
      enableSorting: false,
    },
  ];
};
