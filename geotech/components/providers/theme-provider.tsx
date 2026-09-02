'use client';

import React from 'react';
import { ThemeProvider as CustomThemeProvider } from '@/components/theme-provider';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CustomThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="geodrill-theme"
    >
      {children}
    </CustomThemeProvider>
  );
}
