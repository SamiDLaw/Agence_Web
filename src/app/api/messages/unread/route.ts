import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Données simulées pour l'exemple
    const mockMessages = [
      {
        id: '1',
        sender: 'Jean Dupont',
        preview: 'Question concernant le projet...',
        timestamp: '2025-01-28T10:30:00Z'
      },
      {
        id: '2',
        sender: 'Marie Martin',
        preview: 'Modification demandée pour...',
        timestamp: '2025-01-28T09:15:00Z'
      },
      {
        id: '3',
        sender: 'Pierre Durand',
        preview: 'Nouveau projet à discuter',
        timestamp: '2025-01-27T16:45:00Z'
      }
    ];

    return NextResponse.json(mockMessages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
