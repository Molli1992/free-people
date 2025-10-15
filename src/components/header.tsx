'use client';

import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { links } from '@/types/constants';
import SocialNetworks from '@/components/socialNetworks';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const openCloseMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onClickLink = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const NavLinks = () => (
    <>
      {links.map((link) => {
        if (link.label === 'Contacto') return null;

        return (
          <Link
            key={`header-${link.href}`}
            href={link.href}
            className={`hover:text-blue font-semibold  ${
              pathname === link.href ? 'text-lightBlue' : 'text-white'
            }`}
            onClick={onClickLink}
          >
            {link.label}
          </Link>
        );
      })}
      {!isMenuOpen ? (
        <Link
          href="/contact"
          className="font-semibold bg-orange text-white px-4 py-2 rounded-full hover:bg-secondary-darkBlue w-fit"
        >
          Contacto
        </Link>
      ) : (
        <Link
          href="/contact"
          className={`hover:text-blue font-semibold  ${
            pathname === '/contact' ? 'text-lightBlue' : 'text-white'
          }`}
          onClick={onClickLink}
        >
          Contacto
        </Link>
      )}
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-999 transition-colors duration-300 ${
        isScrolled || isMenuOpen ? 'bg-darkBlue' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between p-4 h-24">
        <div className="h-full">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-full cursor-pointer"
            onClick={() => router.push('/')}
          />
        </div>

        <div className="hidden md:flex gap-4 h-full items-center">
          <NavLinks />
        </div>

        <div className="flex md:hidden h-full items-center">
          {!isMenuOpen ? (
            <GiHamburgerMenu
              className="h-10 w-10 text-white cursor-pointer hover:text-lightBlue"
              onClick={openCloseMenu}
            />
          ) : (
            <IoClose
              className="h-10 w-10 text-white cursor-pointer hover:text-lightBlue"
              onClick={openCloseMenu}
            />
          )}
        </div>
      </div>

      {isMenuOpen ? (
        <div className="w-full h-[calc(100vh-6rem)]">
          <div className="flex flex-col md:hidden gap-4 p-4 h-full">
            <NavLinks />
            <SocialNetworks />
          </div>
        </div>
      ) : null}
    </header>
  );
}
