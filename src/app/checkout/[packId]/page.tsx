'use client';

import { useEffect, useState } from 'react';
import { CheckoutForm } from '@/components/CheckoutForm';
import { prisma } from '@/lib/prisma';

export default function CheckoutPage({ params }: { params: { packId: string } }) {
  const [pack, setPack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const response = await fetch(`/api/packs/${params.packId}`);
        const data = await response.json();
        setPack(data);
      } catch (error) {
        console.error('Erreur lors de la récupération du pack:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPack();
  }, [params.packId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!pack) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pack non trouvé</h1>
          <p className="text-slate-600 dark:text-white">
            Le pack que vous recherchez n&apos;existe pas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-center mb-12">
          Commander le pack {pack.name}
        </h1>
        <CheckoutForm pack={pack} />
      </div>
    </div>
  );
}
