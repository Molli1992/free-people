import { useState, useCallback } from 'react';
import { teamService } from '@/lib/api/teamService';
import { Team, UseTeamReturn, TeamPayload } from '@/types/team';
import { handleError } from '@/utils/utils';
import Swal from 'sweetalert2';
import { useAuth } from "./authHook"

export function useTeam(): UseTeamReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getSession, logOut } = useAuth()

  const getTeam = useCallback(async (): Promise<Team[]> => {
    setLoading(true);
    setError(null);

    try {
      const team = await teamService.getTeam();
      return team;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al obtener equipo');
      setError(errorReturn);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createTeamMember = async (
    data: TeamPayload
  ): Promise<Team | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return
      }

      const createdTeamMember = await teamService.createTeamMember(data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Miembro del equipo creado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return createdTeamMember;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al crear miembro del equipo');
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };

  const updateTeamMember = async (
    id: number,
    data: TeamPayload
  ): Promise<Team | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return
      }

      const updatedTeamMember = await teamService.updateTeamMember(id, data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Miembro del equipo editado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return updatedTeamMember;
    } catch (err) {
      const errorReturn = handleError(
        err,
        'Error al editar miembro del equipo'
      );
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeamMember = async (id: number): Promise<Team | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return
      }

      const deletedTeamMember = await teamService.deleteTeamMember(id);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Miembro del equipo eliminado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return deletedTeamMember;
    } catch (err) {
      const errorReturn = handleError(
        err,
        'Error al eliminar miembro del equipo'
      );
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getTeam,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
  };
}
