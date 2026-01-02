import { NextResponse, NextRequest } from 'next/server';
import {
  getCompanies,
  addCompany,
} from '@/backend/companiesModule/companiesController';

export async function GET() {
  try {
    const companies = await getCompanies();
    return NextResponse.json(companies);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error obteniendo compañía';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await addCompany(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error creando compañía';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
