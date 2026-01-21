import React from "react";
import { MapPin, Mail, Phone, Clock, ArrowRight, Globe } from "lucide-react";
import { FaBuilding } from "react-icons/fa";

// ✅ 1. Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { contactData } from "../../../data/Contact";

// Vector Background Pattern using Brand Navy
const ContactVectorBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#1a2b48" strokeWidth="1" fill="none"/>
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
    /* Updated background to #f0f0f0 */
    <section className="relative w-full bg-[#f0f0f0] py-20 md:py-28 overflow-hidden font-npf-reference">

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700;900&display=swap');

          .font-npf-reference { font-family: 'Inter', sans-serif; }
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      {/* Background Pattern */}
      <ContactVectorBackground />

      {/* Decorative Accents updated to Brand Blue/Navy */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0024f8]/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1a2b48]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Accent bar updated to Brand Red */}
          <div className=" pb-1 mb-6">
             <span className={`text-[#ff0000] font-black tracking-[0.3em] uppercase text-xs md:text-sm ${isTamil ? 'font-tamil tracking-wide' : ''}`}>
               {t.tag || "Get In Touch"}
             </span>
          </div>

          {/* Title in Inter Black 900 */}
          <h1 className={`text-4xl md:text-7xl font-black text-[#0024f8] mb-8 leading-none ${isTamil ? 'font-tamil leading-tight' : 'uppercase tracking-tighter'}`}>
            {t.title} <span className="text-[#0024f8]">{t.highlight}</span>
          </h1>

          <p className={`text-lg text-[#1a2b48]/70 leading-relaxed font-medium ${isTamil ? 'font-tamil' : ''}`}>
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

          {/* Left Column: Contact Cards */}
          <div className="space-y-6">

            {/* Address Card (Official Building Style) */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#1a2b48]/5 border-l-[8px] border-l-[#1a2b48] hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#f0f0f0] rounded-xl flex items-center justify-center text-[#1a2b48] group-hover:bg-[#1a2b48] group-hover:text-white transition-all duration-500 shrink-0 shadow-sm">
                  <FaBuilding size={28} />
                </div>
                <div>
                  <h3 className={`text-xl font-black text-[#1a2b48] mb-3 uppercase tracking-tight ${isTamil ? 'font-tamil' : ''}`}>
                      {t.address.title}
                  </h3>
                  <p className={`text-[#1a2b48]/70 leading-relaxed font-medium ${isTamil ? 'font-tamil' : ''}`}>
                    {t.address.line1}<br />
                    {t.address.line2}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-black text-[#0024f8] uppercase tracking-widest cursor-pointer group-hover:translate-x-2 transition-transform">
                      <MapPin size={16}/> {isTamil ? "வரைபடத்தில் பார்க்க" : "View on Map"}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <a
              href={`mailto:${t.email.value}`}
              className="block bg-white p-8 rounded-2xl shadow-lg border border-[#1a2b48]/5 border-l-[8px] border-l-[#0024f8] hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#0024f8]/10 rounded-xl flex items-center justify-center text-[#0024f8] group-hover:bg-[#0024f8] group-hover:text-white transition-all duration-500 shrink-0 shadow-sm">
                  <Mail size={28} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-black text-[#1a2b48] mb-2 uppercase tracking-tight ${isTamil ? 'font-tamil' : ''}`}>{t.email.title}</h3>
                  <p className="text-[#1a2b48] font-black group-hover:text-[#0024f8] transition-colors text-lg">
                    {t.email.value}
                  </p>
                  <p className={`text-[10px] text-[#1a2b48]/40 mt-1 uppercase font-black tracking-widest ${isTamil ? 'font-tamil' : ''}`}>{t.email.sub}</p>
                </div>
                <ArrowRight className="text-[#1a2b48]/20 group-hover:text-[#0024f8] transition-all self-center group-hover:translate-x-2" />
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+919787721199"
              className="block bg-white p-8 rounded-2xl shadow-lg border border-[#1a2b48]/5 border-l-[8px] border-l-[#ff0000] hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#ff0000]/10 rounded-xl flex items-center justify-center text-[#ff0000] group-hover:bg-[#ff0000] group-hover:text-white transition-all duration-500 shrink-0 shadow-sm">
                  <Phone size={28} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-black text-[#1a2b48] mb-2 uppercase tracking-tight ${isTamil ? 'font-tamil' : ''}`}>{t.phone.title}</h3>
                  <p className="text-[#1a2b48] font-black group-hover:text-[#ff0000] transition-colors text-lg">
                    {t.phone.value}
                  </p>
                  <p className={`text-[10px] text-[#1a2b48]/40 mt-1 uppercase font-black tracking-widest ${isTamil ? 'font-tamil' : ''}`}>{t.phone.sub}</p>
                </div>
                <ArrowRight className="text-[#1a2b48]/20 group-hover:text-[#ff0000] transition-all self-center group-hover:translate-x-2" />
              </div>
            </a>

            {/* Office Hours */}
            <div className="bg-[#1a2b48] p-8 rounded-2xl shadow-2xl text-white flex items-center gap-6 border-l-[8px] border-l-[#0024f8]">
               <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-[#0024f8]">
                  <Clock size={32} />
               </div>
               <div>
                 <h4 className={`font-black text-xs uppercase tracking-[0.2em] text-[#0024f8] mb-2 ${isTamil ? 'font-tamil' : ''}`}>{t.hours.title}</h4>
                 <p className="text-white text-xl font-black uppercase tracking-tight">{t.hours.value}</p>
               </div>
            </div>
          </div>

          {/* Right Column: Map Embed (Framed) */}
          <div className="h-full min-h-[450px] lg:min-h-full bg-white p-3 rounded-2xl shadow-2xl border border-[#1a2b48]/5 relative group">
            {/* Top accent bar updated to Brand Navy */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1a2b48] rounded-t-2xl z-10"></div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.663183597066!2d79.80931227581534!3d11.928509837050212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53610be562f74d%3A0xc3f7a63750f2494!2sNational%20People&#39;s%20Front!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%", borderRadius: "1rem" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NPF Location"
              className="grayscale-[0.8] group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>

            <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-5 py-3 rounded-xl shadow-xl border-l-4 border-[#0024f8]">
                <div className="flex items-center gap-3">
                    <Globe size={18} className="text-[#0024f8]" />
                    <p className={`text-[10px] font-black text-[#1a2b48] uppercase tracking-[0.2em] ${isTamil ? 'font-tamil' : ''}`}>{t.locate || "HQ Location"}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
