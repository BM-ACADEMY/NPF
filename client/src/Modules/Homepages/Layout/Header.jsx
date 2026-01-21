import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Download, ArrowRight } from "lucide-react";
import Logo from "../../../assets/npf-logo.jpeg";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageToggle from "../../language/LanguageToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();

  const isTamil = language === 'ta';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path) => {
    setIsMenuOpen(false);
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      navigate(route);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const navItems = ['Home', 'About', 'Our Team', 'Gallery', 'Blog', 'Contact'];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700;900&display=swap');

          .font-npf-reference { font-family: 'Inter', sans-serif; }
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      <header
        className={`w-full font-npf-reference sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-md py-0" : "border-b border-gray-100 py-0"
        }`}
      >
        {/* --- Top Accent Bar --- */}
        <div className="h-1.5 w-full flex">
          <div className="w-1/2 bg-[#0024f8]"></div>
          <div className="w-1/2 bg-[#ff0000]"></div>
        </div>

        {/* --- Adjusted Container Padding for Tamil --- */}
        <div className={`container mx-auto flex items-center justify-between py-3 lg:py-4 transition-all duration-300 ${
          isTamil ? "px-2 md:px-4 lg:px-6 xl:px-8" : "px-4 md:px-6 lg:px-8 xl:px-16"
        }`}>

          {/* === LOGO SECTION: Forced No-Wrap === */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group flex-nowrap shrink-0">
             <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden bg-gray-50 rounded-full border-2 border-[#f0f0f0] shadow-sm flex-shrink-0">
                <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
             </div>

             <div className="flex flex-col justify-center min-w-fit">
                <h1 className={`font-black text-[#1a2b48] leading-tight ${
                    isTamil ? "font-tamil text-[11px] md:text-sm" : "text-base md:text-xl uppercase tracking-tighter"
                  }`}
                >
                  {isTamil ? (
                    <div className="flex flex-col">
                        <span>தேசிய மக்கள் முன்னணி</span>
                    </div>
                  ) : (
                    t.nav.menuTitle
                  )}
                </h1>
                <span className={`font-black text-[#0024f8] ${
                    isTamil ? "font-tamil text-[8px] md:text-[9px] mt-0.5" : "text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-0.5"
                  }`}
                >
                  {t.nav.menuSubtitle || "Visionary Leader"}
                </span>
             </div>
          </Link>

          {/* === DESKTOP NAVIGATION === */}
          <div className="hidden lg:flex items-center h-full">
              <div className={`flex items-center ${isTamil ? "gap-2 xl:gap-4 px-2 xl:px-4" : "gap-4 xl:gap-8 px-4 xl:px-8"}`}>
                  {navItems.map((item) => {
                     const transKey = item === 'Our Team' ? 'Ourteam' : item.toLowerCase();
                     const label = t.nav[transKey];
                     const isActive = location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`);

                     const linkStyle = isTamil
                        ? `font-tamil text-[11px] xl:text-[13px] font-black whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#0024f8]' : 'text-[#1a2b48] hover:text-[#ff0000]'}`
                        : `lg:text-[10px] xl:text-xs font-black uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-[#0024f8]' : 'text-[#1a2b48] hover:text-[#ff0000]'}`;

                     if (item === 'About' || item === 'Our Team') {
                        return (
                          <div key={item} className="relative group py-4 flex items-center">
                             <button className={`${linkStyle} flex items-center gap-1`}>
                                {label} <ChevronDown size={isTamil ? 12 : 12} strokeWidth={isTamil ? 3 : 4} />
                             </button>

                             <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-xl border-t-[4px] border-[#0024f8] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all rounded-b-lg p-1.5 z-50">
                                {(item === 'About' ? ['background', 'vision', 'philosophy'] : ['executivecommittee', 'general', 'action']).map((sub) => (
                                   <button
                                      key={sub}
                                      onClick={() => handleNavClick(item === 'About' ? `/about#${sub}` : `/our-team#${sub}`)}
                                      className={`block w-full text-left px-4 py-2 rounded hover:bg-[#f0f0f0] text-[#1a2b48] ${isTamil ? "font-tamil text-xs font-black" : "text-[10px] font-black uppercase"}`}
                                   >
                                      {item === 'About' ? t.nav.aboutMenu[sub] : t.nav.OurteamMenu[sub]}
                                   </button>
                                ))}
                             </div>
                          </div>
                        )
                     }

                     return (
                        <button key={item} onClick={() => handleNavClick(item === 'Home' ? '/' : `/${item.toLowerCase()}`)} className={linkStyle}>
                           {label}
                        </button>
                     );
                  })}
              </div>

              {/* ACTION AREA: Toggle LAST */}
              <div className="flex items-center gap-2 xl:gap-4 pl-2">

                 <button
                    onClick={() => navigate("/license")}
                    className={`bg-[#1a2b48] hover:bg-[#0024f8] text-white rounded shadow transition-all duration-300 flex items-center gap-2 group whitespace-nowrap ${
                      isTamil ? "px-3 py-1.5 text-[11px] font-black" : "px-4 py-2.5 text-[10px] font-black uppercase"
                    }`}
                  >
                    <span>{t.nav.joinUs}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                  </button>

                 <div className="scale-90 xl:scale-95 border-l border-gray-100 pl-2">
                    <LanguageToggle />
                 </div>
              </div>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-[#1a2b48]">
             <Menu size={32} />
          </button>
        </div>

        {/* === MOBILE OVERLAY === */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] flex justify-end">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
             <div className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col">
                <div className="h-1.5 w-full flex"><div className="w-1/2 bg-[#0024f8]"></div><div className="w-1/2 bg-[#ff0000]"></div></div>
                <div className="p-6 flex justify-between items-center border-b"><span className="font-black text-[#1a2b48] uppercase text-sm">Menu</span><button onClick={() => setIsMenuOpen(false)}><X size={28} /></button></div>
                <div className="flex flex-col p-6 gap-5">
                   {navItems.map((item) => (
                      <button key={item} onClick={() => handleNavClick(item === 'Home' ? '/' : `/${item.toLowerCase()}`)} className={`text-xl font-black text-[#1a2b48] text-left border-b border-gray-50 pb-4 ${isTamil ? 'font-tamil' : 'uppercase'}`}>
                        {t.nav[item === 'Our Team' ? 'Ourteam' : item.toLowerCase()]}
                      </button>
                   ))}
                   <div className="mt-8 flex flex-col gap-4">
                      <button onClick={() => navigate("/license")} className="w-full bg-[#1a2b48] text-white py-4 rounded-xl font-black uppercase text-xs">{t.nav.joinUs}</button>
                      <div className="flex justify-center mt-4"><LanguageToggle /></div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
