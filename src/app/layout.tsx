import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ModernFooter } from './components/portfolio/ModernFooter';
import { CustomCursor } from './components/portfolio/CustomCursor';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lawgency - Agence Web & Audiovisuelle',
  description: 'Votre partenaire digital pour des solutions web et audiovisuelles innovantes',
  keywords: 'agence web, production vidéo, développement web, design, marketing digital, agence vidéo, design web, community management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} cursor-none`}>
        <Providers attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <ModernFooter />
          <CustomCursor />
        </Providers>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}