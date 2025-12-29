import { NextResponse, NextRequest } from 'next/server';
import {
  getReviews,
  addReview,
} from '@/backend/reviewsModule/reviewsController';

export async function GET() {
  try {
    const reviews = await getReviews();
    return NextResponse.json(reviews);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error obteniendo reviews';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await addReview(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error creando review';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
