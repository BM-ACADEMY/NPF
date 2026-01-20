import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";

// ✅ 1. Import your Image
import HeroImage1 from "../../../assets/npf_hero.png";

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

  return (
    <section className="relative w-full overflow-hidden bg-white">

      <style>
        {`
          /* Importing Inter for the geometric bold look */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800;900&display=swap');

          .font-npf-reference { font-family: 'Inter', sans-serif; }
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }

          /* Brand Colors from your Palette */
          .npf-blue-text {
            color: #0024f8;
            display: inline-block;
          }

          .npf-navy-text {
            color: #1a2b48; /* Matches your --color-navy */
          }

          .npf-gold-text {
            color: #ffeb00; /* Matches your --color-gold */
          }
        `}
      </style>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-20 relative z-10 font-npf-reference">

        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

          {/* === LEFT: TEXT CONTENT === */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">

            {/* Pill Badge - Updated font weight */}
            <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-blue-50 border border-blue-100 mb-6 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-[red]"></span>
              <span className={`npf-navy-text text-[10px] md:text-xs font-black tracking-[0.2em] ${isTamil ? 'font-tamil' : 'uppercase'}`}>
                {isTamil ? "அரசியல் கட்சி" : "National Political Front"}
              </span>
            </div>

            {/* Title: Solid Blue with Reference Font Weight */}
            <h1
              key={`title-${currentSlide}-${language}`}
              className={`font-black npf-blue-text mb-6 animate-slideUp ${
                  isTamil
                  ? "font-tamil text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                  : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tighter"
              }`}
            >
              {currentSlides[currentSlide].title}
            </h1>

            {/* Description: Reference Font applied */}
            <p
              key={`desc-${currentSlide}-${language}`}
              className={`npf-navy-text opacity-90 mb-10 max-w-xl mx-auto lg:mx-0 animate-slideUp delay-100 ${
                  isTamil
                  ? "font-tamil text-base md:text-lg leading-relaxed"
                  : "text-base md:text-lg leading-relaxed font-medium"
              }`}
            >
              {currentSlides[currentSlide].desc}
            </p>

            {/* Buttons: Reference Font applied */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slideUp delay-200">
              <Link
                to="/license"
                className={`group bg-[#1a2b48] hover:bg-[#0024f8] text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                    isTamil
                    ? "font-tamil px-8 py-3 text-lg font-bold"
                    : "px-10 py-4 text-sm md:text-base font-black uppercase tracking-widest"
                }`}
              >
                {t.buttons?.join || "Join Us"}
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className={`group text-[#1a2b48] hover:text-[#0024f8] hover:bg-blue-50 rounded-lg border-2 border-[#1a2b48] hover:border-[#0024f8] transition-all flex items-center justify-center gap-2 ${
                    isTamil
                    ? "font-tamil px-8 py-3 text-lg font-bold"
                    : "px-10 py-4 text-sm md:text-base font-black uppercase tracking-widest"
                }`}
              >
                {t.buttons?.about || "About Us"}
              </Link>
            </div>
          </div>

          {/* === RIGHT: IMAGE === */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[350px] md:max-w-md lg:max-w-lg">
              <img
                src={HeroImage1}
                alt="Hero"
                className="w-full h-auto object-contain transform transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
