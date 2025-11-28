import * as userUtils from './userUtils';
import { UserPayload } from '@/types/types';
import { sendVerificationEmail } from '@/backend/emailModule/emailUtils';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { sanitizeUser } from './userHelpers';

export const getUsers = async () => {
  const users = await userUtils.getAllUsers();
  return users.map((user) => sanitizeUser(user));
};

export const loginUser = async (email: string, passwordPlain: string) => {
  const user = await userUtils.getUserByEmail(email);

  if (!user || !user.password) throw new Error('Usuario no encontrado');

  const isMatch = await bcrypt.compare(passwordPlain, user.password);

  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  if (!user.isEmailConfirmed) {
    throw new Error('Debes validar tu email antes de ingresar.');
  }

  return {
    message: 'Te has logeado exitosamente.',
    data: sanitizeUser(user),
  };
};

export const registerUser = async (data: UserPayload) => {
  if (!data.email || !data.name || !data.password || !data.lastName) {
    throw new Error('Faltan datos obligatorios');
  }

  const existingUser = await userUtils.getUserByEmail(data.email);
  if (existingUser) throw new Error('El email ya está registrado');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  const token = uuidv4();
  const newUserPayload = { ...data, password: hashedPassword };

  await userUtils.createUser(newUserPayload, token);

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

export const modifyUser = async (id: string, data: UserPayload) => {
  if (data.password) {
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);
  }

  const result = await userUtils.updateUser(id, data);

  if (result && result.affectedRows === 0) {
    throw new Error('Usuario no encontrado o no hubo cambios');
  }

  const updatedUser = await userUtils.getUserById(id);

  if (!updatedUser) {
    throw new Error('Error recuperando el usuario actualizado');
  }

  return {
    message: 'Usuario actualizado correctamente',
    data: sanitizeUser(updatedUser),
  };
};

export const removeUser = async (id: string) => {
  const result = await userUtils.deleteUser(id);
  if (result.affectedRows === 0) throw new Error('Usuario no encontrado');
  return { message: 'Usuario eliminado correctamente' };
};
