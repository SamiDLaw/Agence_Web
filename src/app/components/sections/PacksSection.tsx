'use client';

import { webPacks, mediaPacks } from '@/app/data/packs';
import Link from 'next/link';

export function PacksSection() {
  return (
    <section className="py-20">
      {/* Services Web */}
      <div className="mb-32 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/10 
                    dark:from-blue-950/20 dark:via-slate-900/50 dark:to-blue-950/10">
        <div className="container-custom py-20">
          <h2 className="section-title text-center mb-4">Services Web</h2>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-slate-700 dark:text-white">
            Des solutions web professionnelles pour développer votre présence en ligne
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {webPacks.map((pack) => (
              <div 
                key={pack.id}
                className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 border border-slate-200 dark:border-slate-700
                         hover:border-blue-500/30 group overflow-hidden"
              >
                {pack.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-xl text-sm font-medium">
                    Populaire
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {pack.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{pack.subtitle}</p>
                  <p className="text-slate-600 dark:text-white mb-6">{pack.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-white">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{pack.price}</div>
                    <Link 
                      href={`/checkout/${pack.id}`}
                      className="btn-primary w-full inline-block text-center"
                    >
                      Choisir ce pack
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Option Drone FPV */}
      <div className="container-custom py-12">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 
                      rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Option Drone FPV</h3>
                <p className="text-blue-100 text-lg max-w-2xl">
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

      {/* Services Vidéo & Photo */}
      <div className="bg-gradient-to-b from-blue-50/10 via-white to-blue-50/20 
                    dark:from-blue-950/10 dark:via-slate-900/60 dark:to-blue-950/20">
        <div className="container-custom py-20">
          <h2 className="section-title text-center mb-4">Services Vidéo & Photo</h2>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-slate-700 dark:text-white">
            Des solutions audiovisuelles professionnelles pour mettre en valeur votre entreprise
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mediaPacks.map((pack) => (
              <div 
                key={pack.id}
                className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 border border-slate-200 dark:border-slate-700
                         hover:border-blue-500/30 group overflow-hidden"
              >
                {pack.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-xl text-sm font-medium">
                    Populaire
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {pack.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{pack.subtitle}</p>
                  <p className="text-slate-600 dark:text-white mb-6">{pack.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-white">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{pack.price}</div>
                    <Link 
                      href={`/checkout/${pack.id}`}
                      className="btn-primary w-full inline-block text-center"
                    >
                      Choisir ce pack
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
