'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Directrice Marketing",
    company: "Chanel",
    content: "L'équipe de Lawgency a su capturer l'essence de notre marque avec une sensibilité artistique remarquable. Leur production vidéo a dépassé nos attentes et a généré un engagement exceptionnel auprès de notre audience.",
    image: "/images/testimonials/testimonial-1.jpg"
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Chef de Produit",
    company: "Nike",
    content: "Le design créé par Lawgency pour notre campagne a parfaitement traduit notre vision. Leur approche créative et leur compréhension de notre identité ont fait toute la différence dans le succès de notre lancement.",
    image: "/images/testimonials/testimonial-2.jpg"
  },
  {
    id: 3,
    name: "Julie Lecomte",
    role: "Responsable Communication",
    company: "L'Oréal",
    content: "Travailler avec Lawgency sur notre stratégie de community management a transformé notre présence digitale. Leur expertise et leur créativité ont considérablement augmenté notre engagement et notre visibilité.",
    image: "/images/testimonials/testimonial-3.jpg"
  }
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ce que nos clients disent
        </motion.h2>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full px-4"
                >
                  <div className="bg-white dark:bg-black rounded-lg p-8 shadow-sm">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 mr-4">
                        {/* Remplacer par de vraies images */}
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-sm font-medium">{testimonial.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{testimonial.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg italic text-gray-700 dark:text-gray-200 mb-4">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex 
                    ? "bg-black dark:bg-white" 
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Voir témoignage ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white dark:bg-black shadow-md flex items-center justify-center pointer-events-auto"
              aria-label="Témoignage précédent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white dark:bg-black shadow-md flex items-center justify-center pointer-events-auto"
              aria-label="Témoignage suivant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
