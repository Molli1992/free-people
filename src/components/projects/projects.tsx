import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { projectsData } from '@/data/projectsData';
import ProjectCard from '@/components/projects/projectCard';

export default function Projects() {
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
          {projectsData &&
            projectsData.map((project) => {
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
