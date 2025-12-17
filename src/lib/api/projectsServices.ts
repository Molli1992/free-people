import { Project, ProjectPayload } from '@/types/projects';
import axios from 'axios';

export const projectsService = {
  /**
   * Gets the list of projects.
   * @returns Promise<Project[]>
   */
  getAllProjects: async (): Promise<Project[]> => {
    const response = await axios.get('/api/projects');
    return response.data;
  },

  /**
   * Create a project.
   * @param data Data to create new project
   * @returns Promise<Project>
   */
  createProject: async (data: ProjectPayload): Promise<Project> => {
    const response = await axios.post(`/api/projects`, data);
    return response.data.data;
  },

  /**
   * Update a project.
   * @param id project ID
   * @param data Data to update
   * @returns Promise<Project>
   */
  updateProject: async (id: number, data: ProjectPayload): Promise<Project> => {
    const response = await axios.put(`/api/projects/${id}`, data);
    return response.data.data;
  },

  /**
   * Remove a project.
   * @param id project ID
   * @returns Promise<Project>
   */
  deleteProject: async (id: number): Promise<Project> => {
    const response = await axios.delete(`/api/projects/${id}`);
    return response.data;
  },
};
