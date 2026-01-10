import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import SubTitle from '@/components/texts/subTitle';
import Text from '@/components/texts/text';

export default function HomeAboutUs() {
  return (
    <section className="flex items-center justify-center py-16 px-4 bg-third-darkBlue">
      <div className="w-full flex-col lg:flex-row  max-w-7xl flex gap-8 items-center justify-center">
        <div className="flex items-end justify-center lg:justify-end w-full lg:w-1/2 gap-4 px-4">
          <img
            src="https://www.shutterstock.com/image-photo/excavator-construction-equipment-such-loaders-600nw-2453054727.jpg"
            alt="Imagen de Compañía"
            className="h-[80vh] w-full sm:w-1/2"
          />

          <img
            src="https://img.freepik.com/fotos-premium/retrato-longitud-completa-vertical-dos-trabajadores-construccion-discutiendo-proyecto-mientras-esta-pie-edificio-gran-altura_236854-27583.jpg"
            alt="Imagen de Compañía"
            className="hidden sm:flex h-[65vh] w-full sm:w-1/2"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <Separator value="Bienvenido a la Compañía" />

          <Title
            value="Construyendo el futuro con bases sólidas y visión estratégica"
            color="primary"
          />

          <SubTitle
            value="Somos su socio de confianza en la materialización de proyectos, desde la concepción hasta la entrega final, 
            priorizando calidad, innovación y sostenibilidad."
            color="primary"
          />

          <Text
            value="Con más de 20 años de trayectoria, nuestra constructora se ha consolidado como líder en el sector, 
            especializándose en Diseño Arquitectónico, Renovación de Edificios, Reparaciones y Ampliaciones y Consultoría en Construcción. 
            Nuestro equipo de expertos está comprometido con la excelencia técnica, la seguridad en el trabajo y la gestión eficiente de recursos. 
            Impulsamos una estrategia de crecimiento empresarial basada en la satisfacción del cliente y la mejora continua, asegurando que cada 
            estructura que levantamos perdure en el tiempo."
            color="primary"
          />
        </div>
      </div>
    </section>
  );
}
