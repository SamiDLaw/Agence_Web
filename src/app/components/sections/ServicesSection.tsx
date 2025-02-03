import { services } from "@/app/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-primary/50">
      <div className="container-custom">
        <h2 className="section-title text-center">Nos Services</h2>
        <p className="text-text-muted text-center max-w-2xl mx-auto mb-12">
          Nous combinons expertise technique et creativite pour donner vie a vos projets
          digitaux avec des solutions modernes et personnalisees.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
