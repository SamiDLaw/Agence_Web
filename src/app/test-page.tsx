'use client';

import { PortfolioLayout } from "./components/portfolio/PortfolioLayout";

export default function TestPage() {
  return (
    <PortfolioLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Page de test</h1>
        <p className="text-lg">Cette page fonctionne-t-elle correctement ?</p>
      </div>
    </PortfolioLayout>
  );
}
