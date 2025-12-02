import { NextResponse, NextRequest } from 'next/server';
import { verifyUserToken } from '@/backend/userModule/userController';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token faltante' }, { status: 400 });
    }

    const result = await verifyUserToken(token);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error verificando token';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
