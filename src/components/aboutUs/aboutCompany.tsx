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
            value="Excelencia y trayectoria en la construcción."
            color="secondary"
          />

          <Text
            value="Somos una empresa familiar consolidada como un referente de confianza y solidez técnica. Cada proyecto que emprendemos 
            está respaldado por años de experiencia operativa y un equipo de expertos comprometidos con la innovación, la calidad y la seguridad."
            color="secondary"
          />

          <Text
            value="Nos especializamos en obras civiles, edificaciones y rehabilitación, transformando cada visión estratégica en una realidad técnica. 
            Garantizamos un control permanente en obra, cumplimiento de plazos y una gestión eficiente de recursos que supera los estándares de la industria."
            color="secondary"
          />

          <Text
            value="Nuestra misión es materializar sus objetivos con la máxima seguridad, sostenibilidad y transparencia. 
            Creemos en la integridad y la excelencia operativa, comprometiéndonos a entregar resultados que perduren y generen un impacto positivo en nuestras comunidades."
            color="secondary"
          />
        </div>
      </div>
    </section>
  );
}
