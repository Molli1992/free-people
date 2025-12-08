'use client';

import SideBar from '@/components/dashboard/sideBar';
import DashboardHeader from '@/components/dashboard/dashboardHeader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '@/lib/hooks/authHook';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isLogin } = useAuth();

  useEffect(() => {
    const hasSesion = async () => {
      const sesion = await isLogin();

      if (!sesion) {
        router.push('/auth/login');
      } else {
        setLoading(false);
      }
    };

    hasSesion();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <ClipLoader color="#000000" size={50} />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      <SideBar />

      <div className="w-full">
        <DashboardHeader />

        {children}
      </div>
    </div>
  );
}
