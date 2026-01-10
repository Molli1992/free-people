import { NextResponse, NextRequest } from 'next/server';
import {
  updateTeamMember,
  deleteTeamMember,
} from '@/backend/teamModule/teamController';
import { TeamUpdateInput } from '@/types/team';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const imagesRaw = formData.getAll('image');

    const files: File[] = [];
    const existingUrls: string[] = [];

    imagesRaw.forEach((item) => {
      if (item instanceof File) {
        files.push(item);
      } else if (typeof item === 'string') {
        existingUrls.push(item);
      }
    });

    const data: TeamUpdateInput = {
      name: formData.get('name') as string,
      profession: formData.get('profession') as string,
      linkedin: formData.get('linkedin') as string,
      instagram: formData.get('instagram') as string,
      facebook: formData.get('facebook') as string,
      newFiles: files,
      existingImages: existingUrls,
    };

    const result = await updateTeamMember(Number(id), data);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error editando miembro del equipo';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteTeamMember(Number(id));
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error eliminando miembro del equipo';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
