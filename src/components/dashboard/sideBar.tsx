'use client';

import { usePathname } from 'next/navigation';
import { dashboardLinks } from '@/types/constants';
import Link from 'next/link';
import { useSidebarStore } from '@/zustand/sidebarStore';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/authHook';

export default function SideBar() {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
  const { logOut } = useAuth();

  const onClickLink = () => {
    if (window.innerWidth < 1280) {
      setIsSidebarOpen(false);
    }
  };

  const NavLinks = () => (
    <div className="flex flex-col gap-2">
      {dashboardLinks.map((link) => {
        return (
          <Link
            href={link.href}
            onClick={onClickLink}
            className={`flex gap-4 p-2 rounded-md items-center text-2xl hover:bg-cyan-300 ${
              pathname === link.href ? 'bg-cyan-300' : ''
            }`}
            key={link.href}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        );
      })}
    </div>
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsSidebarOpen]);

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed xl:static top-0 left-0 w-full h-full sm:max-w-xs bg-white z-100">
      <div className="flex flex-col gap-4 p-4 border-r border-borderColor w-full h-full relative">
        <div className=" h-20">
          <div
            className="darkBlue h-full w-full"
            style={{
              maskImage: 'url("/logo.png")',
              WebkitMaskImage: 'url("/logo.png")',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              backgroundColor: 'currentColor',
            }}
          />
        </div>

        <NavLinks />

        <div className="absolute bottom-5">
          <button
            className="cursor-pointer text-xl flex gap-2 items-center hover:underline"
            onClick={logOut}
          >
            <p>Cerrar sesión</p> <FaArrowRightLong />
          </button>

          <button
            className="cursor-pointer text-xl flex gap-2 items-center xl:hidden hover:underline"
            onClick={() => setIsSidebarOpen(false)}
          >
            <p>Cerrar sidebar</p> <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
}
