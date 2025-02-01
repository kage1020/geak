import 'server-only';
import { headers } from 'next/headers';
import { Language, Languages, Translations } from '@/lib/const';
import { Translation } from '@/types/translation';

export const getTranslation = async (initialLocale?: string) => {
  const locale = validateLocale(initialLocale ?? '') ? initialLocale! : await getLocale();
  const translations = Translations[locale as keyof typeof Translations] as Translation;
  return translations;
};

export const getLocale = async () => {
  const header = await headers();
  const acceptLanguages = header
    .get('accept-language')
    ?.split(',')
    .map((lang) => lang.split(';')[0])
    .map((lang) => lang.split('-')[0])
    .filter((l, i, self) => self.indexOf(l) === i);

  if (!acceptLanguages || acceptLanguages.length === 0) return 'en' as Language;
  if (Languages.includes(acceptLanguages[0] as Language)) return acceptLanguages[0] as Language;

  return 'en' as Language;
};

export function validateLocale(locale: string) {
  return Languages.includes(locale as Language);
}
