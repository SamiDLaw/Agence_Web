import * as SibApiV3Sdk from '@sendinblue/client';

// Configuration de l'API Brevo
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.SMTP_KEY || '');

interface OrderConfirmationEmailProps {
  to: string;
  orderDetails: {
    orderNumber: string;
    packName: string;
    amount: number;
  };
}

interface OrderDetails {
  id: string;
  packName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  message?: string;
}

// Fonction d'envoi de confirmation de commande
export async function sendOrderConfirmationEmail({
  to,
  orderDetails,
}: OrderConfirmationEmailProps) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.sender = { name: "Lawgency", email: process.env.EMAIL_USER };
  sendSmtpEmail.subject = 'Confirmation de votre commande - Lawgency';
  sendSmtpEmail.htmlContent = `
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
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
    throw error;
  }
}

// Fonction d'envoi de notification
export async function sendOrderNotification(orderDetails: OrderDetails) {
  if (!process.env.EMAIL_USER) {
    throw new Error('EMAIL_USER non défini');
  }

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: process.env.EMAIL_USER }];
  sendSmtpEmail.sender = { name: "Lawgency", email: process.env.EMAIL_USER };
  sendSmtpEmail.subject = 'Nouvelle commande reçue - Lawgency';
  sendSmtpEmail.htmlContent = `
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
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de notification:', error);
    throw error;
  }
}
