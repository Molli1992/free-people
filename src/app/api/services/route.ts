import { NextResponse, NextRequest } from 'next/server';
import {
  getServices,
  addService,
} from '@/backend/servicesModule/servicesController';

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
    const data = await request.json();
    const result = await addService(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error creando servicio';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
