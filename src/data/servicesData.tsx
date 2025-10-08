import ServiceImg1 from '../../public/services/service-img-1.jpg';
import ServiceImg2 from '../../public/services//service-img-2.jpg';
import ServiceImg3 from '../../public/services/service-img-3.jpg';
import ServiceImg4 from '../../public/services/service-img-4.jpg';
import ServiceImg5 from '../../public/services/service-img-5.jpg';
import ServiceImg6 from '../../public/services/service-img-6.jpg';
import ServiceImg7 from '../../public/services/service-img-7.jpg';
import ServiceImg8 from '../../public/services/service-img-8.jpg';
import { Service } from '@/types/types';
import { BsBuildingsFill } from 'react-icons/bs';
import { TfiWrite } from 'react-icons/tfi';
import { MdHomeRepairService } from 'react-icons/md';
import { TbSofa, TbHomePlus, TbBuildingCog } from 'react-icons/tb';
import { TbMapSearch } from 'react-icons/tb';
import { MdRoofing } from 'react-icons/md';

export const servicesData: Service[] = [
  {
    id: 'service-1',
    icon: <BsBuildingsFill />,
    name: 'Construcción',
    img: ServiceImg1.src,
  },
  {
    id: 'service-2',
    icon: <TfiWrite />,
    name: 'Diseño Arquitectónico',
    img: ServiceImg2.src,
  },
  {
    id: 'service-3',
    icon: <MdHomeRepairService />,
    name: 'Renovación de Edificios',
    img: ServiceImg3.src,
  },
  {
    id: 'service-4',
    icon: <MdRoofing />,
    name: 'Pisos y Techos',
    img: ServiceImg4.src,
  },
  {
    id: 'service-5',
    icon: <TbSofa />,
    name: 'Diseño de Interiores',
    img: ServiceImg5.src,
  },
  {
    id: 'service-6',
    icon: <TbHomePlus />,
    name: 'Reparaciones y Ampliaciones',
    img: ServiceImg6.src,
  },
  {
    id: 'service-7',
    icon: <TbMapSearch />,
    name: 'Consultoría en Construcción',
    img: ServiceImg7.src,
  },
  {
    id: 'service-8',
    icon: <TbBuildingCog />,
    name: 'Mantenimiento de Edificios',
    img: ServiceImg8.src,
  },
];
