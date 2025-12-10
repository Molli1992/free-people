import * as teamServices from './teamServices';
import { TeamPayload } from '@/types/team';

export const getTeam = async () => {
  const team = await teamServices.getFullTeam();
  return team;
};

export const addTeamMember = async (data: TeamPayload) => {
  if (
    !data.name ||
    !data.profession ||
    !data.image ||
    !data.linkedin ||
    !data.instagram ||
    !data.facebook
  ) {
    throw new Error('Faltan datos obligatorios');
  }

  const createdTeamMember = await teamServices.createMember(data);
  const newMember = await teamServices.getMemberById(
    createdTeamMember.insertId
  );

  return {
    message: 'Miembro del equipo creado correctamente.',
    data: newMember,
  };
};

export const updateTeamMember = async (id: number, data: TeamPayload) => {
  const result = await teamServices.updateMember(id, data);

  if (result && result.affectedRows === 0) {
    throw new Error('Miembro del equipo no encontrado o no hubo cambios');
  }

  const updatedMember = await teamServices.getMemberById(id);

  if (!updatedMember) {
    throw new Error('Error recuperando el miembro del equipo actualizado');
  }

  return {
    message: 'Miembro del equipo actualizado correctamente',
    data: updatedMember,
  };
};

export const deleteTeamMember = async (id: number) => {
  const result = await teamServices.deleteMember(id);
  if (result.affectedRows === 0)
    throw new Error('Miembro del equipo no encontrado');

  return { message: 'Miembro del equipo eliminado correctamente' };
};
