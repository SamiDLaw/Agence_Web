'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function ModernFooter() {
  const [emailValue, setEmailValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoverService, setHoverService] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue) {
      // Simuler l'envoi du formulaire
      setIsSubmitted(true);
      setEmailValue('');
      
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };
  
  const currentYear = new Date().getFullYear();
  
  const services = [
    { id: 'video', name: 'Agence Vidéo', description: 'Production vidéo de haute qualité' },
    { id: 'web', name: 'Design Web', description: 'Sites web modernes et responsives' },
    { id: 'community', name: 'Community Management', description: 'Gestion des réseaux sociaux' },
  ];
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6
      }
    })
  };
  
  const serviceHoverVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };
  
  return (
    <footer className="bg-black text-white pt-24 pb-12 overflow-hidden relative">
      {/* Gradient background */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-primary/20 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo et description */}
          <motion.div 
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUpVariants}
          >
            <Link href="/" className="inline-block mb-8" data-cursor="hover">
              <Image 
                src="/images/logo-white.png" 
                alt="Lawgency" 
                width={150} 
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-8 text-lg max-w-md leading-relaxed">
              Votre partenaire créatif pour des expériences digitales innovantes et mémorables.
            </p>
            <div className="flex space-x-5">
              <a 
                href="https://www.instagram.com/lawgency_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                aria-label="Instagram"
                data-cursor="hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/lawgency-marseille-4871a0348/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                aria-label="LinkedIn"
                data-cursor="hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Services */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeInUpVariants}
          >
            <h3 className="text-xl font-bold mb-8 relative">
              <span className="relative z-10">Nos Services</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-5">
              {services.map((service) => (
                <li key={service.id} className="relative">
                  <Link 
                    href={`/services#${service.id}`}
                    className="text-gray-300 hover:text-white transition-colors inline-block"
                    data-cursor="hover"
                    onMouseEnter={() => setHoverService(service.id)}
                    onMouseLeave={() => setHoverService(null)}
                  >
                    {service.name}
                    <AnimatePresence>
                      {hoverService === service.id && (
                        <motion.span 
                          className="absolute left-0 -bottom-6 text-xs text-gray-300"
                          variants={serviceHoverVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {service.description}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Liens rapides */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeInUpVariants}
          >
            <h3 className="text-xl font-bold mb-8 relative">
              <span className="relative z-10">Navigation</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-5">
              {[
                { name: 'Accueil', path: '/' },
                { name: 'Projets', path: '/projets' },
                { name: 'À propos', path: '/a-propos' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                    data-cursor="hover"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeInUpVariants}
          >
            <h3 className="text-xl font-bold mb-8 relative">
              <span className="relative z-10">Newsletter</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
            </h3>
            <p className="text-gray-300 mb-6">
              Recevez nos dernières créations et actualités directement dans votre boîte mail.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="flex-grow px-4 py-3 bg-white/5 border border-white/10 text-white rounded-l-md focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-r-md transition-colors"
                  data-cursor="hover"
                >
                  {isSubmitted ? 'Merci !' : 'Envoyer'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
        
        {/* Séparateur */}
        <motion.div 
          className="h-px bg-white/10 my-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
          <p>© {currentYear} Lawgency. Tous droits réservés.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link href="/mentions-legales" className="hover:text-white transition-colors" data-cursor="hover">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors" data-cursor="hover">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
