import { Metadata } from 'next';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Language } from '@/lib/const';
import { getTranslation } from '@/lib/i18n';
import { Header } from './header';
import { AppSidebar } from './sidebar';

interface HomeLayoutParams {
  params: Promise<{ locale: Language }>;
}

export async function generateMetadata({ params }: HomeLayoutParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslation(locale);

  return {
    title: {
      default: t.OGP.title,
      template: `%s | ${t.OGP.title}`,
    },
    description: t.OGP.description,
  };
}

interface HomeLayoutProps extends HomeLayoutParams {
  children: React.ReactNode;
}

export default async function HomeLayout({ params, children }: HomeLayoutProps) {
  const { locale } = await params;
  const t = await getTranslation(locale);

  return (
    <SidebarProvider>
      <AppSidebar t={t} />
      <SidebarInset>
        <Header locale={locale} t={t} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
