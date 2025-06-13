'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { AnimatedText } from './AnimatedText';

export function HeroPortfolio() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Autoplay failed:", error);
      });
    }
    
    // Simuler un chargement pour l'animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Overlay d'entrée */}
      <motion.div 
        className="absolute inset-0 bg-black z-30 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />
      
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
          className="w-full h-full"
        >
          <video 
            ref={videoRef}
            className="w-full h-full object-cover opacity-70"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsLoaded(true)}
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-5xl">
          <AnimatedText 
            text="Nous sommes un collectif de créateurs explorant des façons visuelles de transmettre des idées."
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
            delay={1}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
              Design, vidéo, web et community management à la pointe de l'innovation.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 3 }}
            className="mt-10"
          >
            <a 
              href="#services" 
              className="inline-block px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-colors"
            >
              Découvrir nos services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? [0, 10, 0] : 0,
        }}
        transition={{ 
          opacity: { delay: 3.5, duration: 0.8 },
          y: { repeat: Infinity, duration: 1.5, delay: 3.5 }
        }}
      >
        <svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="22" height="40" rx="11" stroke="white" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4" fill="white"/>
        </svg>
      </motion.div>
    </section>
  );
}
