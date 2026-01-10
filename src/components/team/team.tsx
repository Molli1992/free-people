'use client';

import { useEffect } from 'react';
import TeamCard from '@/components/team/teamCard';
import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { useTeam } from '@/lib/hooks/teamHook';
import { useTeamStore } from '@/zustand//teamStore';
import { ClipLoader } from 'react-spinners';

export default function Team() {
  const { getTeam } = useTeam();
  const { team, setTeam, isDataLoad } = useTeamStore();

  useEffect(() => {
    const fetchTeam = async () => {
      if (isDataLoad) return;

      const fullTeam = await getTeam();
      if (!fullTeam) return;
      setTeam(fullTeam);
    };

    fetchTeam();
  }, [getTeam, isDataLoad]);

  if (!isDataLoad)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <ClipLoader color="#000000" size={50} />
      </div>
    );

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
          {team &&
            team.map((teamMember) => {
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
