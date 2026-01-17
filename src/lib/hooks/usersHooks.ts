import { useState } from 'react';
import { userService } from '@/lib/api/userService';
import { UseUsersReturn, User } from '@/types/users';
import { handleError } from '@/utils/utils';
import Swal from 'sweetalert2';
import { useAuth } from "./authHook"

export function useUsers(): UseUsersReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getSession, logOut } = useAuth()

  const getUsersList = async (): Promise<User[]> => {
    setLoading(true);
    setError(null);

    try {
      const users = await userService.getUsers();
      return users;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al obtener usuarios');
      setError(errorReturn);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const toggleUserActive = async (
    userId: number,
    isActive: boolean
  ): Promise<User | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return
      }

      const updatedUser = await userService.updateUser(userId, { isActive });

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Usuario actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return updatedUser;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al actualizar usuario');
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number): Promise<User | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return
      }

      const deletedUser = await userService.deleteUser(id);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Usuario eliminado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return deletedUser;
    } catch (err) {
      const errorReturn = handleError(
        err,
        'Error al eliminar Usuario'
      );
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    error,
    getUsersList,
    toggleUserActive,
    deleteUser,
  };
}
