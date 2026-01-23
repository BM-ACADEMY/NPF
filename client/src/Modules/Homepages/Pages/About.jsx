import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from "../../../context/LanguageContext";
import { aboutData } from "../../../data/About/about";
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ChevronDown, ChevronUp } from "lucide-react";

// ✅ IMAGES
import PutsfBg from "../../../assets/putsf3.jpg";
import MissionImg from "../../../assets/mission.jpg";
import PoliticalIdeology from './PoliticalIdeology';

gsap.registerPlugin(ScrollToPlugin);

// --- 🆕 HELPER COMPONENT: UNIFORM WORD COUNT ---
const ReadMoreSection = ({ content, isTamil, color = "#0024f8", wordLimit = 40 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content || !Array.isArray(content) || content.length === 0) return null;

  // 1. Prepare the content
  const fullText = content.join(" ");
  const words = fullText.split(/\s+/);
  const hasMore = words.length > wordLimit;

  // 2. Create the "Preview" text
  const previewText = hasMore
    ? words.slice(0, wordLimit).join(" ") + "..."
    : fullText;

  return (
    <div className="flex flex-col items-start transition-all duration-500 ease-in-out">
      <div className={`space-y-6 text-[#1a2b48]/80 text-lg leading-relaxed font-medium ${isTamil ? 'font-tamil text-justify' : ''}`}>
        {isExpanded ? (
          content.map((paragraph, index) => (
            <p key={index} className="animate-fadeIn">{paragraph}</p>
          ))
        ) : (
          <p className="animate-fadeIn">{previewText}</p>
        )}
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: color, borderColor: color }}
          className="mt-6 flex items-center gap-2 text-sm font-black uppercase tracking-widest border-b-2 pb-1 hover:opacity-70 transition-all group"
        >
          {isExpanded ? (
            <>
              {isTamil ? "குறைவாக படிக்க" : "READ LESS"}
              <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform"/>
            </>
          ) : (
            <>
              {isTamil ? "மேலும் படிக்க" : "READ MORE"}
              <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform"/>
            </>
          )}
        </button>
      )}
    </div>
  );
};

const About = () => {
  const { language } = useLanguage();
  const t = aboutData[language] || aboutData['en'];
  const location = useLocation();
  const isTamil = language === 'ta';

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        gsap.to(window, { duration: 1, scrollTo: { y: element, offsetY: 120 }, ease: "power2.out" });
      }
    }
  }, [location]);

  return (
    <div className="w-full bg-white font-npf-reference pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;900&display=swap');
        .font-npf-reference { font-family: 'Inter', sans-serif; }
        .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>

      {/* --- HEADER (Corrected: Gray Background, Center Aligned) --- */}
      <div className="w-full py-20 md:py-28 text-center bg-gray-100 px-6 md:px-12">
          <h1 className={`text-4xl md:text-7xl font-black text-[#0024f8] leading-none ${isTamil ? 'font-tamil' : 'tracking-tighter'}`}>
            {t.title}
          </h1>
          {/* mx-auto centers the underline */}
          <div className="w-20 h-1.5 bg-[#ff0000] mx-auto mt-4 rounded-full shadow-sm"></div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 md:px-12 space-y-32 mt-20">

        {/* --- SECTION 1: BACKGROUND --- */}
        <div id="background" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image Column */}
            <div className="relative group">
                <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/10 aspect-[4/3] bg-gray-100">
                    <img
                      src={PutsfBg}
                      alt="Our History"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                {/* Clean Floating Tag */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur shadow-lg px-5 py-2 rounded-lg border-l-4 border-[#1a2b48]">
                    <span className="text-[#1a2b48] text-xs font-black uppercase tracking-widest">History</span>
                </div>
            </div>

            {/* Text Column */}
            <div className="pt-2">
                <h2 className={`text-3xl md:text-4xl font-black text-[#1a2b48] mb-8 border-l-[6px] border-[#ff0000] pl-6 ${isTamil ? 'font-tamil' : ''}`}>
                    {t.background.title}
                </h2>
                <ReadMoreSection content={t.background.content} isTamil={isTamil} color="#ff0000" wordLimit={40} />
            </div>
        </div>

        {/* --- SECTION 2: VISION --- */}
        <div id="vision" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Text Column (Order 2 on Mobile, 1 on Desktop) */}
            <div className="order-2 lg:order-1 pt-2">
                <h2 className={`text-3xl md:text-4xl font-black text-[#1a2b48] mb-8 border-l-[6px] border-[#0024f8] pl-6 ${isTamil ? 'font-tamil' : ''}`}>
                    {t.vision.title}
                </h2>
                <ReadMoreSection content={t.vision.content} isTamil={isTamil} color="#0024f8" wordLimit={40} />
            </div>

            {/* Image Column (Order 1 on Mobile, 2 on Desktop) */}
            <div className="order-1 lg:order-2 relative group">
                <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/10 aspect-[4/3] bg-gray-100">
                    <img
                      src={MissionImg}
                      alt="Our Vision"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur shadow-lg px-5 py-2 rounded-lg border-r-4 border-[#0024f8]">
                    <span className="text-[#0024f8] text-xs font-black uppercase tracking-widest">Vision</span>
                </div>
            </div>
        </div>

        {/* --- SECTION 3: PHILOSOPHY --- */}
        <div id="philosophy" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image Column */}
            <div className="relative group">
                <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/10 aspect-[4/3] bg-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1000&auto=format&fit=crop"
                      alt="Political Philosophy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur shadow-lg px-5 py-2 rounded-lg border-l-4 border-[#ff0000]">
                    <span className="text-[#ff0000] text-xs font-black uppercase tracking-widest">Philosophy</span>
                </div>
            </div>

            {/* Text Column */}
            <div className="pt-2">
                <h2 className={`text-3xl md:text-4xl font-black text-[#1a2b48] mb-8 border-l-[6px] border-[#ff0000] pl-6 ${isTamil ? 'font-tamil' : ''}`}>
                    {t.philosophy.title}
                </h2>
                <ReadMoreSection content={t.philosophy.content} isTamil={isTamil} color="#ff0000" wordLimit={40} />
            </div>
        </div>

      </div>

      <div className="mt-32">
         <PoliticalIdeology />
      </div>
    </div>
  );
};

export default About;
