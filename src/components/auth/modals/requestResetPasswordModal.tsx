'use client';

import { useState, MouseEvent } from 'react';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { ModalTypes } from '@/types/types';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import PrimaryInput from '@/components/inputs/primaryInput';
import { validEmail } from '@/utils/utils';

export default function RequestResetPasswordModal({
  showModal,
  setShowModal,
}: ModalTypes) {
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setResetEmail('');
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Swal.fire({
        title: 'Info!',
        text: 'Por favor ingresa tu email',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!validEmail(resetEmail)) {
      Swal.fire({
        title: 'Info',
        text: 'Email invalido',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    try {
      setIsResetLoading(true);
      await axios.post('/api/auth/forgot-password', { email: resetEmail });

      setShowModal(false);
      setResetEmail('');

      Swal.fire({
        title: '¡Éxito!',
        text: 'Revisa tu correo para restablecer la contraseña',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error
          : 'Error al enviar solicitud';

      Swal.fire({
        title: 'Info!',
        text: errorMessage,
        icon: 'info',
        confirmButtonText: 'Ok',
      });
    } finally {
      setIsResetLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in-down">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Recuperar Contraseña
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </p>

        <div className="mb-4">
          <PrimaryInput
            label="Email"
            type="email"
            id="resetEmail"
            name="email"
            placeholder="ejemplo@email.com"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <GrayButton
            value="Cancelar"
            disabled={isResetLoading}
            onClick={() => {
              setShowModal(false);
              setResetEmail('');
            }}
          />

          <BlackButton
            value="Enviar enlace"
            loading={isResetLoading}
            onClick={handleForgotPassword}
          />
        </div>
      </div>
    </div>
  );
}
