'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface NavigationLink {
  href: string;
  label: string;
}

export function ModernNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const links: NavigationLink[] = [
    { href: '/', label: 'Accueil' },
    { href: '/projets', label: 'Projets' },
    { href: '/services', label: 'Services' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
  ];
  
  // Détecter le défilement pour changer l'apparence de la navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Détecter le mode sombre
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  
  // Fermer le menu lors du changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  // Désactiver le défilement lorsque le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Variantes pour les animations
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const linkVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };
  
  const logoVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };
  
  return (
    <>
      {/* Navigation principale */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="relative z-50">
              <motion.div 
                variants={logoVariants}
                initial="normal"
                whileHover="hover"
                data-cursor="hover"
              >
                <Image 
                  src={isDarkMode ? "/images/logo-white.svg" : "/images/logo-black.svg"} 
                  alt="Lawgency" 
                  width={180} 
                  height={60} 
                  className="h-10 w-auto"
                  priority
                />
              </motion.div>
            </Link>
            
            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative ${
                    pathname === link.href 
                      ? 'text-primary' 
                      : 'text-black dark:text-white hover:text-primary dark:hover:text-primary'
                  }`}
                  data-cursor="hover"
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span 
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Bouton contact */}
            <div className="hidden md:block">
              <Link 
                href="/contact"
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                data-cursor="hover"
              >
                Démarrer un projet
              </Link>
            </div>
            
            {/* Bouton menu mobile */}
            <button 
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              data-cursor="hover"
            >
              <div className="flex flex-col justify-center items-center">
                <span 
                  className={`block h-0.5 w-6 rounded-sm bg-current transition-all duration-300 ${
                    isOpen 
                      ? 'rotate-45 translate-y-1' 
                      : '-translate-y-0.5'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-6 rounded-sm bg-current transition-all duration-300 mt-1 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-6 rounded-sm bg-current transition-all duration-300 mt-1 ${
                    isOpen 
                      ? '-rotate-45 -translate-y-1' 
                      : 'translate-y-0.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
      
      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex-1 flex flex-col justify-center items-center py-20">
              <nav className="flex flex-col items-center space-y-6">
                {links.map((link) => (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link 
                      href={link.href}
                      className={`text-3xl font-bold transition-colors ${
                        pathname === link.href 
                          ? 'text-primary' 
                          : 'text-black dark:text-white hover:text-primary dark:hover:text-primary'
                      }`}
                      data-cursor="hover"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div 
                className="mt-12"
                variants={linkVariants}
              >
                <Link 
                  href="/contact"
                  className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
                  data-cursor="hover"
                >
                  Démarrer un projet
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="py-8 border-t border-gray-200 dark:border-gray-800"
              variants={linkVariants}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Lawgency. Tous droits réservés.
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                      aria-label="Instagram"
                      data-cursor="hover"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                      aria-label="Twitter"
                      data-cursor="hover"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                      aria-label="LinkedIn"
                      data-cursor="hover"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
