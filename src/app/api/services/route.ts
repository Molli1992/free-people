import { NextResponse, NextRequest } from 'next/server';
import {
  getServices,
  addService,
} from '@/backend/servicesModule/servicesController';
import { ServiceCreateInput } from '@/types/services';

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error obteniendo servicios';
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

    const data: ServiceCreateInput = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      image: files,
    };

    const result = await addService(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error creando servicio';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
