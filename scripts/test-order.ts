import { PrismaClient } from '@prisma/client';
import * as SibApiV3Sdk from '@sendinblue/client';

const prisma = new PrismaClient();

// Configuration de l'API Brevo
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
console.log('🔑 Configuration de l\'API avec la clé:', process.env.SMTP_KEY?.substring(0, 10) + '...');
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.SMTP_KEY || '');

// Types pour les emails
interface OrderConfirmationProps {
  orderNumber: string;
  packName: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
}

interface OrderDetails {
  id: string;
  packName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  message?: string;
  amount: number;
}

// Fonction d'envoi de confirmation
async function sendOrderConfirmationEmail(orderDetails: OrderConfirmationProps) {
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

async function sendNotificationEmail(orderDetails: OrderDetails) {
  if (!process.env.EMAIL_USER) {
    throw new Error('EMAIL_USER non défini');
  }

  const subject = 'Nouvelle commande reçue - Lawgency';
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1d1d1f; font-size: 28px; font-weight: 500; margin: 0;">Nouvelle commande</h1>
        <p style="color: #86868b; font-size: 16px; margin-top: 8px;">Un nouveau client vient de passer commande.</p>
      </div>
      
      <div style="background-color: #f5f5f7; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
        <h2 style="color: #1d1d1f; font-size: 18px; font-weight: 500; margin: 0 0 16px 0;">Détails de la commande</h2>
        <div style="display: grid; grid-gap: 12px;">
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 8px;">
            <span style="color: #1d1d1f; font-weight: 500;">Pack</span>
            <span style="color: #1d1d1f;">${orderDetails.packName}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 8px;">
            <span style="color: #1d1d1f; font-weight: 500;">Prix</span>
            <span style="color: #1d1d1f;">${orderDetails.amount} €</span>
          </div>
          ${orderDetails.message ? `
          <div style="padding: 12px; background-color: white; border-radius: 8px;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Message du client</div>
            <div style="color: #1d1d1f; white-space: pre-wrap;">${orderDetails.message}</div>
          </div>
          ` : ''}
        </div>
      </div>

      <div style="background-color: #f5f5f7; padding: 20px; border-radius: 12px;">
        <h2 style="color: #1d1d1f; font-size: 18px; font-weight: 500; margin: 0 0 16px 0;">Informations client</h2>
        <div style="display: grid; grid-gap: 12px;">
          <div style="padding: 12px; background-color: white; border-radius: 8px;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Nom</div>
            <div style="color: #1d1d1f;">${orderDetails.customerName}</div>
          </div>
          <div style="padding: 12px; background-color: white; border-radius: 8px;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Email</div>
            <div style="color: #1d1d1f;">${orderDetails.customerEmail}</div>
          </div>
          <div style="padding: 12px; background-color: white; border-radius: 8px;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Téléphone</div>
            <div style="color: #1d1d1f;">${orderDetails.customerPhone}</div>
          </div>
          ${orderDetails.customerCompany ? `
          <div style="padding: 12px; background-color: white; border-radius: 8px;">
            <div style="color: #86868b; font-size: 13px; margin-bottom: 4px;">Entreprise</div>
            <div style="color: #1d1d1f;">${orderDetails.customerCompany}</div>
          </div>
          ` : ''}
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #d2d2d7;">
        <p style="color: #86868b; font-size: 14px; margin: 0;">Connectez-vous à votre espace admin pour gérer cette commande.</p>
      </div>
    </div>
  `;

  return sendEmail(process.env.EMAIL_USER, subject, htmlContent);
}

async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    console.log(`📧 Tentative d'envoi d'email à ${to}`);
    console.log('📧 Expéditeur:', 'no-reply@lawgency.fr');
    
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.sender = { name: "Lawgency", email: "no-reply@lawgency.fr" };
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Réponse de l\'API:', JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Debut du test complet du système de commande...\n');

    // 1. Trouver un pack
    console.log('1. Recherche d\'un pack...');
    const pack = await prisma.pack.findFirst();
    if (!pack) {
      throw new Error('Aucun pack trouvé');
    }
    console.log('✅ Pack trouve:', pack.name);
    console.log('   Prix:', pack.price, '€\n');

    // 2. Créer une commande
    console.log('2. Creation d\'une commande de test...');
    const order = await prisma.order.create({
      data: {
        packId: pack.id,
        status: 'PENDING',
        customerName: 'Client Test Complet',
        customerEmail: 'test.complet@example.com',
        customerPhone: '+33 6 12 34 56 78',
        customerCompany: 'Entreprise Test Complète',
        message: 'Ceci est une commande de test complète avec tous les champs.',
      },
    });
    console.log('✅ Commande creee avec succes:', order.id);
    console.log('   Client:', order.customerName);
    console.log('   Pack:', pack.name);
    console.log('   Statut:', order.status, '\n');

    // 3. Envoyer l'email de notification
    console.log('3. Envoi de l\'email de notification à l\'administrateur...');
    await sendNotificationEmail({
      id: order.id,
      packName: pack.name,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerCompany: order.customerCompany || undefined,
      message: order.message || undefined,
      amount: pack.price,
    });
    console.log('✅ Email de notification envoyé avec succès à', process.env.EMAIL_USER);

    // 4. Envoyer l'email de confirmation au client
    console.log('\n4. Envoi de l\'email de confirmation au client...');
    await sendOrderConfirmationEmail({
      orderNumber: order.id,
      packName: pack.name,
      amount: pack.price,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerCompany: order.customerCompany || undefined,
    });
    console.log('✅ Email de confirmation envoyé avec succès à', order.customerEmail);

    // 5. Vérifier que la commande est bien enregistrée
    console.log('\n5. Verification finale de la commande dans la base de donnees...');
    const savedOrder = await prisma.order.findUnique({
      where: { id: order.id },
    });

    if (!savedOrder) {
      throw new Error('La commande n\'a pas été trouvée dans la base de données');
    }

    console.log('✅ Commande retrouvee avec succes');
    console.log('   ID:', savedOrder.id);
    console.log('   Client:', savedOrder.customerName);
    console.log('   Statut:', savedOrder.status);

    console.log('\n✨ Test complet termine avec succes!');
    console.log('\nRésumé des opérations:');
    console.log('1. ✅ Pack trouvé et validé');
    console.log('2. ✅ Commande créée dans la base de données');
    console.log('3. ✅ Email de notification envoyé à l\'administrateur');
    console.log('4. ✅ Email de confirmation envoyé au client');
    console.log('5. ✅ Vérification finale de la commande réussie');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
