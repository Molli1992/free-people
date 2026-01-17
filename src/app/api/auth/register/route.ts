import { NextResponse, NextRequest } from 'next/server';
import { registerUser } from '@/backend/userModule/userController';

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