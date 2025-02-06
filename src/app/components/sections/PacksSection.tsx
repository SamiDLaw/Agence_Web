'use client';

import { webPacks, mediaPacks } from '@/app/data/packs';
import Link from 'next/link';
import { useState } from 'react';
import { OrderForm } from '../OrderForm';

interface Pack {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface PacksSectionProps {
  packs: Pack[];
}

export function PacksSection({ packs }: PacksSectionProps) {
  const [selectedPack, setSelectedPack] = useState<{
    name: string;
    price: string;
  } | null>(null);

  return (
    <section className="py-20">
      {/* Services Web */}
      <div className="container-custom py-20">
        <h2 className="section-title text-center mb-4">Services Web</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-slate-700 dark:text-white">
          Des solutions web professionnelles pour développer votre présence en ligne
        </p>
        
        {/* Option Drone FPV */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                        rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Option Drone FPV</h3>
                  <p className="text-blue-50 text-lg max-w-2xl">
                    Ajoutez une dimension spectaculaire à votre projet avec nos prises de vues aériennes en FPV.
                    Une perspective unique pour des vidéos immersives et dynamiques.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white font-medium mb-2">À partir de 200€</p>
                    <Link href="/contact" className="btn-white inline-block">
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packs.map((pack) => (
            <div 
              key={pack.name}
              className="relative bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-xl 
                       transition-all duration-300 border border-slate-200/50 dark:border-slate-800
                       hover:border-blue-500/30 group overflow-hidden backdrop-blur-sm"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {pack.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">Description</p>
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

      {/* Formulaire de commande */}
      {selectedPack && (
        <OrderForm
          selectedPack={selectedPack}
          onClose={() => setSelectedPack(null)}
        />
      )}
    </section>
  );
}
