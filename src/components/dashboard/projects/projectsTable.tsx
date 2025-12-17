'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/table/dataTable';
import { useProjects } from '@/lib/hooks/projectsHook';
import { projectsColumns } from '@/components/table/columns/projectsColumns';
import { useProjectsStore } from '@/zustand/projectsStore';
import { Project } from '@/types/projects';
import ProjectsForm from '@/components/dashboard/projects/projectsForm';

export default function ProjectsTable() {
  const { getAllProjects, loading, deleteProject } = useProjects();
  const { projects, setProjects, removeProjectsFromStore, isDataLoad } =
    useProjectsStore();

  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const openEditForm = (id: number) => {
    const projectToEdit = projects.find((project) => project.id === id);
    if (projectToEdit) {
      setEditingProject(projectToEdit);
      setIsOpenEditForm(true);
    }
  };

  const closeEditForm = () => {
    setIsOpenEditForm(false);
    setEditingProject(null);
  };

  const deleteMember = async (id: number) => {
    await deleteProject(id);
    removeProjectsFromStore(id);
  };

  const columns = projectsColumns(openEditForm, deleteMember);

  useEffect(() => {
    const fetchProjects = async () => {
      if (isDataLoad) return;
      const projectsList = await getAllProjects();

      if (projectsList) {
        setProjects(projectsList);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h1>Tabla de Proyectos</h1>
      <DataTable columns={columns} data={projects} isLoading={loading} />

      <ProjectsForm
        isOpen={isOpenEditForm}
        onClose={closeEditForm}
        isEditMode={true}
        project={editingProject}
      />
    </div>
  );
}
