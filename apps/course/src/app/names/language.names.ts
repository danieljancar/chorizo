export type LanguageNames = {
  [key in 'en' | 'de' | 'fr' | 'it' | 'es' | 'ru' | 'pt' | 'ja']: string;
};

export const languageNames: LanguageNames = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  ru: 'Русский',
  pt: 'Português',
  ja: '日本語',
};
