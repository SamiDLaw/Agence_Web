// URLs Cloudinary pour les vidéos
export const cloudinaryUrls: Record<string, string> = {
  // Vidéos existantes
  "uludag-video-1": "https://res.cloudinary.com/dckyksspe/video/upload/v1749980736/lawgency/uludag-video-1",
  "uludag-video-2": "https://res.cloudinary.com/dckyksspe/video/upload/v1749980864/lawgency/uludag-video-2",
  
  // Nouvelles vidéos
  "Nike_Spec_Ad_Sony_A6400": "https://res.cloudinary.com/dckyksspe/video/upload/v1749992339/lawgency/Nike_Spec_Ad_Sony_A6400",
  "Chanel-N5": "https://res.cloudinary.com/dckyksspe/video/upload/v1749992373/lawgency/Chanel-N5",
  "Damius-01": "https://res.cloudinary.com/dckyksspe/video/upload/v1749992422/lawgency/Damius-01",
  "pub-marseille-boxe-compressed": "https://res.cloudinary.com/dckyksspe/video/upload/v1749992490/lawgency/pub-marseille-boxe-compressed",
  "video-fc-castellane": "https://res.cloudinary.com/dckyksspe/video/upload/v1749992522/lawgency/video-fc-castellane",
  "video-vrunk": "https://res.cloudinary.com/dckyksspe/video/upload/v1749992536/lawgency/video-vrunk",
  "12568306_3840_2160_30fps": "https://res.cloudinary.com/dckyksspe/video/upload/v1749992660/lawgency/12568306_3840_2160_30fps"
};

// Cette fonction permet de récupérer l'URL Cloudinary ou l'URL locale selon l'environnement
export function getVideoUrl(localPath: string, cloudinaryKey: string): string {
  // En production (Vercel), utiliser Cloudinary
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return cloudinaryUrls[cloudinaryKey] || localPath;
  }
  
  // En développement, utiliser les fichiers locaux
  return localPath;
}
