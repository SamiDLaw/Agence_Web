import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Création Web', href: '/services#web' },
      { name: 'Production Vidéo', href: '/services#video' },
      { name: 'Drone FPV', href: '/services#drone' },
      { name: 'Design Graphique', href: '/services#design' },
    ],
    company: [
      { name: 'À Propos', href: '/a-propos' },
      { name: 'Réalisations', href: '/realisations' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Mentions Légales', href: '/mentions-legales' },
      { name: 'Politique de Confidentialité', href: '/confidentialite' },
      { name: 'CGV', href: '/cgv' },
    ],
  };

  return (
    <footer className="bg-primary border-t border-accent/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-montserrat font-bold text-accent">
                Lawgency
              </span>
            </Link>
            <p className="text-text-muted mb-4">
              Agence web et audiovisuelle à Marseille, spécialisée dans la création
              d'identités digitales percutantes.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-montserrat font-bold text-accent mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-montserrat font-bold text-accent mb-4">
              Entreprise
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-montserrat font-bold text-accent mb-4">
              Contact
            </h3>
            <p className="text-text-muted mb-2">
              📍 Marseille, France
            </p>
            <a
              href="mailto:contact@lawgency.fr"
              className="text-text-muted hover:text-accent transition-colors duration-200 block mb-2"
            >
              ✉️ contact@lawgency.fr
            </a>
            <a
              href="tel:+33668236157"
              className="text-text-muted hover:text-accent transition-colors duration-200 block"
            >
              📞 +33 6 68 23 61 57
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-accent/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-muted text-sm mb-4 md:mb-0">
              © {currentYear} Lawgency. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-text-muted hover:text-accent transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}