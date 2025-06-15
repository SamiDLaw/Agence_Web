// Script pour télécharger les vidéos Uludag sur Cloudinary
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

// Configuration de Cloudinary
// Utilisation des variables d'environnement
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Vérifier que les variables d'environnement sont définies
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Erreur: Variables d\'environnement Cloudinary manquantes.');
  console.error('Veuillez exécuter le script avec les variables d\'environnement requises:');
  console.error('CLOUDINARY_CLOUD_NAME=votre_cloud_name CLOUDINARY_API_KEY=votre_api_key CLOUDINARY_API_SECRET=votre_api_secret node upload-to-cloudinary.js');
  process.exit(1);
}

// Chemins des vidéos à télécharger
const videoFiles = [
  {
    path: path.join(__dirname, 'public/videos/uludag-video-1.mp4'),
    publicId: 'lawgency/uludag-video-1'
  },
  {
    path: path.join(__dirname, 'public/videos/uludag-video-2.mp4'),
    publicId: 'lawgency/uludag-video-2'
  }
];

// Fonction pour télécharger une vidéo
async function uploadVideo(videoPath, publicId) {
  try {
    console.log(`Téléchargement de ${videoPath} vers Cloudinary...`);
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(videoPath)) {
      console.error(`Le fichier ${videoPath} n'existe pas.`);
      return null;
    }
    
    // Télécharger la vidéo sur Cloudinary
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video',
      public_id: publicId,
      chunk_size: 6000000, // 6MB par chunk pour les gros fichiers
      eager: [
        { format: 'mp4', transformation: [
          { width: 1920, height: 1080, crop: 'limit', quality: 'auto' }
        ]}
      ]
    });
    
    console.log(`Téléchargement réussi pour ${publicId}`);
    console.log(`URL: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`Erreur lors du téléchargement de ${publicId}:`, error);
    return null;
  }
}

// Télécharger toutes les vidéos
async function uploadAllVideos() {
  console.log('Début du téléchargement des vidéos...');
  
  const results = [];
  
  for (const video of videoFiles) {
    const result = await uploadVideo(video.path, video.publicId);
    if (result) {
      results.push({
        originalPath: video.path,
        publicId: video.publicId,
        url: result.secure_url
      });
    }
  }
  
  console.log('\nRésumé des téléchargements:');
  results.forEach(result => {
    console.log(`${result.publicId}: ${result.url}`);
  });
  
  console.log('\nURLs à utiliser dans votre code:');
  results.forEach(result => {
    const fileName = path.basename(result.originalPath);
    console.log(`${fileName} -> ${result.url}`);
  });
}

// Exécuter le script
uploadAllVideos().catch(console.error);
