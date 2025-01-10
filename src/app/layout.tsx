import type { Metadata } from 'next';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getLocale, getTranslation } from '@/lib/i18n';
import { ThemeProvider } from './theme-provider';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslation();

  return {
    title: t.OGP.title,
    description: t.OGP.description,
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
