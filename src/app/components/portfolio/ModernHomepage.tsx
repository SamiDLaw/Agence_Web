'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/app/data/projects';
import { HorizontalScroll } from './HorizontalScroll';
import { ParallaxGallery } from './ParallaxGallery';

interface ModernHomepageProps {
  featuredProjects: Project[];
  allProjects: Project[];
}

export function ModernHomepage({ featuredProjects, allProjects }: ModernHomepageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentService, setCurrentService] = useState<number>(0);
  // Interface pour les services
  interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    videoUrl?: string;
    icon: React.ReactNode;
  }

  const services: Service[] = [
    {
      id: 'video',
      title: 'Agence Vidéo',
      description: 'Production de contenu vidéo de haute qualité pour vos campagnes marketing, réseaux sociaux et événements.',
      image: '/images/PKLS9028.png',
      videoUrl: 'https://res.cloudinary.com/dckyksspe/video/upload/v1749980864/lawgency/uludag-video-2.mp4',
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
      description: 'Création de sites web modernes, responsives et optimisés pour convertir vos visiteurs en clients.',
      image: '/images/services/web-design.jpg',
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
      description: 'Gestion professionnelle de vos réseaux sociaux pour développer votre communauté et votre présence en ligne.',
      image: '/images/services/community-management.jpg',
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

  // Changer automatiquement le service mis en avant
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [services.length]);

  // Animation du scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  
  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section avec animation de texte */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" data-component-name="ModernHomepage" />
          
          {/* Vidéo d'arrière-plan fixe */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/12568306_3840_2160_30fps.mp4" type="video/mp4" />
              Votre navigateur ne prend pas en charge la vidéo HTML5.
            </video>
          </div>
          
          {/* Animation des services (masquée mais maintenue pour la logique) */}
          <div className="hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={services[currentService].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="hidden"
              >
                {services[currentService].videoUrl ? (
                  <div className="hidden"></div>
                ) : (
                  <div className="hidden"></div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Transformons vos <span className="text-primary">idées</span> en expériences <span className="text-primary">mémorables</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Agence créative spécialisée en production vidéo, design web et community management pour donner vie à vos projets.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/projets" 
                className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all"
                data-cursor="hover"
              >
                Voir nos projets
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all"
                data-cursor="hover"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
            data-cursor="hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </motion.div>
        </div>
      </section>
      
      {/* Section Services */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nos Services
            </motion.h2>
            <motion.p 
              className="text-lg text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Nous combinons créativité et expertise technique pour offrir des solutions complètes et sur mesure.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-cursor="hover"
              >
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/70 mb-6">{service.description}</p>
                <Link 
                  href={`/services#${service.id}`} 
                  className="inline-flex items-center text-primary group-hover:text-white"
                  data-cursor="hover"
                >
                  <span>En savoir plus</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section Projets en vedette avec défilement horizontal */}
      <section className="py-24 bg-primary-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex justify-between items-end">
            <div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Projets en vedette
              </motion.h2>
              <motion.p 
                className="text-lg text-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Découvrez nos réalisations les plus récentes
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/projets" 
                className="inline-flex items-center text-white hover:underline"
                data-cursor="hover"
              >
                <span>Voir tous les projets</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <HorizontalScroll speed={0.5} className="py-10">
          <div className="flex gap-8 pl-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="w-[350px] flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={`/projets/${project.slug}`}
                  className="block relative overflow-hidden rounded-xl group"
                  data-cursor="hover"
                  data-cursor-text="Voir"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{project.title}</h3>
                    <p className="text-white/80 text-sm">{project.client}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </HorizontalScroll>
      </section>
      
      {/* Section Tous les projets avec effet parallaxe */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tous nos projets
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-600 dark:text-neutral-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explorez l'ensemble de notre portfolio
          </motion.p>
        </div>
        
        <ParallaxGallery projects={allProjects} />
      </section>
      
      {/* Section CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Éléments décoratifs avec motifs graphiques visibles */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Fond avec dégradé plus visible */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-primary-light to-transparent opacity-60" 
            data-component-name="ModernHomepage"
          />
          
          {/* Cercles lumineux */}
          <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-white/30 blur-2xl" />
          <div className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-white/20 blur-2xl" />
          
          {/* Motifs graphiques */}
          <div className="absolute top-[20%] left-[15%] w-40 h-40">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="absolute bottom-[15%] right-[20%] w-60 h-60">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
              <rect x="10" y="10" width="80" height="80" stroke="white" strokeWidth="2" />
              <rect x="25" y="25" width="50" height="50" stroke="white" strokeWidth="2" />
              <rect x="40" y="40" width="20" height="20" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Prêt à donner vie à votre projet ?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="/contact" 
                className="bg-white text-primary px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all inline-block"
                data-cursor="hover"
              >
                Discutons de votre projet
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
