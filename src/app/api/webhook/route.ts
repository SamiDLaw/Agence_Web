import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmationEmail } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('Erreur de signature webhook:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Mettre à jour le statut de la commande
    const order = await prisma.order.update({
      where: { stripeSessionId: session.id },
      data: { status: 'paid' },
      include: { pack: true },
    });

    // Envoyer l'email de confirmation
    await sendOrderConfirmationEmail({
      to: session.customer_details?.email!,
      orderDetails: {
        orderNumber: order.id,
        packName: order.pack.name,
        amount: order.amount,
      },
    });
  }

  return NextResponse.json({ received: true });
}
