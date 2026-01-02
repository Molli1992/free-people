import * as projectsServices from './projectsServices';
import { ProjectPayload } from '@/types/projects';

export const getAllProjects = async () => {
  const projects = await projectsServices.getAllProjects();
  return projects;
};

export const getProject = async (id: number) => {
  const project = await projectsServices.getProjectById(id);
  return project;
};

export const addProject = async (data: ProjectPayload) => {
  if (
    !data.images ||
    data.images.length < 5 ||
    !data.title ||
    !data.type ||
    !data.description ||
    !data.challenge ||
    !data.finalView
  ) {
    throw new Error('Faltan datos obligatorios');
  }

  const createdProject = await projectsServices.createProject(data);
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

export const updateProject = async (id: number, data: ProjectPayload) => {
  const result = await projectsServices.updateProject(id, data);

  if (result && result.affectedRows === 0) {
    throw new Error('Proyecto no encontrado o no hubo cambios');
  }

  const updatedProject = await projectsServices.getProjectById(id);

  if (!updatedProject) {
    throw new Error('Error recuperando el proyecto actualizado');
  }

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
