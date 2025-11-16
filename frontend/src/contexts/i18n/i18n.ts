import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon		from './locales/en/common.json';
import frCommon		from './locales/fr/common.json';
import enHome 		from './locales/en/Home.json';
import frHome 		from './locales/fr/Home.json';
import enWork 		from './locales/en/Work.json';
import frWork 		from './locales/fr/Work.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
			home: enHome,
			work: enWork
    },
    fr: {
      common: frCommon,
			home: frHome,
			work: frWork
    }
  },
  lng: localStorage.getItem('language') || "en", // Lire la langue depuis localStorage
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

// Sauvegarder la langue dans localStorage à chaque changement
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;