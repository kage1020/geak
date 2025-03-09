import en from './en.json';
import ja from './ja.json';

const languages = {
  en: 'English',
  ja: '日本語',
};
const defaultLanguage = 'en';

type Translation = typeof en;
type Language = keyof typeof languages;

function getTranslation(lang: Language): Translation {
  return { en, ja }[lang];
}

function getLanguage(url: URL): Language {
  const lang = url.pathname.split('/')[1];
  if (Object.keys(languages).includes(lang)) {
    return lang as Language;
  }
  return defaultLanguage;
}

export { languages, defaultLanguage, getTranslation, getLanguage, en, ja };
export type { Translation, Language };
