'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { AnimatedText } from './AnimatedText';
import { ModernGallery } from './ModernGallery';
import { ModernVideoPlayer } from './ModernVideoPlayer';
import { HoverImage } from './HoverImage';

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

export function ProjectDetail({ project }: ProjectDetailProps) {
  // Scroll vers le haut lors du chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  return (
    <article className="bg-white dark:bg-black">
      {/* Hero du projet */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <div className="mb-4">
              <Link 
                href="/projets" 
                className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors"
                data-cursor="hover"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Retour aux projets
              </Link>
            </div>
            
            <AnimatedText 
              text={project.title} 
              className="text-4xl md:text-6xl font-bold mb-4"
              once={true}
            />
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">{project.category}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">{project.client}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">{project.year}</span>
              </div>
            </div>
            
            <p className="text-lg text-white/90 max-w-2xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contenu principal */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Sidebar */}
            <ScrollReveal direction="right" className="lg:col-span-1">
              <div className="sticky top-32">
                <h2 className="text-2xl font-bold mb-6">Détails du projet</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-2">Client</h3>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-2">Année</h3>
                    <p className="font-medium">{project.year}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-2">Catégorie</h3>
                    <p className="font-medium">{project.category}</p>
                  </div>
                  
                  {project.technologies && (
                    <div>
                      <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full"
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
            <div className="lg:col-span-2 space-y-16">
              {/* Challenge */}
              {project.challenge && (
                <ScrollReveal>
                  <h2 className="text-2xl font-bold mb-4">Le challenge</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </ScrollReveal>
              )}
              
              {/* Vidéo (si disponible) */}
              {project.video && (
                <ScrollReveal>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <ModernVideoPlayer
                      src={project.video}
                      poster={project.coverImage}
                      className="w-full h-full"
                    />
                  </div>
                </ScrollReveal>
              )}
              
              {/* Solution */}
              {project.solution && (
                <ScrollReveal>
                  <h2 className="text-2xl font-bold mb-4">Notre solution</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.solution}
                  </p>
                </ScrollReveal>
              )}
              
              {/* Galerie */}
              <ScrollReveal>
                <h2 className="text-2xl font-bold mb-6">Galerie du projet</h2>
                <ModernGallery images={project.gallery} />
              </ScrollReveal>
              
              {/* Résultats */}
              {project.results && (
                <ScrollReveal>
                  <h2 className="text-2xl font-bold mb-4">Résultats</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.results}
                  </p>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Navigation entre projets */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Découvrez d'autres projets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.prevProject && (
              <Link href={`/projets/${project.prevProject.slug}`} className="block group">
                <ScrollReveal direction="left">
                  <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg">
                    <HoverImage
                      src={project.prevProject.thumbnail}
                      alt={project.prevProject.title}
                      className="w-full h-full"
                      hoverEffect="zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-8">
                      <div className="text-white">
                        <span className="flex items-center text-sm font-medium mb-2">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                          </svg>
                          Projet précédent
                        </span>
                        <h3 className="text-xl font-bold">{project.prevProject.title}</h3>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </Link>
            )}
            
            {project.nextProject && (
              <Link href={`/projets/${project.nextProject.slug}`} className="block group">
                <ScrollReveal direction="right">
                  <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg">
                    <HoverImage
                      src={project.nextProject.thumbnail}
                      alt={project.nextProject.title}
                      className="w-full h-full"
                      hoverEffect="zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent flex items-center justify-end p-8">
                      <div className="text-white text-right">
                        <span className="flex items-center justify-end text-sm font-medium mb-2">
                          Projet suivant
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </span>
                        <h3 className="text-xl font-bold">{project.nextProject.title}</h3>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </Link>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/projets" 
              className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              data-cursor="hover"
            >
              Voir tous les projets
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
