import * as servicesServices from './servicesServices';
import {
  ServicePayload,
  ServiceCreateInput,
  ServiceUpdateInput,
} from '@/types/services';
import cloudinary from '../config/cloudinary';

export const getServices = async () => {
  const services = await servicesServices.getFullServices();
  return services;
};

export const addService = async (data: ServiceCreateInput) => {
  if (!data.name || !data.image || !data.description) {
    throw new Error('Faltan datos obligatorios');
  }

  const uploadPromises = data.image.map(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'services' },
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

  const createdService = await servicesServices.createService(dbData);
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

export const updateService = async (id: number, data: ServiceUpdateInput) => {
  const uploadPromises = data.newFiles.map(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'services' },
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

  const dbData: ServicePayload = {
    name: data.name,
    image: finalImagesList[0],
    description: data.description,
  };

  const result = await servicesServices.updateService(id, dbData);

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
