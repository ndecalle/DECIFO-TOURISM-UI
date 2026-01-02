import { createContext, useContext, useState, useEffect } from "react"

// Available languages
const languages = {
  en: { name: "English", code: "en", nativeName: "English" },
  fr: { name: "French", code: "fr", nativeName: "Français" },
  rw: { name: "Kinyarwanda", code: "rw", nativeName: "Kinyarwanda" },
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Check localStorage or browser language
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && languages[savedLanguage]) return savedLanguage

    // Default to English if browser language not supported
    const browserLang = navigator.language.split("-")[0]
    return languages[browserLang] ? browserLang : "en"
  })

  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem("language", language)
    document.documentElement.lang = language

    // Update HTML dir attribute for RTL languages if needed
    // document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language])

  const changeLanguage = (lang) => {
    if (languages[lang]) {
      setLanguage(lang)
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        languages: Object.values(languages),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

