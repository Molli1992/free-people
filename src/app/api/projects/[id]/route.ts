import { NextResponse, NextRequest } from 'next/server';
import {
  updateProject,
  deleteProject,
  getProject,
} from '@/backend/projectsModule/projectsController';
import { ProjectUpdateInput } from '@/types/projects';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await getProject(Number(id));

    if (!project) {
      return NextResponse.json(
        { error: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error obteniendo proyecto';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const imagesRaw = formData.getAll('images');

    const files: File[] = [];
    const existingUrls: string[] = [];

    imagesRaw.forEach((item) => {
      if (item instanceof File) {
        files.push(item);
      } else if (typeof item === 'string') {
        existingUrls.push(item);
      }
    });

    const data: ProjectUpdateInput = {
      title: formData.get('title') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      challenge: formData.get('challenge') as string,
      finalView: formData.get('finalView') as string,
      newFiles: files,
      existingImages: existingUrls,
    };

    const result = await updateProject(Number(id), data);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error editando proyecto';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteProject(Number(id));
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error eliminando proyecto';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
