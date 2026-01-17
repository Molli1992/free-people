import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyRequest,
} from '@/types/users';
import axios from 'axios';

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await axios.post('/api/auth/login', data);
    return response.data;
  },
  register: async (data: RegisterRequest) => {
    const { repeatPassword, ...apiData } = data;
    const response = await axios.post('/api/auth/register', apiData);
    return response.data;
  },
  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await axios.post('/api/auth/forgot-password', data);
    return response.data;
  },
  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await axios.post('/api/auth/reset-password', data);
    return response.data;
  },
  resendVerification: async (data: ForgotPasswordRequest) => {
    const response = await axios.post('/api/auth/resend-verification', data);
    return response.data;
  },
  verify: async (data: VerifyRequest) => {
    const response = await axios.post('/api/auth/verify', data);
    return response.data;
  },
  getUserSesionByToken: async (token: string) => {
    const response = await axios.get('/api/auth/session', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
};
