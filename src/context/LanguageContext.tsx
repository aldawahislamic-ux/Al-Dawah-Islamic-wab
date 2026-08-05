import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "../data/translations";
import { SUPPORTED_LANGUAGES, AppLanguage } from "../components/SettingsModal";

interface LanguageContextType {
  language: string;
  setLanguage: (langCode: string) => void;
  t: (key: string) => string;
  isRtl: boolean;
  currentLangObj: AppLanguage;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>("en");

  // Load initial stored language on mount
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem("aldawah_app_settings");
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (parsed.language) {
          setLanguageState(parsed.language);
        }
      }
    } catch (e) {
      console.error("Failed to load stored language in LanguageContext", e);
    }
  }, []);

  const setLanguage = (langCode: string) => {
    setLanguageState(langCode);
    try {
      const storedSettings = localStorage.getItem("aldawah_app_settings");
      const parsed = storedSettings ? JSON.parse(storedSettings) : {};
      parsed.language = langCode;
      parsed.updatedAt = new Date().toISOString();
      localStorage.setItem("aldawah_app_settings", JSON.stringify(parsed));
    } catch (e) {
      console.error("Failed to save language in localStorage", e);
    }
  };

  const t = (key: string): string => {
    if (TRANSLATIONS[key]) {
      return TRANSLATIONS[key][language] || TRANSLATIONS[key]["en"] || TRANSLATIONS[key]["bn"] || key;
    }
    return key;
  };

  const isRtl = language === "ar" || language === "ur";
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl, currentLangObj }}>
      <div dir={isRtl ? "rtl" : "ltr"} className={`w-full min-h-screen ${isRtl ? "font-serif" : ""}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
