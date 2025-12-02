import { NextResponse } from 'next/server';
import { resendVerificationToken } from '@/backend/userModule/userController';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'El email es requerido' },
        { status: 400 }
      );
    }

    const response = await resendVerificationToken(email);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error interno del servidor';

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
