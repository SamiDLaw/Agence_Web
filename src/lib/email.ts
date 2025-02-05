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

interface OrderNotificationProps {
  orderDetails: {
    id: string;
    packName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerCompany?: string;
    message?: string;
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

export async function sendOrderNotification({
  orderDetails,
}: OrderNotificationProps) {
  const adminEmail = process.env.ADMIN_EMAIL || 'votre-email@lawgency.fr';
  
  const msg = {
    to: adminEmail,
    from: 'notifications@lawgency.fr',
    subject: ' Nouvelle demande de projet - Lawgency',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e40af;">Nouvelle demande de projet</h1>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Détails de la demande</h2>
          <p><strong>ID :</strong> ${orderDetails.id}</p>
          <p><strong>Pack :</strong> ${orderDetails.packName}</p>
          <p><strong>Client :</strong> ${orderDetails.customerName}</p>
          <p><strong>Email :</strong> ${orderDetails.customerEmail}</p>
          <p><strong>Téléphone :</strong> ${orderDetails.customerPhone}</p>
          ${orderDetails.customerCompany ? `<p><strong>Entreprise :</strong> ${orderDetails.customerCompany}</p>` : ''}
          ${orderDetails.message ? `
            <div style="margin-top: 20px;">
              <strong>Message :</strong>
              <p style="white-space: pre-wrap;">${orderDetails.message}</p>
            </div>
          ` : ''}
        </div>
        
        <div style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_URL}/admin/orders" 
             style="background-color: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Voir dans le dashboard
          </a>
        </div>
      </div>
    `,
  };

  // Email de confirmation au client
  const clientMsg = {
    to: orderDetails.customerEmail,
    from: 'contact@lawgency.fr',
    subject: 'Confirmation de votre demande - Lawgency',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e40af;">Merci pour votre demande !</h1>
        
        <p>Nous avons bien reçu votre demande concernant le pack "${orderDetails.packName}" et nous vous en remercions.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Prochaines étapes</h2>
          <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px;"> Notre équipe va étudier votre demande sous 24-48h</li>
            <li style="margin-bottom: 10px;"> Nous vous contacterons pour planifier une réunion de découverte</li>
            <li style="margin-bottom: 10px;"> Nous établirons ensemble un plan d'action personnalisé</li>
          </ul>
        </div>
        
        <p>Si vous avez des questions, n'hésitez pas à nous contacter :</p>
        <ul style="list-style-type: none; padding: 0;">
          <li> Email : contact@lawgency.fr</li>
          <li> Téléphone : +33 1 23 45 67 89</li>
        </ul>
        
        <p style="margin-top: 30px;">À très bientôt,<br>L'équipe Lawgency</p>
      </div>
    `,
  };

  try {
    // Envoyer la notification à l'admin
    await sgMail.send(msg);
    console.log('Email de notification envoyé avec succès à l\'admin');

    // Envoyer la confirmation au client
    await sgMail.send(clientMsg);
    console.log('Email de confirmation envoyé avec succès au client');
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails:', error);
    throw error;
  }
}
