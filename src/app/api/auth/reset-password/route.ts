import { NextResponse, NextRequest } from 'next/server';
import { resetPassword } from '@/backend/userModule/userController';

export async function POST(request: NextRequest) {
  try {
    const { token, email, password } = await request.json();
    const result = await resetPassword(token, email, password);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error restableciendo contraseña';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
