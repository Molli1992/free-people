'use client';

import { useState, MouseEvent } from 'react';
import { useAuth } from '@/lib/hooks/authHook';
import Swal from 'sweetalert2';
import { ModalTypes } from '@/types/ui';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import PrimaryInput from '@/components/inputs/primaryInput';
import { validEmail } from '@/utils/utils';

export default function RequestVerificationModal({
  showModal,
  setShowModal,
}: ModalTypes) {
  const { resendVerification, loading } = useAuth();
  const [email, setEmail] = useState('');

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setEmail('');
    }
  };

  const handleResendLink = async () => {
    if (!email) {
      Swal.fire({
        title: 'Info!',
        text: 'Por favor ingresa tu email',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!validEmail(email)) {
      Swal.fire({
        title: 'Info',
        text: 'Email inválido',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    await resendVerification({ email: email }, () => {
      setShowModal(false);
      setEmail('');
    });
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in-down">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Reenviar enlace de activación
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Ingresa tu correo electrónico registrado y te enviaremos un nuevo
          enlace para activar tu cuenta.
        </p>

        <div className="mb-4">
          <PrimaryInput
            label="Email"
            type="email"
            id="verificationEmail"
            name="email"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <GrayButton
            value="Cancelar"
            disabled={loading}
            onClick={() => {
              setShowModal(false);
              setEmail('');
            }}
          />

          <BlackButton
            value="Enviar enlace"
            disabled={loading}
            loading={loading}
            onClick={handleResendLink}
          />
        </div>
      </div>
    </div>
  );
}
