import { User } from '@/types/users';

export const sanitizeUser = (user: User) => {
  const {
    password,
    verificationToken,
    resetPasswordToken,
    ...userWithoutSensitiveData
  } = user;
  return userWithoutSensitiveData;
};
