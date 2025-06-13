'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from 'framer-motion';

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  repeat?: number;
  gap?: number;
}

export function MarqueeText({
  text,
  className = '',
  speed = 50,
  direction = 'left',
  repeat = 4,
  gap = 30
}: MarqueeTextProps) {
  const baseX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Créer un tableau répété du texte
  const repeatedText = Array(repeat).fill(text).join(`${' '.repeat(gap)}`);
  
  useAnimationFrame((time, delta) => {
    if (!containerRef.current) return;
    
    // Calculer le déplacement en fonction de la vitesse et du temps écoulé
    const pixelsPerSecond = speed;
    const pixelsToMove = (pixelsPerSecond * delta) / 1000;
    
    // Mettre à jour la position de base
    if (direction === 'left') {
      baseX.current -= pixelsToMove;
    } else {
      baseX.current += pixelsToMove;
    }
    
    // Réinitialiser la position lorsque le texte est complètement sorti de l'écran
    const textWidth = containerRef.current.scrollWidth / repeat;
    if (Math.abs(baseX.current) > textWidth) {
      baseX.current = 0;
    }
    
    // Appliquer la transformation
    containerRef.current.style.transform = `translateX(${baseX.current}px)`;
  });
  
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div 
        ref={containerRef} 
        className="inline-block"
        style={{ willChange: 'transform' }}
      >
        {repeatedText}
      </div>
    </div>
  );
}
