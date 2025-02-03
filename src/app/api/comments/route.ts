import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    // Données simulées pour l'exemple
    const mockComments = [
      {
        id: '1',
        author: 'Jean Dupont',
        content: 'Excellent service, très professionnel !',
        timestamp: '2025-01-28T10:30:00Z'
      },
      {
        id: '2',
        author: 'Marie Martin',
        content: 'Très satisfait du résultat final.',
        timestamp: '2025-01-28T09:15:00Z'
      },
      {
        id: '3',
        author: 'Pierre Durand',
        content: 'Communication claire et efficace.',
        timestamp: '2025-01-27T16:45:00Z'
      },
      {
        id: '4',
        author: 'Sophie Bernard',
        content: 'Je recommande vivement !',
        timestamp: '2025-01-27T14:20:00Z'
      },
      {
        id: '5',
        author: 'Lucas Petit',
        content: 'Délais respectés, travail de qualité.',
        timestamp: '2025-01-27T11:00:00Z'
      }
    ].slice(0, limit);

    return NextResponse.json(mockComments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
