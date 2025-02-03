'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderConfirmationPageProps {
  params: {
    orderId: string;
  };
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order-details?orderId=${params.orderId}`);
        if (!response.ok) throw new Error('Commande non trouvée');
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la commande:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">
              Commande confirmée !
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Merci pour votre commande. Notre équipe vous contactera très prochainement pour organiser le paiement en espèces.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Détails de la commande</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Numéro de commande</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Montant</p>
                  <p className="font-medium">{order.amount}€</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Statut</p>
                  <p className="font-medium">En attente de confirmation</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Mode de paiement</p>
                  <p className="font-medium">Espèces</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Nom</p>
                  <p className="font-medium">{order.customerDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                  <p className="font-medium">{order.customerDetails.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Téléphone</p>
                  <p className="font-medium">{order.customerDetails.phone}</p>
                </div>
                {order.customerDetails.company && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Entreprise</p>
                    <p className="font-medium">{order.customerDetails.company}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6 mt-8">
              <p className="text-center text-slate-600 dark:text-slate-300">
                Un email de confirmation a été envoyé à {order.customerDetails.email}
              </p>
              <div className="mt-6 text-center">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
