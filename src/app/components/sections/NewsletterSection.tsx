'use client';

import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simuler un appel API
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/10 via-white to-blue-50/20 
                      dark:from-blue-950/10 dark:via-slate-900/60 dark:to-blue-950/20">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-title mb-4">Restez Informé</h2>
          <p className="text-lg mb-12 text-slate-700 dark:text-white">
            Abonnez-vous à notre newsletter pour recevoir nos dernières actualités et conseils en matière de web et de production vidéo.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="input bg-white/40 dark:bg-slate-800/40 
                         focus:bg-white/60 dark:focus:bg-slate-800/60
                         border-slate-200 dark:border-slate-700
                         text-slate-900 dark:text-white
                         placeholder-slate-500 dark:placeholder-slate-400
                         pr-[140px]"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-2 top-1/2 -translate-y-1/2
                         btn-primary py-2.5 px-6 text-base font-medium
                         bg-blue-600 hover:bg-blue-500 text-white
                         disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Inscription...
                  </span>
                ) : (
                  "S'inscrire"
                )}
              </button>
            </div>
            {status === 'success' && (
              <p className="text-green-600 dark:text-green-400 font-medium animate-fade-in">
                ✨ Merci pour votre inscription !
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 font-medium animate-fade-in">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
