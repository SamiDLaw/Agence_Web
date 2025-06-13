'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/app/data/projects';

interface ParallaxGalleryProps {
  projects: Project[];
  className?: string;
}

export function ParallaxGallery({ projects, className = "" }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  return (
    <div 
      ref={containerRef}
      className={`w-full min-h-[150vh] relative py-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              scrollYProgress={scrollYProgress}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  scrollYProgress: any;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProjectCard({ 
  project, 
  index, 
  scrollYProgress, 
  isHovered,
  onHover,
  onLeave
}: ProjectCardProps) {
  // Calculer le décalage vertical pour l'effet parallaxe
  const isEven = index % 2 === 0;
  const baseDelay = index * 0.1;
  
  // Créer un effet de parallaxe différent selon la position dans la grille
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [isEven ? 100 : 0, isEven ? -100 : -200]
  );
  
  // Calculer la rotation pour l'effet 3D
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isEven ? 5 : -5, 0, isEven ? -5 : 5]
  );
  
  return (
    <motion.div
      style={{ 
        y,
        rotateY,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: isEven ? 0 : 50 }}
      transition={{ 
        duration: 0.8, 
        delay: baseDelay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={`relative ${isEven ? 'md:mt-32' : ''}`}
    >
      <Link href={`/projets/${project.slug}`}>
        <motion.div
          className="relative overflow-hidden rounded-xl group cursor-pointer"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          data-cursor="hover"
          data-cursor-text="Voir"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            <div 
              className="absolute inset-0 bg-black/30 transition-opacity duration-500"
              style={{
                opacity: isHovered ? 0.4 : 0,
              }}
            />
          </div>
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-sm opacity-80">{project.client}</p>
              </div>
              <div className="bg-white text-black rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </motion.div>
          
          <div className="absolute top-6 left-6">
            <span className="bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>
        </motion.div>
      </Link>
      
      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-medium">{project.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{project.services.join(' • ')}</p>
      </div>
    </motion.div>
  );
}
