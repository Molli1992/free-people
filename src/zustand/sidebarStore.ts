import { create } from 'zustand';
import { SidebarStoreProps } from '@/types/stores';

export const useSidebarStore = create<SidebarStoreProps>((set) => ({
  isSidebarOpen: false,

  setIsSidebarOpen: (boolean) =>
    set({
      isSidebarOpen: boolean,
    }),
}));
