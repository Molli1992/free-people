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
            value="Construyendo con excelencia, innovación y compromiso"
            color="primary"
          />

          <SubTitle
            value="Superamos las expectativas de nuestros clientes contribuyendo al desarrollo y bienestar de las comunidades donde operamos."
            color="primary"
          />

          <Text
            value="Con años de trayectoria en la industria, FREE PEOPLE S.A. se ha consolidado como un referente en construcción de obras civiles y edificaciones. 
            Nuestro equipo combina experiencia operativa y mejora continua para asegurar que cada estructura no solo cumpla con los estándares más exigentes, 
            sino que también genere un impacto positivo en el entorno."
            color="primary"
          />
        </div>
      </div>
    </section>
  );
}
