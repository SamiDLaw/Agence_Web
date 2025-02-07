'use client';

import { webPacks, mediaPacks } from '@/app/data/packs';
import Link from 'next/link';
import { useState } from 'react';
import { OrderForm } from '../OrderForm';

interface Pack {
  id: number;
  name: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface PacksSectionProps {
  webPacks: Pack[];
  mediaPacks: Pack[];
}

export function PacksSection({ webPacks, mediaPacks }: PacksSectionProps) {
  const [selectedPack, setSelectedPack] = useState<{
    id: number;
    name: string;
    price: string;
  } | null>(null);

  return (
    <section id="packs" className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
      {/* Services Web */}
      <div className="container-custom">
        <h2 className="section-title text-center mb-4">Services Web</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-slate-700 dark:text-white">
          Des solutions web sur mesure pour répondre à vos besoins spécifiques
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {webPacks.map((pack) => (
            <div 
              key={pack.id}
              className="relative bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-xl 
                       transition-all duration-300 border border-slate-200/50 dark:border-slate-800
                       hover:border-blue-500/30 group overflow-hidden backdrop-blur-sm"
            >
              {pack.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 
                             text-white px-4 py-1 rounded-bl-xl text-sm font-medium">
                  Populaire
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {pack.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{pack.subtitle}</p>
                <p className="text-slate-600 dark:text-slate-300 mb-6">{pack.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{pack.price}</div>
                  <button 
                    onClick={() => setSelectedPack({
                      id: pack.id,
                      name: pack.name,
                      price: pack.price
                    })}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent 
                             text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 
                             hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 
                             shadow-lg hover:shadow-xl"
                  >
                    Commander
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Vidéo & Photo */}
      <div className="container-custom py-20">
        <h2 className="section-title text-center mb-4">Services Vidéo & Photo</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-slate-700 dark:text-white">
          Des solutions audiovisuelles professionnelles pour mettre en valeur votre entreprise
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mediaPacks.map((pack) => (
            <div 
              key={pack.id}
              className="relative bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-xl 
                       transition-all duration-300 border border-slate-200/50 dark:border-slate-800
                       hover:border-blue-500/30 group overflow-hidden backdrop-blur-sm"
            >
              {pack.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 
                             text-white px-4 py-1 rounded-bl-xl text-sm font-medium">
                  Populaire
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {pack.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{pack.subtitle}</p>
                <p className="text-slate-600 dark:text-slate-300 mb-6">{pack.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{pack.price}</div>
                  <button 
                    onClick={() => setSelectedPack({
                      id: pack.id,
                      name: pack.name,
                      price: pack.price
                    })}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent 
                             text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 
                             hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 
                             shadow-lg hover:shadow-xl"
                  >
                    Commander
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPack && (
        <OrderForm
          selectedPack={selectedPack}
          onClose={() => setSelectedPack(null)}
        />
      )}
    </section>
  );
}
