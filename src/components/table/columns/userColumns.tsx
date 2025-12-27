'use client';

import { ColumnDef } from '@tanstack/react-table';
import { createSortableHeader } from '@/components/table/dataTable';
import { User } from '@/types/users';
import { Switch } from '@/components/switchs/primarySwitch';

/**
 * Function that creates the columns of the user table.
 * @param toggleUserActive - Function to toggle the active/inactive state of the user.
 * @param users - User state to force re-rendering when state changes.
 * @param setUsers - User status setter.
 * @returns An array of ColumnDef<User>.
 */
export const usersColumns = (
  toggleUserActive: (
    userId: string,
    isActive: boolean
  ) => Promise<User | undefined>,
  updateUserInStore: (teamMember: User) => void
): ColumnDef<User>[] => {
  const handleToggle = async (userId: string, isActive: boolean) => {
    const updatedUser = await toggleUserActive(userId, isActive);

    if (updatedUser) {
      updateUserInStore(updatedUser);
    }
  };

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
