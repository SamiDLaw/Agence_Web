import * as SibApiV3Sdk from '@sendinblue/client';

// Configuration de l'API Brevo
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.SMTP_KEY || '');

export interface OrderConfirmationProps {
  orderNumber: string;
  packName: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
}

export interface OrderDetails {
  id: string;
  packName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  message?: string;
  amount: number;
}

// Fonction d'envoi d'email générique
async function sendEmail(to: string, subject: string, htmlContent: string) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.sender = { name: "Lawgency", email: process.env.EMAIL_USER || 'no-reply@lawgency.fr' };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;

  try {
    console.log(' Tentative d\'envoi d\'email à', to);
    console.log(' Expéditeur:', process.env.EMAIL_USER || 'no-reply@lawgency.fr');
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(' Réponse de l\'API:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error(' Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
}

// Fonction d'envoi de confirmation de commande
export async function sendOrderConfirmationEmail(orderDetails: OrderConfirmationProps) {
  if (!process.env.EMAIL_USER) {
    throw new Error('EMAIL_USER non défini');
  }

  const subject = 'Confirmation de votre commande - Lawgency';
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #0077ED, #00A3FF); padding: 30px; border-radius: 12px; color: white;">
        <h1 style="font-size: 28px; font-weight: 500; margin: 0;">Merci pour votre commande</h1>
        <p style="font-size: 16px; margin-top: 8px; opacity: 0.9;">Nous l'avons bien reçue et nous la traitons.</p>
      </div>
      
      <div style="background-color: #f5f5f7; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
        <h2 style="color: #1d1d1f; font-size: 18px; font-weight: 500; margin: 0 0 16px 0;">Détails de la commande</h2>
        <div style="display: grid; grid-gap: 12px;">
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #0077ED;">
            <span style="color: #1d1d1f; font-weight: 500;">Pack</span>
            <span style="color: #1d1d1f;">${orderDetails.packName}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #00A3FF;">
            <span style="color: #1d1d1f; font-weight: 500;">Prix</span>
            <span style="color: #1d1d1f;">${orderDetails.amount} €</span>
          </div>
        </div>
      </div>

      <div style="background-color: #f5f5f7; padding: 20px; border-radius: 12px;">
        <h2 style="color: #1d1d1f; font-size: 18px; font-weight: 500; margin: 0 0 16px 0;">Vos informations</h2>
        <div style="display: grid; grid-gap: 12px;">
          <div style="padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #0077ED;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Nom</div>
            <div style="color: #1d1d1f;">${orderDetails.customerName}</div>
          </div>
          <div style="padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #00A3FF;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Email</div>
            <div style="color: #1d1d1f;">${orderDetails.customerEmail}</div>
          </div>
          <div style="padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #0077ED;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Téléphone</div>
            <div style="color: #1d1d1f;">${orderDetails.customerPhone}</div>
          </div>
          ${orderDetails.customerCompany ? `
          <div style="padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #00A3FF;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Entreprise</div>
            <div style="color: #1d1d1f;">${orderDetails.customerCompany}</div>
          </div>
          ` : ''}
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, #0077ED, #00A3FF); color: white;">
        <p style="font-size: 14px; margin: 0;">Nous vous contacterons très prochainement pour démarrer votre projet.</p>
        <p style="font-size: 14px; margin: 8px 0 0 0;">L'équipe Lawgency</p>
      </div>
    </div>
  `;

  return sendEmail(orderDetails.customerEmail, subject, htmlContent);
}

// Fonction d'envoi de notification
export async function sendOrderNotification(orderDetails: OrderDetails) {
  if (!process.env.EMAIL_USER) {
    throw new Error('EMAIL_USER non défini');
  }

  const subject = 'Nouvelle commande reçue - Lawgency';
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #0077ED, #00A3FF); padding: 30px; border-radius: 12px; color: white;">
        <h1 style="font-size: 28px; font-weight: 500; margin: 0;">Nouvelle commande</h1>
        <p style="font-size: 16px; margin-top: 8px; opacity: 0.9;">Un nouveau client vient de passer commande.</p>
      </div>
      
      <div style="background-color: #f5f5f7; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
        <h2 style="color: #1d1d1f; font-size: 18px; font-weight: 500; margin: 0 0 16px 0;">Détails de la commande</h2>
        <div style="display: grid; grid-gap: 12px;">
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #0077ED;">
            <span style="color: #1d1d1f; font-weight: 500;">Pack</span>
            <span style="color: #1d1d1f;">${orderDetails.packName}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #00A3FF;">
            <span style="color: #1d1d1f; font-weight: 500;">Prix</span>
            <span style="color: #1d1d1f;">${orderDetails.amount} €</span>
          </div>
          ${orderDetails.message ? `
          <div style="padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #0077ED;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Message du client</div>
            <div style="color: #1d1d1f; white-space: pre-wrap;">${orderDetails.message}</div>
          </div>
          ` : ''}
        </div>
      </div>

      <div style="background-color: #f5f5f7; padding: 20px; border-radius: 12px;">
        <h2 style="color: #1d1d1f; font-size: 18px; font-weight: 500; margin: 0 0 16px 0;">Informations client</h2>
        <div style="display: grid; grid-gap: 12px;">
          <div style="padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #0077ED;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Nom</div>
            <div style="color: #1d1d1f;">${orderDetails.customerName}</div>
          </div>
          <div style="padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #00A3FF;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Email</div>
            <div style="color: #1d1d1f;">${orderDetails.customerEmail}</div>
          </div>
          <div style="padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #0077ED;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Téléphone</div>
            <div style="color: #1d1d1f;">${orderDetails.customerPhone}</div>
          </div>
          ${orderDetails.customerCompany ? `
          <div style="padding: 12px; background-color: white; border-radius: 8px; border-left: 4px solid #00A3FF;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Entreprise</div>
            <div style="color: #1d1d1f;">${orderDetails.customerCompany}</div>
          </div>
          ` : ''}
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, #0077ED, #00A3FF); color: white;">
        <p style="font-size: 14px; margin: 0;">Connectez-vous à votre espace admin pour gérer cette commande.</p>
      </div>
    </div>
  `;

  return sendEmail(process.env.EMAIL_USER, subject, htmlContent);
}
