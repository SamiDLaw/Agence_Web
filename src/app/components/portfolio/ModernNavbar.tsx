'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Projets', path: '/projets' },
  { name: 'À propos', path: '/a-propos' },
  { name: 'Contact', path: '/contact' },
];

export function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Gérer le défilement pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Fermer le menu lors du changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  // Empêcher le défilement du body lorsque le menu est ouvert
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
  
  const navbarClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    scrolled ? 'py-3 bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm' : 'py-6'
  }`;
  
  const logoVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.05 }
  };
  
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };
  
  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="relative z-50">
            <motion.div
              initial="normal"
              whileHover="hover"
              variants={logoVariants}
              data-cursor="hover"
            >
              <span className="text-xl font-bold">Lawgency</span>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  pathname === item.path ? 'text-blue-600 dark:text-blue-400' : ''
                }`}
                data-cursor="hover"
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 md:hidden flex flex-col justify-center items-center w-10 h-10"
            aria-label="Menu"
            data-cursor="hover"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              className="block w-6 h-0.5 bg-black dark:bg-white mb-1.5"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="block w-6 h-0.5 bg-black dark:bg-white mb-1.5"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              className="block w-6 h-0.5 bg-black dark:bg-white"
            />
          </button>
        </div>
      </nav>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-black z-40 flex items-center justify-center"
          >
            <motion.ul
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center space-y-8"
            >
              {navItems.map((item) => (
                <motion.li key={item.path} variants={itemVariants}>
                  <Link
                    href={item.path}
                    className={`text-3xl font-bold hover:text-blue-600 dark:hover:text-blue-400 ${
                      pathname === item.path ? 'text-blue-600 dark:text-blue-400' : ''
                    }`}
                    data-cursor="hover"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
