import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import HeroImage1 from "../../../assets/npf_hero.png";
import { useLanguage } from "../../../context/LanguageContext";
import { heroData } from "../../../data/hero";

const Hero = () => {
  const { language, t } = useLanguage();
  const isTamil = language === 'ta';
  const currentSlides = heroData[language] || heroData['en'];

  return (
    <section className="relative w-full overflow-hidden bg-[#f0f0f0]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800;900&display=swap');

          .font-npf-reference { font-family: 'Inter', sans-serif; }
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }

          .npf-blue-text { color: #0024f8; display: inline-block; }
          .npf-navy-text { color: #1a2b48; }
          .npf-gold-text { color: #ffeb00; }
        `}
      </style>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-20 relative z-10 font-npf-reference">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

          {/* === LEFT: TEXT CONTENT === */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-[red]"></span>
              <span className={`npf-navy-text text-[10px] md:text-xs font-black tracking-[0.2em] ${isTamil ? 'font-tamil' : 'uppercase'}`}>
                {isTamil ? "அரசியல் கட்சி" : "National Political Front"}
              </span>
            </div>

            {/* ✅ 1. SINGLE STATIC MAIN TITLE */}
            <h1
              className={`font-black npf-blue-text mb-6 ${
                isTamil
                  ? "font-tamil text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                  : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tighter"
              }`}
            >
              {isTamil ? "தேசிய மக்கள் முன்னணி (NPF)" : "National People’s Front (NPF)"}
            </h1>

            {/* ✅ 2. LOOP: Renders other items as Subheadings & Text */}
            <div className="space-y-6 mb-10">
              {currentSlides.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">

                  {/* Item Title: Now a smaller subheading (h3) instead of h1 */}
                  <h3 className={`font-bold npf-navy-text ${
                    isTamil ? "font-tamil text-xl" : "text-xl md:text-2xl"
                  }`}>
                    {item.title}
                  </h3>

                  {/* Item Description: Standard text */}
                  <p
                    className={`npf-navy-text opacity-90 max-w-xl mx-auto lg:mx-0 ${
                      isTamil
                        ? "font-tamil text-base leading-relaxed"
                        : "text-base leading-relaxed font-medium"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
