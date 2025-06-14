'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { AnimatedText } from './AnimatedText';
import { HoverImage } from './HoverImage';

// Types pour les services
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
}

interface ModernServicesSectionProps {
  services: Service[];
  className?: string;
}

export function ModernServicesSection({ services, className = '' }: ModernServicesSectionProps) {
  const [activeService, setActiveService] = useState<Service | null>(null);
  
  return (
    <section className={`py-24 bg-white dark:bg-black ${className}`}>
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <AnimatedText 
            text="Nos services" 
            className="text-4xl md:text-5xl font-bold mb-4"
            once={true}
          />
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez notre expertise en agence vidéo, design web et community management pour donner vie à vos projets.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Liste des services */}
          <div className="space-y-8">
            {services.map((service) => (
              <ScrollReveal key={service.id} direction="left" className="w-full">
                <motion.div
                  className={`p-6 border rounded-lg cursor-pointer transition-all ${
                    activeService?.id === service.id
                      ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setActiveService(service)}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  data-cursor="hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <span className="text-2xl" aria-hidden="true">{service.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className={`text-sm ${
                        activeService?.id === service.id
                          ? 'text-gray-200 dark:text-gray-800'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Détail du service actif */}
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              {activeService ? (
                <motion.div
                  key={activeService.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-full flex flex-col">
                    <div className="relative h-2/3 mb-4">
                      <HoverImage
                        src={activeService.image}
                        alt={activeService.title}
                        className="w-full h-full"
                        hoverEffect="zoom"
                      />
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg flex-grow">
                      <h3 className="text-xl font-bold mb-3">{activeService.title}</h3>
                      <ul className="space-y-2">
                        {activeService.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center p-8">
                    <span className="text-4xl mb-4 block">👈</span>
                    <h3 className="text-xl font-medium mb-2">Sélectionnez un service</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Cliquez sur un service pour voir plus de détails
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* CTA */}
        <ScrollReveal className="text-center mt-16" delay={0.2}>
          <a 
            href="/contact" 
            className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            data-cursor="hover"
          >
            Discuter de votre projet
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
