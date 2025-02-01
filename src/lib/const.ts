import en from '../../public/languages/en.json';
import ja from '../../public/languages/ja.json';

export const Languages = ['en', 'ja'] as const;
export type Language = (typeof Languages)[number];

export const Translations = {
  en,
  ja,
};
