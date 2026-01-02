import * as servicesServices from './servicesServices';
import { ServicePayload } from '@/types/services';

export const getServices = async () => {
  const services = await servicesServices.getFullServices();
  return services;
};

export const addService = async (data: ServicePayload) => {
  if (!data.name || !data.image || !data.description) {
    throw new Error('Faltan datos obligatorios');
  }

  const createdService = await servicesServices.createService(data);
  const newService = await servicesServices.getServiceById(
    createdService.insertId
  );

  if (!newService) {
    throw new Error('Error recuperando el servicio creado');
  }

  return {
    message: 'Servicio creado correctamente.',
    data: newService,
  };
};

export const updateService = async (id: number, data: ServicePayload) => {
  const result = await servicesServices.updateService(id, data);

  if (result && result.affectedRows === 0) {
    throw new Error('Servicio no encontrado o no hubo cambios');
  }

  const updatedService = await servicesServices.getServiceById(id);

  if (!updatedService) {
    throw new Error('Error recuperando el servicio actualizado');
  }

  return {
    message: 'Servicio actualizado correctamente',
    data: updatedService,
  };
};

export const deleteService = async (id: number) => {
  const result = await servicesServices.deleteService(id);
  if (result.affectedRows === 0) throw new Error('Servicio no encontrado');

  return { message: 'Servicio eliminado correctamente' };
};
