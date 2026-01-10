import { create } from 'zustand';
import { ProjectsDataStoreProps } from '@/types/stores';

export const useProjectsDataStore = create<ProjectsDataStoreProps>((set) => ({
  projects: [],
  isDataLoad: false,

  setProjects: (data) =>
    set({
      projects: data,
      isDataLoad: true,
    }),
}));
