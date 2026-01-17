'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import RequestResetPasswordModal from '@/components/auth/modals/requestResetPasswordModal';
import BlackButton from '@/components/buttons/blackButton';
import PrimaryInput from '@/components/inputs/primaryInput';
import { useAuth } from '@/lib/hooks/authHook';

function LoginForm() {
  const router = useRouter();
  const { login, loading, getSession, isLogin } = useAuth();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSesion = async () => {
      const sesion = await getSession();

      if (sesion) {
        isLogin(sesion)
      }
    };

    hasSesion();
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginData.email.length === 0 || loginData.password.length === 0) {
      Swal.fire({
        title: 'Info!',
        text: 'Completa todos los campos para ingresar',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    await login({
      email: loginData.email,
      password: loginData.password,
    });
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4 relative">
      <RequestResetPasswordModal
        showModal={showModal}
        setShowModal={(boolean) => setShowModal(boolean)}
      />

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex w-full max-w-5xl h-full max-h-[750px]">
        <div className="hidden md:block w-1/2 relative bg-gray-900">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="login form"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-center overflow-y-auto">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="h-20">
              <div
                onClick={() => router.push('/')}
                className="darkBlue h-full w-full cursor-pointer"
                style={{
                  maskImage: 'url("/logo.png")',
                  WebkitMaskImage: 'url("/logo.png")',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  backgroundColor: 'currentColor',
                }}
              />
            </div>

            <h5 className="text-4xl font-normal text-gray-800 tracking-tight">
              Login
            </h5>

            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <PrimaryInput
                label="Email address"
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
                onChange={onChange}
                value={loginData.email}
              />

              <PrimaryInput
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                onChange={onChange}
                value={loginData.password}
              />

              <div className="flex flex-col gap-2">
                <BlackButton
                  value="Login"
                  disabled={loading}
                  loading={loading}
                  type="submit"
                />

                <div className="flex flex-col text-sm">
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="text-gray-500 hover:text-gray-800 cursor-pointer text-left"
                  >
                    Olvidaste tu contraseña?
                  </button>

                  <div className="flex gap-1">
                    <span className="text-gray-600">No tenes cuenta?</span>
                    <Link
                      href="/auth/register"
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                    >
                      Registrate
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href={'/'}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Ir al inicio
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
