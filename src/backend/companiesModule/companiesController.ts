import * as companiesServices from './companiesServices';
import {
  CompanyPayload,
  CompanyCreateInput,
  CompanyUpdateInput,
} from '@/types/companies';
import cloudinary from '../config/cloudinary';

export const getCompanies = async () => {
  const companies = await companiesServices.getFullCompanies();
  return companies;
};

export const addCompany = async (data: CompanyCreateInput) => {
  if (!data.name || !data.image) {
    throw new Error('Faltan datos obligatorios');
  }

  const uploadPromises = data.image.map(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'companies' },
        (error, result) => {
          if (error) return reject(error);
          if (result?.secure_url) resolve(result.secure_url);
          else reject(new Error('Error al obtener la URL de Cloudinary'));
        }
      );
      uploadStream.end(buffer);
    });
  });

  const imageUrls = await Promise.all(uploadPromises);
  const dbData = {
    ...data,
    image: imageUrls[0],
  };

  const createdCompany = await companiesServices.createCompany(dbData);
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

export const updateCompany = async (id: number, data: CompanyUpdateInput) => {
  const uploadPromises = data.newFiles.map(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'companies' },
        (error, result) => {
          if (error) return reject(error);
          if (result?.secure_url) resolve(result.secure_url);
          else reject(new Error('Error al obtener la URL de Cloudinary'));
        }
      );
      uploadStream.end(buffer);
    });
  });

  const newImageUrls = await Promise.all(uploadPromises);

  const finalImagesList = [...data.existingImages, ...newImageUrls];

  const dbData: CompanyPayload = {
    name: data.name,
    image: finalImagesList[0],
  };

  const result = await companiesServices.updateCompany(id, dbData);

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
