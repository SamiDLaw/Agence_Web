'use client';

import { motion } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export const AnimatedText = ({ 
  text, 
  className = "", 
  once = true,
  delay = 0
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Diviser le texte en mots
  const words = text.split(" ");
  
  // Variantes d'animation pour le conteneur
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: delay * 0.1,
      },
    }),
  };
  
  // Variantes d'animation pour chaque mot
  const wordVariants = {
    hidden: { 
      y: 50, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1], // Cubic bezier pour un effet plus naturel
      }
    }
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      <div className="flex flex-wrap">
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="mr-2 mb-2 inline-block"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
