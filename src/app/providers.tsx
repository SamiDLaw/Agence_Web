'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ProvidersProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
}

export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
