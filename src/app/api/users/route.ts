import { NextResponse, NextRequest } from 'next/server';
import { getUsers, registerUser } from '@/backend/userModule/userController';

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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await registerUser(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error registrando usuario';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
