import React, { useState } from 'react';
import { useLanguage } from "../../../context/LanguageContext";
import { politicalIdeologyData } from "../../../data/About/politicalIdeology";
import {
  Users, Scale, GraduationCap, Briefcase,
  ShieldCheck, UserRound, Fingerprint,
  Handshake, Languages, Landmark, ChevronDown
} from 'lucide-react';

const PoliticalIdeology = () => {
  const { language } = useLanguage();
  const t = politicalIdeologyData[language] || politicalIdeologyData['en'];
  const [expandedId, setExpandedId] = useState(null);
  const isTamil = language === 'ta';

  const ideologies = t.ideologies || [];

  const icons = {
    1: <Landmark size={28} />,
    2: <Scale size={28} />,
    3: <GraduationCap size={28} />,
    4: <Briefcase size={28} />,
    5: <ShieldCheck size={28} />,
    6: <UserRound size={28} />,
    7: <Fingerprint size={28} />,
    8: <Handshake size={28} />,
    9: <Languages size={28} />,
    10: <Users size={28} />
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    /* Section Background updated to #f0f0f0 */
    <section
      id="ideology"
      className="relative w-full bg-[#f0f0f0] py-24 scroll-mt-20 overflow-hidden font-dmm-reference"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700;900&display=swap');

          .font-dmm-reference { font-family: 'Inter', sans-serif; }
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      {/* Subtle Vector Background using Royal Blue */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: `radial-gradient(#0024f8 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-16">
          {/* Tag updated to Brand Red */}
          <span className={`text-[#ff0000] font-black tracking-[0.3em] uppercase text-xs mb-4 block ${isTamil ? 'font-tamil' : ''}`}>
             Core Principles
          </span>
          {/* Header updated to Inter 900 Navy */}
          <h2 className={`text-4xl md:text-6xl font-black tracking-tighter text-[#0024f8] uppercase leading-none ${isTamil ? 'font-tamil' : ''}`}>
            {t.title}
          </h2>
          {/* Accent Bar updated to Royal Blue */}
          <div className="w-20 h-2 bg-[#0024f8] mt-8 rounded-full"></div>
        </div>

        {/* INTERACTIVE STACK */}
        <div className="max-w-5xl mx-auto space-y-4">
          {ideologies.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className={`group cursor-pointer transition-all duration-500 rounded-2xl border
                  /* HOVER & ACTIVE STATE: BOX TURNS ROYAL BLUE */
                  ${isExpanded || 'hover:bg-[#0024f8] hover:border-[#0024f8] hover:shadow-2xl'}
                  ${isExpanded ? 'bg-[#0024f8] border-[#0024f8] shadow-2xl' : 'bg-white border-[#1a2b4b]/5 shadow-sm'}`}
              >
                <div className="flex items-center p-6 md:p-10 gap-6">
                  {/* Icon: Turns White on Hover/Active */}
                  <div className={`transition-colors duration-500
                    ${isExpanded ? 'text-white' : 'text-[#0024f8] group-hover:text-white'}`}>
                    {icons[item.id]}
                  </div>

                  {/* Title: Turns White on Hover/Active */}
                  <div className="flex-grow">
                    <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-500
                      ${isExpanded ? 'text-white' : 'text-[#1a2b4b] group-hover:text-white'} ${isTamil ? 'font-tamil' : ''}`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Arrow Indicator: Turns White */}
                  <div className={`transition-all duration-500 p-2 rounded-full
                    ${isExpanded ? 'bg-white/20 text-white rotate-180' : 'text-slate-300 group-hover:text-white'}`}>
                    <ChevronDown size={24} />
                  </div>
                </div>

                {/* EXPANDABLE DETAIL */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out
                    ${isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-10 md:px-24 pb-12">
                    <div className="pt-8 border-t border-white/10 space-y-6">
                      {item.content.map((para, idx) => (
                        <p key={idx} className={`text-lg leading-relaxed text-white/90 text-justify font-medium ${isTamil ? 'font-tamil' : ''}`}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PoliticalIdeology;
