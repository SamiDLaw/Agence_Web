'use client';

import { ReactNode } from 'react';
import { ModernNavigation } from './ModernNavigation';
import { motion } from 'framer-motion';

interface PortfolioLayoutProps {
  children: ReactNode;
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ModernNavigation />
      
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
