'use client';

import { useState, useEffect, MouseEventHandler } from 'react';
import { usePathname } from 'next/navigation';
import { dashboardLinks } from '@/types/constants';
import { useSidebarStore } from '@/zustand/sidebarStore';
import { GiHamburgerMenu } from 'react-icons/gi';
import BlackButton from '@/components/buttons/blackButton';
import TeamForm from '@/components/dashboard/team/teamForm';
import ProjectsForm from '@/components/dashboard/projects/projectsForm';
import ServicesForm from '@/components/dashboard/services/servicesForm';
import ReviewsForm from '@/components/dashboard/reviews/reviewsForm';
import CompaniesForm from '@/components/dashboard/companies/companiesForm';

export default function DashboardHeader() {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();

  const [buttonValue, setButtonValue] = useState('');
  const [buttonOnClick, setButtonOnClick] = useState<
    MouseEventHandler<HTMLButtonElement> | undefined
  >(undefined);

  const [isOpenTeamForm, setIsOpenTeamForm] = useState(false);
  const [isOpenProjectsForm, setIsOpenProjectsForm] = useState(false);
  const [isOpenServiceForm, setIsOpenServiceForm] = useState(false);
  const [isOpenReviewsForm, setIsOpenReviewsForm] = useState(false);
  const [isOpenCompaniesForm, setIsOpenCompaniesForm] = useState(false);

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

    if (pathname === '/dashboard/projects') {
      value = 'Crear proyecto';
      onClick = () => {
        setIsOpenProjectsForm(true);
      };
    }

    if (pathname === '/dashboard/services') {
      value = 'Crear servicio';
      onClick = () => {
        setIsOpenServiceForm(true);
      };
    }

    if (pathname === '/dashboard/reviews') {
      value = 'Crear review';
      onClick = () => {
        setIsOpenReviewsForm(true);
      };
    }

    if (pathname === '/dashboard/companies') {
      value = 'Crear compañía';
      onClick = () => {
        setIsOpenCompaniesForm(true);
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

      <ProjectsForm
        isOpen={isOpenProjectsForm}
        onClose={() => setIsOpenProjectsForm(false)}
        isEditMode={false}
      />

      <ServicesForm
        isOpen={isOpenServiceForm}
        onClose={() => setIsOpenServiceForm(false)}
        isEditMode={false}
      />

      <ReviewsForm
        isOpen={isOpenReviewsForm}
        onClose={() => setIsOpenReviewsForm(false)}
        isEditMode={false}
      />

      <CompaniesForm
        isOpen={isOpenCompaniesForm}
        onClose={() => setIsOpenCompaniesForm(false)}
        isEditMode={false}
      />
    </div>
  );
}
