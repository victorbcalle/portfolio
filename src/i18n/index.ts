import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es.json';
import en from './en.json';

export const LANGUAGES = ['es', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'es';
const STORAGE_KEY = 'portfolio.lang';

function isLanguage(value: string | null | undefined): value is Language {
  return value != null && (LANGUAGES as readonly string[]).includes(value);
}

/**
 * Idioma inicial: 1) lo guardado en localStorage, 2) el del navegador si es
 * uno soportado, 3) el idioma por defecto. Detección y persistencia manuales
 * (sin plugin externo) para mantener las dependencias al mínimo.
 */
function resolveInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(stored)) {
    return stored;
  }
  const browser = window.navigator.language.slice(0, 2);
  return isLanguage(browser) ? browser : DEFAULT_LANGUAGE;
}

const initialLanguage = resolveInitialLanguage();

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
});

function applyLanguageToDocument(lng: string): void {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
}

applyLanguageToDocument(initialLanguage);

i18n.on('languageChanged', (lng) => {
  if (!isLanguage(lng)) {
    return;
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lng);
  }
  applyLanguageToDocument(lng);
});

export default i18n;
