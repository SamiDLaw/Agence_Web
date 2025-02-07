'use client'

import { useState } from 'react'

export function DroneCarousel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Section Drone FPV */}
      <div className="container-custom">
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
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium 
                             hover:bg-blue-50 transition-colors duration-200"
                  >
                    Voir nos réalisations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de la vidéo */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-5xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 
                       transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/8EsjNUIgZVE?autoplay=1&mute=1&loop=1&playlist=8EsjNUIgZVE"
                title="Drone FPV Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
