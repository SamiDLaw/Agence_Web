'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ModernServicesSimpleProps {
  className?: string;
}

export function ModernServicesSimple({ className = '' }: ModernServicesSimpleProps) {
  const [activeService, setActiveService] = useState<string>('video');
  
  const services = [
    {
      id: 'video',
      title: 'Agence Vidéo',
      description: 'Nous créons des contenus vidéo captivants qui racontent votre histoire et engagent votre audience.'
    },
    {
      id: 'web',
      title: 'Design Web',
      description: 'Nous concevons des sites web modernes, responsives et optimisés pour convertir vos visiteurs en clients.'
    },
    {
      id: 'community',
      title: 'Community Management',
      description: 'Nous gérons vos réseaux sociaux pour développer votre communauté et votre présence en ligne.'
    }
  ];

  return (
    <section className={`py-24 bg-black text-white ${className}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Nos Services
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(service => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: services.indexOf(service) * 0.1 }}
              className={`p-6 rounded-lg ${activeService === service.id ? 'bg-primary' : 'bg-gray-800'}`}
              onClick={() => setActiveService(service.id)}
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/80">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
