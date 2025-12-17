import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Project, ProjectPayload } from '@/types/projects';

export const getAllProjects = async () => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, images, title, type, description, challenge, finalView FROM projects'
  );
  return rows as Project[];
};

export const getProjectById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM projects WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? (rows[0] as Project) : null;
};

export const createProject = async (projectData: ProjectPayload) => {
  const { images, title, type, description, challenge, finalView } =
    projectData;

  const imagesJson = JSON.stringify(images);

  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO projects (images, title, type, description, challenge, finalView) VALUES (?, ?, ?, ?, ?, ?)',
    [imagesJson, title, type, description, challenge, finalView]
  );
  return result;
};

export const updateProject = async (
  id: number,
  projectData: ProjectPayload
) => {
  const fields: string[] = [];
  const values: (string[] | number | string)[] = [];

  if (projectData.images) {
    fields.push('images = ?');
    values.push(JSON.stringify(projectData.images));
  }
  if (projectData.title) {
    fields.push('title = ?');
    values.push(projectData.title);
  }
  if (projectData.type) {
    fields.push('type = ?');
    values.push(projectData.type);
  }
  if (projectData.description) {
    fields.push('description = ?');
    values.push(projectData.description);
  }
  if (projectData.challenge) {
    fields.push('challenge = ?');
    values.push(projectData.challenge);
  }
  if (projectData.finalView) {
    fields.push('finalView = ?');
    values.push(projectData.finalView);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result;
};

export const deleteProject = async (id: number) => {
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM projects WHERE id = ?',
    [id]
  );
  return result;
};
