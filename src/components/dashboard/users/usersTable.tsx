'use client';

import { useEffect } from 'react';
import DataTable from '@/components/table/dataTable';
import { useUsers } from '@/lib/hooks/usersHooks';
import { usersColumns } from '@/components/table/columns/userColumns';
import { useUsersStore } from '@/zustand/usersStore';

export default function UsersTable() {
  const { getUsersList, loading, toggleUserActive } = useUsers();
  const { users, setUsers, isDataLoad, updateUserInStore } = useUsersStore();
  const columns = usersColumns(toggleUserActive, updateUserInStore);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isDataLoad) return;
      const usersList = await getUsersList();
      console.log('1');

      if (usersList) {
        setUsers(usersList);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1>Tabla de Usuarios</h1>
      <DataTable columns={columns} data={users} isLoading={loading} />
    </div>
  );
}
