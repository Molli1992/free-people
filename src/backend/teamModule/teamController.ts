import * as teamServices from './teamServices';
import { TeamPayload, TeamUpdateInput, TeamCreateInput } from '@/types/team';
import cloudinary from '../config/cloudinary';

export const getTeam = async () => {
  const team = await teamServices.getFullTeam();
  return team;
};

export const addTeamMember = async (data: TeamCreateInput) => {
  if (
    !data.name ||
    !data.profession ||
    !data.image ||
    !data.linkedin ||
    !data.instagram ||
    !data.facebook
  ) {
    throw new Error('Faltan datos obligatorios');
  }

  const uploadPromises = data.image.map(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'team' },
        (error, result) => {
          if (error) return reject(error);
          if (result?.secure_url) resolve(result.secure_url);
          else reject(new Error('Error al obtener la URL de Cloudinary'));
        }
      );
      uploadStream.end(buffer);
    });
  });

  const imageUrls = await Promise.all(uploadPromises);
  const dbData = {
    ...data,
    image: imageUrls[0],
  };

  const createdTeamMember = await teamServices.createMember(dbData);
  const newMember = await teamServices.getMemberById(
    createdTeamMember.insertId
  );

  if (!newMember) {
    throw new Error('Error recuperando al miembro del equipo creado');
  }

  return {
    message: 'Miembro del equipo creado correctamente.',
    data: newMember,
  };
};

export const updateTeamMember = async (id: number, data: TeamUpdateInput) => {
  const uploadPromises = data.newFiles.map(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'team' },
        (error, result) => {
          if (error) return reject(error);
          if (result?.secure_url) resolve(result.secure_url);
          else reject(new Error('Error al obtener la URL de Cloudinary'));
        }
      );
      uploadStream.end(buffer);
    });
  });

  const newImageUrls = await Promise.all(uploadPromises);

  const finalImagesList = [...data.existingImages, ...newImageUrls];

  const dbData: TeamPayload = {
    name: data.name,
    profession: data.profession,
    linkedin: data.linkedin,
    instagram: data.instagram,
    facebook: data.facebook,
    image: finalImagesList[0],
  };

  const result = await teamServices.updateMember(id, dbData);

  if (result && result.affectedRows === 0) {
    throw new Error('Miembro del equipo no encontrado o no hubo cambios');
  }

  const updatedMember = await teamServices.getMemberById(id);

  if (!updatedMember) {
    throw new Error('Error recuperando el miembro del equipo actualizado');
  }

  return {
    message: 'Miembro del equipo actualizado correctamente',
    data: updatedMember,
  };
};

export const deleteTeamMember = async (id: number) => {
  const result = await teamServices.deleteMember(id);
  if (result.affectedRows === 0)
    throw new Error('Miembro del equipo no encontrado');

  return { message: 'Miembro del equipo eliminado correctamente' };
};
