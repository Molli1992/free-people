'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/authHook';
import Swal from 'sweetalert2';
import { ModalTypes } from '@/types/ui';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import PrimaryInput from '@/components/inputs/primaryInput';
import { validEmail } from '@/utils/utils';
import Modal from '@/components/modal/modal';

export default function RequestResetPasswordModal({
  showModal,
  setShowModal,
}: ModalTypes) {
  const { requestResetPassword, loading } = useAuth();
  const [resetEmail, setResetEmail] = useState('');

  const modalTitle = 'Recuperar Contraseña';
  const modalDescription =
    'Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.';

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

    await requestResetPassword({ email: resetEmail }, () => {
      setShowModal(false);
      setResetEmail('');
    });
  };

  if (!showModal) return null;

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title={modalTitle}
      description={modalDescription}
    >
      <div className="flex flex-col gap-4">
        <div>
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
            disabled={loading}
            onClick={() => {
              setShowModal(false);
              setResetEmail('');
            }}
          />

          <BlackButton
            value="Enviar enlace"
            disabled={loading}
            loading={loading}
            onClick={handleForgotPassword}
          />
        </div>
      </div>
    </Modal>
  );
}
