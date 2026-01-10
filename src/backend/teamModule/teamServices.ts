import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Team, TeamPayload } from '@/types/team';

export const getFullTeam = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, name, profession, image, linkedin, instagram, facebook FROM team'
  );
  return rows as Team[];
};

export const getMemberById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM team WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? (rows[0] as Team) : null;
};

export const createMember = async (memberData: TeamPayload) => {
  const { name, profession, image, linkedin, instagram, facebook } = memberData;

  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO team (name, profession, image, linkedin, instagram, facebook) VALUES (?, ?, ?, ?, ?, ?)',
    [name, profession, image, linkedin, instagram, facebook]
  );
  return result;
};

export const updateMember = async (id: number, memberData: TeamPayload) => {
  const fields: string[] = [];
  const values: (number | string | boolean | null | File | undefined)[] = [];

  if (memberData.name) {
    fields.push('name = ?');
    values.push(memberData.name);
  }
  if (memberData.profession) {
    fields.push('profession = ?');
    values.push(memberData.profession);
  }
  if (memberData.image) {
    fields.push('image = ?');
    values.push(memberData.image);
  }
  if (memberData.linkedin) {
    fields.push('linkedin = ?');
    values.push(memberData.linkedin);
  }
  if (memberData.instagram) {
    fields.push('instagram = ?');
    values.push(memberData.instagram);
  }
  if (memberData.facebook) {
    fields.push('facebook = ?');
    values.push(memberData.facebook);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE team SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result;
};

export const deleteMember = async (id: number) => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM team WHERE id = ?',
    [id]
  );
  return result;
};
