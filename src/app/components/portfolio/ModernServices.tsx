'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { getVideoUrl } from '@/app/data/cloudinary-urls';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  videoUrl?: string;
  icon: React.ReactNode;
}

interface ModernServicesProps {
  className?: string;
}

// Composant pour gérer les médias des services avec interaction au hover - style media.work
function ServiceMedia({ service }: { service: Service }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Images alternatives pour chaque service
  const serviceImages = [
    service.image,
    `/images/services/${service.id}-service-2.svg`,
    `/images/services/${service.id}-service-3.svg`,
  ];

  // Charger la vidéo en arrière-plan
  useEffect(() => {
    if (videoRef.current && service.videoUrl) {
      const handleLoaded = () => {
        setIsLoaded(true);
        setHasError(false);
      };
      
      const handleError = (e: Event) => {
        console.error('Erreur de chargement vidéo:', e);
        setIsLoaded(false);
        setHasError(true);
      };
      
      videoRef.current.addEventListener('loadeddata', handleLoaded);
      videoRef.current.addEventListener('error', handleError);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', handleLoaded);
          videoRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [service.videoUrl]);

  // Gérer la lecture vidéo au hover
  useEffect(() => {
    if (videoRef.current && isLoaded && !hasError) {
      if (isHovered) {
        try {
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              setIsPlaying(true);
            }).catch(error => {
              console.error('Erreur de lecture vidéo:', error);
              setIsPlaying(false);
              setHasError(true);
            });
          }
        } catch (error) {
          console.error('Exception lors de la lecture vidéo:', error);
          setIsPlaying(false);
          setHasError(true);
        }
      } else {
        try {
          videoRef.current.pause();
          setIsPlaying(false);
        } catch (error) {
          console.error('Exception lors de la pause vidéo:', error);
        }
      }
    }
  }, [isHovered, isLoaded, hasError]);

  // Rotation automatique des images quand la vidéo n'est pas en lecture
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isPlaying) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % serviceImages.length);
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, serviceImages.length]);

  return (
    <motion.div 
      className="relative w-full aspect-video overflow-hidden rounded-lg bg-gray-900"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Vidéo en arrière-plan */}
      {service.videoUrl && !hasError && (
        <video
          ref={videoRef}
          src={service.videoUrl}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
          preload="metadata"
          onError={() => setHasError(true)}
        />
      )}
      
      {/* Image de fallback avec rotation automatique */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <Image 
          src={serviceImages[currentImage]} 
          alt={service.title}
          fill
          className="object-cover"
          priority={currentImage === 0}
          onError={() => {
            // Si l'image actuelle échoue, passer à l'image principale
            if (currentImage !== 0) setCurrentImage(0);
          }}
        />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      
      {/* Contenu du service */}
      <motion.div 
        className="absolute bottom-0 left-0 p-6 z-20 w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="flex items-center mb-3"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-primary mr-2">
            {service.icon}
          </span>
          <span className="text-white text-sm font-medium">{service.id.toUpperCase()}</span>
        </motion.div>
        
        <motion.h4 
          className="text-white text-2xl md:text-3xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {service.title}
        </motion.h4>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white/90 text-sm hidden md:block max-w-md"
        >
          {service.description.substring(0, 100)}...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export function ModernServices({ className = '' }: ModernServicesProps) {
  const [activeService, setActiveService] = useState<string>('video');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation de défilement pour le titre
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const titleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  
  // Services principaux avec vidéos haute résolution
  const services: Service[] = [
    {
      id: 'video',
      title: 'Agence Vidéo',
      description: 'Nous créons des contenus vidéo captivants qui racontent votre histoire et engagent votre audience. De la conception à la production, nous gérons l\'ensemble du processus créatif.',
      features: [
        'Production vidéo professionnelle',
        'Motion design et animation',
        'Vidéos publicitaires et promotionnelles',
        'Contenu pour réseaux sociaux',
        'Films d\'entreprise'
      ],
      image: '/images/services/video-service.jpg',
      videoUrl: '/videos/13432791_3840_2160_50fps.mp4',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      )
    },
    {
      id: 'web',
      title: 'Design Web',
      description: 'Nous concevons et développons des sites web et applications modernes, performants et esthétiques qui offrent une expérience utilisateur exceptionnelle.',
      features: [
        'Sites web responsifs',
        'Applications web interactives',
        'UI/UX design',
        'Animations et interactions',
        'E-commerce et solutions sur mesure'
      ],
      image: '/images/services/web-service.jpg',
      videoUrl: '/videos/13432791_3840_2160_50fps.mp4',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      )
    },
    {
      id: 'community',
      title: 'Community Management',
      description: 'Nous gérons et développons votre présence sur les réseaux sociaux pour renforcer votre image de marque et créer une communauté engagée autour de vos produits et services.',
      features: [
        'Stratégie de contenu',
        'Gestion des réseaux sociaux',
        'Création de contenu engageant',
        'Analyse de performance',
        'Campagnes publicitaires ciblées'
      ],
      image: '/images/services/community-service.jpg',
      videoUrl: getVideoUrl('/videos/12568306_3840_2160_30fps.mp4', '12568306_3840_2160_30fps'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    }
  ];
  
  // Récupérer le service actif
  const currentService = services.find(s => s.id === activeService) || services[0];
  
  return (
    <section ref={containerRef} className={`relative py-24 overflow-hidden ${className}`}>
      <div className="container mx-auto px-4">
        {/* Titre de section avec animation au défilement */}
        <div className="text-center mb-16">
          <motion.h2 
            style={{ y: titleY }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Nos Services
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Des solutions créatives et innovantes pour donner vie à vos projets et renforcer votre présence digitale.
          </p>
        </div>
        
        {/* Navigation des services */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
                activeService === service.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="w-5 h-5">{service.icon}</span>
              <span className="font-medium">{service.title}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Contenu du service actif */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Informations du service */}
          <ScrollReveal direction="right">
            <motion.div
              key={currentService.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  {currentService.icon}
                </div>
                <h3 className="text-2xl font-bold">{currentService.title}</h3>
              </div>
              
              <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
                {currentService.description}
              </p>
              
              <ul className="space-y-3">
                {currentService.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Link href="/contact" className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-3 bg-primary text-white rounded-full flex items-center gap-2 shadow-lg shadow-primary/30"
                >
                  <span>Discuter de votre projet</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.div>
              </Link>
            </motion.div>
          </ScrollReveal>
          
          {/* Média (Vidéo ou Image) avec overlay amélioré et interaction au hover */}
          <ScrollReveal direction="left">
            <ServiceMedia service={currentService} />
          </ScrollReveal>
        </div>
      </div>
      
      {/* Éléments décoratifs améliorés */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-secondary/20 blur-2xl" />
    </section>
  );
}
