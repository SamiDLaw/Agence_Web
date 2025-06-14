'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { AnimatedText } from './AnimatedText';
import { HorizontalScroll } from './HorizontalScroll';
import { ModernVideoPlayer } from './ModernVideoPlayer';

// Types pour les projets
interface ProjectDetail {
  id: string;
  title: string;
  slug: string;
  client: string;
  year: number;
  category: string;
  description: string;
  challenge?: string;
  solution?: string;
  results?: string;
  coverImage: string;
  gallery: string[];
  video?: string;
  technologies?: string[];
  nextProject?: {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
  };
  prevProject?: {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
  };
}

interface ProjectDetailProps {
  project: ProjectDetail;
}

export function ModernProjectDetail({ project }: ProjectDetailProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Scroll vers le haut lors du chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  // Animation de parallaxe pour l'image de couverture
  const { scrollYProgress: headerScrollProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerImageScale = useTransform(headerScrollProgress, [0, 1], [1.1, 1]);
  const headerImageOpacity = useTransform(headerScrollProgress, [0, 0.8], [1, 0.3]);
  const headerTextY = useTransform(headerScrollProgress, [0, 1], [0, 150]);

  // Nous n'avons plus besoin de cette fonction car ModernVideoPlayer gère la lecture/pause

  // Gestion de la galerie modale
  const openGallery = (image: string) => {
    setActiveImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setActiveImage(null);
    document.body.style.overflow = '';
  };

  // Animation pour les sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
  };

  return (
    <article className="bg-white dark:bg-black">
      {/* Hero du projet avec parallaxe */}
      <section 
        ref={headerRef}
        className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            scale: headerImageScale,
            opacity: headerImageOpacity
          }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{ y: headerTextY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-white"
          >
            <div className="mb-6">
              <Link 
                href="/projets" 
                className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors group"
                data-cursor="hover"
              >
                <span className="w-10 h-[1px] bg-white/60 mr-4 transform origin-left transition-all duration-300 group-hover:w-16"></span>
                Retour aux projets
              </Link>
            </div>
            
            <AnimatedText 
              text={project.title} 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              once={true}
            />
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full">
                <span className="text-sm font-medium">{project.category}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full">
                <span className="text-sm font-medium">{project.client}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full">
                <span className="text-sm font-medium">{project.year}</span>
              </div>
            </div>
            
            <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
              {project.description}
            </p>
            
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="animate-bounce"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Contenu principal */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar */}
            <ScrollReveal direction="right" className="lg:col-span-4">
              <div className="sticky top-32">
                <h2 className="text-2xl font-bold mb-10 relative">
                  <span className="relative z-10">Détails du projet</span>
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
                </h2>
                
                <div className="space-y-10">
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-3">Client</h3>
                    <p className="font-medium text-lg">{project.client}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-3">Année</h3>
                    <p className="font-medium text-lg">{project.year}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-3">Catégorie</h3>
                    <p className="font-medium text-lg">{project.category}</p>
                  </div>
                  
                  {project.technologies && (
                    <div>
                      <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="inline-block px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
            
            {/* Contenu principal */}
            <div className="lg:col-span-8 space-y-24">
              {/* Challenge */}
              {project.challenge && (
                <ScrollReveal>
                  <h2 className="text-3xl font-bold mb-8 relative">
                    <span className="relative z-10">Le challenge</span>
                    <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
                  </h2>
                  <p className="text-lg text-gray-800 dark:text-gray-100 leading-relaxed">
                    {project.challenge}
                  </p>
                </ScrollReveal>
              )}
              
              {/* Vidéo (si disponible) - Utilisation du ModernVideoPlayer */}
              {project.video && (
                <ScrollReveal>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <ModernVideoPlayer
                      src={project.video}
                      poster={project.coverImage}
                      className="w-full h-full"
                      autoPlay={false}
                      loop={false}
                      muted={false}
                      controls={true}
                    />
                  </div>
                </ScrollReveal>
              )}
              
              {/* Solution */}
              {project.solution && (
                <ScrollReveal>
                  <h2 className="text-3xl font-bold mb-8 relative">
                    <span className="relative z-10">Notre solution</span>
                    <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
                  </h2>
                  <p className="text-lg text-gray-800 dark:text-gray-100 leading-relaxed">
                    {project.solution}
                  </p>
                </ScrollReveal>
              )}
              
              {/* Galerie horizontale */}
              {project.gallery.length > 0 && (
                <ScrollReveal>
                  <h2 className="text-3xl font-bold mb-12 relative">
                    <span className="relative z-10">Galerie du projet</span>
                    <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
                  </h2>
                  
                  <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
                    <HorizontalScroll>
                      <div className="flex space-x-6 px-4 sm:px-6 lg:px-8">
                        {project.gallery.map((image, index) => (
                          <div 
                            key={index} 
                            className="w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] flex-shrink-0 cursor-pointer"
                            onClick={() => openGallery(image)}
                            data-cursor="hover"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                              <Image
                                src={image}
                                alt={`${project.title} - Image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </HorizontalScroll>
                  </div>
                </ScrollReveal>
              )}
              
              {/* Résultats */}
              {project.results && (
                <ScrollReveal>
                  <h2 className="text-3xl font-bold mb-8 relative">
                    <span className="relative z-10">Résultats</span>
                    <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
                  </h2>
                  <p className="text-lg text-gray-800 dark:text-gray-100 leading-relaxed">
                    {project.results}
                  </p>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Navigation entre projets */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Découvrez d'autres projets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.prevProject && (
              <Link 
                href={`/projets/${project.prevProject.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-[16/9]"
                data-cursor="hover"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.prevProject.thumbnail}
                    alt={project.prevProject.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-white/80">Projet précédent</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:underline">
                    {project.prevProject.title}
                  </h3>
                </div>
              </Link>
            )}
            
            {project.nextProject && (
              <Link 
                href={`/projets/${project.nextProject.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-[16/9]"
                data-cursor="hover"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.nextProject.thumbnail}
                    alt={project.nextProject.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-white/80">Projet suivant</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:underline">
                    {project.nextProject.title}
                  </h3>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
      
      {/* Galerie modale */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            data-cursor="close"
          >
            <button 
              className="absolute top-8 right-8 text-white z-10 p-2"
              onClick={closeGallery}
              aria-label="Fermer la galerie"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <motion.div 
              className="relative w-full max-w-5xl max-h-[80vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={activeImage}
                  alt="Image du projet"
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-center">
                  {project.title} - {project.client}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
