import { testimonials } from '@/app/data/testimonials';
import Image from 'next/image';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/10 
                      dark:from-blue-950/20 dark:via-slate-900/50 dark:to-blue-950/10">
      <div className="container-custom">
        <h2 className="section-title text-center mb-4">Ce Que Disent Nos Clients</h2>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto text-slate-700 dark:text-white">
          Découvrez les retours d'expérience de nos clients satisfaits
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="card group hover:transform hover:-translate-y-1 transition-all duration-300
                       bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-slate-700 dark:text-white italic leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
