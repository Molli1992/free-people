import TeamCard from '@/components/team/teamCard';
import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { teamData } from '@/data/teamData';

export default function Team() {
  return (
    <section className="flex items-center justify-center py-16 px-4 bg-secondary-white">
      <div className="flex flex-col gap-6 w-full max-w-7xl">
        <Separator value="Nuestros Profesionales" />

        <Title value="El equipo que materializa tus ideas" color="secondary" />

        <Text
          value="Ofrecemos soluciones integrales para cada etapa de su proyecto de construcción. Desde el diseño arquitectónico hasta los acabados finales y
           el mantenimiento, nuestro equipo de expertos está listo para materializar sus ideas con calidad y profesionalismo. Contáctenos para una consulta y
            descubra cómo podemos ayudarle."
          color="secondary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8">
          {teamData &&
            teamData.map((teamMember) => {
              return (
                <TeamCard
                  key={teamMember.id}
                  image={teamMember.image}
                  name={teamMember.name}
                  profession={teamMember.profession}
                  linkedin={teamMember.linkedin}
                  instagram={teamMember.instagram}
                  facebook={teamMember.facebook}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
