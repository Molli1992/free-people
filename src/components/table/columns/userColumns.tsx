'use client';

import { ColumnDef } from '@tanstack/react-table';
import { createSortableHeader } from '@/components/table/dataTable';
import { User } from '@/types/users';
import { Switch } from '@/components/switchs/primarySwitch';
import { Dispatch, SetStateAction } from 'react';

/**
 * Función que crea las columnas de la tabla de usuarios.
 * @param toggleUserActive - Función para alternar el estado activo/inactivo del usuario.
 * @param users - Estado de los usuarios para forzar la re-renderización al cambiar el estado.
 * @param setUsers - Setter del estado de los usuarios.
 * @returns Un array de ColumnDef<User>.
 */
export const usersColumns = (
  toggleUserActive: (
    userId: string,
    isActive: boolean
  ) => Promise<User | undefined>,
  users: User[],
  setUsers: Dispatch<SetStateAction<User[]>>
): ColumnDef<User>[] => {
  const handleToggle = async (userId: string, isActive: boolean) => {
    const updatedUser = await toggleUserActive(userId, isActive);

    if (updatedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id.toString() === userId ? updatedUser : user
        )
      );
    }
  };

  return [
    {
      header: 'Num',
      cell: ({ row }) => (
        <div className="font-medium text-center">{row.index + 1}</div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => createSortableHeader(column, 'Nombre'),
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => createSortableHeader(column, 'Apellido'),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => createSortableHeader(column, 'Email'),
    },
    {
      accessorKey: 'isActive',
      header: ({ column }) => createSortableHeader(column, 'Activo'),
      cell: ({ row }) => (
        <Switch
          checked={row.original.isActive}
          onChange={(checked) =>
            handleToggle(row.original.id.toString(), checked)
          }
        />
      ),
    },
  ];
};
