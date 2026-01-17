import { NextResponse } from 'next/server';
import { getUsers } from '@/backend/userModule/userController';

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error obteniendo usuarios';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
