'use client';

import { useEffect } from 'react';
import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import ProjectCard from '@/components/projects/projectCard';
import { useProjects } from '@/lib/hooks/projectsHook';
import { useProjectsStore } from '@/zustand/projectsStore';
import { ClipLoader } from 'react-spinners';

export default function Projects() {
  const { getAllProjects } = useProjects();
  const { projects, setProjects, isDataLoad } = useProjectsStore();

  useEffect(() => {
    const fetchProjects = async () => {
      if (isDataLoad) return;

      const projects = await getAllProjects();
      if (!projects) return;
      setProjects(projects);
    };

    fetchProjects();
  }, [getAllProjects, isDataLoad]);

  if (!isDataLoad)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <ClipLoader color="#000000" size={50} />
      </div>
    );

  return (
    <section className="flex items-center justify-center py-16 px-4 bg-secondary-white">
      <div className="flex flex-col gap-6 w-full max-w-7xl">
        <Separator value="Nuestro Trabajo" />

        <Title value="Explorar proyectos recientes" color="secondary" />

        <Text
          value="Cada proyecto en nuestro portafolio es un testimonio de nuestra dedicación a la calidad y la innovación. 
          Desde construcciones residenciales hasta renovaciones comerciales, hemos dejado una marca de excelencia en cada obra. 
          Lo invitamos a explorar nuestra galería para descubrir el compromiso y la precisión que nos definen."
          color="secondary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4">
          {projects &&
            projects.map((project) => {
              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  images={project.images}
                  title={project.title}
                  type={project.type}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
