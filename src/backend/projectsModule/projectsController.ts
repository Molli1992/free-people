import * as projectsServices from './projectsServices';
import {
  ProjectPayload,
  ProjectCreateInput,
  ProjectUpdateInput,
} from '@/types/projects';
import cloudinary from '../config/cloudinary';

export const getAllProjects = async () => {
  const projects = await projectsServices.getAllProjects();
  return projects;
};

export const getProject = async (id: number) => {
  const project = await projectsServices.getProjectById(id);
  return project;
};

export const addProject = async (data: ProjectCreateInput) => {
  if (
    !data.images ||
    data.images.length < 5 ||
    !data.title ||
    !data.type ||
    !data.description ||
    !data.challenge ||
    !data.finalView
  ) {
    throw new Error('Faltan datos obligatorios o imágenes insuficientes');
  }

  const uploadPromises = data.images.map(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'projects' },
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
    images: imageUrls,
  };
  const createdProject = await projectsServices.createProject(dbData as any);

  const newProject = await projectsServices.getProjectById(
    createdProject.insertId
  );

  if (!newProject) {
    throw new Error('Error recuperando el proyecto creado');
  }

  return {
    message: 'Proyecto creado correctamente.',
    data: newProject,
  };
};

export const updateProject = async (id: number, data: ProjectUpdateInput) => {
  const uploadPromises = data.newFiles.map(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'projects' },
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

  const dbData: ProjectPayload = {
    title: data.title,
    type: data.type,
    description: data.description,
    challenge: data.challenge,
    finalView: data.finalView,
    images: finalImagesList,
  };

  const result = await projectsServices.updateProject(id, dbData);

  if (result && result.affectedRows === 0) {
    throw new Error('Proyecto no encontrado');
  }

  const updatedProject = await projectsServices.getProjectById(id);
  return {
    message: 'Proyecto actualizado correctamente',
    data: updatedProject,
  };
};

export const deleteProject = async (id: number) => {
  const result = await projectsServices.deleteProject(id);
  if (result.affectedRows === 0) throw new Error('Proyecto no encontrado');

  return { message: 'Proyecto eliminado correctamente' };
};
