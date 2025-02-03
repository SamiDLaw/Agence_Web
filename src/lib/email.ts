import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface OrderConfirmationEmailProps {
  to: string;
  orderDetails: {
    orderNumber: string;
    packName: string;
    amount: number;
  };
}

export async function sendOrderConfirmationEmail({
  to,
  orderDetails,
}: OrderConfirmationEmailProps) {
  const msg = {
    to,
    from: 'votre-email@lawgency.fr', // Remplacez par votre email vérifié SendGrid
    subject: 'Confirmation de votre commande - Lawgency',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e40af;">Merci pour votre commande !</h1>
        
        <p>Nous avons bien reçu votre commande et nous vous en remercions.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Détails de la commande</h2>
          <p><strong>Numéro de commande :</strong> ${orderDetails.orderNumber}</p>
          <p><strong>Pack :</strong> ${orderDetails.packName}</p>
          <p><strong>Montant :</strong> ${orderDetails.amount}€</p>
        </div>
        
        <p>Notre équipe va étudier votre demande et vous contactera très prochainement pour démarrer votre projet.</p>
        
        <p>Si vous avez des questions, n'hésitez pas à nous contacter :</p>
        <ul>
          <li>Email : contact@lawgency.fr</li>
          <li>Téléphone : +33 1 23 45 67 89</li>
        </ul>
        
        <p style="margin-top: 30px;">Cordialement,<br>L'équipe Lawgency</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Email de confirmation envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
}
