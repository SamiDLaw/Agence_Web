'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface ModernServicesSimpleProps {
  className?: string;
}

const colors = [
  { bg: 'bg-indigo-900', text: 'text-indigo-100', accent: 'bg-indigo-500' },
  { bg: 'bg-emerald-900', text: 'text-emerald-100', accent: 'bg-emerald-500' },
  { bg: 'bg-amber-900', text: 'text-amber-100', accent: 'bg-amber-500' },
];

export function ModernServicesSimple({ className = '' }: ModernServicesSimpleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const services = [
    {
      id: 'video',
      title: 'Agence Vidéo',
      description: 'Nous créons des contenus vidéo captivants qui racontent votre histoire et engagent votre audience.',
      details: [
        'Production de vidéos promotionnelles',
        'Montage et post-production professionnels',
        'Réalisation de contenu pour les réseaux sociaux',
        'Vidéos d\'événements et interviews',
        'Motion design et animations'
      ],
      icon: '🎬'
    },
    {
      id: 'web',
      title: 'Design Web',
      description: 'Nous concevons des sites web modernes, responsives et optimisés pour convertir vos visiteurs en clients.',
      details: [
        'Création de sites web sur mesure',
        'Refonte de sites existants',
        'Design UX/UI intuitif et moderne',
        'Optimisation pour les moteurs de recherche (SEO)',
        'Sites e-commerce et vitrines professionnelles'
      ],
      icon: '💻'
    },
    {
      id: 'community',
      title: 'Community Management',
      description: 'Nous gérons vos réseaux sociaux pour développer votre communauté et votre présence en ligne.',
      details: [
        'Gestion des comptes sociaux (Instagram, Facebook, LinkedIn, TikTok)',
        'Création de calendriers éditoriaux',
        'Production de contenu engageant',
        'Analyse des performances et rapports',
        'Stratégies de croissance organique'
      ],
      icon: '📱'
    }
  ];

  return (
    <section className={`py-24 bg-black text-white overflow-hidden ${className}`} ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-24 text-center"
        >
          Nos Services
        </motion.h2>
        
        <div className="space-y-48 md:space-y-64 pb-24">
          {services.map((service, index) => (
            <ServiceSection 
              key={service.id} 
              service={service} 
              index={index} 
              colorScheme={colors[index % colors.length]}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceSectionProps {
  service: {
    id: string;
    title: string;
    description: string;
    details: string[];
    icon: string;
  };
  index: number;
  colorScheme: {
    bg: string;
    text: string;
    accent: string;
  };
  progress: any;
}

function ServiceSection({ service, index, colorScheme, progress }: ServiceSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px -100px 0px" });
  
  // Calculer la position de la section dans le flux de défilement
  const scrollOffset = index * 0.15; // Décalage basé sur l'index
  const scrollRange = [scrollOffset, scrollOffset + 0.15]; // Plage de défilement pour cette section
  
  // Transformations basées sur le défilement
  const opacity = useTransform(progress, scrollRange, [0.3, 1]);
  const scale = useTransform(progress, scrollRange, [0.8, 1]);
  const y = useTransform(progress, scrollRange, [100, 0]);
  const rotate = useTransform(progress, scrollRange, [index % 2 === 0 ? 3 : -3, 0]);
  
  // Transformations supplémentaires pour des effets plus dynamiques
  const bgOpacity = useTransform(progress, scrollRange, [0.85, 1]);
  const textY = useTransform(progress, scrollRange, [30, 0]);
  const iconScale = useTransform(progress, scrollRange, [0.8, 1.2]);
  
  // Ajouter des ressorts pour des animations plus fluides
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 15 });
  const springIconScale = useSpring(iconScale, { stiffness: 150, damping: 12 });
  const springTextY = useSpring(textY, { stiffness: 120, damping: 18 });
  
  return (
    <motion.div 
      ref={ref}
      style={{ 
        opacity, 
        y: springY,
        scale: springScale,
        rotate: springRotate,
      }}
      className={`${colorScheme.bg} ${colorScheme.text} rounded-2xl p-8 md:p-12 shadow-2xl transition-all duration-500 relative overflow-hidden`}
      whileHover={{ scale: 1.02 }}
    >
      {/* Cercles décoratifs en arrière-plan */}
      <motion.div 
        className={`absolute -top-20 -right-20 w-64 h-64 rounded-full ${colorScheme.accent} opacity-20 blur-3xl`}
        style={{ scale: useSpring(useTransform(progress, scrollRange, [0.5, 1.2])) }}
      />
      <motion.div 
        className={`absolute -bottom-32 -left-32 w-80 h-80 rounded-full ${colorScheme.accent} opacity-10 blur-3xl`}
        style={{ scale: useSpring(useTransform(progress, scrollRange, [0.8, 1.4])) }}
      />
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
        <motion.div 
          className={`${colorScheme.accent} w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg backdrop-blur-sm`}
          style={{ scale: springIconScale }}
          whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
        >
          {service.icon}
        </motion.div>
        
        <div className="flex-1">
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-4 inline-block"
            style={{ y: springTextY }}
          >
            {service.title}
            <motion.div 
              className={`h-1 ${colorScheme.accent} mt-2 rounded-full`} 
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.h3>
          
          <motion.p 
            className="text-lg opacity-90 mb-8"
            style={{ y: springTextY }}
            transition={{ delay: 0.1 }}
          >
            {service.description}
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {service.details.map((detail, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-3 group"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className={`w-2 h-2 rounded-full ${colorScheme.accent} group-hover:scale-150`}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <p className="group-hover:font-medium transition-all">{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
