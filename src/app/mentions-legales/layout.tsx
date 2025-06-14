import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales | Lawgency',
  description: 'Mentions légales et informations juridiques de Lawgency, agence publicitaire basée à Marseille.',
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
