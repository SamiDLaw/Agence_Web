'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function HorizontalScroll({ 
  children, 
  className = "", 
  speed = 0.5 
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth);
        setWindowWidth(window.innerWidth);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Calculer la distance de défilement horizontal
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -containerWidth + windowWidth]
  );
  
  return (
    <div className={`relative overflow-hidden ${className}`} ref={containerRef}>
      <motion.div
        style={{ x }}
        className="flex"
      >
        {children}
      </motion.div>
    </div>
  );
}
