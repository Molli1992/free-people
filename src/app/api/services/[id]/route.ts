import { NextResponse, NextRequest } from 'next/server';
import {
  updateService,
  deleteService,
} from '@/backend/servicesModule/servicesController';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const result = await updateService(Number(id), data);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error editando servicio';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteService(Number(id));
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error eliminando servicio';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
