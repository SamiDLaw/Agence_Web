'use client'

import { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
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
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Captation par Drone FPV</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Découvrez une nouvelle dimension dans la création de contenu avec notre service de drone FPV.
            Des prises de vue dynamiques et immersives pour donner vie à vos projets.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {droneImages.map((image, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 relative px-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center mt-4 text-blue-100">{image.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all"
            onClick={scrollPrev}
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all"
            onClick={scrollNext}
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="text-center mt-8">
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors">
            En savoir plus sur nos services de drone
          </button>
        </div>
      </div>
    </div>
  )
}
