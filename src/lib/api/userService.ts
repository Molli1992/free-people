import { User, UserPayload } from '@/types/users';
import axios from 'axios';

export const userService = {
  /**
   * Obtiene la lista de usuarios.
   * @returns Promise<User[]>
   */
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get('/api/users');
    return response.data;
  },

  /**
   * Actualiza un usuario (usado para el toggle de isActive).
   * @param id ID del usuario
   * @param data Datos a actualizar (ej: { isActive: boolean })
   * @returns Promise<User>
   */
  updateUser: async (id: string, data: UserPayload): Promise<User> => {
    const response = await axios.put(`/api/users/${id}`, data);
    return response.data.data;
  },
};
