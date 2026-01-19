import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from "../../../context/LanguageContext";
import { aboutData } from "../../../data/about";

// ✅ 1. IMPORT YOUR TEAM IMAGES HERE
// Make sure these files exist in your assets folder!
import SwaminathanImg from "../../../assets/PutsfHero.jpg";
import InnacyImg from "../../../assets/PutsfHero.jpg";

const About = () => {
  const { language } = useLanguage();
  const t = aboutData[language] || aboutData['en'];
  const location = useLocation();

  // ✅ 2. MAP IMAGES TO IDs
  // This matches the 'id' in your about.js file to the image import
  const teamImages = {
    1: SwaminathanImg, // ID 1 is Mr. Swaminathan
    2: InnacyImg       // ID 2 is Dr. Q. Innacy Rock
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="w-full bg-gray-50 font-sans">

      {/* Header */}
      <div className="bg-[#0F224A] py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold">{t.title}</h1>
        <div className="w-24 h-1 bg-[#FACC15] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-20">

        {/* Background & Vision */}
        <div className="grid md:grid-cols-2 gap-12">
          <div id="background" className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#0F224A] scroll-mt-32">
            <h2 className="text-2xl font-bold text-[#0F224A] mb-4">{t.background.title}</h2>
            {t.background.content.map((para, index) => (
              <p key={index} className="text-gray-600 leading-relaxed mb-4 text-justify">
                {para}
              </p>
            ))}
          </div>

          <div id="vision" className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#FACC15] scroll-mt-32">
            <h2 className="text-2xl font-bold text-[#0F224A] mb-4">{t.vision.title}</h2>
            {t.vision.content.map((para, index) => (
              <p key={index} className="text-gray-600 leading-relaxed mb-4 text-justify">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
           <h2 className="text-3xl font-bold text-center text-[#0F224A] mb-8">{t.philosophy.title}</h2>
           <div className="max-w-4xl mx-auto">
             {t.philosophy.content.map((para, index) => (
                <p key={index} className="text-gray-700 text-lg leading-relaxed mb-4 text-center">
                  {para}
                </p>
              ))}
           </div>
        </div>

        {/* Political Ideology */}
        <div id="ideology" className="scroll-mt-32">
          <h2 className="text-3xl font-bold text-center text-[#0F224A] mb-10">Political Ideology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.ideologies.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0F224A] transition-colors">
                  <span className="text-[#0F224A] font-bold text-xl group-hover:text-[#FACC15]">{item.id}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F224A] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div id="team" className="scroll-mt-32">
          <h2 className="text-3xl font-bold text-center text-[#0F224A] mb-10">{t.teamTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.team.map((member) => (
              <div key={member.id} className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">

                {/* ✅ 3. RENDER THE IMAGE */}
                <div className="w-32 h-32 rounded-full mb-6 border-4 border-[#FACC15] overflow-hidden">
                  <img
                    src={teamImages[member.id]}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold text-[#0F224A]">{member.name}</h3>
                <span className="text-[#d97706] font-semibold mb-4 block">{member.role}</span>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
