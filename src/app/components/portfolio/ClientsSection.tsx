'use client';

import { motion } from 'framer-motion';

const clients = [
  { name: "Nike", logo: "/logos/client-1.svg" },
  { name: "Adidas", logo: "/logos/client-2.svg" },
  { name: "Microsoft", logo: "/logos/client-3.svg" },
  { name: "Sony", logo: "/logos/client-4.svg" },
  { name: "BMW", logo: "/logos/client-5.svg" },
  { name: "IKEA", logo: "/logos/client-6.svg" },
  { name: "L'Oréal", logo: "/logos/client-7.svg" },
  { name: "Chanel", logo: "/logos/client-8.svg" },
];

export function ClientsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ils nous font confiance</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Nous collaborons avec des marques ambitieuses qui cherchent à innover et à se démarquer.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center h-24"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-12 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
