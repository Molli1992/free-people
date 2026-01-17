import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { urlRegex } from '@/types/constants';
import { TeamPayload } from '@/types/team';

export const handleOpenLink = (url: string) => {
  window.open(url, '_blank');
};

export const validEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return false;
  }

  return true;
};

export const validPassword = (password: string) => {
  const capitalLetter = /[A-Z]/.test(password);
  const hasMinuscule = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const validLength = password.length >= 8;

  if (!capitalLetter || !hasMinuscule || !hasNumber || !validLength) {
    return false;
  } else {
    return true;
  }
};

export const handleError = (err: unknown, defaultMsg: string) => {
  const errorMessage =
    err instanceof AxiosError
      ? err?.response?.data?.error || err.message
      : defaultMsg;

  Swal.fire({
    title: 'Info!',
    text: errorMessage,
    icon: 'info',
    confirmButtonText: 'Ok',
  });
  return errorMessage;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateUrls = (data: TeamPayload) => {
  const newErrors: Partial<TeamPayload> = {};

  if (data.linkedin && !urlRegex.linkedin.test(data.linkedin)) {
    newErrors.linkedin =
      'Formato de URL de LinkedIn inválido. Debe comenzar con https://www.linkedin.com/...';
  }

  if (data.instagram && !urlRegex.instagram.test(data.instagram)) {
    newErrors.instagram =
      'Formato de URL de Instagram inválido. Debe comenzar con https://www.instagram.com/...';
  }

  if (data.facebook && !urlRegex.facebook.test(data.facebook)) {
    newErrors.facebook =
      'Formato de URL de Facebook inválido. Debe comenzar con https://www.facebook.com/...';
  }

  return newErrors;
};
