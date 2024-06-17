import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../public/locales/en/translation.json';
import es from '../public/locales/es/translation.json';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // TODO: to test the translation is working or not, change the language to 'es'
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: { translation: en },
            es: { translation: es },
        },
    });

// using Promises
// TODO: Or you can use the following code to test the translation is working or not
// i18n.changeLanguage('es').then((t) => {
//     console.log('first', t('BUTTONS.CREATE'));
//     t('BUTTONS.CREATE'); // -> same as i18next.t
// });

export default i18n;
