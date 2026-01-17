export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  created_at: Date;
  isEmailConfirmed: boolean;
  isActive: boolean | string;
  authToken: string,
  verificationToken?: string | null;
  resetPasswordToken?: string | null;
}

export interface UserPayload {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isEmailConfirmed?: boolean;
  verificationToken?: string | null;
  resetPasswordToken?: string | null;
  isActive?: boolean;
  authToken?: string | null;
}

export interface TokenPayload {
  email: string;
  type: 'verification' | 'reset';
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest extends UserPayload {
  repeatPassword?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
}

export interface VerifyRequest {
  token: string;
}

export interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  isLogin: (data: User) => Promise<void>;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  requestResetPassword: (
    data: ForgotPasswordRequest,
    onSuccess: () => void
  ) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  resendVerification: (
    data: ForgotPasswordRequest,
    onSuccess: () => void
  ) => Promise<void>;
  verifyAccount: (token: string) => Promise<string | null>;
  getSession: () => Promise<User | null>;
  logOut: () => void;
}

export interface UseUsersReturn {
  loading: boolean;
  error: string | null;
  getUsersList: () => Promise<User[]>;
  toggleUserActive: (
    userId: number,
    isActive: boolean
  ) => Promise<User | undefined>;
  deleteUser: (id: number) => Promise<User | undefined>;
}
