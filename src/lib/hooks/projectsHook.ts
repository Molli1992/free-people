import { useState, useCallback } from 'react';
import { projectsService } from '@/lib/api/projectsServices';
import { Project, UseProjectsReturn, ProjectPayload } from '@/types/projects';
import { handleError } from '@/utils/utils';
import Swal from 'sweetalert2';
import { useAuth } from "./authHook"

export function useProjects(): UseProjectsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getSession, logOut } = useAuth()

  const getAllProjects = useCallback(async (): Promise<Project[] | null> => {
    setLoading(true);
    setError(null);

    try {
      const projects = await projectsService.getAllProjects();
      return projects;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al obtener proyectos');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProject = useCallback(
    async (id: number): Promise<Project | null> => {
      setLoading(true);
      setError(null);

      try {
        const projects = await projectsService.getProject(id);
        return projects;
      } catch (err) {
        const errorReturn = handleError(err, 'Error obteniendo proyecto');
        setError(errorReturn);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createProject = async (
    data: ProjectPayload
  ): Promise<Project | null> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return null
      }

      const createdProject = await projectsService.createProject(data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Projecto creado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return createdProject;
    } catch (err) {
      console.log(err);
      const errorReturn = handleError(err, 'Error al crear projecto');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (
    id: number,
    data: ProjectPayload
  ): Promise<Project | null> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return null
      }

      const updatedProject = await projectsService.updateProject(id, data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Proyecto editado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return updatedProject;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al editar proyecto');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: number): Promise<Project | null> => {
    setLoading(true);
    setError(null);

    try {
      const sesion = await getSession();
      if (!sesion) {
        logOut()
        return null
      }

      const deletedProject = await projectsService.deleteProject(id);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Projecto eliminado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return deletedProject;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al eliminar projecto');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  };
}
