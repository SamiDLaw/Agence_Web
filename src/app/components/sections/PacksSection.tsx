'use client';

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
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
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = (pack: Pack) => {
    setSelectedPack(pack);
    setIsModalOpen(true);
  };

  return (
    <div className="py-24 bg-white">
      <div className="container-custom">
        {/* Services Web */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Services Web</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Des solutions web sur mesure
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Choisissez le pack qui correspond le mieux à vos besoins et à votre budget.
          </p>

          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {webPacks.map((pack, packIdx) => (
              <div
                key={pack.id}
                className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                  pack.popular
                    ? 'lg:z-10 lg:rounded-b-none'
                    : packIdx === webPacks.length - 1
                    ? 'lg:z-10 lg:rounded-t-none'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">
                      {pack.name}
                    </h3>
                    {pack.popular ? (
                      <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">
                        Populaire
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{pack.subtitle}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {pack.price}
                    </span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          className="h-6 w-5 flex-none text-blue-600"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleOrderClick(pack)}
                  className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    ${
                      pack.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600'
                        : 'bg-white text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300'
                    }`}
                >
                  Commander maintenant
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Services Vidéo & Photo */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Services Vidéo & Photo
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Production audiovisuelle professionnelle
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Des solutions vidéo adaptées à tous vos besoins de communication.
          </p>

          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {mediaPacks.map((pack, packIdx) => (
              <div
                key={pack.id}
                className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                  pack.popular
                    ? 'lg:z-10 lg:rounded-b-none'
                    : packIdx === mediaPacks.length - 1
                    ? 'lg:z-10 lg:rounded-t-none'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">
                      {pack.name}
                    </h3>
                    {pack.popular ? (
                      <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">
                        Populaire
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{pack.subtitle}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {pack.price}
                    </span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          className="h-6 w-5 flex-none text-blue-600"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleOrderClick(pack)}
                  className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    ${
                      pack.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600'
                        : 'bg-white text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300'
                    }`}
                >
                  Commander maintenant
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de commande */}
      {isModalOpen && selectedPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <OrderForm selectedPack={selectedPack} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
