import { NextResponse, NextRequest } from 'next/server';
import { getTeam, addTeamMember } from '@/backend/teamModule/teamController';
import { TeamCreateInput } from '@/types/team';

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
    const formData = await request.formData();

    const imagesRaw = formData.getAll('image');
    const files = imagesRaw.filter(
      (item): item is File => item instanceof File
    );

    const data: TeamCreateInput = {
      name: formData.get('name') as string,
      profession: formData.get('profession') as string,
      linkedin: formData.get('linkedin') as string,
      instagram: formData.get('instagram') as string,
      facebook: formData.get('facebook') as string,
      image: files,
    };

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
