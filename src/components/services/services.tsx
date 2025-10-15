import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { servicesData } from '@/data/servicesData';
import CardServices from '@/components/services/serviceCard';

export default function Services() {
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
          {servicesData &&
            servicesData.map((service) => {
              return (
                <CardServices
                  key={service.id}
                  icon={service.icon}
                  name={service.name}
                  image={service.image}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
