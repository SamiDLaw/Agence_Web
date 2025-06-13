'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HoverImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  hoverEffect?: 'zoom' | 'tilt' | 'reveal' | 'blur';
}

export function HoverImage({
  src,
  alt,
  width = 500,
  height = 300,
  className = '',
  hoverEffect = 'zoom'
}: HoverImageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normaliser les coordonnées entre -0.5 et 0.5
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  };
  
  // Différents effets au survol
  const getImageAnimation = () => {
    switch (hoverEffect) {
      case 'zoom':
        return {
          scale: isHovering ? 1.1 : 1,
          transition: { duration: 0.4 }
        };
      case 'tilt':
        return {
          rotateX: isHovering ? mousePosition.y * -10 : 0,
          rotateY: isHovering ? mousePosition.x * 10 : 0,
          transition: { duration: 0.2 }
        };
      case 'reveal':
        return {
          y: isHovering ? 0 : 20,
          opacity: isHovering ? 1 : 0,
          transition: { duration: 0.3 }
        };
      case 'blur':
        return {
          filter: isHovering ? 'blur(0px)' : 'blur(5px)',
          transition: { duration: 0.3 }
        };
      default:
        return {};
    }
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        perspective: 1000
      }}
      data-cursor="hover"
    >
      <motion.div
        className="w-full h-full"
        animate={getImageAnimation()}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={`(max-width: 768px) 100vw, ${width}px`}
          />
        ) : (
          // Placeholder si l'image n'est pas disponible
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">{alt}</span>
          </div>
        )}
      </motion.div>
      
      {/* Overlay au survol */}
      <motion.div
        className="absolute inset-0 bg-black/30 flex items-end p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-white font-medium">{alt}</span>
      </motion.div>
    </motion.div>
  );
}
