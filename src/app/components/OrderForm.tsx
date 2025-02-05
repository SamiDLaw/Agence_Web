'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderFormProps {
  selectedPack: {
    id: number;
    name: string;
    price: string;
  } | null;
  onClose: () => void;
}

export function OrderForm({ selectedPack, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packId: selectedPack?.id,
          packName: selectedPack?.name,
          customerDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        router.push('/success');
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedPack) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{selectedPack.name}</h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-white/90">Prix: {selectedPack.price}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input"
                placeholder="+33 6 12 34 56 78"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Entreprise
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="input"
                placeholder="Nom de l'entreprise (optionnel)"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input min-h-[120px]"
              placeholder="Décrivez votre projet ou vos besoins spécifiques..."
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary min-w-[200px] relative"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Envoi en cours...
                </div>
              ) : (
                'Envoyer la demande'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
