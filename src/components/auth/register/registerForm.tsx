'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useAuth } from '@/lib/hooks/authHook';
import { validEmail, validPassword } from '@/utils/utils';
import BlackButton from '@/components/buttons/blackButton';
import PrimaryInput from '@/components/inputs/primaryInput';

function RegisterForm() {
  const router = useRouter();
  const { register, loading, isLogin } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  useEffect(() => {
    const hasSesion = async () => {
      const sesion = await isLogin();

      if (sesion) {
        router.push('/dashboard');
      }
    };

    hasSesion();
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, lastName, email, password, repeatPassword } = formData;

    if (
      name.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      repeatPassword.length === 0
    ) {
      Swal.fire({
        title: 'Info',
        text: 'Completar todos los campos para registrarse',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!validEmail(formData.email)) {
      Swal.fire({
        title: 'Info',
        text: 'Email invalido',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (!validPassword(password)) {
      Swal.fire({
        title: 'Info',
        text: 'La contraseña debe tener al menos una letra minúscula, una letra mayúscula, un número y un mínimo de 8 caracteres.',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (password !== repeatPassword) {
      Swal.fire({
        title: '',
        text: 'Los campos de contraseña y repetir contraseña deben ser iguales',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    await register({
      name,
      lastName,
      email,
      password,
      repeatPassword,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex w-full max-w-5xl h-full max-h-[750px]">
        <div className="hidden md:block w-1/2 relative bg-gray-900">
          <img
            src="https://img.freepik.com/premium-vector/application-document-form-flat-design-vector-illustration_115464-1065.jpg?semt=ais_hybrid&w=740&q=80"
            alt="register form"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center overflow-y-auto">
          <div className="w-full max-w-md flex flex-col gap-6">
            <h5 className="text-4xl font-normal text-gray-800 tracking-tight">
              Sign up
            </h5>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <PrimaryInput
                label="Nombre"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="John"
              />

              <PrimaryInput
                label="Apellido"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
                placeholder="Doe"
              />

              <PrimaryInput
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="ejemplo@mail.com"
              />

              <PrimaryInput
                label="password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="••••••••"
              />

              <PrimaryInput
                label="Repetir contraseña"
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={onChange}
                placeholder="••••••••"
              />

              <div className="flex flex-col gap-4 mt-2">
                <BlackButton
                  value="Register"
                  disabled={loading}
                  loading={loading}
                  type="submit"
                />

                <div className="flex items-center justify-center gap-1 text-sm">
                  <span className="text-gray-600">
                    Already have an account?
                  </span>
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    Login here
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
