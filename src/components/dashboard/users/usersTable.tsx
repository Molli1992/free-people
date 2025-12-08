'use client';

import { useState, useEffect, useMemo } from 'react';
import DataTable from '@/components/table/dataTable';
import { useUsers } from '@/lib/hooks/usersHooks';
import { User } from '@/types/users';
import { usersColumns } from '@/components/table/columns/userColumns';

export default function UsersTable() {
  const { getUsersList, loading, toggleUserActive } = useUsers();
  const [users, setUsers] = useState<User[]>([]);

  const columns = useMemo(
    () => usersColumns(toggleUserActive, users, setUsers),
    [toggleUserActive, users, setUsers]
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsersList();

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
