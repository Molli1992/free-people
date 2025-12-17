'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/table/dataTable';
import { useTeam } from '@/lib/hooks/teamHook';
import { teamColumns } from '@/components/table/columns/teamColumns';
import { useTeamStore } from '@/zustand/teamStore';
import { Team } from '@/types/team';
import TeamForm from '@/components/dashboard/team/teamForm';

export default function TeamsTable() {
  const { getTeam, loading, deleteTeamMember } = useTeam();
  const { team, setTeam, removeTeamMemberFromStore, isDataLoad } =
    useTeamStore();

  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Team | undefined>(
    undefined
  );

  const openEditForm = (id: number) => {
    const memberToEdit = team.find((member) => member.id === id);
    if (memberToEdit) {
      setEditingMember(memberToEdit);
      setIsOpenEditForm(true);
    }
  };

  const closeEditForm = () => {
    setIsOpenEditForm(false);
    setEditingMember(undefined);
  };

  const deleteMember = async (id: number) => {
    await deleteTeamMember(id);
    removeTeamMemberFromStore(id);
  };

  const columns = teamColumns(openEditForm, deleteMember);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isDataLoad) return;
      const teamList = await getTeam();

      if (teamList) {
        setTeam(teamList);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1>Tabla de Usuarios</h1>
      <DataTable columns={columns} data={team} isLoading={loading} />

      <TeamForm
        isOpen={isOpenEditForm}
        onClose={closeEditForm}
        isEditMode={true}
        teamMember={editingMember}
      />
    </div>
  );
}
