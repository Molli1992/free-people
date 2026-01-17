'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '@/lib/hooks/authHook';

export default function HasSesion({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { getSession, logOut } = useAuth();

  useEffect(() => {
    const hasSesion = async () => {
      const sesion = await getSession();

      if (!sesion) {
        logOut()
      } else {
        setLoading(false);
      }
    };

    hasSesion();
  }, [router, getSession]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <ClipLoader color="#000000" size={50} />
      </div>
    );
  }

  return <>{children}</>;
}
