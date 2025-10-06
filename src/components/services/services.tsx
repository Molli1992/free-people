import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { servicesData } from '@/data/servicesData';
import CardServices from '@/components/services/cardServices';

export default function Services() {
  return (
    <section className="flex items-center justify-center py-16 px-4 bg-secondary-white">
      <div className="flex flex-col gap-6 w-full lg:max-w-7xl">
        <Separator value="¿Que Hacemos?" />

        <Title value="Los Servicios Que Brindamos" color="secondary" />

        <Text
          value="Si necesita reparar o reemplazar su sistema de plomería, llame hoy mismo y hable con uno de nuestros especialistas. 
          Responderán a todas sus preguntas y programarán una cita cuando le sea conveniente."
          color="secondary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8">
          {servicesData &&
            servicesData.map((service) => {
              return (
                <CardServices
                  key={service.id}
                  icon={service.icon}
                  name={service.name}
                  img={service.img}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
