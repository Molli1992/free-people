import { NextResponse, NextRequest } from 'next/server';
import { getTeam, addTeamMember } from '@/backend/teamModule/teamController';

export async function GET() {
  try {
    const team = await getTeam();
    return NextResponse.json(team);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error obteniendo equipo';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await addTeamMember(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error creando miembro del equipo';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
