import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { User, UserPayload } from '@/types/types';

export const getAllUsers = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, name, lastName, email, created_at, isEmailConfirmed FROM users'
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

export const getUserById = async (id: string) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? (rows[0] as User) : null;
};

export const createUser = async (userData: UserPayload, token: string) => {
  const { name, lastName, email, password } = userData;
  const createdAt = new Date();
  const isEmailConfirmed = false;

  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (name, lastName, email, password, created_at, isEmailConfirmed, verificationToken) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, lastName, email, password, createdAt, isEmailConfirmed, token]
  );
  return result;
};

export const updateUser = async (id: string, userData: UserPayload) => {
  const fields: string[] = [];
  const values: (string | boolean | null | undefined)[] = [];

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
  if (userData.isEmailConfirmed) {
    fields.push('isEmailConfirmed = ?');
    values.push(userData.isEmailConfirmed);
  }
  if (userData.verificationToken) {
    fields.push('verificationToken = ?');
    values.push(userData.verificationToken);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result;
};

export const deleteUser = async (id: string) => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return result;
};
