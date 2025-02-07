import { NextResponse } from 'next/server';
import { sendOrderNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Données reçues:', body);

    const { packName, customerDetails, pack } = body;

    if (!packName || !customerDetails || !pack) {
      return NextResponse.json(
        { success: false, message: 'Données incomplètes' },
        { status: 400 }
      );
    }

    const orderId = Math.random().toString(36).substring(7);

    try {
      await sendOrderNotification({
        id: orderId,
        packName,
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        customerCompany: customerDetails.company || undefined,
        message: customerDetails.message || undefined,
        amount: pack.price,
      });

      return new NextResponse(
        JSON.stringify({
          success: true,
          orderId,
          message: "Commande reçue avec succès"
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (emailError) {
      console.error('Erreur email:', emailError);
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Erreur lors de l\'envoi de l\'email'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Erreur générale:', error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Erreur lors du traitement de la commande'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
