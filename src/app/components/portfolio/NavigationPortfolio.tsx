'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function NavigationPortfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => {
      window.location.href = path;
    }, 200);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="text-2xl font-bold" onClick={(e) => handleNavigation(e, '/')}>
              Lawgency
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${pathname === '/' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                onClick={(e) => handleNavigation(e, '/')}
              >
                Accueil
              </a>
              <a 
                href="/projets" 
                className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${pathname === '/projets' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                onClick={(e) => handleNavigation(e, '/projets')}
              >
                Projets
              </a>
              <a 
                href="/services" 
                className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${pathname === '/services' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                onClick={(e) => handleNavigation(e, '/services')}
              >
                Services
              </a>
              <a 
                href="/a-propos" 
                className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${pathname === '/a-propos' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                onClick={(e) => handleNavigation(e, '/a-propos')}
              >
                À propos
              </a>
              <a 
                href="/contact" 
                className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${pathname === '/contact' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                onClick={(e) => handleNavigation(e, '/contact')}
              >
                Contact
              </a>
            </nav>

            <button 
              className="md:hidden flex items-center" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-white dark:bg-black z-40 flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center space-y-8">
              <a 
                href="/" 
                className="text-3xl font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => handleNavigation(e, '/')}
              >
                Accueil
              </a>
              <a 
                href="/projets" 
                className="text-3xl font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => handleNavigation(e, '/projets')}
              >
                Projets
              </a>
              <a 
                href="/services" 
                className="text-3xl font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => handleNavigation(e, '/services')}
              >
                Services
              </a>
              <a 
                href="/a-propos" 
                className="text-3xl font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => handleNavigation(e, '/a-propos')}
              >
                À propos
              </a>
              <a 
                href="/contact" 
                className="text-3xl font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => handleNavigation(e, '/contact')}
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
