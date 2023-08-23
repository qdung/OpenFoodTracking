/**
 * @description load additional plugins to i18next for the multi language feature
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import vn from './vi.json'

export const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vn,
  },
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
