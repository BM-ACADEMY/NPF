import React from "react";
import { MapPin, Mail, Phone, Clock, ArrowRight, Globe } from "lucide-react";
import { FaBuilding } from "react-icons/fa";

// ✅ 1. Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { contactData } from "../../../data/Contact";

// Vector Background Pattern
const ContactVectorBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#0F224A" strokeWidth="1" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#contact-grid)" />
    </svg>
  </div>
);

const Contact = () => {
  // ✅ 2. Get Language Data
  const { language } = useLanguage();
  const t = contactData[language] || contactData['en'];
  const isTamil = language === 'ta';

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-28 overflow-hidden">

      {/* Tamil Font Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&display=swap');
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      {/* Background Pattern */}
      <ContactVectorBackground />

      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block border-b-2 border-amber-500 pb-1 mb-4">
             <span className={`text-[#0F224A] font-bold tracking-widest uppercase text-xs md:text-sm ${isTamil ? 'font-tamil tracking-wide' : ''}`}>
               {t.tag || "Get In Touch"}
             </span>
          </div>

          <h1 className={`text-3xl md:text-5xl font-black text-[#0F224A] mb-6 ${isTamil ? 'font-tamil leading-tight' : 'uppercase tracking-tight'}`}>
            {t.title} <span className="text-amber-500">{t.highlight}</span>
          </h1>

          <p className={`text-lg text-slate-600 leading-relaxed font-medium ${isTamil ? 'font-tamil' : ''}`}>
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

          {/* Left Column: Contact Cards */}
          <div className="space-y-6">

            {/* Address Card (Official Building Style) */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 border-l-[6px] border-l-[#0F224A] hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-[#0F224A] group-hover:bg-[#0F224A] group-hover:text-amber-400 transition-colors duration-300 shrink-0 border border-slate-200">
                  <FaBuilding size={24} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold text-[#0F224A] mb-2 uppercase tracking-wide ${isTamil ? 'font-tamil' : ''}`}>
                      {t.address.title}
                  </h3>
                  <p className={`text-slate-600 leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
                    {t.address.line1}<br />
                    {t.address.line2}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest cursor-pointer group-hover:underline">
                      <MapPin size={14}/> View on Map
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <a
              href={`mailto:${t.email.value}`}
              className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-[6px] border-l-amber-500 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="relative z-10 flex items-start gap-5">
                <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shrink-0 border border-amber-100">
                  <Mail size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold text-[#0F224A] mb-1 uppercase tracking-wide ${isTamil ? 'font-tamil' : ''}`}>{t.email.title}</h3>
                  <p className="text-slate-600 font-medium group-hover:text-amber-600 transition-colors text-lg">
                    {t.email.value}
                  </p>
                  <p className={`text-xs text-gray-400 mt-1 uppercase tracking-wider ${isTamil ? 'font-tamil' : ''}`}>{t.email.sub}</p>
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-amber-500 transition-colors self-center group-hover:translate-x-1 duration-300" />
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+919787721199"
              className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-[6px] border-l-slate-400 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-[#0F224A] group-hover:text-white transition-colors duration-300 shrink-0 border border-slate-200">
                  <Phone size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold text-[#0F224A] mb-1 uppercase tracking-wide ${isTamil ? 'font-tamil' : ''}`}>{t.phone.title}</h3>
                  <p className="text-slate-600 font-medium group-hover:text-[#0F224A] transition-colors text-lg">
                    {t.phone.value}
                  </p>
                  <p className={`text-xs text-gray-400 mt-1 uppercase tracking-wider ${isTamil ? 'font-tamil' : ''}`}>{t.phone.sub}</p>
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-[#0F224A] transition-colors self-center group-hover:translate-x-1 duration-300" />
              </div>
            </a>

            {/* Office Hours */}
            <div className="bg-[#0F224A] p-6 rounded-lg shadow-lg text-white flex items-center gap-5 border-l-[6px] border-l-amber-500">
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-amber-400">
                  <Clock size={24} />
               </div>
               <div>
                 <h4 className={`font-bold text-sm uppercase tracking-widest text-amber-400 mb-1 ${isTamil ? 'font-tamil' : ''}`}>{t.hours.title}</h4>
                 <p className="text-white text-lg font-medium">{t.hours.value}</p>
               </div>
            </div>
          </div>

          {/* Right Column: Map Embed (Framed) */}
          <div className="h-full min-h-[450px] lg:min-h-full bg-white p-3 rounded-lg shadow-2xl border border-gray-200 relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0F224A] rounded-t-lg z-10"></div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3903.689626359336!2d79.80931107505915!3d11.926710988299863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDU1JzM2LjIiTiA3OcKwNDgnNDIuOCJF!5e0!3m2!1sen!2sin!4v1737283738096!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%", borderRadius: "0.5rem" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NPF Location"
              className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
            ></iframe>

            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded shadow-lg border-l-4 border-amber-500">
                <div className="flex items-center gap-2">
                    <Globe size={14} className="text-[#0F224A]" />
                    <p className={`text-xs font-bold text-[#0F224A] uppercase tracking-wider ${isTamil ? 'font-tamil' : ''}`}>{t.locate || "HQ Location"}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
