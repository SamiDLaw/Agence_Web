import { projects } from '@/app/data/projects';
import Image from 'next/image';

export function ProjectsSection() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="section-title text-center">Nos Derniers Projets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article key={project.id} className="group relative overflow-hidden rounded-xl">
              <div className="relative h-64 w-full">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-200 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="text-xs px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
