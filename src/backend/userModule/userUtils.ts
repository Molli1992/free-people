import { User } from '@/types/types';

export const sanitizeUser = (user: User) => {
  const { password, verificationToken, ...userWithoutSensitiveData } = user;
  return userWithoutSensitiveData;
};
