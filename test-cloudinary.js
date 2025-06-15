// Script pour tester la connexion à Cloudinary
const cloudinary = require('cloudinary').v2;

// Configuration de Cloudinary avec les variables d'environnement
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Fonction pour tester la connexion
async function testConnection() {
  try {
    console.log('Tentative de connexion à Cloudinary...');
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    
    // Récupérer les informations du compte pour vérifier la connexion
    const account = await cloudinary.api.ping();
    console.log('Connexion réussie!');
    console.log('Réponse:', account);
    
    return true;
  } catch (error) {
    console.error('Erreur de connexion à Cloudinary:', error);
    return false;
  }
}

// Exécuter le test
testConnection().catch(console.error);
