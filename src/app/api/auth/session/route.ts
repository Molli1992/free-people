import { NextResponse, NextRequest } from 'next/server';
import { getUserSesionByToken } from '@/backend/userModule/userController';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Token invalido' }, { status: 401 });
        }

        const user = await getUserSesionByToken(token);
        return NextResponse.json(user);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error obteniendo usuario';
        return NextResponse.json({ error: errorMessage }, { status: 401 });
    }
}