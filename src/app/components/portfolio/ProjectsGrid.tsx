'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverImage } from './HoverImage';
import { AnimatedText } from './AnimatedText';

type Project = {
  id: string;
  title: string;
  client?: string;
  year?: number;
  category: string;
  thumbnail: string;
  slug: string;
};

type ProjectsGridProps = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const filteredProjects = filter 
    ? projects.filter(project => project.category === filter)
    : projects;

  const categories = Array.from(new Set(projects.map(project => project.category)));
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Variantes d'animation pour les projets
  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <section className="py-20 bg-white dark:bg-black" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="container mx-auto px-4">
        {/* Titre de section avec animation */}
        <div className="mb-12 text-center">
          <AnimatedText 
            text="Nos projets" 
            className="text-4xl md:text-5xl font-bold mb-4"
            once={true}
          />
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez nos réalisations dans les domaines de l'agence vidéo, du design web et du community management.
          </p>
        </div>
        
        {/* Filtres avec animation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button 
            className={`text-sm font-medium px-6 py-3 border transition-colors ${!filter ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'bg-transparent text-black dark:text-white border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'}`}
            onClick={() => setFilter(null)}
            data-cursor="hover"
          >
            Tous les projets
          </button>
          {categories.map(category => (
            <button 
              key={category}
              className={`text-sm font-medium px-6 py-3 border transition-colors ${filter === category ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'bg-transparent text-black dark:text-white border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'}`}
              onClick={() => setFilter(category)}
              data-cursor="hover"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grille de projets avec animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={`/projets/${project.slug}`} className="block">
                  <div className="relative aspect-[4/3] mb-4">
                    <HoverImage
                      src={project.thumbnail}
                      alt={project.title}
                      hoverEffect="zoom"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-2">
                    <span className="text-sm text-gray-500 dark:text-gray-300 mb-1 block">{project.category}</span>
                    <h3 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    {(project.client || project.year) && (
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {project.client}{project.client && project.year ? ', ' : ''}{project.year}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Projet survolé - détail flottant */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              className="fixed pointer-events-none hidden lg:block bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg p-4 rounded-lg z-50 max-w-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{
                left: mousePosition.x + 20,
                top: mousePosition.y + 20
              }}
            >
              <h4 className="text-lg font-bold">{hoveredProject.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {hoveredProject.client}{hoveredProject.client && hoveredProject.year ? ', ' : ''}{hoveredProject.year}
              </p>
              <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                {hoveredProject.category}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
