import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Pour l'exemple, je simule des données. Dans un cas réel, vous devrez les récupérer
    // depuis votre base de données ou votre service d'analytics
    const mockData = {
      totalVisits: 1250,
      uniqueVisitors: 850,
      pageViews: [
        {
          path: '/',
          title: 'Accueil',
          visits: 450,
          uniqueVisitors: 380,
          averageTime: 120, // en secondes
          bounceRate: 35
        },
        {
          path: '/services',
          title: 'Nos Services',
          visits: 320,
          uniqueVisitors: 280,
          averageTime: 180,
          bounceRate: 25
        },
        {
          path: '/contact',
          title: 'Contact',
          visits: 180,
          uniqueVisitors: 160,
          averageTime: 90,
          bounceRate: 45
        },
        {
          path: '/blog',
          title: 'Blog',
          visits: 150,
          uniqueVisitors: 120,
          averageTime: 240,
          bounceRate: 20
        },
        {
          path: '/portfolio',
          title: 'Portfolio',
          visits: 150,
          uniqueVisitors: 130,
          averageTime: 300,
          bounceRate: 15
        }
      ],
      peakHours: [
        { hour: 9, visits: 120 },
        { hour: 10, visits: 180 },
        { hour: 11, visits: 210 },
        { hour: 14, visits: 190 },
        { hour: 15, visits: 170 }
      ],
      sources: [
        { name: 'Recherche Google', visits: 520 },
        { name: 'Direct', visits: 320 },
        { name: 'Réseaux sociaux', visits: 250 },
        { name: 'Autres moteurs', visits: 160 }
      ],
      devices: [
        { type: 'Desktop', count: 450 },
        { type: 'Mobile', count: 320 },
        { type: 'Tablet', count: 80 }
      ]
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques de visite:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
