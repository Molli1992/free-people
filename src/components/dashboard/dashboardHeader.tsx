'use client';

import { useState, useEffect, MouseEventHandler } from 'react';
import { usePathname } from 'next/navigation';
import { dashboardLinks } from '@/types/constants';
import { useSidebarStore } from '@/zustand/sidebarStore';
import { GiHamburgerMenu } from 'react-icons/gi';
import BlackButton from '@/components/buttons/blackButton';
import TeamForm from '@/components/dashboard/team/teamForm';

export default function DashboardHeader() {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
  const [buttonValue, setButtonValue] = useState('');
  const [buttonOnClick, setButtonOnClick] = useState<
    MouseEventHandler<HTMLButtonElement> | undefined
  >(undefined);

  const [isOpenTeamForm, setIsOpenTeamForm] = useState(false);

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

  useEffect(() => {
    let value = '';
    let onClick = () => {};

    if (pathname === '/dashboard/team') {
      value = 'Crear integrante';
      onClick = () => {
        setIsOpenTeamForm(true);
      };
    }

    setButtonValue(value);
    setButtonOnClick(() => onClick);
  }, [pathname]);

  return (
    <div className="flex w-full items-center justify-between p-4 border-b border-borderColor">
      <Title />

      {pathname === '/dashboard' ? null : (
        <div>
          <BlackButton value={buttonValue} onClick={buttonOnClick} />
        </div>
      )}

      <TeamForm
        isOpen={isOpenTeamForm}
        onClose={() => setIsOpenTeamForm(false)}
        isEditMode={false}
      />
    </div>
  );
}
