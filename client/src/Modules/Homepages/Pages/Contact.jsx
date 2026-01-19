import React from "react";
import { MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react";
// ✅ 1. Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { contactData } from "../../../data/contact";

const Contact = () => {
  // ✅ 2. Get Language Data
  const { language } = useLanguage();
  const t = contactData[language] || contactData['en'];

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-28 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-50/50 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#0056b3] font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
            {t.tag}
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            {t.title} <span className="text-[#dc2626]">{t.highlight}</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0056b3] to-[#dc2626] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Column: Contact Cards */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#0056b3] hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0056b3] group-hover:bg-[#0056b3] group-hover:text-white transition-colors duration-300 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t.address.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.address.line1}<br />
                    {t.address.line2}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <a
              href={`mailto:${t.email.value}`}
              className="block bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#dc2626] hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white transition-colors duration-300 shrink-0">
                  <Mail size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t.email.title}</h3>
                  <p className="text-gray-600 font-medium group-hover:text-[#dc2626] transition-colors">
                    {t.email.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{t.email.sub}</p>
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-[#dc2626] transition-colors self-center" />
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+919787721199"
              className="block bg-white p-6 rounded-2xl shadow-md border-l-4 border-slate-800 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-800 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300 shrink-0">
                  <Phone size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t.phone.title}</h3>
                  <p className="text-gray-600 font-medium group-hover:text-slate-800 transition-colors">
                    {t.phone.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{t.phone.sub}</p>
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-slate-800 transition-colors self-center" />
              </div>
            </a>

            {/* Office Hours */}
            <div className="bg-slate-900 p-6 rounded-2xl shadow-lg text-white flex items-center gap-4">
               <Clock className="text-[#FECD00]" size={24} />
               <div>
                 <h4 className="font-bold text-sm uppercase tracking-wide text-[#FECD00] mb-1">{t.hours.title}</h4>
                 <p className="text-sm text-gray-300">{t.hours.value}</p>
               </div>
            </div>
          </div>

          {/* Right Column: Map Embed */}
          <div className="h-full min-h-[400px] lg:min-h-full bg-white p-2 rounded-3xl shadow-2xl border-4 border-white relative overflow-hidden group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.324505304313!2d79.8091809!3d11.9519541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5363d6b04a9e33%3A0x8e83f3e223b7548c!2sLawspet%2C%20Puducherry!5e0!3m2!1sen!2sin!4v1705480000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px", borderRadius: "1rem" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="npf Location"
              className="grayscale group-hover:grayscale-0 transition-all duration-500"
            ></iframe>

            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200">
                <p className="text-xs font-bold text-slate-500 uppercase">{t.locate}</p>
                <p className="text-sm font-black text-slate-900">{t.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
