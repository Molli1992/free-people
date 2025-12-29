import { NextResponse, NextRequest } from 'next/server';
import {
  updateReview,
  deleteReview,
} from '@/backend/reviewsModule/reviewsController';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const result = await updateReview(Number(id), data);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error editando review';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteReview(Number(id));
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error eliminando review';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
