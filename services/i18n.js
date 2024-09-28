import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en';
import tr from '../public/locales/tr';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => {
    const storedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem('language') : 'en';
    const detectedLanguage = storedLanguage || 'en';
    cb(detectedLanguage);
  },
  init: () => {},
  cacheUserLanguage: (lng) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', lng);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
    },
  });

export default i18n;