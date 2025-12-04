'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/authHook';
import { ClipLoader } from 'react-spinners';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import RequestVerificationModal from '@/components/auth/modals/RequestVerificationModal';

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const { verifyAccount, loading } = useAuth();
  const [message, setMessage] = useState('Verificando tu cuenta...');

  const [showModal, setShowModal] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage('Token no válido o no encontrado.');
      return;
    }

    if (hasVerified) return;

    const runVerification = async () => {
      setHasVerified(true);
      const resultMsg = await verifyAccount(token);

      if (resultMsg) {
        setMessage(resultMsg);
      } else {
        setMessage('Error al verificar la cuenta.');
      }
    };

    runVerification();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <RequestVerificationModal
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Verificación de Cuenta
        </h1>

        <div className="mb-4">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <ClipLoader color="#000000" size={40} />
              <p className="text-gray-600">Procesando...</p>
            </div>
          ) : (
            <p className="text-gray-700 text-lg">{message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <BlackButton
            value="Solicitar otro enlace"
            disabled={loading}
            onClick={() => setShowModal(true)}
          />

          <GrayButton
            value="Ir al login"
            disabled={loading}
            onClick={() => router.push('/auth/login')}
          />
        </div>
      </div>
    </div>
  );
}

export default function VerifyToken() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-gray-100">
          <ClipLoader color="#000000" size={50} />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
