'use client';

import { useEffect } from 'react';
import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import CardServices from '@/components/services/serviceCard';
import { architectureIcons } from '@/types/constants';
import { useServices } from '@/lib/hooks/servicesHook';
import { useServicesStore } from '@/zustand/serviceStore';
import { ClipLoader } from 'react-spinners';

export default function Services() {
  const { getServices } = useServices();
  const { services, setServices, isDataLoad } = useServicesStore();

  useEffect(() => {
    const fetchServices = async () => {
      if (isDataLoad) return;

      const fullServices = await getServices();
      if (!fullServices) return;
      setServices(fullServices);
    };

    fetchServices();
  }, [getServices, isDataLoad]);

  if (!isDataLoad)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-secondary-white">
        <ClipLoader color="#000000" size={50} />
      </div>
    );

  return (
    <section className="flex items-center justify-center py-16 px-4 bg-secondary-white">
      <div className="flex flex-col gap-6 w-full max-w-7xl">
        <Separator value="¿Que Hacemos?" />

        <Title value="Los servicios que brindamos" color="secondary" />

        <Text
          value="Transformamos sus ideas y sueños en realidad. Ya sea que busque construir desde cero, renovar un espacio existente o 
          necesite asesoramiento experto, estamos aquí para guiarlo en cada paso del camino. Explore nuestros servicios y contáctenos para 
          comenzar a construir su próximo gran proyecto."
          color="secondary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8">
          {services &&
            services.map((service, index) => {
              const randomIcon = architectureIcons[index];

              return (
                <CardServices
                  key={service.id}
                  icon={randomIcon ? randomIcon : architectureIcons[0]}
                  name={service.name}
                  image={service.image}
                  description={service.description}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
