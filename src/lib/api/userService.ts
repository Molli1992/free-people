import { User, UserPayload } from '@/types/users';
import axios from 'axios';

export const userService = {
  /**
   * Gets the list of users.
   * @returns Promise<User[]>
   */
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get('/api/users');
    return response.data;
  },

  /**
   * Update a user (used for the isActive toggle).
   * @param id User ID
   * @param data Data to update (ex: { isActive: boolean })
   * @returns Promise<User>
   */
  updateUser: async (id: string, data: UserPayload): Promise<User> => {
    const response = await axios.put(`/api/users/${id}`, data);
    return response.data.data;
  },
};
