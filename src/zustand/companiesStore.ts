import { create } from 'zustand';
import { CompaniesStoreProps } from '@/types/stores';

export const useCompaniesStore = create<CompaniesStoreProps>((set, get) => ({
  companies: [],
  isDataLoad: false,

  setCompanies: (data) =>
    set({
      companies: data,
      isDataLoad: true,
    }),

  addCompaniesToStore: (company) => {
    const { companies } = get();
    const newData = [...companies, company];

    set({ companies: newData });
  },

  updateCompaniesInStore: (updatedCompany) => {
    const { companies } = get();
    const newData = companies.map((company) => {
      return company.id === updatedCompany.id ? updatedCompany : company;
    });

    set({ companies: newData });
  },

  removeCompaniesFromStore: (id) => {
    const { companies } = get();
    const newData = companies.filter((company) => {
      return company.id !== id;
    });

    set({ companies: newData });
  },
}));
