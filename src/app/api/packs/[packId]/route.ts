import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { packId: string } }
) {
  try {
    const pack = await prisma.pack.findUnique({
      where: { id: params.packId },
    });

    if (!pack) {
      return NextResponse.json(
        { error: 'Pack non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(pack);
  } catch (error) {
    console.error('Erreur lors de la récupération du pack:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
