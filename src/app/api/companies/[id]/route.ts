import { NextResponse, NextRequest } from 'next/server';
import {
  updateCompany,
  deleteCompany,
} from '@/backend/companiesModule/companiesController';
import { CompanyUpdateInput } from '@/types/companies';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const imagesRaw = formData.getAll('image');

    const files: File[] = [];
    const existingUrls: string[] = [];

    imagesRaw.forEach((item) => {
      if (item instanceof File) {
        files.push(item);
      } else if (typeof item === 'string') {
        existingUrls.push(item);
      }
    });

    const data: CompanyUpdateInput = {
      name: formData.get('name') as string,
      newFiles: files,
      existingImages: existingUrls,
    };

    const result = await updateCompany(Number(id), data);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error editando compañía';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteCompany(Number(id));
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error eliminando compañía';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
