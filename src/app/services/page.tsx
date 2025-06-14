'use client';

import { NavigationPortfolio } from "../components/portfolio/NavigationPortfolio";
import { FooterPortfolio } from "../components/portfolio/FooterPortfolio";
import { motion } from "framer-motion";
import Image from "next/image";
import { Metadata } from "next";

// Métadonnées gérées côté client pour éviter les erreurs de build
const metadata = {
  title: "Services | Lawgency",
  description: "Découvrez nos services de design, vidéo, web et community management.",
};

const services = [
  {
    title: "Agence Vidéo",
    description: "Nous créons des contenus vidéo captivants qui racontent votre histoire et engagent votre audience. De la conception à la production, nous gérons l'ensemble du processus créatif.",
    icon: "/icons/video-icon.svg",
    features: [
      "Vidéos promotionnelles",
      "Films d'entreprise",
      "Contenu pour réseaux sociaux",
      "Animations 2D/3D",
      "Montage et post-production",
      "Direction artistique"
    ]
  },
  {
    title: "Design Web",
    description: "Notre équipe de designers crée des interfaces modernes et intuitives qui reflètent l'identité de votre marque tout en offrant une expérience utilisateur exceptionnelle.",
    icon: "/icons/design-icon.svg",
    features: [
      "Design d'interface (UI)",
      "Expérience utilisateur (UX)",
      "Identité visuelle",
      "Prototypage",
      "Design responsive",
      "Design système"
    ]
  },
  {
    title: "Développement Web",
    description: "Nous développons des sites et applications web performants, sécurisés et évolutifs en utilisant les technologies les plus récentes et adaptées à vos besoins spécifiques.",
    icon: "/icons/web-icon.svg",
    features: [
      "Sites vitrines",
      "E-commerce",
      "Applications web",
      "Intégration CMS",
      "Optimisation SEO",
      "Maintenance et support"
    ]
  },
  {
    title: "Community Management",
    description: "Nous gérons votre présence sur les réseaux sociaux pour développer votre communauté, augmenter votre visibilité et créer un engagement durable avec votre audience.",
    icon: "/icons/social-icon.svg",
    features: [
      "Stratégie de contenu",
      "Création et planification",
      "Animation de communauté",
      "Analyse de performance",
      "Publicité ciblée",
      "Veille concurrentielle"
    ]
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Services() {
  return (
    <main className="bg-white dark:bg-black text-black dark:text-white pt-20">
      <NavigationPortfolio />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nos Services
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nous proposons une gamme complète de services créatifs pour aider votre entreprise à se démarquer et à atteindre ses objectifs. Découvrez comment nous pouvons transformer votre vision en réalité.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                className="service-card p-8 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeIn}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mr-4">
                    <Image 
                      src={service.icon} 
                      alt={service.title} 
                      width={24} 
                      height={24}
                      className="text-black dark:text-white" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {service.description}
                </p>
                
                <h4 className="font-semibold mb-4 text-lg">Ce que nous proposons :</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Notre approche
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Découverte",
                description: "Nous prenons le temps de comprendre votre entreprise, vos objectifs et votre public cible pour créer une stratégie sur mesure."
              },
              {
                step: "02",
                title: "Création",
                description: "Notre équipe de créatifs développe des concepts uniques et impactants qui reflètent votre identité et répondent à vos besoins."
              },
              {
                step: "03",
                title: "Livraison",
                description: "Nous finalisons et livrons votre projet avec un souci du détail et une qualité d'exécution qui dépassent vos attentes."
              }
            ].map((item, index) => (
              <motion.div 
                key={item.step}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Prêt à collaborer ?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
          </motion.p>
          <motion.a 
            href="/contact"
            className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactez-nous
          </motion.a>
        </div>
      </section>
      
      <FooterPortfolio />
    </main>
  );
}