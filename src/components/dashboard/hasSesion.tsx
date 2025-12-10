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
  }, [router, isLogin]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <ClipLoader color="#000000" size={50} />
      </div>
    );
  }

  return <>{children}</>;
}
