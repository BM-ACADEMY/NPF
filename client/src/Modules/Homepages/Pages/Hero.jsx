// src/Modules/Homepages/Pages/Hero.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";

// ✅ 1. Import your Image
import HeroImage1 from "../../../assets/PutsfHero.jpg";

// ✅ 2. Import the Language Context & New Data File
import { useLanguage } from "../../../context/LanguageContext";
import { heroData } from "../../../data/hero";

const Hero = () => {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check for Tamil Language
  const isTamil = language === 'ta';

  // ✅ 3. Select Data based on current language
  const currentSlides = heroData[language] || heroData['en'];

  useEffect(() => {
    setCurrentSlide(0);
  }, [language]);

  // Auto-Slide Logic (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [language, currentSlides.length]);

  // Helper: Highlight words
  const renderTitle = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(highlight);
    if (parts.length < 2) return text;

    return (
      <>
        {parts[0]}
        <span className="text-amber-500 inline-block relative px-1">
            {highlight}
            {/* Decoration: Underline highlight */}
            <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-3 bg-amber-100 -z-10 rounded-sm transform -rotate-1 mix-blend-multiply"></span>
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* Import Tamil Font locally if needed */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&display=swap');
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      {/* --- Responsive Background Decorations --- */}
      {/* Hidden on very small screens to save performance */}
      <div className="hidden sm:block absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="hidden sm:block absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-amber-50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* Main Container: Adjust padding for Mobile (py-12) vs Desktop (py-24) */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-20 lg:py-28 relative z-10">

        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 md:gap-16 lg:gap-20 xl:gap-24">

          {/* === LEFT: TEXT CONTENT === */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 py-1.5 px-3 md:py-2 md:px-4 rounded-full bg-slate-100 border border-slate-200 mb-6 md:mb-8 animate-fadeIn">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#0F224A]"></span>
              <span className={`text-slate-600 text-[10px] md:text-xs font-semibold tracking-wide ${isTamil ? 'font-tamil' : 'uppercase'}`}>
                {/* Static text or translated if available */}
                Political Party
              </span>
            </div>

            {/* Animated Title */}
            <h1
              key={`title-${currentSlide}-${language}`}
              className={`font-bold text-[#0F224A] mb-4 md:mb-6 animate-slideUp ${
                 isTamil
                 // Tamil: Slightly smaller max size, increased line height
                 ? "font-tamil text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug tracking-normal"
                 // English: Big, Bold, Tight
                 : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
              }`}
            >
              {renderTitle(currentSlides[currentSlide].title, currentSlides[currentSlide].highlight)}
            </h1>

            {/* Animated Description */}
            <p
              key={`desc-${currentSlide}-${language}`}
              className={`text-slate-600 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 animate-slideUp delay-100 ${
                 isTamil
                 ? "font-tamil text-base md:text-lg leading-relaxed"
                 : "text-base sm:text-lg md:text-xl leading-relaxed"
              }`}
            >
              {currentSlides[currentSlide].desc}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-slideUp delay-200 w-full sm:w-auto">

              {/* Primary Button */}
              <Link
                to="/license"
                className={`group bg-[#0F224A] hover:bg-blue-900 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto ${
                    isTamil
                    ? "font-tamil px-6 py-3 text-base font-bold"
                    : "px-8 py-3.5 md:py-4 text-base md:text-lg font-medium"
                }`}
              >
                {t.buttons?.join || "Join Us"}
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Button */}
              <Link
                to="/about"
                className={`group text-slate-600 hover:text-[#0F224A] hover:bg-slate-50 rounded-full border border-transparent hover:border-slate-200 transition-all flex items-center justify-center gap-2 w-full sm:w-auto ${
                    isTamil
                    ? "font-tamil px-6 py-3 text-base font-bold"
                    : "px-8 py-3.5 md:py-4 text-base md:text-lg font-medium"
                }`}
              >
                {t.buttons?.about || "About Us"}
                <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </div>
          </div>

          {/* === RIGHT: IMAGE SLIDER === */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative px-4 sm:px-0">
             <div className="relative w-full max-w-[350px] md:max-w-md lg:max-w-lg group">

                {/* Decorative offset border (Hidden on Mobile to save space/cleaner look) */}
                <div className="hidden sm:block absolute inset-0 bg-amber-100 rounded-[2rem] transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 -z-10 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>

                {/* Image Container */}
                <div className="rounded-3xl md:rounded-[2rem] overflow-hidden shadow-xl md:shadow-2xl shadow-slate-200/50 bg-white">
                  <img
                    src={HeroImage1}
                    alt="Student Body Hero"
                    // Fluid Height: Mobile (300px) -> Tablet (450px) -> Desktop (550px)
                    className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] object-cover transform transition-transform duration-1000 hover:scale-105"
                  />
                </div>

                

             </div>
          </div>

        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
};

export default Hero;
