import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon		from './locales/en/common.json';
import frCommon		from './locales/fr/common.json';
import enHome 		from './locales/en/Home.json';
import frHome 		from './locales/fr/Home.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
			home: enHome
    },
    fr: {
      common: frCommon,
			home: frHome
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;