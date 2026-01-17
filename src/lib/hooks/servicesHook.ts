import { useState, useCallback } from 'react';
import { servicesService } from '@/lib/api/servicesService';
import { Service, UseServiceReturn, ServicePayload } from '@/types/services';
import { handleError } from '@/utils/utils';
import Swal from 'sweetalert2';
import { useAuth } from "./authHook"

export function useServices(): UseServiceReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getSession, logOut } = useAuth()

  const getServices = useCallback(async (): Promise<Service[] | null> => {
    setLoading(true);
    setError(null);

    try {
      const services = await servicesService.getServices();
      return services;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al obtener servicios');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createService = async (
    data: ServicePayload
  ): Promise<Service | null> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return null
      }

      const createdService = await servicesService.createService(data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Servicio creado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return createdService;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al crear servicio');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (
    id: number,
    data: ServicePayload
  ): Promise<Service | null> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return null
      }

      const updatedService = await servicesService.updateService(id, data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Servicio editado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return updatedService;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al editar servicio');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: number): Promise<Service | null> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return null
      }

      const deletedService = await servicesService.deleteService(id);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Servicio eliminado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return deletedService;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al eliminar servicio');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getServices,
    createService,
    updateService,
    deleteService,
  };
}
