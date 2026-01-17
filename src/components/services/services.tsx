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

        <Title value="Nuestras Áreas de Especialización" color="secondary" />

        <Text
          value="En FREE PEOPLE S.A., ofrecemos un enfoque integral y profundamente profesional estructurado en tres ejes clave que cubren 
          todo el espectro de la industria: la ingeniería de infraestructura civil, el desarrollo de edificaciones de diversa escala y 
          la preservación de activos mediante la rehabilitación y el mantenimiento especializado. Nuestra propuesta de valor se basa en integrar diseño, 
          planificación técnica y una ejecución impecable, priorizando siempre la seguridad ocupacional y la sostenibilidad ambiental. 
          Trabajamos con procesos trazables y una comunicación clara para garantizar que cada intervención, ya sea una obra nueva o una remodelación técnica, 
          se entregue con la máxima calidad y dentro de los plazos acordados, asegurando la funcionalidad y el valor real para nuestros clientes."
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
