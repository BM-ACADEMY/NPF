import React from "react";
import { User, ShieldCheck, Scale, Users } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { teamData } from "../../../data/ourteam";

const OurTeam = () => {
  const { language } = useLanguage();
  const t = teamData[language] || teamData["en"];

  // Mapping icons to team members based on their ID or role
  const icons = {
    1: <User size={32} />,           // Mr. David Joseph
    2: <ShieldCheck size={32} />,    // Ms. A. Banumathi
    3: <Scale size={32} />,          // Mr. K. Jebin Lazarus
    4: <Users size={32} />           // Mr. G. Rajesh
  };

  return (
    <div className="w-full bg-white font-sans min-h-screen relative overflow-hidden">

      {/* --- VECTOR GRID BACKGROUND (Ref: Masterclass Style) --- */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f1f5f9 1px, transparent 1px),
            linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Header Banner */}
      <div className="relative z-10 bg-[#0F224A] py-24 text-center text-white px-6">
        <span className="text-[#FACC15] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
          Visionary Leadership
        </span>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
          {t.title}
        </h1>
        <div className="w-24 h-1.5 bg-[#FACC15] mx-auto rounded-full mb-8"></div>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto italic opacity-90">
          {t.subtitle}
        </p>
      </div>

      {/* Team Cards Section */}
      <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">

          {t.members.map((member) => (
            <div
              key={member.id}
              className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:bg-[#0F224A] hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(15,34,74,0.15)] flex flex-col cursor-default overflow-hidden"
            >
              {/* Header inside card */}
              <div className="flex items-start gap-6 mb-8 relative z-10">
                <div className="w-16 h-16 bg-[#0F224A] group-hover:bg-[#FACC15] rounded-2xl flex items-center justify-center text-[#FACC15] group-hover:text-[#0F224A] transition-all duration-500 shadow-lg">
                  {icons[member.id] || <User size={32} />}
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-[#0F224A] group-hover:text-white transition-colors duration-500">
                    {member.name}
                  </h2>
                  <p className="text-[#FACC15] font-bold text-xs uppercase tracking-widest mt-1">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Decorative Accent Bar */}
              <div className="w-12 h-1 bg-[#FACC15] group-hover:w-full mb-8 rounded-full transition-all duration-700"></div>

              {/* Biography Text */}
              <p className="text-slate-600 group-hover:text-blue-50 leading-relaxed text-justify relative z-10 transition-colors duration-500 text-lg">
                {member.bio}
              </p>

              {/* Large Ghost Index Number */}
              <span className="absolute -bottom-6 -right-4 text-[10rem] font-black text-[#0F224A] opacity-[0.03] group-hover:opacity-[0.08] group-hover:text-white transition-all duration-500 select-none">
                0{member.id}
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default OurTeam;
