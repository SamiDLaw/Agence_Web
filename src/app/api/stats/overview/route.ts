import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Données simulées pour l'exemple
    const mockData = {
      dailyVisitors: 245,
      conversionRate: 3.5,
      averageOrderValue: 750,
      totalRevenue: 15000
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
