import { create } from 'zustand';
import { StoreSidebarStoreProps } from '@/types/ui';

export const useSidebarStore = create<StoreSidebarStoreProps>((set) => ({
  isSidebarOpen: false,

  setIsSidebarOpen: (boolean) =>
    set({
      isSidebarOpen: boolean,
    }),
}));
