import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { LuCircleCheckBig } from 'react-icons/lu';

export default function WhyChooseUs() {
  const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3">
      <div>
        <LuCircleCheckBig className="w-6 h-6 text-beige" />
      </div>
      <span className="font-semibold text-black">{text}</span>
    </div>
  );

  const ProgressBar = ({
    label,
    percentage,
  }: {
    label: string;
    percentage: number;
  }) => (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-midnightBlue">{label}</span>
        <span className="font-bold text-midnightBlue">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-orange h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section className="flex items-center justify-center py-16 px-4 bg-skyBlue">
      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-2xl lg:max-w-7xl">
        <div className="flex flex-col gap-6 w-full lg:w-[50%]">
          <Separator value="Nuestros Puntos Claves" />

          <Title value="¿Por qué elegirnos?" color="secondary" />

          <Text
            value="Somos una empresa familiar con una sólida trayectoria en el sector de la construcción. Nuestra reputación se basa en la excelencia técnica, 
            el cumplimiento riguroso y una visión estratégica que garantiza soluciones confiables en cada etapa de su proyecto."
            color="secondary"
          />

          <div className="flex flex-col gap-2">
            <FeatureItem text="Calidad técnica y ejecución precisa" />
            <FeatureItem text="Seguridad y cumplimiento estricto de normativas" />
            <FeatureItem text="Transparencia y procesos trazables" />
            <FeatureItem text="Gestión responsable y sostenible" />
          </div>

          <div className="flex flex-col gap-4">
            <ProgressBar label="Obras Civiles" percentage={98} />
            <ProgressBar label="Edificaciones" percentage={95} />
            <ProgressBar label="Rehabilitación y Mantenimiento" percentage={90} />
          </div>
        </div>

        <div className="flex items-center justify-center w-full lg:w-[50%]">
          <img
            src="/aboutUs/about-us-img-2.jpg"
            alt="Trabajadores"
            className="w-full sm:w-[500px] h-auto max-h-[650px] lg:w-full lg:h-full"
          />
        </div>
      </div>
    </section>
  );
}
