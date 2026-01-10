import { NextResponse, NextRequest } from 'next/server';
import {
  getCompanies,
  addCompany,
} from '@/backend/companiesModule/companiesController';
import { CompanyCreateInput } from '@/types/companies';

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
    const formData = await request.formData();

    const imagesRaw = formData.getAll('image');
    const files = imagesRaw.filter(
      (item): item is File => item instanceof File
    );

    const data: CompanyCreateInput = {
      name: formData.get('name') as string,
      image: files,
    };

    const result = await addCompany(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error creando compañía';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
