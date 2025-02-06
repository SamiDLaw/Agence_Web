import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    from: process.env.EMAIL_USER,
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
        </ul>
        
        <p>Cordialement,<br>L'équipe Lawgency</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(msg);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
    throw error;
  }
}

export async function sendOrderNotification({
  orderDetails,
}: OrderNotificationProps) {
  const msg = {
    to: process.env.EMAIL_USER,
    from: process.env.EMAIL_USER,
    subject: 'Nouvelle commande reçue - Lawgency',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e40af;">Nouvelle commande reçue !</h1>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Détails de la commande</h2>
          <p><strong>ID de la commande :</strong> ${orderDetails.id}</p>
          <p><strong>Pack :</strong> ${orderDetails.packName}</p>
          <p><strong>Client :</strong> ${orderDetails.customerName}</p>
          <p><strong>Email :</strong> ${orderDetails.customerEmail}</p>
          <p><strong>Téléphone :</strong> ${orderDetails.customerPhone}</p>
          ${orderDetails.customerCompany ? `<p><strong>Entreprise :</strong> ${orderDetails.customerCompany}</p>` : ''}
          ${orderDetails.message ? `<p><strong>Message :</strong> ${orderDetails.message}</p>` : ''}
        </div>
        
        <p>Une nouvelle commande nécessite votre attention. Veuillez la traiter dès que possible.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(msg);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de notification:', error);
    throw error;
  }
}
