import { User } from '@/types/users';

export const sanitizeUser = (user: User) => {
  const { password, verificationToken, ...userWithoutSensitiveData } = user;
  return userWithoutSensitiveData;
};
