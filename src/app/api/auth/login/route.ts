import { NextResponse, NextRequest } from 'next/server';
import { loginUser } from '@/backend/userModule/userController';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const user = await loginUser(email, password);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error al inicar sesion';
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
