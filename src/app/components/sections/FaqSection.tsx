'use client';

import { faq } from '@/app/data/faq';
import { useState } from 'react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/10 
                      dark:from-blue-950/20 dark:via-slate-900/50 dark:to-blue-950/10">
      <div className="container-custom">
        <h2 className="section-title text-center mb-4">Questions Fréquentes</h2>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto text-slate-700 dark:text-white">
          Retrouvez les réponses aux questions les plus courantes sur nos services
        </p>
        <div className="max-w-3xl mx-auto space-y-4">
          {faq.map((item, index) => (
            <div key={index} className="group">
              <button
                className="w-full text-left p-6 rounded-xl 
                          bg-white/40 dark:bg-slate-800/40
                          hover:bg-white/60 dark:hover:bg-slate-800/60
                          backdrop-blur-sm border border-slate-200 dark:border-slate-700 
                          hover:border-blue-500/30 
                          transition-all duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {item.question}
                  </h3>
                  <span className={`text-blue-600 dark:text-blue-400 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
                <div
                  className={`mt-4 text-slate-700 dark:text-white overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.answer}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
