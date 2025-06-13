'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

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

// Composant pour gérer les médias des services avec interaction au hover
function ServiceMedia({ service }: { service: Service }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Générer des images supplémentaires basées sur l'image principale
  const serviceImages = [
    service.image,
    service.image.replace('.svg', '-2.svg'),
    service.image.replace('.svg', '-3.svg')
  ];
  
  // Effet pour faire défiler les images quand pas de vidéo ou quand la vidéo n'est pas en hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!service.videoUrl || !isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % serviceImages.length);
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [service.videoUrl, isHovered, serviceImages.length]);
  
  // Effet pour gérer la lecture/pause de la vidéo au hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error('Erreur de lecture vidéo:', error);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      key={`media-${service.id}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
        }
      }}
      className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {service.videoUrl ? (
        <>
          <video 
            ref={videoRef}
            muted 
            loop 
            playsInline
            preload="metadata"
            poster={service.image}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
          >
            <source src={service.videoUrl} type="video/mp4" />
            Votre navigateur ne prend pas en charge les vidéos HTML5.
          </video>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 group-hover:opacity-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
            </div>
          )}
        </>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={serviceImages[currentImageIndex]}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      )}
      {/* Overlay amélioré avec le titre du service */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 group-hover:opacity-90">
        <h4 className="text-white text-2xl font-bold mb-2">{service.title}</h4>
        <p className="text-white/90 text-sm hidden md:block">
          {service.description.substring(0, 100)}...
        </p>
      </div>
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
  
  // Services principaux
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
      image: '/images/services/video-service.svg',
      videoUrl: '/videos/video-production.mp4',
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
      image: '/images/services/web-service.svg',
      videoUrl: '/videos/web-design.mp4',
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
        'Création de contenu',
        'Campagnes publicitaires',
        'Analyse de performance'
      ],
      image: '/images/services/community-service.svg',
      videoUrl: '/videos/social-media.mp4',
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
  
  // Trouver le service actif
  const currentService = services.find(service => service.id === activeService) || services[0];
  
  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
  };
  
  const tabVariants = {
    inactive: { opacity: 0.6 },
    active: { opacity: 1 }
  };
  
  const indicatorVariants = {
    inactive: { width: 0 },
    active: { width: '100%' }
  };

  return (
    <section 
      ref={containerRef}
      className={`py-32 bg-white dark:bg-black relative overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section avec animation parallaxe */}
        <motion.div 
          className="mb-24 relative"
          style={{ y: titleY }}
        >
          <h2 className="text-6xl md:text-8xl font-bold text-black/15 dark:text-white/15 uppercase tracking-tighter">
            Services
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold absolute top-1/2 left-0 transform -translate-y-1/2 text-black dark:text-white">
            Nos expertises
          </h3>
        </motion.div>
        
        {/* Tabs de navigation des services */}
        <div className="flex flex-wrap gap-x-12 gap-y-4 mb-16">
          {services.map((service) => (
            <button 
              key={service.id}
              className="text-lg relative pb-2 focus:outline-none flex items-center gap-3 text-black dark:text-white"
              onClick={() => setActiveService(service.id)}
              data-cursor="hover"
            >
              <motion.div
                variants={tabVariants}
                initial="inactive"
                animate={activeService === service.id ? "active" : "inactive"}
                className={`${activeService === service.id ? 'text-primary' : 'text-black/70 dark:text-white/70'}`}
              >
                {service.icon}
              </motion.div>
              
              <span className={`font-medium ${activeService === service.id ? 'text-primary' : ''}`}>{service.title}</span>
              
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                variants={indicatorVariants}
                initial="inactive"
                animate={activeService === service.id ? "active" : "inactive"}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>
        
        {/* Contenu du service actif */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texte et caractéristiques */}
          <ScrollReveal>
            <motion.div
              key={currentService.id}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="space-y-8"
            >
              <h3 className="text-3xl font-bold text-black dark:text-white">{currentService.title}</h3>
              <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                {currentService.description}
              </p>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-black dark:text-white">Ce que nous proposons :</h4>
                <ul className="space-y-3">
                  {currentService.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                href={`/services#${currentService.id}`}
                className="inline-flex items-center gap-2 text-primary font-medium group"
                data-cursor="hover"
              >
                <span>En savoir plus</span>
                <span className="transform transition-transform group-hover:translate-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
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
