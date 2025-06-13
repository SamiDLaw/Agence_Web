'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HorizontalScroll } from './HorizontalScroll';
import { AnimatedText } from './AnimatedText';

// Types
type Project = {
  id: string;
  title: string;
  client: string;
  description: string;
  category: string;
  thumbnail: string;
  slug: string;
  year: number;
};

type FeaturedProjectsProps = {
  projects: Project[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="py-32 bg-white dark:bg-black overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <AnimatedText 
            text="Projets en vedette" 
            className="text-3xl md:text-5xl font-bold mb-6"
            once={true}
          />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Découvrez nos dernières créations et collaborations avec des marques innovantes.
          </p>
        </motion.div>
      </div>
      
      {isMobile ? (
        // Version mobile avec défilement vertical standard
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/projets/${project.slug}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <p className="text-lg font-medium">{project.title}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">{project.category}</span>
                    <h3 className="text-2xl font-bold mb-2 group-hover:underline">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.client}, {project.year}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // Version desktop avec défilement horizontal
        <div className="relative h-[80vh] mt-12">
          <HorizontalScroll>
            <div className="flex pl-[10vw] pr-[20vw] gap-[10vw] items-center h-[80vh]">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveProject(project)}
                  onMouseLeave={() => setActiveProject(null)}
                  data-cursor="hover"
                >
                  <Link href={`/projets/${project.slug}`} className="block w-[50vw] h-[60vh] relative">
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      {/* Placeholder pour l'image du projet */}
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        <p className="text-lg font-medium">{project.title}</p>
                      </div>
                      
                      {/* Overlay au survol */}
                      <motion.div 
                        className="absolute inset-0 bg-black/30 flex items-end p-8"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <span className="text-sm text-gray-300 mb-2 block">{project.category}</span>
                          <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-200">
                            {project.client}, {project.year}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </HorizontalScroll>
          
          {/* Indicateur de défilement */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Scroll</span>
            <svg className="ml-2 w-5 h-5 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 mt-16 text-center">
        <Link 
          href="/projets"
          className="inline-block px-8 py-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
          data-cursor="hover"
        >
          Voir tous nos projets
        </Link>
      </div>
    </section>
  );
}
