'use client';

import { links, contactInfo } from '@/types/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPhoneAlt } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';
import { FaRegClock } from 'react-icons/fa6';
import SocialNetworks from '@/components/socialNetworks';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="flex items-center justify-center w-full bg-darkBlue py-8 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 justify-items-center gap-10 md:gap-0">
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div>
            <img src="/logo.png" alt="Logo" className="h-24" />
          </div>

          <p className="text-lightBlue">
            Materializamos las visiones de nuestros clientes, transformando
            ideas en hogares únicos y funcionales donde puedan construir su
            futuro y sus historias.
          </p>

          <SocialNetworks />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <h1 className="text-2xl text-orange font-bold">Enlaces</h1>
          {links &&
            links.map((link) => {
              return (
                <Link
                  key={`footer-${link.href}`}
                  href={link.href}
                  className={`hover:text-blue w-fit ${
                    pathname === link.href ? 'text-lightBlue' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto">
          <h1 className="text-2xl text-orange font-bold">Conéctate</h1>

          <div className="flex gap-2 items-center">
            <FaPhoneAlt className="w-6 h-6 text-orange" />
            <p className="text-white">{contactInfo.phone}</p>
          </div>

          <div className="flex gap-2 items-center">
            <LuMail className="w-6 h-6 text-orange" />
            <p className="text-white">{contactInfo.email}</p>
          </div>

          <div className="flex gap-2 items-center">
            <FaRegClock className="w-6 h-6 text-orange" />
            <p className="text-white">{contactInfo.businessHours}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
