'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

interface ModernGalleryProps {
  images: string[];
  className?: string;
}

export function ModernGallery({ images, className = '' }: ModernGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const openLightbox = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };
  
  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };
  
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };
  
  // Gérer les touches du clavier pour la navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    }
  };
  
  return (
    <div 
      className={`${className}`} 
      tabIndex={0} 
      onKeyDown={handleKeyDown}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <ScrollReveal 
            key={index} 
            delay={index * 0.1} 
            className="aspect-[4/3] relative overflow-hidden"
          >
            <motion.div
              className="w-full h-full cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(image, index)}
              data-cursor="hover"
            >
              {image ? (
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Image {index + 1}</span>
                </div>
              )}
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative w-full max-w-5xl h-full max-h-[80vh] p-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt={`Image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              
              {/* Navigation */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Image précédente"
                data-cursor="hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Image suivante"
                data-cursor="hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              
              <button
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full"
                onClick={closeLightbox}
                aria-label="Fermer"
                data-cursor="hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
