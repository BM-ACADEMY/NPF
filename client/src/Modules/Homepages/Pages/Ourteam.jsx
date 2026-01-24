import React, { useState } from "react";
import { User, RotateCw, X } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { teamData } from "../../../data/ourteam";

// ✅ Images
import DavidJosephImg from "../../../assets/npf_hero.png";
import BanumathiImg from "../../../assets/npf_hero.png";
import JebinLazarusImg from "../../../assets/npf_hero.png";
import RajeshImg from "../../../assets/npf_hero.png";
import Logo from "../../../assets/npf-logo.jpeg";

const OurTeam = () => {
  const { language } = useLanguage();
  const t = teamData[language] || teamData["en"];
  const isTamil = language === 'ta';

  const [flippedId, setFlippedId] = useState(null);

  const teamImages = {
    1: DavidJosephImg,
    2: BanumathiImg,
    3: JebinLazarusImg,
    4: RajeshImg
  };

  const handleCardClick = (id) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <div className="w-full bg-[#f4f4f4] font-dmm-reference min-h-screen relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700;900&display=swap');
        .font-dmm-reference { font-family: 'Inter', sans-serif; }
        .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }

        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* --- SECTION 1: HEADER (Restored to Original) --- */}
      <div className="relative z-10 bg-white py-20 text-center shadow-sm">
        {/* Original Red Subtitle */}
        <span className={`text-[#ff0000] font-black tracking-[0.4em] uppercase text-xs mb-4 block ${isTamil ? 'font-tamil' : ''}`}>
          {isTamil ? "எங்கள் தலைமை" : "Our Leadership"}
        </span>
        {/* Original Blue Title */}
        <h1 className={`text-4xl md:text-6xl font-black text-[#0024f8] tracking-tighter uppercase leading-none ${isTamil ? 'font-tamil' : ''}`}>
          {t.title}
        </h1>
        <div className="w-20 h-2 bg-[#0024f8] mx-auto rounded-full mt-6"></div>
      </div>

      {/* --- SECTION 2: TEAM GRID --- */}
      <div className="max-w-5xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">

          {t.members.map((member) => {
            const isFlipped = flippedId === member.id;

            return (
              <div
                key={member.id}
                className="group relative h-[420px] w-full cursor-pointer perspective-1000"
                onClick={() => handleCardClick(member.id)}
              >
                {/* INNER CONTAINER */}
                <div className={`relative w-full h-full duration-700 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>

                  {/* === FRONT SIDE (New Clean Design) === */}
                  <div className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] backface-hidden flex flex-col items-center pt-0 border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,36,248,0.15)] transition-shadow duration-300">

                    {/* Top Accent Bar */}
                    <div className="w-full h-3 bg-[#0024f8]"></div>

                    {/* Logo Badge (Floating Top Right) */}
                    <div className="absolute top-6 right-6">
                         <img src={Logo} alt="Logo" className="w-8 h-8 rounded-full opacity-50 grayscale group-hover:grayscale-0 transition-all" />
                    </div>

                    {/* Image Section */}
                    <div className="mt-12 mb-6 relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-36 h-36 rounded-full p-1 bg-white shadow-lg relative z-10">
                            <img
                                src={teamImages[member.id]}
                                alt={member.name}
                                className="w-full h-full object-cover rounded-full border-2 border-[#f0f4ff]"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center px-6">
                        <h2 className={`text-2xl font-black text-slate-800 mb-2 ${isTamil ? 'font-tamil' : ''}`}>
                        {member.name}
                        </h2>
                        <h3 className={`text-[#0024f8] font-bold uppercase text-xs tracking-widest bg-blue-50 py-1 px-4 rounded-full inline-block mb-8 ${isTamil ? 'font-tamil' : ''}`}>
                        {member.role}
                        </h3>
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-auto w-full py-5 border-t border-slate-50 bg-slate-50/50 flex justify-center group-hover:bg-[#0024f8] transition-colors duration-300">
                        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">
                            <RotateCw size={14} />
                            {isTamil ? "விபரம் காண்க" : "View Details"}
                        </div>
                    </div>
                  </div>

                  {/* === BACK SIDE (New Vibrant Design) === */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0024f8] to-[#0018a8] rounded-3xl shadow-xl backface-hidden rotate-y-180 p-8 flex flex-col text-left text-white">

                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-6 border-b border-white/20 pb-4">
                        <div>
                             <h3 className={`font-black text-xl leading-none ${isTamil ? 'font-tamil' : ''}`}>
                                {member.name}
                            </h3>
                            <span className={`text-blue-200 text-xs uppercase tracking-wider font-bold mt-1 block ${isTamil ? 'font-tamil' : ''}`}>
                                {member.role}
                            </span>
                        </div>
                        <button className="text-white/70 hover:text-white transition-colors p-1 bg-white/10 rounded-full">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Bio Content */}
                    <div className="flex-grow overflow-y-auto custom-scrollbar">
                         <p className={`text-blue-50 text-sm leading-relaxed font-medium opacity-90 ${isTamil ? 'font-tamil' : ''}`}>
                            {member.bio}
                        </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-6 mt-2 text-center">
                        <button className="text-[10px] font-black bg-white text-[#0024f8] py-2 px-6 rounded-full uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg">
                            {isTamil ? "மூடுக" : "Close"}
                        </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default OurTeam;
