import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/npf-logo.jpeg";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaArrowRight, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

// ✅ 1. Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { footerData } from "../../../data/Footer";

// --- Custom Vector Background (Abstract Network Grid) ---
const FooterNetworkBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#F59E0B" strokeWidth="1" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-grid)" />
    </svg>
  </div>
);

const Footer = () => {
  // ✅ 2. Get Language and Data
  const { language, t: navTranslations } = useLanguage();
  const f = footerData[language] || footerData['en'];
  const isTamil = language === 'ta';

  // Use translations from main file for consistency in menu naming
  const menuItems = [
    { name: navTranslations.nav.home, path: "/" },
    { name: navTranslations.nav.about, path: "/about" },
    { name: navTranslations.nav.gallery, path: "/gallery" },
    { name: navTranslations.nav.blog, path: "/blog" },
    { name: navTranslations.nav.contact, path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      link: "https://www.facebook.com/swaminathan1105",
      color: "hover:bg-[#1877F2]",
    },
    {
      name: "X (Twitter)",
      icon: <FaTwitter />,
      link: "https://x.com/c_pondy?t=kaIyholWlGDvDTB5xGFqQ&s=09",
      color: "hover:bg-black",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/c.s.swamynathan/",
      color: "hover:bg-[#E1306C]",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      link: "https://www.youtube.com/@swaminathan506",
      color: "hover:bg-[#FF0000]",
    },
  ];

  return (
    <footer className="relative bg-[#0F224A] text-white pt-20 pb-8 overflow-hidden border-t-[6px] border-[#F59E0B]">

      {/* Tamil Font Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&display=swap');
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      {/* Background Pattern */}
      <FooterNetworkBackground />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0F224A]/90 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* === 1. BRAND & DESCRIPTION === */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-start gap-4 group">
              <div className="bg-white p-1 rounded-full shrink-0">
                <img
                  src={Logo}
                  alt="npf Logo"
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div>
                <span className={`text-[#F59E0B] font-bold block mb-1 opacity-80 ${isTamil ? 'font-tamil text-xs' : 'text-[10px] uppercase tracking-[0.2em]'}`}>
                  {f.officialSite || "Official Website"}
                </span>
                <h2 className={`font-black text-2xl md:text-3xl leading-none text-white group-hover:text-[#F59E0B] transition-colors ${isTamil ? 'font-tamil' : 'uppercase tracking-tighter'}`}>
                  {navTranslations.nav.menuTitle}
                </h2>
                <p className={`text-sm text-gray-400 mt-1 font-medium ${isTamil ? 'font-tamil' : 'tracking-wide'}`}>
                  {f.subtitle}
                </p>
              </div>
            </Link>

            <p className={`text-gray-300 max-w-lg leading-relaxed border-l-4 border-[#F59E0B] pl-4 ${isTamil ? 'font-tamil text-sm' : 'text-sm'}`}>
              {f.description}
            </p>

            {/* Social Icons - Gold Hover */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 hover:text-white ${item.color}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* === 2. QUICK LINKS === */}
          <div>
            <h3 className={`text-xl font-bold mb-8 text-white flex items-center gap-2 ${isTamil ? 'font-tamil' : 'uppercase tracking-widest text-sm'}`}>
              <span className="w-8 h-[2px] bg-[#F59E0B]"></span> {f.quickLinksTitle}
            </h3>
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-3 text-gray-400 hover:text-[#F59E0B] transition-all hover:pl-2 ${isTamil ? 'font-tamil text-sm' : 'uppercase tracking-wide text-xs font-bold'}`}
                  >
                    <FaArrowRight className="text-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity text-[10px]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === 3. GET INVOLVED (Actions) === */}
          <div>
            <h3 className={`text-xl font-bold mb-8 text-white flex items-center gap-2 ${isTamil ? 'font-tamil' : 'uppercase tracking-widest text-sm'}`}>
              <span className="w-8 h-[2px] bg-[#F59E0B]"></span> {f.getInvolvedTitle}
            </h3>
            <p className={`text-gray-400 mb-6 leading-relaxed ${isTamil ? 'font-tamil text-sm' : 'text-xs'}`}>
              {f.getInvolvedDesc}
            </p>

            <div className="flex flex-col gap-4">
                {/* Primary Button: Solid Gold */}
                <Link
                to="/license"
                className={`block text-center bg-[#F59E0B] hover:bg-amber-400 text-[#0F224A] px-6 py-3.5 rounded font-bold transition hover:-translate-y-1 shadow-lg ${isTamil ? 'font-tamil text-sm' : 'uppercase tracking-widest text-xs'}`}
                >
                {f.memberBtn}
                </Link>

                {/* Secondary Button: Transparent White Border */}
                <Link
                to="/complaint"
                className={`block text-center border border-gray-600 hover:border-[#F59E0B] hover:text-[#F59E0B] text-gray-300 px-6 py-3.5 rounded font-bold transition ${isTamil ? 'font-tamil text-sm' : 'uppercase tracking-widest text-xs'}`}
                >
                {f.complaintBtn}
                </Link>
            </div>
          </div>
        </div>

        {/* === FOOTER BOTTOM === */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className={`text-gray-500 text-xs ${isTamil ? 'font-tamil' : 'uppercase tracking-wider'}`}>
            © {new Date().getFullYear()} <span className="text-white font-bold">NPF</span>. {f.allRights}
          </p>

          <p className={`text-gray-500 text-xs ${isTamil ? 'font-tamil' : ''}`}>
            {f.developedBy}{" "}
            <a
              href="https://bmtechx.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F59E0B] font-bold hover:text-white transition-colors uppercase tracking-wider"
            >
              BMTECHX.IN
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
