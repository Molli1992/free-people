import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Review, ReviewPayload } from '@/types/reviews';

export const getFullReviews = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, name, occupation, description FROM reviews'
  );
  return rows as Review[];
};

export const getReviewById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM reviews WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? (rows[0] as Review) : null;
};

export const createReview = async (reviewData: ReviewPayload) => {
  const { name, occupation, description } = reviewData;

  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO reviews (name, occupation, description) VALUES (?, ?, ?)',
    [name, occupation, description]
  );
  return result;
};

export const updateReview = async (id: number, reviewData: ReviewPayload) => {
  const fields: string[] = [];
  const values: (number | string)[] = [];

  if (reviewData.name) {
    fields.push('name = ?');
    values.push(reviewData.name);
  }
  if (reviewData.occupation) {
    fields.push('occupation = ?');
    values.push(reviewData.occupation);
  }
  if (reviewData.description) {
    fields.push('description = ?');
    values.push(reviewData.description);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE reviews SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result;
};

export const deleteReview = async (id: number) => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM reviews WHERE id = ?',
    [id]
  );
  return result;
};
