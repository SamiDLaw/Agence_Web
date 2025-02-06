import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { sendNotificationEmail } from '@/lib/email';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    // Données simulées pour l'exemple
    const mockOrders = [
      {
        id: '1',
        customerName: 'Jean Dupont',
        service: 'Site Web E-commerce',
        status: 'En cours',
        amount: 2500
      },
      {
        id: '2',
        customerName: 'Marie Martin',
        service: 'Application Mobile',
        status: 'Terminé',
        amount: 3500
      },
      {
        id: '3',
        customerName: 'Pierre Durand',
        service: 'SEO Optimization',
        status: 'En attente',
        amount: 800
      },
      {
        id: '4',
        customerName: 'Sophie Bernard',
        service: 'Refonte Site Web',
        status: 'En cours',
        amount: 1500
      },
      {
        id: '5',
        customerName: 'Lucas Petit',
        service: 'Marketing Digital',
        status: 'Terminé',
        amount: 1200
      }
    ].slice(0, limit);

    return NextResponse.json(mockOrders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { packId, packName, customerDetails, pack } = body;

    // Créer la commande dans la base de données
    const order = await prisma.order.create({
      data: {
        packId,
        status: 'PENDING',
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        customerCompany: customerDetails.company,
        message: customerDetails.message,
      },
    });

    // Envoyer une notification par email
    await sendNotificationEmail({
      id: order.id,
      packName,
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      customerPhone: customerDetails.phone,
      customerCompany: customerDetails.company || undefined,
      message: customerDetails.message || undefined,
      amount: pack.price,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
