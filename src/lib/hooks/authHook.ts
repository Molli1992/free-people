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
} from '@/types/users';
import { handleError } from '@/utils/utils';

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login(data);

      sessionStorage.setItem('isLogin', 'true');
      sessionStorage.setItem('name', userData.name);
      sessionStorage.setItem('lastName', userData.lastName);
      sessionStorage.setItem('email', userData.email);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Te has logueado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        router.push('/dashboard');
      });
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

  return {
    loading,
    error,
    login,
    register,
    requestResetPassword,
    resetPassword,
    resendVerification,
    verifyAccount,
  };
}
