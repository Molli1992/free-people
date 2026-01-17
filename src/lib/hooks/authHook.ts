import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { authService } from '@/lib/api/authServices';
import {
  UseAuthReturn,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User
} from '@/types/users';
import { handleError } from '@/utils/utils';
import { AxiosError } from 'axios';

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isLogin = async (userData: User) => {
    try {
      sessionStorage.clear();

      sessionStorage.setItem('authToken', userData.authToken);
      sessionStorage.setItem('id', String(userData.id));
      sessionStorage.setItem('name', userData.name);
      sessionStorage.setItem('lastName', userData.lastName);
      sessionStorage.setItem('email', userData.email);
      sessionStorage.setItem('isActive', userData.isActive as string);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Te has logueado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        router.push('/dashboard');
      });
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err?.response?.data?.error || err.message
          : 'Error desconocido';

      setError(errorMessage);
    }
  };

  const login = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login(data);
      if (!userData) { throw Error("Usuario inexistente") }

      await isLogin(userData.data)
    } catch (err) {
      const errorReturn = handleError(err, 'Error al logearse');
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(data);

      await Swal.fire({
        title: 'Success!',
        text: 'Te has registrado correctamente!',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        router.push('/auth/login');
      });
    } catch (err) {
      const errorReturn = handleError(err, 'Error al registrarse');
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };

  const requestResetPassword = async (
    data: ForgotPasswordRequest,
    onSuccess: () => void
  ) => {
    setLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(data);

      Swal.fire({
        title: '¡Éxito!',
        text: 'Revisa tu correo para restablecer la contraseña',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        onSuccess();
      });
    } catch (err) {
      const errorReturn = handleError(err, 'Error al enviar solicitud');
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordRequest) => {
    setLoading(true);
    setError(null);
    try {
      await authService.resetPassword(data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Tu contraseña ha sido restablecida. Ahora puedes iniciar sesión.',
        icon: 'success',
        confirmButtonText: 'Ir al Login',
      }).then(() => {
        router.push('/auth/login');
      });
    } catch (err) {
      const errorReturn = handleError(err, 'Error al restablecer contraseña');
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async (
    data: ForgotPasswordRequest,
    onSuccess: () => void
  ) => {
    setLoading(true);
    setError(null);
    try {
      await authService.resendVerification(data);

      Swal.fire({
        title: '¡Éxito!',
        text: 'Revisa tu correo para activar tu cuenta',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        onSuccess();
      });
    } catch (err) {
      const errorReturn = handleError(err, 'Error al enviar solicitud');
      setError(errorReturn);
    } finally {
      setLoading(false);
    }
  };

  const verifyAccount = async (token: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.verify({ token });
      const message =
        response?.message || 'Tu cuenta ha sido activada correctamente.';

      await Swal.fire({
        title: '¡Verificado!',
        text: message,
        icon: 'success',
        confirmButtonText: 'Ir al Login',
      }).then(() => {
        router.push('/auth/login');
      });

      return message;
    } catch (err) {
      const errorReturn = handleError(err, 'Error desconocido');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };


  const logOut = () => {
    try {
      sessionStorage.clear();
      router.push('/auth/login');
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err?.response?.data?.error || err.message
          : 'Error desconocido';

      setError(errorMessage);
    }
  };

  const getSession = async () => {
    try {
      const authToken = sessionStorage.getItem('authToken');
      const id = sessionStorage.getItem('id');
      const name = sessionStorage.getItem('name');
      const lastName = sessionStorage.getItem('lastName');
      const email = sessionStorage.getItem('email');
      const isActive = sessionStorage.getItem('isActive');

      if (!id || !name || !lastName || !email || !isActive || !authToken) return null;

      const response = await authService.getUserSesionByToken(String(authToken));
      return response.data;
    } catch (err) {
      logOut()
      return null
    }
  };


  return {
    loading,
    error,
    isLogin,
    login,
    register,
    requestResetPassword,
    resetPassword,
    resendVerification,
    verifyAccount,
    getSession,
    logOut,
  };
}
