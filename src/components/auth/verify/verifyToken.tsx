'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import RequestVerificationModal from '@/components/auth/modals/RequestVerificationModal';

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Verificando tu cuenta...');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setMessage('Token no válido o no encontrado.');
      return;
    }

    const verifyAccount = async () => {
      try {
        const response = await axios.post('/api/auth/verify', { token });

        const message = response?.data?.message
          ? response.data.message
          : 'Tu cuenta ha sido activada correctamente.';
        setMessage(message);

        Swal.fire({
          title: '¡Verificado!',
          text: message,
          icon: 'success',
          confirmButtonText: 'Ir al Login',
        }).then(() => {
          router.push('/auth/login');
        });
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.error
            : 'Error desconocido';

        setMessage(errorMessage);

        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } finally {
        setLoading(false);
      }
    };

    verifyAccount();
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
            onClick={() => setShowModal(true)}
          />

          <GrayButton
            value="Ir al login"
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
