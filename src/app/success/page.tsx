'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (sessionId) {
        try {
          const response = await fetch(`/api/order-details?sessionId=${sessionId}`);
          const data = await response.json();
          setOrderDetails(data);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails:', error);
        }
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/10">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Commande confirmée !</h1>
            <p className="text-lg text-slate-600 dark:text-white mb-8">
              Merci pour votre confiance. Nous avons bien reçu votre commande et nous vous contacterons très prochainement.
            </p>
          </div>

          {orderDetails && (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg mb-8">
              <h2 className="text-xl font-bold mb-4">Récapitulatif de votre commande</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                  <span className="font-medium">Pack</span>
                  <span>{orderDetails.pack.name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                  <span className="font-medium">Montant</span>
                  <span>{orderDetails.amount}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Numéro de commande</span>
                  <span className="font-mono">{orderDetails.id}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Link href="/" className="btn-primary">
              Retour à l&apos;accueil
            </Link>
            <Link href="/contact" className="btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
