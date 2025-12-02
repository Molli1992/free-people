'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import axios, { AxiosError } from 'axios';
import RequestResetPasswordModal from '@/components/auth/modals/requestResetPasswordModal';
import { validPassword } from '@/utils/utils';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import { ClipLoader } from 'react-spinners';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword } = passwords;

    if (!token || !email) {
      Swal.fire({
        title: 'Error',
        text: 'Token o email inválidos. Vuelve a solicitar el enlace.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!validPassword(password)) {
      Swal.fire({
        title: 'Info',
        text: 'La contraseña debe tener al menos una letra minúscula, una letra mayúscula, un número y un mínimo de 8 caracteres.',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: '',
        text: 'Los campos de Nueva Contraseña y Repetir Contraseña deben ser iguales',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    try {
      setIsLoading(true);
      await axios.post('/api/auth/reset-password', {
        token,
        email,
        password: passwords.password,
      });

      Swal.fire({
        title: '¡Éxito!',
        text: 'Tu contraseña ha sido restablecida. Ahora puedes iniciar sesión.',
        icon: 'success',
        confirmButtonText: 'Ir al Login',
      }).then(() => {
        router.push('/auth/login');
      });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error?.response?.data?.error
          : 'Error al restablecer contraseña';

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <RequestResetPasswordModal
        showModal={showModal}
        setShowModal={(boolean) => setShowModal(boolean)}
      />

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Restablecer Contraseña
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={passwords.password}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 outline-none transition"
              placeholder="Nueva contraseña"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repetir Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 outline-none transition"
              placeholder="Repetir contraseña"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <BlackButton
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              value="Cambiar Contraseña"
            />

            <div className="flex gap-2">
              <GrayButton
                value="Solicitar otro enlace"
                type="button"
                onClick={() => setShowModal(true)}
              />

              <GrayButton
                value="Ir al login"
                type="button"
                onClick={() => router.push('/auth/login')}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-gray-100">
          <ClipLoader color="#000000" size={50} />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
