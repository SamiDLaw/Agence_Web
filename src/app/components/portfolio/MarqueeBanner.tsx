'use client';

import { MarqueeText } from './MarqueeText';

interface MarqueeBannerProps {
  className?: string;
  texts?: string[];
}

export function MarqueeBanner({ className = '', texts }: MarqueeBannerProps) {
  // Liste des services principaux par défaut si texts n'est pas fourni
  const defaultServices = [
    'Agence vidéo',
    'Design web',
    'Community management',
    'Production audiovisuelle',
    'Identité visuelle',
    'Développement web',
    'Stratégie digitale',
    'Motion design',
    'UX/UI design',
    'Montage vidéo'
  ];
  
  // Utiliser les textes fournis ou les services par défaut
  const services = texts || defaultServices;
  
  // Créer une chaîne de texte avec des séparateurs visuels
  const servicesText = services.join(' • ');
  
  return (
    <div className={`py-8 bg-black dark:bg-white text-white dark:text-black ${className}`}>
      <div className="flex flex-col gap-4">
        <MarqueeText 
          text={servicesText}
          className="text-3xl md:text-4xl font-bold"
          speed={60}
          direction="left"
          repeat={3}
          gap={5}
        />
        
        <MarqueeText 
          text={servicesText}
          className="text-3xl md:text-4xl font-bold"
          speed={60}
          direction="right"
          repeat={3}
          gap={5}
        />
      </div>
    </div>
  );
}
