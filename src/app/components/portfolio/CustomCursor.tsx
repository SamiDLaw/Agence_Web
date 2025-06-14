'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface CursorState {
  x: number;
  y: number;
  type: 'default' | 'hover' | 'click' | 'drag' | 'text';
  text?: string;
}

export function CustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    type: 'default',
  });
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
      setIsVisible(true);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      // Vérifier si l'élément ou ses parents ont un attribut data-cursor
      let target = e.target as HTMLElement;
      while (target) {
        if (target.getAttribute && target.getAttribute('data-cursor')) {
          const cursorType = target.getAttribute('data-cursor') as CursorState['type'];
          const cursorText = target.getAttribute('data-cursor-text') || undefined;
          
          setCursor(prev => ({
            ...prev,
            type: cursorType as CursorState['type'],
            text: cursorText,
          }));
          return;
        }
        target = target.parentElement as HTMLElement;
      }
      
      setCursor(prev => ({
        ...prev,
        type: 'default',
        text: undefined,
      }));
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    // Désactiver le curseur natif
    document.body.style.cursor = 'none';
    
    // Ajouter data-cursor="hover" à tous les éléments cliquables
    const addHoverToClickable = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"], .clickable');
      clickables.forEach(el => {
        if (!el.getAttribute('data-cursor')) {
          el.setAttribute('data-cursor', 'hover');
        }
      });
    };
    
    // Exécuter une première fois et configurer un MutationObserver pour les futurs éléments
    addHoverToClickable();
    const observer = new MutationObserver(addHoverToClickable);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = '';
      observer.disconnect();
    };
  }, []);
  
  // Détection du thème
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  
  // Ne pas afficher le curseur personnalisé sur les appareils mobiles ou tactiles
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(window.innerWidth < 768 || isTouchDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  if (isMobile) {
    // Restaurer le curseur par défaut sur mobile
    useEffect(() => {
      document.body.style.cursor = '';
    }, []);
    return null;
  }
  
  // Déterminer les styles en fonction du type de curseur et du thème
  const getCursorStyles = () => {
    const baseStyles = {
      scale: 1,
      opacity: isVisible ? 1 : 0,
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      borderRadius: '50%' as const,
      width: '24px' as const,
      height: '24px' as const,
    };
    
    switch (cursor.type) {
      case 'hover':
        return {
          ...baseStyles,
          scale: 1.5,
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        };
      case 'click':
        return {
          ...baseStyles,
          scale: 0.8,
        };
      case 'drag':
        return {
          ...baseStyles,
          scale: 1.2,
          borderRadius: '8px',
          width: '40px',
          height: '40px',
        };
      case 'text':
        return {
          ...baseStyles,
          scale: 2,
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
        };
      default:
        return baseStyles;
    }
  };
  
  const getOuterStyles = () => {
    const baseStyles = {
      scale: 1,
      opacity: isVisible ? 0.3 : 0,
      borderRadius: '50%' as const,
      width: '40px' as const,
      height: '40px' as const,
    };
    
    switch (cursor.type) {
      case 'hover':
        return {
          ...baseStyles,
          scale: 1.8,
          opacity: 0.5,
        };
      case 'click':
        return {
          ...baseStyles,
          scale: 1.5,
          opacity: 0.3,
        };
      case 'drag':
        return {
          ...baseStyles,
          scale: 2,
          borderRadius: '12px',
          width: '50px',
          height: '50px',
          opacity: 0.3,
        };
      case 'text':
        return {
          ...baseStyles,
          scale: 0,
          opacity: 0,
        };
      default:
        return baseStyles;
    }
  };
  
  return (
    <>
      {/* Curseur principal */}
      <motion.div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-6 h-6 rounded-full z-50 pointer-events-none ${isDarkMode ? 'bg-white' : 'bg-black'}`}
        animate={{
          x: cursor.x - 12,
          y: cursor.y - 12,
          scale: isClicking ? 0.8 : getCursorStyles().scale,
          opacity: getCursorStyles().opacity,
          backgroundColor: getCursorStyles().backgroundColor,
          borderRadius: getCursorStyles().borderRadius,
          width: getCursorStyles().width,
          height: getCursorStyles().height,
        }}
        transition={{
          x: { type: "spring", mass: 0.2, stiffness: 180, damping: 15 },
          y: { type: "spring", mass: 0.2, stiffness: 180, damping: 15 },
          scale: { type: "spring", mass: 0.3, stiffness: 200, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      />
      
      {/* Cercle extérieur */}
      <motion.div
        ref={cursorOuterRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border z-50 pointer-events-none ${isDarkMode ? 'border-white' : 'border-black'}`}
        animate={{
          x: cursor.x - 20,
          y: cursor.y - 20,
          scale: isClicking ? 1.2 : getOuterStyles().scale,
          opacity: getOuterStyles().opacity,
          borderRadius: getOuterStyles().borderRadius,
          width: getOuterStyles().width,
          height: getOuterStyles().height,
        }}
        transition={{
          x: { type: "spring", mass: 0.5, stiffness: 140, damping: 15 },
          y: { type: "spring", mass: 0.5, stiffness: 140, damping: 15 },
          scale: { type: "spring", mass: 0.7, stiffness: 120, damping: 20 },
          opacity: { duration: 0.3 },
        }}
      />
      
      {/* Texte du curseur (pour le type 'text') */}
      <AnimatePresence>
        {cursor.type === 'text' && cursor.text && (
          <motion.div
            className="fixed text-white text-xs font-medium z-50 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: cursor.x - 30,
              top: cursor.y + 15,
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {cursor.text}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
