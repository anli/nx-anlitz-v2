import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

export const init = (loadPath: string) =>
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      react: {
        useSuspense: false,
      },
      compatibilityJSON: 'v3',
      lng: getLocales()[0].languageCode,
      fallbackLng: 'en',
      backend: {
        loadPath,
      },
    });
