import { NextResponse, NextRequest } from 'next/server';
import { requestPasswordReset } from '@/backend/userModule/userController';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const result = await requestPasswordReset(email);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error en la solicitud';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
