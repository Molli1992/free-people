import { create } from 'zustand';
import { ServicesStoreProps } from '@/types/stores';

export const useServicesStore = create<ServicesStoreProps>((set, get) => ({
  services: [],
  isDataLoad: false,

  setServices: (data) =>
    set({
      services: data,
      isDataLoad: true,
    }),

  addServiceToStore: (service) => {
    const { services } = get();
    const servicesSinDuplicado = services.filter((s) => s.id !== service.id);

    set({ services: [...servicesSinDuplicado, service] });
  },

  updateServiceInStore: (updatedService) => {
    const { services } = get();
    const newData = services.map((service) => {
      return service.id === updatedService.id ? updatedService : service;
    });

    set({ services: newData });
  },

  removeServiceFromStore: (id) => {
    const { services } = get();
    const newData = services.filter((service) => {
      return service.id !== id;
    });

    set({ services: newData });
  },
}));
