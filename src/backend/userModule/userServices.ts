import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { User, UserPayload } from '@/types/users';

export const getAllUsers = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, name, lastName, email, isActive FROM users'
  );
  return rows as User[];
};

export const getUserByEmail = async (email: string) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows.length > 0 ? (rows[0] as User) : null;
};

export const getUserById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? (rows[0] as User) : null;
};

export const getUserByToken = async (token: string) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE verificationToken = ?',
    [token]
  );
  return rows.length > 0 ? (rows[0] as User) : null;
};

export const getUserByAuthToken = async (token: string) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE authToken = ?',
    [token]
  );
  return rows.length > 0 ? (rows[0] as User) : null;
};

export const createUser = async (userData: UserPayload, token: string) => {
  const { name, lastName, email, password } = userData;
  const createdAt = new Date();
  const isEmailConfirmed = false;
  const isActive = false;

  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (name, lastName, email, password, created_at, isEmailConfirmed, isActive, verificationToken) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      name,
      lastName,
      email,
      password,
      createdAt,
      isEmailConfirmed,
      isActive,
      token,
    ]
  );
  return result;
};

export const updateUser = async (id: number, userData: UserPayload) => {
  const fields: string[] = [];
  const values: (string | boolean | null | number | undefined)[] = [];

  if (userData.name) {
    fields.push('name = ?');
    values.push(userData.name);
  }
  if (userData.lastName) {
    fields.push('lastName = ?');
    values.push(userData.lastName);
  }
  if (userData.email) {
    fields.push('email = ?');
    values.push(userData.email);
  }
  if (userData.password) {
    fields.push('password = ?');
    values.push(userData.password);
  }
  if (userData.isEmailConfirmed !== undefined) {
    fields.push('isEmailConfirmed = ?');
    values.push(userData.isEmailConfirmed);
  }
  if (userData.verificationToken !== undefined) {
    fields.push('verificationToken = ?');
    values.push(userData.verificationToken);
  }
  if (userData.resetPasswordToken !== undefined) {
    fields.push('resetPasswordToken = ?');
    values.push(userData.resetPasswordToken);
  }
  if (userData.isActive !== undefined) {
    fields.push('isActive = ?');
    values.push(userData.isActive);
  }
  if (userData.authToken !== undefined) {
    fields.push('authToken = ?');
    values.push(userData.authToken);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result;
};

export const deleteUser = async (id: number) => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return result;
};
