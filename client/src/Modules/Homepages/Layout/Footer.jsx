import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/npf-logo.jpeg";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
// ✅ 1. Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { footerData } from "../../../data/Footer";

const Footer = () => {
  // ✅ 2. Get Language and Data
  const { language, t: navTranslations } = useLanguage();
  const f = footerData[language] || footerData['en'];

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
      hover: "hover:bg-[#1877F2]",
    },
    {
      name: "X (Twitter)",
      icon: <FaTwitter />,
      link: "https://x.com/c_pondy?t=kaIyholWlGDvDTB5xGFqQ&s=09",
      hover: "hover:bg-black",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/c.s.swamynathan/",
      hover: "hover:bg-[#E1306C]",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      link: "https://www.youtube.com/@swaminathan506",
      hover: "hover:bg-[#FF0000]",
    },
  ];

  return (
    <footer className="relative bg-[#0f172a] text-white pt-20 pb-10 overflow-hidden border-t-[6px] border-[#dc2626]">

      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="bg-white p-1 rounded-full">
                <img
                  src={Logo}
                  alt="npf Logo"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain"
                />
              </div>
              <div>
                <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">
                  {f.officialSite}
                </span>
                <h2 className="font-black text-xl md:text-2xl group-hover:text-[#3b82f6] transition">
                  {navTranslations.nav.menuTitle}
                </h2>
                <p className="text-sm text-gray-300">
                  {f.subtitle}
                </p>
              </div>
            </Link>

            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              {f.description}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 ${item.hover}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-[#0056b3] pl-3 uppercase">
              {f.quickLinksTitle}
            </h3>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all flex items-center gap-2"
                  >
                    <span className="text-[#dc2626] text-xs">➤</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-[#dc2626] pl-3 uppercase">
              {f.getInvolvedTitle}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {f.getInvolvedDesc}
            </p>

            <Link
              to="/license"
              className="block text-center bg-[#dc2626] hover:bg-[#b91c1c] px-6 py-3 rounded-lg font-bold uppercase text-sm transition hover:-translate-y-1"
            >
              {f.memberBtn}
            </Link>

            <Link
              to="/complaint"
              className="block mt-3 text-center border border-slate-600 hover:border-white px-6 py-3 rounded-lg font-bold uppercase text-sm text-gray-300 hover:text-white transition"
            >
              {f.complaintBtn}
            </Link>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="text-white font-semibold">npf</span>.
            {f.allRights}
            <br />
            {f.developedBy}{" "}
            <a
              href="https://bmtechx.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dc2626] font-bold hover:text-white underline-offset-4 hover:underline"
            >
              bmtechx.in
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
