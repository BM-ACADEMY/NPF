import React from "react";
import { ExternalLink, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { putsfData } from "../../../data/putsf";

// ✅ Using the image you uploaded previously
import PutsfImage from "../../../assets/PutsfHero.jpg";

const PutsfSection = () => {
  const { language } = useLanguage();
  const isTamil = language === 'ta';
  const currentSlides = putsfData[language] || putsfData['en'];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800;900&display=swap');

          .font-dmm-reference { font-family: 'Inter', sans-serif; }
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }

          /* DMM Color Palette */
          .dmm-blue-text { color: #0024f8; }
          .dmm-navy-text { color: #1a2b48; }
          .dmm-red-bg { background-color: #ff0000; }
        `}
      </style>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-24 relative z-10 font-dmm-reference">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* === LEFT: IMAGE === */}
          {/* Matches the layout style of your screenshots */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-[350px] md:max-w-md lg:max-w-lg group">
              {/* Decorative Circle Background similar to your logo style */}
              <div className="absolute inset-0 bg-[#0024f8]/5 rounded-full scale-95 group-hover:scale-105 transition-transform duration-700" />

              <img
                src={PutsfImage}
                alt="Puducherry Student Federation"
                className="relative z-10 w-full h-auto object-contain transform transition-transform duration-700 hover:scale-105 drop-shadow-xl"
              />
            </div>
          </div>

          {/* === RIGHT: TEXT CONTENT === */}
          <div className="w-full lg:w-3/5 text-center lg:text-left order-1 lg:order-2">

            {/* Pill Badge - Consistent with your Hero section */}
            <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-2 h-2 rounded-full dmm-red-bg"></span>
              <span className={`dmm-navy-text text-[10px] md:text-xs font-black tracking-[0.2em] ${isTamil ? 'font-tamil' : 'uppercase'}`}>
                {isTamil ? "மாணவர் அமைப்பு" : "Student Wing"}
              </span>
            </div>

            {/* ✅ MAIN HEADER: 25+ Years Service */}
            <h1
              className={`font-black dmm-navy-text mb-6 ${
                isTamil
                  ? "font-tamil text-3xl sm:text-4xl md:text-5xl leading-tight"
                  : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight"
              }`}
            >
              {isTamil ? (
                <>
                  <span className="dmm-blue-text">புதுச்சேரி யூனியன் பிரதேச</span><br />
                  மாணவர்கள் கூட்டமைப்பு
                </>
              ) : (
                <>
                  Puducherry Union Territory <br />
                  <span className="dmm-blue-text">Student Federation</span>
                </>
              )}
            </h1>

            {/* ✅ CONTENT LOOP */}
            <div className="space-y-8 mb-10">
              {currentSlides.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 border-l-4 border-[#0024f8]/20 pl-6 hover:border-[#0024f8] transition-colors duration-300">
                  <h3 className={`font-bold dmm-navy-text ${
                    isTamil ? "font-tamil text-xl" : "text-xl md:text-2xl"
                  }`}>
                    {item.title}
                  </h3>

                  <p
                    className={`dmm-navy-text opacity-80 max-w-xl mx-auto lg:mx-0 ${
                      isTamil
                        ? "font-tamil text-base leading-relaxed text-justify"
                        : "text-base leading-relaxed font-medium text-justify"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://putsf.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-[#1a2b48] hover:bg-[#0024f8] text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                  isTamil
                    ? "font-tamil px-8 py-3 text-lg font-bold"
                    : "px-10 py-4 text-sm md:text-base font-black uppercase tracking-widest"
                }`}
              >
                {isTamil ? "PUTSF பற்றி மேலும் அறிய" : "Visit PUTSF.com"}
                <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PutsfSection;
