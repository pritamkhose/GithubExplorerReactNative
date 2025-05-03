import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/locales/en.json';
import es from '../assets/locales/es.json';
import hi from '../assets/locales/hi.json';
import mr from '../assets/locales/mr.json';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  hi: {
    translation: hi,
  },
  mr: {
    translation: mr,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
