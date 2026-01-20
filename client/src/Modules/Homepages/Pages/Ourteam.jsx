import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { teamData } from "../../../data/ourteam";

// ✅ Images
import DavidJosephImg from "../../../assets/npf_hero.png";
import BanumathiImg from "../../../assets/npf_hero.png";
import JebinLazarusImg from "../../../assets/npf_hero.png";
import RajeshImg from "../../../assets/npf_hero.png";

const OurTeam = () => {
  const { language } = useLanguage();
  const t = teamData[language] || teamData["en"];
  const isTamil = language === 'ta';

  const teamImages = {
    1: DavidJosephImg,
    2: BanumathiImg,
    3: JebinLazarusImg,
    4: RajeshImg
  };

  return (
    <div className="w-full bg-[#f0f0f0] font-npf-reference min-h-screen relative overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700;900&display=swap');
        .font-npf-reference { font-family: 'Inter', sans-serif; }
        .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
      `}</style>

      {/* --- SECTION 1: NAVY HERO BANNER --- */}
      <div className="relative z-10 bg-[#1a2b48] py-24 md:py-32 text-center text-white px-6">
        {/* Decorative Red Tag */}
        <span className={`text-[#ff0000] font-black tracking-[0.4em] uppercase text-xs mb-4 block ${isTamil ? 'font-tamil' : ''}`}>
          {isTamil ? "எங்கள் தலைமை" : "Our Leadership"}
        </span>
        {/* Massive Inter 900 Title */}
        <h1 className={`text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-none ${isTamil ? 'font-tamil' : ''}`}>
          {t.title}
        </h1>
        {/* Royal Blue Thick Accent Bar */}
        <div className="w-24 h-2.5 bg-[#0024f8] mx-auto rounded-full"></div>
      </div>

      {/* --- SECTION 2: GRID BACKGROUND WRAPPER --- */}
      <div className="relative z-10">
        {/* Vector Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1a2b48 1px, transparent 1px),
              linear-gradient(to bottom, #1a2b48 1px, transparent 1px)
            `,
            backgroundSize: '45px 45px'
          }}
        ></div>

        <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col gap-20">

            {t.members.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col lg:flex-row bg-white rounded-[2rem] shadow-xl overflow-hidden border border-[#1a2b48]/5"
              >
                {/* Image Section with Blue Accent Bar */}
                <div className="w-full lg:w-1/3 aspect-square lg:aspect-auto relative overflow-hidden bg-slate-50 border-r-8 border-[#0024f8]">
                  <img
                    src={teamImages[member.id]}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-2/3 p-10 md:p-16 flex flex-col justify-center bg-white transition-colors duration-500">
                  {/* Tag and Role */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-1.5 bg-[#0024f8] rounded-full"></div>
                    <p className={`text-[#0024f8] font-black text-sm uppercase tracking-[0.25em] ${isTamil ? 'font-tamil' : ''}`}>
                      {member.role || "Social Service Specialist"}
                    </p>
                  </div>

                  {/* Name Title in Navy */}
                  <h2 className={`text-3xl md:text-5xl font-black text-[#1a2b48] mb-8 uppercase tracking-tighter leading-none ${isTamil ? 'font-tamil' : ''}`}>
                    {member.name}
                  </h2>

                  {/* Bio Text in Navy/Slate */}
                  <p className={`text-[#1a2b48]/70 leading-relaxed text-lg text-justify font-medium ${isTamil ? 'font-tamil' : ''}`}>
                    {member.bio}
                  </p>

                  {/* Subtle Decorative Background ID */}
                  <span className="absolute bottom-6 right-12 text-9xl font-black text-[#1a2b48] opacity-[0.02] pointer-events-none tracking-tighter">
                    0{member.id}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
