import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';

export default function AboutCompany() {
  return (
    <section className="flex items-center justify-center py-16 px-4 bg-white">
      <div className="flex flex-col-reverse lg:flex-row gap-12 w-full max-w-2xl lg:max-w-7xl">
        <div className="flex items-center justify-center w-full lg:w-[50%]">
          <img
            src="/aboutUs/about-us-img-1.png"
            alt="Camion"
            className="w-full sm:w-[500px] h-auto lg:w-full lg:h-full"
          />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-[50%]">
          <Separator value="Sobre Nosotros" />

          <Title
            value="Ofrecemos la garantía de calidad en la construcción."
            color="secondary"
          />

          <Text
            value="Con más de 10 años de trayectoria en el sector, nuestra empresa se ha consolidado como un referente de confianza y solidez. 
            Cada proyecto que emprendemos está respaldado por un equipo de profesionales altamente cualificados y una profunda vocación por la excelencia."
            color="secondary"
          />
          <Text
            value="Nos especializamos en transformar ideas en realidad, construyendo no solo estructuras, sino también relaciones duraderas con nuestros clientes. 
            Desde la planificación inicial hasta la entrega final, garantizamos un seguimiento meticuloso, cumplimiento de plazos y un control de calidad 
            que supera los más altos estándares de la industria."
            color="secondary"
          />
          <Text
            value="Nuestra misión es materializar sus objetivos con la máxima seguridad, eficiencia y transparencia. 
            Creemos en el trabajo bien hecho y en el valor de la palabra, comprometiéndonos a entregar resultados que perduren en el tiempo y 
            generen un impacto positivo en la comunidad."
            color="secondary"
          />
        </div>
      </div>
    </section>
  );
}
