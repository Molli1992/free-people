import * as companiesServices from './companiesServices';
import { CompanyPayload } from '@/types/companies';

export const getCompanies = async () => {
  const companies = await companiesServices.getFullCompanies();
  return companies;
};

export const addCompany = async (data: CompanyPayload) => {
  if (!data.name || !data.image) {
    throw new Error('Faltan datos obligatorios');
  }

  const createdCompany = await companiesServices.createCompany(data);
  const newCompany = await companiesServices.getCompanyById(
    createdCompany.insertId
  );

  if (!newCompany) {
    throw new Error('Error recuperando la compañía creada');
  }

  return {
    message: 'Compañía creada correctamente.',
    data: newCompany,
  };
};

export const updateCompany = async (id: number, data: CompanyPayload) => {
  const result = await companiesServices.updateCompany(id, data);

  if (result && result.affectedRows === 0) {
    throw new Error('Compañía no encontrada o no hubo cambios');
  }

  const updatedCompany = await companiesServices.getCompanyById(id);

  if (!updatedCompany) {
    throw new Error('Error recuperando la Compañía actualizada');
  }

  return {
    message: 'Compañía actualizada correctamente',
    data: updatedCompany,
  };
};

export const deleteCompany = async (id: number) => {
  const result = await companiesServices.deleteCompany(id);
  if (result.affectedRows === 0) throw new Error('Compañía no encontrada');

  return { message: 'Compañía eliminada correctamente' };
};
