'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { AnimatedText } from './AnimatedText';

const services = [
  {
    title: "Agence Vidéo",
    description: "Création de contenu visuel percutant pour renforcer votre image de marque. Vidéos promotionnelles, corporate et drone FPV pour des perspectives uniques.",
    icon: "/icons/video-icon.svg",
    color: "#FF5A5F",
    features: ["Films promotionnels", "Vidéos corporate", "Drone FPV", "Motion design", "Post-production"]
  },
  {
    title: "Design Web",
    description: "Conception d'identités visuelles et d'interfaces utilisateur modernes qui captivent et engagent votre audience.",
    icon: "/icons/design-icon.svg",
    color: "#3490DC",
    features: ["UI/UX Design", "Identité visuelle", "Prototypage", "Design responsive", "Animation"]
  },
  {
    title: "Développement Web",
    description: "Développement de sites et d'applications web sur mesure avec les dernières technologies pour une performance optimale.",
    icon: "/icons/web-icon.svg",
    color: "#38C172",
    features: ["Sites vitrines", "E-commerce", "Applications web", "SEO", "Maintenance"]
  },
  {
    title: "Community Management",
    description: "Gestion stratégique de votre présence sur les réseaux sociaux pour développer votre communauté et augmenter votre visibilité.",
    icon: "/icons/social-icon.svg",
    color: "#9561E2",
    features: ["Stratégie sociale", "Création de contenu", "Gestion de communauté", "Analyse de performance", "Publicité ciblée"]
  },
];

export function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section id="services" ref={sectionRef} className="py-32 bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <AnimatedText 
            text="Nos Services" 
            className="text-3xl md:text-5xl font-bold mb-6"
            once={true}
          />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Nous combinons expertise technique et créativité pour offrir des solutions visuelles innovantes qui répondent aux besoins de nos clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const isActive = activeService === index;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Cercle de couleur en arrière-plan */}
                <motion.div 
                  className="absolute rounded-full opacity-10 z-0"
                  style={{ backgroundColor: service.color }}
                  initial={{ width: 100, height: 100, top: 0, left: 0 }}
                  animate={{ 
                    width: isActive ? 300 : 100, 
                    height: isActive ? 300 : 100,
                    top: isActive ? -50 : 0,
                    left: isActive ? -50 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
                  <div className="mb-6 flex items-center">
                    <div 
                      className="w-14 h-14 flex items-center justify-center rounded-full mr-4"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <img src={service.icon} alt={service.title} className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: service.color }}>{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0,
                      height: isActive ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <a 
                      href={`/services#${service.title.toLowerCase().replace(/ /g, '-')}`}
                      className="inline-flex items-center text-sm font-medium"
                      style={{ color: service.color }}
                    >
                      En savoir plus
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
