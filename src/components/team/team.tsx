'use client';

import { useEffect } from 'react';
import TeamCard from '@/components/team/teamCard';
import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { useTeam } from '@/lib/hooks/teamHook';
import { useTeamStore } from '@/zustand/teamStore';
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

        <Title value="Experiencia operativa y visión estratégica" color="secondary" />

        <Text
          value="Nuestro equipo multidisciplinario está formado por profesionales altamente capacitados y dedicados exclusivamente a 
          la excelencia técnica, la seguridad y la mejora continua en cada obra. En FREE PEOPLE S.A., entendemos que el éxito de un proyecto 
          depende de la sinergia entre la experiencia operativa y una visión estratégica sólida; por ello, trabajamos bajo procesos claros, 
          comunicación abierta y una planificación rigurosa que permite materializar sus ideas con total transparencia. Cada especialista de 
          nuestra empresa asume el compromiso de cumplir con los más altos estándares de calidad, asegurando que el resultado final sea una estructura confiable, 
          eficiente y diseñada para perdurar, brindando así la tranquilidad y el valor real que nuestros clientes demandan."
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
