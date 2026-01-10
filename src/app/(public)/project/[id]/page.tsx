'use client';

import { Project } from '@/types/projects';
import { use, useState, useEffect } from 'react';
import SecondaryHeroSection from '@/components/heroSection/secondaryHeroSection';
import ProjectDescription from '@/components/projects/projectDescription/projectDescription';
import { ProjectPageProps } from '@/types/projects';
import { useProjects } from '@/lib/hooks/projectsHook';
import { ClipLoader } from 'react-spinners';

export default function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { getProject } = useProjects();
  const [projectData, setProjectData] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      const project = await getProject(Number(id));
      if (project) {
        setProjectData(project);
      }
    };

    fetchProject();
  }, [id, getProject]);

  if (!projectData)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <ClipLoader color="#000000" size={50} />
      </div>
    );

  return (
    <main>
      <SecondaryHeroSection route={projectData.title} />
      <ProjectDescription
        images={projectData.images}
        description={projectData.description}
        challenge={projectData.challenge}
        finalView={projectData.finalView}
      />
    </main>
  );
}
