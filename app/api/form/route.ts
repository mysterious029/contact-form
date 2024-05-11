import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse<unknown>> {
  try {
    const { name, email, message, company } = await request.json();

    const submission = await prisma.dataForm.create({
      data: {
        name,
        email,
        message,
        company,
      },
    });

    return new NextResponse(JSON.stringify({ submission }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return new NextResponse(null, { status: 500 });
  }
}
