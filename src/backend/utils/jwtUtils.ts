import jwt from 'jsonwebtoken';
import { TokenPayload } from '@/types/types';

const SECRET = process.env.JWT_SECRET || 'defaul_jwt_secret';

export const generateToken = (
  payload: TokenPayload,
  expiresIn: string | number
) => {
  return jwt.sign(payload, SECRET, { expiresIn } as jwt.SignOptions);
};

export const verifyTokenJWT = (token: string) => {
  try {
    return jwt.verify(token, SECRET) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('El enlace ha expirado. Por favor solicita uno nuevo.');
    }
    throw new Error('Token inválido o corrupto.');
  }
};
