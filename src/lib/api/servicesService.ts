import { Service, ServicePayload } from '@/types/services';
import axios from 'axios';

export const servicesService = {
  /**
   * Gets the list of services.
   * @returns Promise<Service[]>
   */
  getServices: async (): Promise<Service[]> => {
    const response = await axios.get('/api/services');
    return response.data;
  },

  /**
   * Create a service.
   * @param data Data to create new services
   * @returns Promise<Service>
   */
  createService: async (data: ServicePayload): Promise<Service> => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('image', data.image);
    formData.append('description', data.description);

    const response = await axios.post(`/api/services`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  /**
   * Update a service.
   * @param id service ID
   * @param data Data to update
   * @returns Promise<Service>
   */
  updateService: async (id: number, data: ServicePayload): Promise<Service> => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('image', data.image);
    formData.append('description', data.description);

    const response = await axios.put(`/api/services/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  /**
   * Remove a service.
   * @param id service ID
   * @returns Promise<Service>
   */
  deleteService: async (id: number): Promise<Service> => {
    const response = await axios.delete(`/api/services/${id}`);
    return response.data;
  },
};
