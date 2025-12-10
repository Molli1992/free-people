import { NextResponse, NextRequest } from 'next/server';
import {
  updateTeamMember,
  deleteTeamMember,
} from '@/backend/teamModule/teamController';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
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
