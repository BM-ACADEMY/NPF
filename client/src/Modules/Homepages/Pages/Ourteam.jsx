import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { teamData } from "../../../data/ourteam";

// IMPORTANT: Make sure these paths match your folder structure
import DavidJosephImg from "../../../assets/npf_hero.png";
import BanumathiImg from "../../../assets/npf_hero.png";
import JebinLazarusImg from "../../../assets/npf_hero.png";
import RajeshImg from "../../../assets/npf_hero.png";

const OurTeam = () => {
  const { language } = useLanguage();
  const t = teamData[language] || teamData["en"];

  // Mapping images to IDs
  const teamImages = {
    1: DavidJosephImg,
    2: BanumathiImg,
    3: JebinLazarusImg,
    4: RajeshImg
  };

  return (
    <div className="w-full bg-white font-sans min-h-screen relative overflow-hidden">

      {/* --- VECTOR GRID BACKGROUND --- */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f1f5f9 1px, transparent 1px),
            linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px'
        }}
      ></div>

      {/* Header Banner */}
      <div className="relative z-10 bg-[#0F224A] py-24 text-center text-white px-6">
        <span className="text-[#FACC15] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
          Our Leadership
        </span>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
          {t.title}
        </h1>
        <div className="w-24 h-1.5 bg-[#FACC15] mx-auto rounded-full"></div>
      </div>

      {/* Team Profiles Section */}
      <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 gap-12">

          {t.members.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col lg:flex-row bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/3 aspect-square lg:aspect-auto relative overflow-hidden bg-slate-100">
                <img
                  src={teamImages[member.id]}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F224A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-2/3 p-10 md:p-14 flex flex-col justify-center bg-white group-hover:bg-[#0F224A] transition-colors duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-1 bg-[#FACC15] rounded-full"></div>
                  <p className="text-[#FACC15] font-bold text-sm uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-[#0F224A] group-hover:text-white mb-6 transition-colors duration-500">
                  {member.name}
                </h2>

                <p className="text-slate-600 group-hover:text-blue-50/80 leading-relaxed text-lg text-justify transition-colors duration-500">
                  {member.bio}
                </p>

                {/* Subtle Decorative ID */}
                <span className="absolute bottom-6 right-10 text-8xl font-black text-[#0F224A] opacity-[0.03] group-hover:opacity-[0.1] group-hover:text-white transition-all duration-500 pointer-events-none">
                  0{member.id}
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default OurTeam;
