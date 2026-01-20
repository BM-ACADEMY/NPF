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
    <section
      id="ideology"
      className="relative w-full bg-[#F8FAFC] py-24 scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Vector Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: `radial-gradient(#1a2b4b 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-16">
          <span className="text-[#1a2b4b] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Core Principles
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1a2b4b]">
            {t.title}
          </h2>
          <div className="w-20 h-1.5 bg-[#FACC15] mt-8"></div>
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
                  /* HOVER & ACTIVE STATE: BOX TURNS BLUE */
                  ${isExpanded || 'hover:bg-[#1a2b4b] hover:border-[#1a2b4b] hover:shadow-2xl'}
                  ${isExpanded ? 'bg-[#1a2b4b] border-[#1a2b4b] shadow-2xl' : 'bg-white border-slate-200'}`}
              >
                <div className="flex items-center p-6 md:p-10 gap-6">
                  {/* Icon: Turns Yellow on Hover/Active */}
                  <div className={`transition-colors duration-500
                    ${isExpanded ? 'text-[#FACC15]' : 'text-[#1a2b4b] group-hover:text-[#FACC15]'}`}>
                    {icons[item.id]}
                  </div>

                  {/* Title: Turns White on Hover/Active */}
                  <div className="flex-grow">
                    <h3 className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-500
                      ${isExpanded ? 'text-white' : 'text-[#1a2b4b] group-hover:text-white'}`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Arrow Indicator */}
                  <div className={`transition-all duration-500 p-2 rounded-full
                    ${isExpanded ? 'bg-[#FACC15] text-[#1a2b4b] rotate-180' : 'text-slate-300 group-hover:text-white'}`}>
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
                        <p key={idx} className="text-lg leading-relaxed text-blue-100/90 text-justify">
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
