'use client';

import { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  once = true,
  threshold = 0.1
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Déterminer les valeurs initiales et finales en fonction de la direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };
  
  const getFinalPosition = () => {
    switch (direction) {
      case 'up': 
      case 'down': 
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default: 
        return { y: 0, opacity: 1 };
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Courbe d'accélération personnalisée pour un effet plus fluide
      }}
    >
      {children}
    </motion.div>
  );
}
