import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    // Container: Yellow Background, Rounded Pill
    <div className="flex items-center bg-[#FACC15] rounded-full p-1 shadow-inner w-fit">

      {/* English Button */}
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-4 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
          language === 'en'
            ? "bg-[#7F1D1D] text-[#FACC15] shadow-md transform scale-105" // Active: Dark Red bg, Yellow Text
            : "text-[#7F1D1D] hover:bg-[#7F1D1D]/10" // Inactive: Dark Red text
        }`}
      >
        EN
      </button>

      {/* Tamil Button */}
      <button
        onClick={() => toggleLanguage('ta')}
        className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
          language === 'ta'
            ? "bg-[#7F1D1D] text-[#FACC15] shadow-md transform scale-105" // Active
            : "text-[#7F1D1D] hover:bg-[#7F1D1D]/10" // Inactive
        }`}
      >
        தமிழ்
      </button>

    </div>
  );
};

export default LanguageToggle;
