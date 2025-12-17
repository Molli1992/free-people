import { NextResponse, NextRequest } from 'next/server';
import {
  getAllProjects,
  addProject,
} from '@/backend/projectsModule/projectsController';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error obteniendo proyectos';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await addProject(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error creando proyecto';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
