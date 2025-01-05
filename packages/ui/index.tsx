import { AnalyticsProvider } from '@undrstnd/analytics';
import { AuthProvider } from '@undrstnd/auth/provider';
import type { ThemeProviderProps } from 'next-themes';
import { Sonner } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';

type UIProviderProperties = ThemeProviderProps;

export const UIProvider = ({
  children,
  ...properties
}: UIProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>
      <AnalyticsProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Sonner />
      </AnalyticsProvider>
    </AuthProvider>
  </ThemeProvider>
);

export * from './components/shared';
export * from './components/ui';
