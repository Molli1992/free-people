import { FaLinkedinIn, FaInstagram, FaFacebook } from 'react-icons/fa';
import { TeamCardProps } from '@/types/types';

export default function TeamCard({
  image,
  name,
  profession,
  linkedin,
  instagram,
  facebook,
}: TeamCardProps) {
  return (
    <div className="group relative w-[275px] h-[385px] rounded-md overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div
        className="absolute inset-0 flex items-center justify-center gap-6 bg-black/70 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-darkBlue p-4 bg-white rounded-full transition-colors duration-300 hover:bg-orange hover:text-white"
        >
          <FaLinkedinIn className="w-6 h-6" />
        </a>

        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-darkBlue p-4 bg-white rounded-full transition-colors duration-300 hover:bg-orange hover:text-white"
        >
          <FaInstagram className="w-6 h-6" />
        </a>

        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-darkBlue p-4 bg-white rounded-full transition-colors duration-300 hover:bg-orange hover:text-white"
        >
          <FaFacebook className="w-6 h-6" />
        </a>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full p-6 text-white bg-orange"
        style={{ clipPath: 'polygon(0 0, 100% 35%, 100% 100%, 0% 100%)' }}
      >
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-sm font-semibold uppercase tracking-wider">
          {profession}
        </p>
      </div>
    </div>
  );
}
