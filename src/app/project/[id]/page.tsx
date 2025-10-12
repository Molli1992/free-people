import SecondaryHeroSection from '@/components/heroSection/secondaryHeroSection';
import { projectsData } from '@/data/projectsData';
import { notFound } from 'next/navigation';
import { ProjectPageProps } from '@/types/types';
import ProjectDescription from '@/components/projects/projectDescription/projectDescription';

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <SecondaryHeroSection route={project.title ? project.title : 'Project'} />
      <ProjectDescription
        images={project.images}
        description={project.description}
      />
    </main>
  );
}
