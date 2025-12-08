'use client';

import { usePathname } from 'next/navigation';
import { dashboardLinks } from '@/types/constants';
import { useSidebarStore } from '@/zustand/sidebarStore';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function DashboardHeader() {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();

  const openCloseSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const Title = () => (
    <div className="flex items-center gap-2">
      {!isSidebarOpen ? (
        <div
          className="cursor-pointer text-2xl font-semibold xl:hidden"
          onClick={openCloseSidebar}
        >
          <GiHamburgerMenu />
        </div>
      ) : null}

      {dashboardLinks.map((link) => {
        if (pathname === link.href)
          return (
            <h1 className="text-2xl font-semibold" key={link.label}>
              {link.label}
            </h1>
          );
      })}
    </div>
  );

  return (
    <div className="flex w-full items-center justify-between p-4 border-b border-borderColor">
      <Title />

      <div></div>
    </div>
  );
}
