'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

type ProvidersProps = {
  children: ReactNode;
} & Omit<ThemeProviderProps, 'children'>;

export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
