import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Lawgency',
  description: 'Politique de confidentialité de Lawgency, agence publicitaire basée à Marseille.',
};

export default function PolitiqueDeConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
