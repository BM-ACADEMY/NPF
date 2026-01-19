// src/Modules/Homepages/Pages/Hero.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// ✅ 1. Import your Image
import HeroImage1 from "../../../assets/PutsfHero.jpg";

// ✅ 2. Import the Language Context & New Data File
import { useLanguage } from "../../../context/LanguageContext";
import { heroData } from "../../../data/hero"; // Adjust path if needed

const Hero = () => {
  const { language, t } = useLanguage(); // Get 'en' or 'ta'
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ 3. Select Data based on current language
  // This grabs the specific array (English or Tamil) from your hero.js file
  const currentSlides = heroData[language] || heroData['en'];

  // Reset to slide 0 when language changes to prevent index errors
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

  // Helper to highlight specific words in Gold
  const renderTitle = (text, highlight) => {
    if (!highlight) return text;
    // Split text by the highlight word (case-insensitive check is safer, but simple split works if exact match)
    const parts = text.split(highlight);
    if (parts.length < 2) return text; // Safety check if highlight word isn't found

    return (
      <>
        {parts[0]}
        <span className="text-[#FACC15] inline-block">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0F224A] text-white py-16 md:py-24 lg:py-32">

      {/* Background Glows (Optional Visuals) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

          {/* === LEFT: TEXT CONTENT === */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">

            {/* Tagline Badge */}
            <div className="inline-block py-1 px-4 rounded-full border border-[#FACC15]/30 bg-[#FACC15]/10 mb-6 animate-fadeIn">
              <span className="text-[#FACC15] text-xs md:text-sm font-bold tracking-wider uppercase">
                Est. 2006 • Official Student Body
              </span>
            </div>

            {/* Animated Title */}
            <h1
              key={`title-${currentSlide}-${language}`} // Unique key forces animation reset
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-slideUp"
            >
              {renderTitle(currentSlides[currentSlide].title, currentSlides[currentSlide].highlight)}
            </h1>

            {/* Animated Description */}
            <p
              key={`desc-${currentSlide}-${language}`}
              className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 animate-slideUp delay-100"
            >
              {currentSlides[currentSlide].desc}
            </p>

            {/* Buttons (using translation from context for button labels) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slideUp delay-200">
              <Link
                to="/license"
                className="bg-[#FACC15] hover:bg-yellow-400 text-[#0F224A] font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {t.buttons?.join || "Join Us"}
                <ChevronRight size={20} strokeWidth={3} />
              </Link>

              <Link
                to="/about"
                className="bg-transparent border-2 border-white/20 hover:border-[#FACC15] text-white hover:text-[#FACC15] font-bold text-lg px-8 py-4 rounded-xl transition-all flex items-center justify-center"
              >
                {t.buttons?.about || "About Us"}
              </Link>
            </div>
          </div>

          {/* === RIGHT: IMAGE SLIDER === */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
             <div className="relative w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50 border-4 border-[#ffffff]/10 group">
                <img
                  src={HeroImage1} // Using fixed image for now, can be dynamic if added to data
                  alt="Hero Slide"
                  className="w-full h-[400px] md:h-[500px] object-cover transform transition-transform duration-700 hover:scale-105"
                />
                {/* Overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F224A]/40 to-transparent pointer-events-none"></div>
             </div>
          </div>

        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
};

export default Hero;
