'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PortfolioLayout } from "../components/portfolio/PortfolioLayout";
import { CustomCursor } from "../components/portfolio/CustomCursor";

export default function MentionsLegales() {
  return (
    <PortfolioLayout>
      <CustomCursor />
      <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12 lg:p-24">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Mentions Légales
          </h1>
          
          <div className="space-y-8 text-gray-800 dark:text-gray-100">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Informations légales</h2>
              <p className="mb-2">
                <strong>Dénomination sociale :</strong> Groupe KS Société
              </p>
              <p className="mb-2">
                <strong>Forme juridique :</strong> Société à responsabilité limitée (SARL)
              </p>
              <p className="mb-2">
                <strong>Capital social :</strong> 100,00 Euros
              </p>
              <p className="mb-2">
                <strong>Siège social :</strong> Marseille
              </p>
              <p className="mb-2">
                <strong>SIRET :</strong> 852 544 337 00019
              </p>
              <p className="mb-2">
                <strong>Immatriculation au RCS :</strong> 852 544 337 R.C.S. Marseille
              </p>
              <p className="mb-2">
                <strong>Date d'immatriculation :</strong> 17/07/2019
              </p>
              <p className="mb-2">
                <strong>Adresse :</strong> <Link href="https://www.google.fr/maps/place/Lawgency/@43.3623673,5.3469208,17z/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Voir sur Google Maps</Link>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Directeur de la publication</h2>
              <p>
                Le directeur de la publication du site Lawgency est le représentant légal de la société Groupe KS Société.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. Hébergement</h2>
              <p>
                Le site Lawgency est hébergé par Vercel Inc.<br />
                Adresse : 7 Rue d'Italie, 13001 Marseille, France<br />
                Site web : <Link href="https://vercel.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://vercel.com</Link>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Propriété intellectuelle</h2>
              <p className="mb-4">
                L&apos;ensemble du contenu de ce site (structure, textes, logos, images, vidéos, sons, etc.) est la propriété exclusive de Groupe KS Société ou fait l&apos;objet d&apos;une autorisation d&apos;utilisation. Toute reproduction, représentation, utilisation ou adaptation, sous quelque forme que ce soit, de tout ou partie des éléments du site sans l&apos;accord écrit préalable de Groupe KS Société est strictement interdite et constituerait une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">5. Protection des données personnelles</h2>
              <p className="mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité des données vous concernant. Pour exercer ces droits ou pour toute question sur le traitement de vos données, vous pouvez nous contacter via le formulaire de contact disponible sur notre site.
              </p>
              <p>
                Les informations recueillies sur ce site sont destinées à Groupe KS Société et ne sont en aucun cas cédées ou vendues à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">6. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez à tout moment désactiver les cookies en modifiant les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">7. Loi applicable et juridiction</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">8. Contact</h2>
              <p>
                Pour toute question relative à ce site, vous pouvez nous contacter via notre <Link href="/contact" className="text-primary hover:underline">formulaire de contact</Link>.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Retour à l&apos;accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
    </PortfolioLayout>
  );
}
