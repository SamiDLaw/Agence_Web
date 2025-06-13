'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section className="py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">À propos</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Nous sommes un collectif de créateurs, designers, artistes et innovateurs qui explorent des façons visuelles de transmettre des idées — en collaboration avec des organisations ambitieuses et de manière indépendante.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Notre approche combine expertise technique et vision artistique pour créer des expériences numériques uniques qui captivent et engagent.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Nous travaillons avec des marques qui cherchent à se démarquer et à défier les conventions établies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src="/images/team.jpg" 
                alt="Notre équipe" 
                width={500} 
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
