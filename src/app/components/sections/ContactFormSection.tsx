'use client';

import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simuler un appel API
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/10 
                      dark:from-blue-950/20 dark:via-slate-900/50 dark:to-blue-950/10">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-4">Contactez-nous</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input bg-white/40 dark:bg-slate-800/40 
                           hover:bg-white/60 dark:hover:bg-slate-800/60
                           focus:bg-white/60 dark:focus:bg-slate-800/60
                           border-slate-200 dark:border-slate-700
                           text-slate-900 dark:text-white
                           placeholder-slate-500 dark:placeholder-slate-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input bg-white/40 dark:bg-slate-800/40 
                           hover:bg-white/60 dark:hover:bg-slate-800/60
                           focus:bg-white/60 dark:focus:bg-slate-800/60
                           border-slate-200 dark:border-slate-700
                           text-slate-900 dark:text-white
                           placeholder-slate-500 dark:placeholder-slate-400"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input bg-white/40 dark:bg-slate-800/40 
                         hover:bg-white/60 dark:hover:bg-slate-800/60
                         focus:bg-white/60 dark:focus:bg-slate-800/60
                         border-slate-200 dark:border-slate-700
                         text-slate-900 dark:text-white
                         placeholder-slate-500 dark:placeholder-slate-400"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="input bg-white/40 dark:bg-slate-800/40 
                         hover:bg-white/60 dark:hover:bg-slate-800/60
                         focus:bg-white/60 dark:focus:bg-slate-800/60
                         border-slate-200 dark:border-slate-700
                         text-slate-900 dark:text-white
                         placeholder-slate-500 dark:placeholder-slate-400
                         resize-none"
                required
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary min-w-[200px] bg-blue-600 hover:bg-blue-500
                         disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer le message'
                )}
              </button>
            </div>

            {status === 'success' && (
              <div className="text-center text-green-600 dark:text-green-400 font-medium animate-fade-in">
                ✨ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
              </div>
            )}
            
            {status === 'error' && (
              <div className="text-center text-red-600 dark:text-red-400 font-medium animate-fade-in">
                Une erreur est survenue. Veuillez réessayer.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
