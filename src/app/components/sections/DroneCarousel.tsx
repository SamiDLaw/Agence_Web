'use client'

import { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const droneImages = [
  {
    src: '/images/drone-1.jpg',
    alt: 'Drone FPV en vol',
    description: 'Capturez des images aériennes spectaculaires avec notre drone FPV'
  },
  {
    src: '/images/drone-2.jpg',
    alt: 'Drone FPV en action',
    description: 'Des angles de vue uniques pour vos projets'
  },
  {
    src: '/images/drone-3.jpg',
    alt: 'Drone FPV racing',
    description: 'Une expérience immersive pour des vidéos dynamiques'
  }
]

export function DroneCarousel() {
  const [isOpen, setIsOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext()
      }, 4000)

      return () => clearInterval(autoplay)
    }
  }, [emblaApi])

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

      {/* Modal du Carousel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 
                       dark:hover:text-slate-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Nos réalisations en Drone FPV
            </h3>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {droneImages.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 relative aspect-video rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                    <p className="text-center mt-4 text-blue-100">{image.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={scrollPrev}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 
                         transition-colors duration-200"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={scrollNext}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 
                         transition-colors duration-200"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
