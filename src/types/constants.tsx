import { FaUserShield } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaHammer } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa';
import { BsBuildingsFill, BsFillLayersFill, BsVectorPen } from 'react-icons/bs';
import { TfiWrite, TfiRulerPencil } from 'react-icons/tfi';
import {
  MdHomeRepairService,
  MdRoofing,
  MdOutlineArchitecture,
  MdConstruction,
} from 'react-icons/md';
import {
  TbSofa,
  TbHomePlus,
  TbBuildingCog,
  TbMapSearch,
  TbCrane,
  TbWall,
} from 'react-icons/tb';
import { LuHardHat } from 'react-icons/lu';
import { FaDraftingCompass } from 'react-icons/fa';

export const architectureIcons = [
  <BsBuildingsFill key="1" />,
  <TfiWrite key="2" />,
  <MdHomeRepairService key="3" />,
  <TbSofa key="4" />,
  <TbHomePlus key="5" />,
  <TbBuildingCog key="6" />,
  <TbMapSearch key="7" />,
  <MdRoofing key="8" />,
  <MdOutlineArchitecture key="9" />,
  <TfiRulerPencil key="10" />,
  <TbCrane key="11" />,
  <LuHardHat key="12" />,
  <FaDraftingCompass key="13" />,
  <BsFillLayersFill key="14" />,
  <MdConstruction key="15" />,
  <TbWall key="16" />,
  <BsVectorPen key="17" />,
];

export const links = [
  { href: '/', label: 'Inicio' },
  { href: '/about-us', label: 'Nosotros' },
  { href: '/services', label: 'Servicios' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/team', label: 'Equipo' },
  { href: '/contact', label: 'Contacto' },
];

export const dashboardLinks = [
  { href: '/dashboard', label: 'Usuarios', icon: <FaUserShield /> },
  { href: '/dashboard/team', label: 'Equipo', icon: <FaUsers /> },
  { href: '/dashboard/projects', label: 'Proyectos', icon: <FaHammer /> },
  { href: '/dashboard/services', label: 'Servicios', icon: <FaTools /> },
  { href: '/dashboard/reviews', label: 'Reviews', icon: <FaStar /> },
  { href: '/dashboard/companies', label: 'Compañías', icon: <FaBuilding /> },
];

export const contactInfo = {
  phone: '+54 9 11 2458-6710',
  email: 'pipe.blaksley@gmail.com',
  businessHours: 'Horario de Atencion: 9AM - 8PM',
  whatsapp: 'https://wa.me/5491124586710',
  instagram: 'https://www.instagram.com/felipeblaksley/',
  facebook: 'https://www.facebook.com/felipeblaksley/',
  linkedin: 'https://www.linkedin.com/in/felipe-blaksley-iraola-141b32236/',
};

export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/verify',
  '/auth/resetPassword',
];

export const urlRegex = {
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/.*$/i,
  instagram: /^https:\/\/(www\.)?instagram\.com\/.*$/i,
  facebook: /^https:\/\/(www\.)?facebook\.com\/.*$/i,
};
