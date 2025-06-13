'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '', company: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-32 bg-white dark:bg-black" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Contactez-nous</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Vous avez un projet en tête ? Nous serions ravis d'en discuter avec vous et de voir comment nous pouvons vous aider à le concrétiser.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Email</h3>
                <a href="mailto:contact@lawgency.fr" className="text-blue-600 dark:text-blue-400 hover:underline">
                  contact@lawgency.fr
                </a>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Téléphone</h3>
                <a href="tel:+33123456789" className="text-blue-600 dark:text-blue-400 hover:underline">
                  +33 1 23 45 67 89
                </a>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Adresse</h3>
                <address className="not-italic text-gray-600 dark:text-gray-400">
                  Paris, France<br />
                  75001
                </address>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Entreprise (optionnel)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </button>
              
              {isSubmitted && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                  Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
