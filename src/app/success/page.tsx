'use client';

import Link from 'next/link';

export default function SuccessPage() {
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
            <h1 className="text-3xl font-bold mb-4">Demande envoyée avec succès !</h1>
            <p className="text-lg text-slate-600 dark:text-white mb-8">
              Merci pour votre confiance. Nous avons bien reçu votre demande et nous vous contacterons très prochainement 
              pour discuter des détails de votre projet.
            </p>
            
            <div className="bg-blue-50 dark:bg-slate-800/50 rounded-xl p-8 mb-8">
              <h2 className="text-xl font-bold mb-4">Prochaines étapes</h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Notre équipe examinera votre demande sous 24-48h</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Nous vous contacterons pour planifier une réunion de découverte</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Nous établirons ensemble un plan d'action personnalisé</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center gap-4">
              <Link 
                href="/"
                className="btn-primary"
              >
                Retour à l'accueil
              </Link>
              <Link 
                href="/contact"
                className="btn-secondary"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
