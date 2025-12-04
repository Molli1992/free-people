import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

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
  const isLogin = sessionStorage.getItem('isLogin');
  return isLogin;
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
