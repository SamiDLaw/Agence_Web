'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

type Project = {
  id: string;
  title: string;
  client?: string;
  year?: number;
  category: string;
  thumbnail: string;
  slug: string;
  description?: string;
};

type ProjectsGridProps = {
  projects: Project[];
};

export function ModernProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Filtrage des projets
  const filteredProjects = filter 
    ? projects.filter(project => project.category === filter)
    : projects;

  // Extraction des catégories uniques
  const categories = Array.from(new Set(projects.map(project => project.category)));
  
  // Gestion du curseur personnalisé pour les projets
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Animation de défilement pour le titre
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const titleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  
  // Variantes d'animation pour les projets
  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1]
      }
    }),
    exit: { opacity: 0, y: -30, transition: { duration: 0.5 } }
  };
  
  // Variantes pour l'animation du filtre
  const filterVariants = {
    inactive: { width: 0 },
    active: { width: '100%' }
  };

  return (
    <section 
      ref={containerRef} 
      className="py-32 bg-white dark:bg-black relative overflow-hidden"
    >
      {/* Curseur personnalisé pour les projets */}
      <div 
        ref={cursorRef} 
        className={`hidden lg:flex fixed pointer-events-none items-center justify-center w-24 h-24 rounded-full bg-primary text-white text-sm font-medium z-20 transition-all duration-300 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        <span>Voir</span>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section avec animation parallaxe */}
        <motion.div 
          className="mb-24 relative"
          style={{ y: titleY }}
        >
          <h2 className="text-6xl md:text-8xl font-bold text-black/10 dark:text-white/10 uppercase tracking-tighter">
            Projets
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold absolute top-1/2 left-0 transform -translate-y-1/2 text-black dark:text-white">
            Nos réalisations
          </h3>
        </motion.div>
        
        {/* Filtres avec animation */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-20">
          <button 
            className="text-lg relative pb-1 focus:outline-none"
            onClick={() => setFilter(null)}
            data-cursor="hover"
          >
            <span>Tous les projets</span>
            <motion.span 
              className="absolute bottom-0 left-0 h-0.5 bg-primary"
              variants={filterVariants}
              initial="inactive"
              animate={filter === null ? "active" : "inactive"}
              transition={{ duration: 0.3 }}
            />
          </button>
          
          {categories.map(category => (
            <button 
              key={category}
              className="text-lg relative pb-1 focus:outline-none"
              onClick={() => setFilter(category)}
              data-cursor="hover"
            >
              <span>{category}</span>
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                variants={filterVariants}
                initial="inactive"
                animate={filter === category ? "active" : "inactive"}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>

        {/* Grille de projets avec animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={projectVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="group"
                onMouseEnter={() => {
                  setActiveProject(project);
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setActiveProject(null);
                  setIsHovering(false);
                }}
              >
                <Link href={`/projets/${project.slug}`} className="block" data-cursor="none">
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <motion.div
                        className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </motion.div>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-100 space-x-4">
                      <span>{project.category}</span>
                      {project.client && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                          <span>{project.client}</span>
                        </>
                      )}
                      {project.year && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                          <span>{project.year}</span>
                        </>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-gray-800 dark:text-gray-100 line-clamp-2 mt-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Message si aucun projet ne correspond au filtre */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-800 dark:text-gray-100">
              Aucun projet ne correspond à ce filtre pour le moment.
            </p>
            <button 
              className="mt-4 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => setFilter(null)}
              data-cursor="hover"
            >
              Voir tous les projets
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Bannière de séparation */}
      <div className="mt-32 py-16 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
        <ScrollReveal>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <h3 className="text-3xl md:text-4xl font-bold max-w-md text-black dark:text-white">
                Prêt à donner vie à votre prochain projet ?
              </h3>
              <Link 
                href="/contact"
                className="px-8 py-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-lg font-medium"
                data-cursor="hover"
              >
                Discutons-en
              </Link>
            </div>
          </div>
        </ScrollReveal>
        
        {/* Éléments décoratifs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  );
}
