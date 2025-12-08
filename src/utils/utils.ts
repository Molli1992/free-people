import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export const getSession = () => {
  const id = sessionStorage.getItem('id');
  const name = sessionStorage.getItem('name');
  const lastName = sessionStorage.getItem('lastName');
  const email = sessionStorage.getItem('email');
  const isActive = sessionStorage.getItem('isActive');

  if (!id || !name || !lastName || !email || !isActive) return null;

  const user = {
    id: id,
    name: name,
    lastName: lastName,
    email: email,
    isActive: isActive,
  };

  return user;
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
