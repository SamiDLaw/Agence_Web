'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { AnimatedText } from './AnimatedText';
import { HoverImage } from './HoverImage';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills?: string[];
}

interface ModernAboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  values?: { title: string; description: string; icon: string }[];
  teamMembers?: TeamMember[];
  className?: string;
}

export function ModernAboutSection({
  title = "À propos de nous",
  subtitle = "Notre histoire",
  description = "Lawgency est une agence créative spécialisée dans la production vidéo, le design web et le community management. Nous aidons les marques à se démarquer grâce à des contenus visuels impactants et des stratégies digitales innovantes.",
  values = [
    {
      title: "Créativité",
      description: "Nous repoussons constamment les limites de la créativité pour offrir des solutions uniques et mémorables.",
      icon: "✨"
    },
    {
      title: "Excellence",
      description: "Nous nous engageons à fournir un travail de la plus haute qualité, avec une attention méticuleuse aux détails.",
      icon: "🏆"
    },
    {
      title: "Innovation",
      description: "Nous explorons sans cesse de nouvelles technologies et approches pour rester à la pointe de notre industrie.",
      icon: "💡"
    },
    {
      title: "Collaboration",
      description: "Nous croyons au pouvoir de la collaboration et travaillons en étroite relation avec nos clients pour atteindre leurs objectifs.",
      icon: "🤝"
    }
  ],
  teamMembers = [
    {
      id: "member1",
      name: "Sophie Martin",
      role: "Directrice Créative",
      bio: "Avec plus de 10 ans d'expérience dans l'industrie créative, Sophie dirige notre équipe avec passion et vision.",
      image: "/images/team/member1.jpg",
      skills: ["Direction artistique", "Stratégie de marque", "Production vidéo"]
    },
    {
      id: "member2",
      name: "Thomas Dubois",
      role: "Lead Designer",
      bio: "Thomas combine expertise technique et sensibilité artistique pour créer des expériences web exceptionnelles.",
      image: "/images/team/member2.jpg",
      skills: ["UI/UX Design", "Motion Design", "Développement frontend"]
    },
    {
      id: "member3",
      name: "Léa Bernard",
      role: "Community Manager",
      bio: "Léa excelle dans la création de stratégies de contenu engageantes et la gestion de communautés en ligne.",
      image: "/images/team/member3.jpg",
      skills: ["Stratégie de contenu", "Analyse de données", "Gestion de communauté"]
    }
  ],
  className = ''
}: ModernAboutSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  return (
    <section className={`py-24 bg-white dark:bg-black ${className}`}>
      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <ScrollReveal className="text-center mb-20">
          <span className="text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 block">
            {subtitle}
          </span>
          <AnimatedText 
            text={title} 
            className="text-4xl md:text-5xl font-bold mb-6"
            once={true}
          />
          <p className="text-gray-800 dark:text-gray-100 max-w-3xl mx-auto">
            {description}
          </p>
        </ScrollReveal>
        
        {/* Image principale avec effet parallaxe */}
        <ScrollReveal className="mb-24">
          <div className="relative h-[60vh] min-h-[400px] rounded-lg overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/about/team.jpg"
                alt="Notre équipe"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8 max-w-2xl">
                <AnimatedText 
                  text="Nous donnons vie à vos idées" 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  once={true}
                />
                <p className="text-white/90">
                  Une équipe passionnée de créatifs, designers et stratèges digitaux dédiés à l'excellence.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        {/* Nos valeurs */}
        <div className="mb-24">
          <ScrollReveal className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold">Nos valeurs</h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div 
                  className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  data-cursor="hover"
                >
                  <span className="text-4xl mb-4 block" aria-hidden="true">{value.icon}</span>
                  <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                  <p className="text-gray-800 dark:text-gray-100 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        {/* Notre équipe */}
        <div>
          <ScrollReveal className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold">Notre équipe</h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 0.1}>
                <motion.div 
                  className="cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  data-cursor="hover"
                >
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                    <HoverImage
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full"
                      hoverEffect="zoom"
                      objectPosition={member.id === "sami" ? "center top" : member.id === "eren" ? "center 30%" : "center 20%"}
                    />
                  </div>
                  <h4 className="text-xl font-bold">{member.name}</h4>
                  <p className="text-blue-600 dark:text-blue-400">{member.role}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        {/* Modal détail membre */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 max-w-3xl w-full rounded-lg overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-square">
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-8">
                    <button 
                      className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      onClick={() => setSelectedMember(null)}
                      aria-label="Fermer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    
                    <h3 className="text-2xl font-bold mb-1">{selectedMember.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-4">{selectedMember.role}</p>
                    
                    <p className="text-gray-800 dark:text-gray-100 mb-6">
                      {selectedMember.bio}
                    </p>
                    
                    {selectedMember.skills && (
                      <div>
                        <h4 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-2">Compétences</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
