import { create } from 'zustand';
import { ProjectsStoreProps } from '@/types/stores';

export const useProjectsStore = create<ProjectsStoreProps>((set, get) => ({
  projects: [],
  isDataLoad: false,

  setProjects: (data) =>
    set({
      projects: data,
      isDataLoad: true,
    }),

  addProjectsToStore: (project) => {
    const { projects } = get();
    const newData = [...projects, project];

    set({ projects: newData });
  },

  updateProjectsInStore: (updatedProject) => {
    const { projects } = get();
    const newData = projects.map((project) => {
      return project.id === updatedProject.id ? updatedProject : project;
    });

    set({ projects: newData });
  },

  removeProjectsFromStore: (id) => {
    const { projects } = get();
    const newData = projects.filter((project) => {
      return project.id !== id;
    });

    set({ projects: newData });
  },
}));
