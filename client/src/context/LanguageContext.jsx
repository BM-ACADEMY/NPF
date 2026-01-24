import React, { createContext, useState, useContext } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default language is English ('en')
  const [language, setLanguage] = useState('ta');

  // Helper to switch language
  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  // Get the current text data based on language
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
