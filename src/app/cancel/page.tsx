'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/10">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Commande annulée</h1>
            <p className="text-lg text-slate-600 dark:text-white mb-8">
              Votre commande a été annulée. Si vous avez des questions ou besoin d&apos;aide,
              n&apos;hésitez pas à nous contacter.
            </p>
          </div>

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
