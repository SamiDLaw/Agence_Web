import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title">Demarrons votre projet</h2>
          <p className="text-text-muted mb-8">
            Pret a donner vie a votre projet ? Contactez-nous pour en discuter et
            obtenir un devis personnalise.
          </p>
          <Link href="/contact" className="btn-primary">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
