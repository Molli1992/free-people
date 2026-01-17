import * as userServices from './userServices';
import { UserPayload } from '@/types/users';
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from '@/backend/emailModule/emailUtils';
import bcrypt from 'bcrypt';
import { sanitizeUser } from './userUtils';
import { generateToken, verifyTokenJWT } from '../utils/jwtUtils';

const tokenErrorMessage = "El enlace ha expirado. Por favor solicita uno nuevo."

export const getUsers = async () => {
  const users = await userServices.getAllUsers();
  return users.map((user) => sanitizeUser(user));
};

export const loginUser = async (email: string, passwordPlain: string) => {
  const user = await userServices.getUserByEmail(email);

  if (!user || !user.password)
    throw new Error(`El usuario con el email: ${email} no existe`);

  const isMatch = await bcrypt.compare(passwordPlain, user.password);

  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  if (!user.isEmailConfirmed) {
    throw new Error('Debes validar tu email antes de ingresar.');
  }

  if (!user.isActive) {
    throw new Error('El administrador debe aceptar tu cuenta.');
  }

  const token = generateToken(
    { email: email, type: 'verification' },
    '24h'
  );

  const updateData = {
    authToken: token
  }

  const result = await userServices.updateUser(user.id, updateData);

  if (result && result.affectedRows === 0) {
    throw new Error('Error al actualizar token de sesión');
  }

  const updatedUser = await userServices.getUserById(user.id);

  if (!updatedUser) {
    throw new Error('Error recuperando el usuario');
  }

  return {
    message: 'Te has logeado exitosamente.',
    data: sanitizeUser(updatedUser),
  };
};

export const registerUser = async (data: UserPayload) => {
  if (!data.email || !data.name || !data.password || !data.lastName) {
    throw new Error('Faltan datos obligatorios');
  }

  const existingUser = await userServices.getUserByEmail(data.email);
  if (existingUser) throw new Error('El email ya está registrado');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  const token = generateToken(
    { email: data.email, type: 'verification' },
    '24h'
  );
  const newUserPayload = { ...data, password: hashedPassword };

  await userServices.createUser(newUserPayload, token);

  try {
    await sendVerificationEmail(data.email, data.name, token);
  } catch (error) {
    console.error('Error enviando email de verificacion', error);
  }

  return {
    message:
      'Usuario creado. Por favor revisa tu email para activar la cuenta.',
  };
};

export const modifyUser = async (id: number, data: UserPayload) => {
  if (data.password) {
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);
  }

  const result = await userServices.updateUser(id, data);

  if (result && result.affectedRows === 0) {
    throw new Error('Usuario no encontrado o no hubo cambios');
  }

  const updatedUser = await userServices.getUserById(id);

  if (!updatedUser) {
    throw new Error('Error recuperando el usuario actualizado');
  }

  return {
    message: 'Usuario actualizado correctamente',
    data: sanitizeUser(updatedUser),
  };
};

export const removeUser = async (id: number) => {
  const result = await userServices.deleteUser(id);
  if (result.affectedRows === 0) throw new Error('Usuario no encontrado');
  return { message: 'Usuario eliminado correctamente' };
};

export const verifyUserToken = async (token: string) => {
  verifyTokenJWT(token, tokenErrorMessage);

  const user = await userServices.getUserByToken(token);

  if (!user) {
    throw new Error('Token inválido o ya utilizado.');
  }

  if (user.isEmailConfirmed) {
    return { message: 'El correo ya ha sido verificado anteriormente.' };
  }

  const userId = user.id;

  await userServices.updateUser(userId, {
    isEmailConfirmed: true,
    verificationToken: null,
  });

  return { message: 'Cuenta verificada exitosamente.' };
};

export const requestPasswordReset = async (email: string) => {
  const user = await userServices.getUserByEmail(email);

  if (!user) {
    throw new Error('El usuario no existe.');
  }

  const token = generateToken({ email: user.email, type: 'reset' }, '1h');
  const userId = user.id;

  await userServices.updateUser(userId, {
    resetPasswordToken: token,
  });

  try {
    await sendPasswordResetEmail(user.email, user.name, token);
  } catch (error) {
    console.error('Error enviando email de reset', error);
    throw new Error('Error enviando el correo de recuperación.');
  }

  return { message: 'Correo de recuperación enviado exitosamente.' };
};

export const resetPassword = async (
  token: string,
  email: string,
  newPassword: string
) => {
  verifyTokenJWT(token, tokenErrorMessage);

  const user = await userServices.getUserByEmail(email);

  if (!user) {
    throw new Error('Usuario no válido.');
  }

  if (user.resetPasswordToken !== token) {
    throw new Error('El token es inválido o ha expirado.');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  const userId = user.id;

  await userServices.updateUser(userId, {
    password: hashedPassword,
    resetPasswordToken: null,
  });

  return { message: 'Contraseña restablecida correctamente.' };
};

export const resendVerificationToken = async (email: string) => {
  const user = await userServices.getUserByEmail(email);

  if (!user) {
    throw new Error('El usuario no existe.');
  }

  if (user.isEmailConfirmed) {
    throw new Error('Esta cuenta ya ha sido verificada anteriormente.');
  }

  const token = generateToken(
    { email: user.email, type: 'verification' },
    '24h'
  );
  const userId = user.id;

  await userServices.updateUser(userId, {
    verificationToken: token,
  });

  try {
    await sendVerificationEmail(user.email, user.name, token);
  } catch (error) {
    console.error('Error reenviando email de verificacion', error);
    throw new Error('Error enviando el correo de verificación.');
  }

  return { message: 'Nuevo enlace de verificación enviado exitosamente.' };
};

export const getUserSesionByToken = async (token: string) => {
  const sesionErrorMessage = "La sesión ha expirado.";
  verifyTokenJWT(token, sesionErrorMessage);

  const user = await userServices.getUserByAuthToken(token);

  if (!user) {
    throw new Error(`Sesión no encontrada en el servidor`);
  }

  if (!user.isEmailConfirmed) {
    throw new Error('Debes validar tu email antes de ingresar.');
  }

  if (!user.isActive) {
    throw new Error('El administrador debe aceptar tu cuenta.');
  }

  return {
    message: 'Sesión validada con éxito.',
    data: sanitizeUser(user),
  };
}
