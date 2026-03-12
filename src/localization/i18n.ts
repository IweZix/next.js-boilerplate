import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
};

i18next.use(initReactI18next).init({
  lng: 'fr',
  debug: true,
  resources,
});

export default i18next;
