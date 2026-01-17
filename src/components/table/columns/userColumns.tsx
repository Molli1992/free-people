'use client';

import { ColumnDef } from '@tanstack/react-table';
import { createSortableHeader } from '@/components/table/dataTable';
import { User } from '@/types/users';
import { Switch } from '@/components/switchs/primarySwitch';
import GrayButton from '@/components/buttons/grayButton';
import { FaTrashAlt } from 'react-icons/fa';

/**
 * Function that creates the columns of the user table.
 * @param toggleUserActive - Function to toggle the active/inactive state of the user.
 * @param users - User state to force re-rendering when state changes.
 * @param setUsers - User status setter.
 * @returns An array of ColumnDef<User>.
 */
export const usersColumns = (
  toggleUserActive: (
    userId: number,
    isActive: boolean
  ) => Promise<User | undefined>,
  updateUserInStore: (user: User) => void,
  deleteUser: (id: number) => Promise<User | undefined>,
  removeUserFromStore: (id: number) => void,
): ColumnDef<User>[] => {

  const handleToggle = async (userId: number, isActive: boolean) => {
    const updatedUser = await toggleUserActive(userId, isActive);

    if (updatedUser) {
      updateUserInStore(updatedUser);
    }
  };

  const onDelete = async (userId: number) => {
    await deleteUser(userId);
    removeUserFromStore(userId);
  }

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
      cell: ({ row }) => {
        const userId = Number(row.original.id);

        return (
          <Switch
            checked={row.original.isActive as boolean}
            onChange={(checked) =>
              handleToggle(userId, checked)
            }
          />
        )
      }
    },
    {
      id: 'delete-action',
      header: 'Eliminar',
      cell: ({ row }) => {
        const userId = Number(row.original.id);

        return (
          <div className="flex justify-start">
            <GrayButton
              value={<FaTrashAlt className="h-5 w-5" />}
              onClick={() => onDelete(userId)}
              className="w-fit"
            />
          </div>
        );
      },
      enableSorting: false,
    },
  ];
};
