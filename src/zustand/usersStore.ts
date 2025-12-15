import { create } from 'zustand';
import { UsersStoreProps } from '@/types/stores';

export const useUsersStore = create<UsersStoreProps>((set, get) => ({
  users: [],
  isDataLoad: false,

  setUsers: (data) =>
    set({
      users: data,
      isDataLoad: true,
    }),

  updateUserInStore: (updatedUser) => {
    const { users } = get();
    const newData = users.map((user) => {
      return user.id === updatedUser.id ? updatedUser : user;
    });

    set({ users: newData });
  },
}));
