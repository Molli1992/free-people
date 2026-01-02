import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Company, CompanyPayload } from '@/types/companies';

export const getFullCompanies = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, name, image FROM companies'
  );
  return rows as Company[];
};

export const getCompanyById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM companies WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? (rows[0] as Company) : null;
};

export const createCompany = async (companyData: CompanyPayload) => {
  const { name, image } = companyData;

  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO companies (name, image) VALUES (?, ?)',
    [name, image]
  );
  return result;
};

export const updateCompany = async (
  id: number,
  companyData: CompanyPayload
) => {
  const fields: string[] = [];
  const values: (number | string)[] = [];

  if (companyData.name) {
    fields.push('name = ?');
    values.push(companyData.name);
  }
  if (companyData.image) {
    fields.push('image = ?');
    values.push(companyData.image);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE companies SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result;
};

export const deleteCompany = async (id: number) => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM companies WHERE id = ?',
    [id]
  );
  return result;
};
