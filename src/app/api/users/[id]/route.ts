import { NextResponse, NextRequest } from 'next/server';
import { modifyUser, removeUser } from '@/backend/userModule/userController';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const result = await modifyUser(id, data);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error editando usuario';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await removeUser(id);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error eliminando usuario';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
