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

export default function RequestVerificationModal({
  showModal,
  setShowModal,
}: ModalTypes) {
  const { resendVerification, loading } = useAuth();
  const [email, setEmail] = useState('');

  const modalTitle = 'Reenviar enlace de activación';
  const modalDescription =
    'Ingresa tu correo electrónico registrado y te enviaremos un nuevo enlace para activar tu cuenta.';

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
    </Modal>
  );
}
