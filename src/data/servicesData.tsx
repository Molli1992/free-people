import ServiceImg1 from '../../public/services/service-img-1.jpg';
import ServiceImg2 from '../../public/services//service-img-2.jpg';
import ServiceImg3 from '../../public/services/service-img-3.jpg';
import ServiceImg4 from '../../public/services/service-img-4.jpg';
import ServiceImg5 from '../../public/services/service-img-5.jpg';
import ServiceImg6 from '../../public/services/service-img-6.jpg';
import ServiceImg7 from '../../public/services/service-img-7.jpg';
import ServiceImg8 from '../../public/services/service-img-8.jpg';
import { ServiceProps } from '@/types/types';
import { BsBuildingsFill } from 'react-icons/bs';
import { TfiWrite } from 'react-icons/tfi';
import { MdHomeRepairService } from 'react-icons/md';
import { TbSofa, TbHomePlus, TbBuildingCog } from 'react-icons/tb';
import { TbMapSearch } from 'react-icons/tb';
import { MdRoofing } from 'react-icons/md';

export const servicesData: ServiceProps[] = [
  {
    id: 'service-1',
    icon: <BsBuildingsFill />,
    name: 'Construcción',
    image: ServiceImg1,
    description:
      'Llevamos a cabo proyectos de construcción desde los cimientos hasta la entrega final, garantizando calidad y plazos.',
  },
  {
    id: 'service-2',
    icon: <TfiWrite />,
    name: 'Diseño Arquitectónico',
    image: ServiceImg2,
    description:
      'Creamos diseños innovadores y funcionales que se adaptan a tus necesidades y estética, optimizando cada espacio.',
  },
  {
    id: 'service-3',
    icon: <MdHomeRepairService />,
    name: 'Renovación de Edificios',
    image: ServiceImg3,
    description:
      'Modernizamos y restauramos edificios, mejorando su funcionalidad, eficiencia energética y valor de mercado.',
  },
  {
    id: 'service-4',
    icon: <MdRoofing />,
    name: 'Pisos y Techos',
    image: ServiceImg4,
    description:
      'Instalación y reparación de pisos y techos con materiales de la más alta calidad para una durabilidad superior.',
  },
  {
    id: 'service-5',
    icon: <TbSofa />,
    name: 'Diseño de Interiores',
    image: ServiceImg5,
    description:
      'Transformamos espacios interiores para que reflejen tu estilo personal, creando ambientes únicos y acogedores.',
  },
  {
    id: 'service-6',
    icon: <TbHomePlus />,
    name: 'Reparaciones y Ampliaciones',
    image: ServiceImg6,
    description:
      'Realizamos todo tipo de reparaciones y ampliaciones para adaptar tu hogar o negocio a tus nuevas necesidades.',
  },
  {
    id: 'service-7',
    icon: <TbMapSearch />,
    name: 'Consultoría en Construcción',
    image: ServiceImg7,
    description:
      'Ofrecemos asesoramiento experto para optimizar tu proyecto en todas sus fases, desde la planificación hasta la ejecución.',
  },
  {
    id: 'service-8',
    icon: <TbBuildingCog />,
    name: 'Mantenimiento de Edificios',
    image: ServiceImg8,
    description:
      'Servicios de mantenimiento preventivo y correctivo para mantener tu propiedad en perfectas condiciones todo el año.',
  },
];
