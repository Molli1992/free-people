import SecondaryHeroSection from '@/components/heroSection/secondaryHeroSection';
import { projectsData } from '@/data/projectsData';
import { notFound } from 'next/navigation';
import ProjectDescription from '@/components/projects/projectDescription/projectDescription';
import { ProjectPageProps } from '@/types/projects';

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => String(p.id) === id);

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
