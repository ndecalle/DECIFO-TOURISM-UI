"use client"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enTranslations from "../locales/en.json"
import frTranslations from "../locales/fr.json"
import rwTranslations from "../locales/rw.json"
import { useLanguage } from "../context/LanguageContext"

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    fr: { translation: frTranslations },
    rw: { translation: rwTranslations },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

// All available translations
const translations = {
  en: enTranslations,
  fr: frTranslations,
  rw: rwTranslations,
}

/**
 * Get a translation by key
 * @param {string} key - Dot notation key (e.g., 'home.hero.title')
 * @param {object} params - Parameters to replace in the translation
 * @param {string} language - Language code (defaults to current language)
 * @returns {string} Translated text
 */
export function getTranslation(key, params = {}, language = "en") {
  // Split the key by dots to navigate the nested structure
  const keys = key.split(".")

  // Get the translation object for the specified language
  const translationObj = translations[language] || translations.en

  // Navigate through the nested structure
  const result = keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), translationObj)

  // If translation not found, return the key
  if (result === undefined) {
    console.warn(`Translation key not found: ${key}`)
    return key
  }

  // If result is not a string, return it as is
  if (typeof result !== "string") {
    return result
  }

  // Replace parameters in the translation
  return Object.entries(params).reduce((str, [param, value]) => {
    return str.replace(new RegExp(`{${param}}`, "g"), value)
  }, result)
}

/**
 * React hook for translations
 * @returns {Function} Translation function
 */
export function useTranslation() {
  const { language } = useLanguage()

  /**
   * Translate a key
   * @param {string} key - Dot notation key
   * @param {object} params - Parameters to replace
   * @returns {string} Translated text
   */
  const t = (key, params = {}) => {
    return getTranslation(key, params, language)
  }

  return { t, language }
}

export default i18n