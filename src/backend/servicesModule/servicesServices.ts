import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Service, ServicePayload } from '@/types/services';

export const getFullServices = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, name, image, description FROM services'
  );
  return rows as Service[];
};

export const getServiceById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM services WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? (rows[0] as Service) : null;
};

export const createService = async (serviceData: ServicePayload) => {
  const { name, image, description } = serviceData;

  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO services (name, image, description) VALUES (?, ?, ?)',
    [name, image, description]
  );
  return result;
};

export const updateService = async (
  id: number,
  serviceData: ServicePayload
) => {
  const fields: string[] = [];
  const values: (number | string | File)[] = [];

  if (serviceData.name) {
    fields.push('name = ?');
    values.push(serviceData.name);
  }
  if (serviceData.image) {
    fields.push('image = ?');
    values.push(serviceData.image);
  }
  if (serviceData.description) {
    fields.push('description = ?');
    values.push(serviceData.description);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE services SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result;
};

export const deleteService = async (id: number) => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM services WHERE id = ?',
    [id]
  );
  return result;
};
