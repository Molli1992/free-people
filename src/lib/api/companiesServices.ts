import { Company, CompanyPayload } from '@/types/companies';
import axios from 'axios';

export const companiesServices = {
  /**
   * Gets the list of companies.
   * @returns Promise<Company[]>
   */
  getCompanies: async (): Promise<Company[]> => {
    const response = await axios.get('/api/companies');
    return response.data;
  },

  /**
   * Create a Company.
   * @param data Data to create new Company
   * @returns Promise<Company>
   */
  createCompany: async (data: CompanyPayload): Promise<Company> => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('image', data.image);

    const response = await axios.post(`/api/companies`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  /**
   * Update a Company.
   * @param id Company ID
   * @param data Data to update
   * @returns Promise<Company>
   */
  updateCompany: async (id: number, data: CompanyPayload): Promise<Company> => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('image', data.image);

    const response = await axios.put(`/api/companies/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  /**
   * Remove a Company.
   * @param id Company ID
   * @returns Promise<Company>
   */
  deleteCompany: async (id: number): Promise<Company> => {
    const response = await axios.delete(`/api/companies/${id}`);
    return response.data;
  },
};
