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
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&display=swap');
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      <header
        className={`w-full font-sans sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-md py-2" : "border-b border-gray-100 py-3 lg:py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-16 flex items-center justify-between">

          {/* === LOGO SECTION === */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
             <div className="w-9 h-9 md:w-12 md:h-12 overflow-hidden bg-gray-50 rounded-full border border-gray-100 flex-shrink-0">
                <img src={Logo} alt="Logo" className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
             </div>

             <div className="flex flex-col justify-center">
                <h1 className={`font-extrabold text-[#0F224A] ${
                    isTamil
                      ? "font-tamil text-sm md:text-[15px] leading-tight tracking-normal"
                      : "text-base md:text-xl uppercase tracking-tight leading-none"
                  }`}
                >
                  {isTamil ? (
                    <div className="flex flex-col">
                        <span>தேசிய மக்கள்</span>
                        <span>முன்னணி</span>
                    </div>
                  ) : (
                    t.nav.menuTitle
                  )}
                </h1>

                <span className={`font-bold text-[#D4AF37] ${
                    isTamil
                      ? "font-tamil text-[9px] md:text-[10px] tracking-wide mt-0.5"
                      : "text-[9px] md:text-[10px] uppercase tracking-[0.15em] mt-0.5"
                  }`}
                >
                  {t.nav.menuSubtitle}
                </span>
             </div>
          </Link>

          {/* === DESKTOP NAVIGATION (Visible on LG screens and up) === */}
          <div className="hidden lg:flex items-center h-full">

              {/* Nav Links: Adaptive spacing (gap-4 on laptop, gap-8 on desktop) */}
              <div className="flex items-center gap-4 xl:gap-8 px-4 xl:px-8">
                  {navItems.map((item) => {
                     const transKey = item === 'Our Team' ? 'Ourteam' : item.toLowerCase();
                     const label = t.nav[transKey];
                     const isActive = location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`);

                     // Responsive Font Sizes: Slightly smaller on Laptop (LG), Normal on Desktop (XL)
                     const linkStyle = isTamil
                        ? `font-tamil lg:text-[13px] xl:text-[15px] font-bold tracking-normal transition-colors duration-300 ${isActive ? 'text-[#0F224A]' : 'text-gray-600 hover:text-[#D4AF37]'}`
                        : `lg:text-[10px] xl:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-[#0F224A]' : 'text-gray-500 hover:text-[#D4AF37]'}`;

                     if (item === 'About' || item === 'Our Team') {
                        return (
                          <div key={item} className="relative group py-4 flex items-center">
                             <button className={`${linkStyle} flex items-center gap-1`}>
                                {label} <ChevronDown size={isTamil ? 14 : 12} strokeWidth={isTamil ? 2.5 : 3} className="opacity-70"/>
                             </button>

                             {/* Dropdown - Adjusted z-index and padding */}
                             <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 xl:w-52 bg-white shadow-xl border-t-[3px] border-[#D4AF37] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 rounded-b-lg p-1.5 z-50">
                                {(item === 'About' ? ['background', 'vision', 'philosophy'] : ['executivecommittee', 'general', 'action']).map((sub) => (
                                   <button
                                      key={sub}
                                      onClick={() => handleNavClick(item === 'About' ? `/about#${sub}` : `/our-team#${sub}`)}
                                      className={`block w-full text-left px-4 py-2.5 rounded hover:bg-gray-50 text-gray-600 hover:text-[#0F224A] ${
                                        isTamil
                                          ? "font-tamil text-sm font-semibold"
                                          : "text-xs font-bold uppercase tracking-wide"
                                      }`}
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

              {/* Vertical Divider */}
              <div className="h-6 xl:h-8 w-[1px] bg-gray-200 mx-2"></div>

              {/* Actions Area */}
              <div className="flex items-center gap-3 xl:gap-5 pl-4 xl:pl-6">
                 {/* Scale down toggle slightly on laptops */}
                 <div className="scale-95 xl:scale-100">
                    <LanguageToggle />
                 </div>

                 {/* Tooltip Download Button */}
                 <button
                    onClick={() => navigate("/license/download")}
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-[#0F224A] hover:bg-gray-50 transition-all"
                 >
                    <Download size={20} />
                    <div className="absolute top-full mt-2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 left-1/2 -translate-x-1/2">
                       {t.nav.downloadId || "ID Card"}
                       <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                    </div>
                 </button>

                 {/* Join Us: Compact padding on laptop, Full on desktop */}
                 <button
                    onClick={() => navigate("/license")}
                    className={`flex-shrink-0 bg-[#0F224A] hover:bg-[#153066] text-white rounded shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 group whitespace-nowrap ${
                      isTamil
                        ? "font-tamil px-4 xl:px-5 py-2 text-sm font-bold tracking-wide"
                        : "px-4 xl:px-6 py-2.5 text-[10px] xl:text-xs font-bold uppercase tracking-widest"
                    }`}
                 >
                    <span className="relative top-[1px]">{t.nav.joinUs}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                 </button>
              </div>
          </div>

          {/* === MOBILE HAMBURGER (Visible below LG screens) === */}
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 -mr-2 text-[#0F224A]">
             <Menu size={28} />
          </button>

        </div>

        {/* === MOBILE MENU OVERLAY === */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] flex justify-end">
             {/* Backdrop */}
             <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>

             {/* Drawer Container */}
             <div className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col overflow-y-auto animate-slideInRight">

                {/* Mobile Header */}
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                   <span className={`font-bold text-[#0F224A] ${isTamil ? 'font-tamil text-lg' : 'uppercase tracking-widest'}`}>Menu</span>
                   <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"><X size={24} /></button>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col p-6 gap-5">
                   {navItems.map((item) => {
                      const transKey = item === 'Our Team' ? 'Ourteam' : item.toLowerCase();
                      return (
                         <button
                            key={item}
                            onClick={() => handleNavClick(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
                            className={`text-lg font-bold text-[#0F224A] text-left border-b border-gray-50 pb-3 hover:pl-2 transition-all ${isTamil ? 'font-tamil' : 'uppercase tracking-wide text-base'}`}
                         >
                            {t.nav[transKey]}
                         </button>
                      )
                   })}

                   {/* Mobile Actions */}
                   <div className="mt-6 flex flex-col gap-4">
                      <div className="flex justify-center mb-2">
                         <LanguageToggle />
                      </div>
                      <button onClick={() => navigate("/license")} className={`w-full bg-[#0F224A] text-white py-3.5 rounded-lg shadow-lg font-bold ${isTamil ? 'font-tamil' : 'uppercase tracking-widest text-xs'}`}>
                         {t.nav.joinUs}
                      </button>
                      <button onClick={() => navigate("/license/download")} className={`w-full border border-gray-200 text-gray-500 py-3.5 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-gray-50 ${isTamil ? 'font-tamil' : 'uppercase tracking-widest text-xs'}`}>
                         <Download size={18}/> {t.nav.downloadId}
                      </button>
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
