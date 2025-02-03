import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { packId, customerDetails, projectDetails, paymentMethod } = body;

    if (!['card', 'cash'].includes(paymentMethod)) {
      return NextResponse.json(
        { error: 'Méthode de paiement invalide' },
        { status: 400 }
      );
    }

    // Récupérer le pack depuis la base de données
    const pack = await prisma.pack.findUnique({
      where: { id: packId },
    });

    if (!pack) {
      return NextResponse.json(
        { error: 'Pack non trouvé' },
        { status: 404 }
      );
    }

    // Créer la commande dans la base de données
    const order = await prisma.order.create({
      data: {
        packId,
        userId: 'guest', // À remplacer par l'ID de l'utilisateur si connecté
        status: paymentMethod === 'cash' ? 'awaiting_confirmation' : 'pending',
        amount: pack.price,
        paymentMethod,
        customerDetails,
        projectDetails,
      },
    });

    // Si paiement en espèces, retourner directement l'ID de la commande
    if (paymentMethod === 'cash') {
      return NextResponse.json({ 
        orderId: order.id,
        message: 'Commande créée avec succès. Notre équipe vous contactera pour finaliser le paiement.'
      });
    }

    // Sinon, créer la session Stripe pour le paiement par carte
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: pack.name,
              description: pack.description,
            },
            unit_amount: Math.round(pack.price * 100), // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        orderId: order.id,
      },
    });

    // Mettre à jour la commande avec l'ID de session Stripe
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session' },
      { status: 500 }
    );
  }
}
