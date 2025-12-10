import { FaUserShield } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaHammer } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa';

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

export const projectTypes = [
  'Lorence Project',
  '3D Modeling',
  'Houses',
  'Architecture',
  'Interior Design',
  'Apartments',
  'Project',
] as const;

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
