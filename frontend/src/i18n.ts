import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to the Home Page!",
        about: "About",
        projects: "Projects",
        contact: "Contact",
      }
    },
    fr: {
      translation: {
        welcome: "Bienvenue sur la page d'accueil !",
        about: "À propos",
        projects: "Projets",
        contact: "Contact",
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;