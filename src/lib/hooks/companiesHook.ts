import { useState, useCallback } from 'react';
import { companiesServices } from '@/lib/api/companiesServices';
import { Company, UseCompanyReturn, CompanyPayload } from '@/types/companies';
import { handleError } from '@/utils/utils';
import Swal from 'sweetalert2';
import { useAuth } from "./authHook"

export function useCompanies(): UseCompanyReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getSession, logOut } = useAuth()

  const getCompanies = useCallback(async (): Promise<Company[]> => {
    setLoading(true);
    setError(null);

    try {
      const companies = await companiesServices.getCompanies();
      return companies;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al obtener compañía');
      setError(errorReturn);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createCompany = async (
    data: CompanyPayload
  ): Promise<Company | null> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return null
      }

      const createdCompany = await companiesServices.createCompany(data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Compañía creada correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return createdCompany;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al crear compañía');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (
    id: number,
    data: CompanyPayload
  ): Promise<Company | null> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return null
      }

      const updatedCompany = await companiesServices.updateCompany(id, data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Compañía editada correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return updatedCompany;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al editar compañía');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id: number): Promise<Company | null> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return null
      }

      const deletedCompany = await companiesServices.deleteCompany(id);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Compañía eliminada correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return deletedCompany;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al eliminar la compañía');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  };
}
