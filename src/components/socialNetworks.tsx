import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from 'react-icons/fa';
import { contactInfo } from '@/types/constants';
import { handleOpenLink } from '@/utils/utils';

export default function SocialNetworks() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="p-3 bg-secondary-darkBlue rounded-full text-white cursor-pointer hover:text-black hover:bg-orange"
        onClick={() => handleOpenLink(contactInfo.facebook)}
      >
        <FaFacebook className="w-5 h-5" />
      </div>

      <div
        className="p-3 bg-secondary-darkBlue rounded-full text-white cursor-pointer hover:text-black hover:bg-orange"
        onClick={() => handleOpenLink(contactInfo.instagram)}
      >
        <FaInstagram className="w-5 h-5" />
      </div>

      <div
        className="p-3 bg-secondary-darkBlue rounded-full text-white cursor-pointer hover:text-black hover:bg-orange"
        onClick={() => handleOpenLink(contactInfo.whatsapp)}
      >
        <FaWhatsapp className="w-5 h-5" />
      </div>

      <div
        className="p-3 bg-secondary-darkBlue rounded-full text-white cursor-pointer hover:text-black hover:bg-orange"
        onClick={() => handleOpenLink(contactInfo.linkedin)}
      >
        <FaLinkedin className="w-5 h-5" />
      </div>
    </div>
  );
}
