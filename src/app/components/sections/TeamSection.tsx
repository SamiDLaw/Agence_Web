import { team } from '@/app/data/team';
import { SocialButton } from '@/app/components/ui/SocialButton';
import Image from 'next/image';

export function TeamSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-slate-50/20 dark:to-slate-900/20">
      <div className="container-custom">
        <h2 className="section-title text-center">Notre Équipe</h2>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
          Des experts passionnés qui donnent vie à vos projets digitaux avec créativité et expertise.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="group">
              <div className="relative mb-4 overflow-hidden rounded-xl aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    {Object.entries(member.social).map(([platform, link]) => (
                      <SocialButton
                        key={platform}
                        platform={platform}
                        link={link}
                        className="!bg-white/20 hover:!bg-blue-500/50 !text-white"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
