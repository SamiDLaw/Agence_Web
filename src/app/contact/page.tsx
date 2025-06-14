'use client';

import { NavigationPortfolio } from "../components/portfolio/NavigationPortfolio";
import { FooterPortfolio } from "../components/portfolio/FooterPortfolio";
import { ContactSection } from "../components/portfolio/ContactSection";
import { motion } from "framer-motion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Lawgency",
  description: "Contactez notre agence créative pour discuter de votre projet.",
};

export default function Contact() {
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
            Contact
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vous avez un projet en tête ? Nous serions ravis d'en discuter avec vous. Remplissez le formulaire ci-dessous ou utilisez nos coordonnées directes pour nous contacter.
          </motion.p>
        </div>
      </section>
      
      <ContactSection />
      
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Adresse",
                info: "123 Avenue des Arts\nParis, 75001\nFrance"
              },
              {
                title: "Contact",
                info: "hello@lawgency.fr\n+33 1 23 45 67 89"
              },
              {
                title: "Horaires",
                info: "Lundi - Vendredi\n9h00 - 18h00"
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{item.info}</p>
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
            Suivez-nous
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Retrouvez-nous sur les réseaux sociaux pour découvrir nos dernières réalisations et actualités.
          </motion.p>
          
          <div className="flex justify-center space-x-6">
            {[
              { name: "Instagram", url: "https://instagram.com" },
              { name: "Twitter", url: "https://twitter.com" },
              { name: "LinkedIn", url: "https://linkedin.com" },
              { name: "Behance", url: "https://behance.net" }
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                whileHover={{ scale: 1.1 }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      
      <FooterPortfolio />
    </main>
  );
}