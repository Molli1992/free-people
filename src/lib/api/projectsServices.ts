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
   * Gets project by ID.
   * @param id project ID
   * @returns Promise<Project>
   */
  getProject: async (id: number): Promise<Project> => {
    const response = await axios.get(`/api/projects/${id}`);
    return response.data;
  },

  /**
   * Create a project.
   * @param data Data to create new project
   * @returns Promise<Project>
   */
  createProject: async (data: ProjectPayload): Promise<Project> => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('type', data.type);
    formData.append('description', data.description);
    formData.append('challenge', data.challenge);
    formData.append('finalView', data.finalView);

    data.images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await axios.post(`/api/projects`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  /**
   * Update a project.
   * @param id project ID
   * @param data Data to update
   * @returns Promise<Project>
   */
  updateProject: async (id: number, data: ProjectPayload): Promise<Project> => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('type', data.type);
    formData.append('description', data.description);
    formData.append('challenge', data.challenge);
    formData.append('finalView', data.finalView);

    data.images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await axios.put(`/api/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
