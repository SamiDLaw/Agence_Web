export function PromoVideoSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-slate-50/20 dark:to-slate-900/20">
      <div className="container-custom">
        <h2 className="section-title text-center">Découvrez Nos Services</h2>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
          Plongez dans l'univers de Lawgency à travers nos vidéos de présentation
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/FCaYyoSvULA"
              title="Vidéo de présentation Lawgency"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/bzRRqRLu8Oo"
              title="Vidéo de présentation complémentaire"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
