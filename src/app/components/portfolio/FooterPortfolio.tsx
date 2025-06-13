'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function FooterPortfolio() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-medium mb-4">Adresse</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Paris, France<br />
              75001
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Studio</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/projets" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@lawgency.fr" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Email
                </a>
              </li>
              <li>
                <a href="tel:+33123456789" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Téléphone
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Formulaire de contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Lawgency. Tous droits réservés.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              Behance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
