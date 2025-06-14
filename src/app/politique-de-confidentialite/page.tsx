'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PortfolioLayout } from "../components/portfolio/PortfolioLayout";
import { CustomCursor } from "../components/portfolio/CustomCursor";

export default function PolitiqueDeConfidentialite() {
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
            Politique de Confidentialité
          </h1>
          
          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Introduction</h2>
              <p className="mb-4">
                Groupe KS Société, opérant sous le nom commercial Lawgency, s&apos;engage à protéger la vie privée des utilisateurs de son site web. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos données personnelles.
              </p>
              <p>
                Date de dernière mise à jour : 14 juin 2025
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Collecte des données</h2>
              <p className="mb-4">
                Nous collectons les données personnelles suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informations que vous nous fournissez directement : nom, prénom, adresse e-mail, numéro de téléphone, et toute autre information que vous choisissez de nous communiquer via notre formulaire de contact ou par e-mail.</li>
                <li>Informations collectées automatiquement : adresse IP, type de navigateur, pages visitées, temps passé sur le site, et autres données de navigation.</li>
                <li>Cookies et technologies similaires : nous utilisons des cookies pour améliorer votre expérience sur notre site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. Utilisation des données</h2>
              <p className="mb-4">
                Nous utilisons vos données personnelles pour :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Répondre à vos demandes et vous fournir les services demandés</li>
                <li>Améliorer notre site web et nos services</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Partage des données</h2>
              <p className="mb-4">
                Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos données avec :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nos prestataires de services qui nous aident à exploiter notre site et à fournir nos services</li>
                <li>Les autorités publiques lorsque la loi l&apos;exige</li>
              </ul>
              <p className="mt-4">
                Tout tiers avec lequel nous partageons vos données est tenu de respecter la confidentialité et la sécurité de vos informations personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">5. Conservation des données</h2>
              <p>
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées, ou pour nous conformer à des obligations légales. Lorsque nous n&apos;avons plus besoin de vos données personnelles, nous les supprimons ou les anonymisons.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">6. Vos droits</h2>
              <p className="mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Droit d&apos;accès : vous pouvez demander une copie des données personnelles que nous détenons à votre sujet.</li>
                <li>Droit de rectification : vous pouvez demander la correction de données inexactes ou incomplètes.</li>
                <li>Droit à l&apos;effacement : vous pouvez demander la suppression de vos données personnelles dans certaines circonstances.</li>
                <li>Droit à la limitation du traitement : vous pouvez demander la limitation du traitement de vos données.</li>
                <li>Droit à la portabilité des données : vous pouvez demander le transfert de vos données à un tiers.</li>
                <li>Droit d&apos;opposition : vous pouvez vous opposer au traitement de vos données à des fins de marketing direct.</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, veuillez nous contacter via notre <Link href="/contact" className="text-primary hover:underline">formulaire de contact</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">7. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l&apos;accès non autorisé, la divulgation, l&apos;altération et la destruction. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n&apos;est totalement sécurisée, et nous ne pouvons garantir la sécurité absolue de vos données.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">8. Cookies</h2>
              <p className="mb-4">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous permettent de reconnaître votre navigateur et de vous offrir certaines fonctionnalités.
              </p>
              <p className="mb-4">
                Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour être averti lorsqu&apos;un cookie est envoyé. Cependant, certaines fonctionnalités de notre site peuvent ne pas fonctionner correctement si vous désactivez les cookies.
              </p>
              <p>
                Pour plus d&apos;informations sur les cookies que nous utilisons, veuillez consulter notre politique en matière de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">9. Modifications de la politique de confidentialité</h2>
              <p>
                Nous pouvons modifier cette politique de confidentialité à tout moment. La version la plus récente sera toujours disponible sur notre site web avec la date de la dernière mise à jour. Nous vous encourageons à consulter régulièrement cette page pour rester informé des éventuelles modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">10. Contact</h2>
              <p>
                Si vous avez des questions concernant cette politique de confidentialité ou la façon dont nous traitons vos données personnelles, veuillez nous contacter via notre <Link href="/contact" className="text-primary hover:underline">formulaire de contact</Link>.
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
