import React from "react";
import { Link } from "react-router-dom";
import { Users, Heart, HandHeart } from "lucide-react"; // Icons
import { useLanguage } from "../../../context/LanguageContext";
import { getInvolvedData } from "../../../data/getInvolved";

const GetInvolved = () => {
  const { language } = useLanguage();
  const t = getInvolvedData[language] || getInvolvedData["en"];

  // Icons mapping
  const icons = {
    join: <Users size={48} className="text-[#FACC15]" />,
    volunteer: <HandHeart size={48} className="text-[#FACC15]" />,
    donate: <Heart size={48} className="text-[#FACC15]" />
  };

  return (
    <div className="w-full bg-gray-50 font-sans min-h-screen">

      {/* Header Banner */}
      <div className="bg-[#0F224A] py-20 text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Cards Section */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">

          {t.cards.map((card) => (
            <div key={card.id} id={card.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[#0F224A] hover:border-[#FACC15] flex flex-col items-center text-center group scroll-mt-32">

              <div className="w-20 h-20 bg-[#0F224A] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {icons[card.id]}
              </div>

              <h2 className="text-2xl font-bold text-[#0F224A] mb-4">{card.title}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {card.desc}
              </p>

              <Link
                to={card.link}
                className="mt-auto px-8 py-3 bg-[#0F224A] text-white rounded-full font-bold hover:bg-[#FACC15] hover:text-[#0F224A] transition-colors shadow-md"
              >
                {card.button}
              </Link>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
