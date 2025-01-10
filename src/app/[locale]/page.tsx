import { Language } from '@/lib/const';
import { getTranslation } from '@/lib/i18n';

interface HomeProps {
  params: Promise<{ locale: Language }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const t = await getTranslation(locale);

  return (
    <div className='p-8 h-full'>
      <div className='space-y-8'>
        <h1 className='text-4xl text-center'>{t.home.title}</h1>
        <p className='text-center max-w-md mx-auto'>{t.home.description}</p>
      </div>
    </div>
  );
}
