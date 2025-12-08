import { useState } from 'react';
import { userService } from '@/lib/api/userService';
import { UseUsersReturn, User } from '@/types/users';
import { handleError } from '@/utils/utils';
import Swal from 'sweetalert2';

export function useUsers(): UseUsersReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    userId: string,
    isActive: boolean
  ): Promise<User | undefined> => {
    setLoading(true);
    setError(null);

    try {
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

  return {
    loading,
    error,
    getUsersList,
    toggleUserActive,
  };
}
