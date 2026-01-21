import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import Logo from "../../../assets/npf-logo.jpeg";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageToggle from "../../language/LanguageToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = window.innerWidth < 1024 ? 15 : 40;

      if (currentScrollY < threshold) {
        setIsCompact(false);
      } else if (currentScrollY > lastScrollY.current) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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

          .header-main {
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
            will-change: transform;
          }

          .header-compact {
            transform: translateY(-140px);
          }

          @media (max-width: 1023px) {
            .header-compact { transform: translateY(-105px); }
          }
        `}
      </style>

      <div className="h-[145px] lg:h-[185px] bg-transparent" />

      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white header-main ${
          isCompact ? "header-compact shadow-2xl" : "shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="h-1.5 w-full flex">
          <div className="w-1/2 bg-[#0024f8]"></div>
          <div className="w-1/2 bg-[#ff0000]"></div>
        </div>

        {/* --- ROW 1: FULL BRANDING --- */}
        <div className="container mx-auto px-4 lg:px-16 py-5 lg:py-7">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 overflow-hidden bg-white rounded-full border-2 border-[#f0f0f0] shadow-sm">
                <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <h1 className={`font-black text-[#1a2b48] leading-tight ${isTamil ? "font-tamil text-sm md:text-lg" : "text-sm md:text-2xl uppercase tracking-tighter"}`}>
                  {isTamil ? "தேசிய மக்கள் முன்னணி" : t.nav.menuTitle}
                </h1>
                <span className={`font-black text-[#0024f8] ${isTamil ? "font-tamil text-[10px] md:text-xs" : "text-[10px] md:text-xs uppercase tracking-[0.3em] mt-0.5"}`}>
                  {t.nav.menuSubtitle || "Visionary Leader"}
                </span>
              </div>
            </Link>
            <div className="hidden lg:block">
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* --- ROW 2: NAV & COMPACT BRANDING --- */}
        <div className="border-t border-gray-100 bg-white/95 backdrop-blur-md">
          <div className="container mx-auto px-4 lg:px-16 flex items-center justify-between py-3 lg:py-3">

            <div className={`flex items-center gap-3 transition-all duration-500 ${isCompact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}>
               <img src={Logo} alt="Logo" className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-gray-100 shadow-md" />
               <div className="flex flex-col">
                  <h2 className={`font-black text-[#1a2b48] leading-none ${isTamil ? "font-tamil text-xs md:text-sm" : "text-xs md:text-base uppercase tracking-tighter"}`}>
                    <span className="hidden lg:block">{isTamil ? "தேசிய மக்கள் முன்னணி" : t.nav.menuTitle}</span>
                    <span className="block lg:hidden">{isTamil ? "தேமமு" : "NPF"}</span>
                  </h2>
               </div>
            </div>

            <nav className={`hidden lg:flex items-center space-x-2 transition-all duration-500 ${isCompact ? "ml-auto mr-8" : ""}`}>
              {navItems.map((item) => {
                const transKey = item === 'Our Team' ? 'Ourteam' : item.toLowerCase();
                const label = t.nav[transKey];
                const isActive = location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`);

                const linkStyle = isTamil
                  ? `px-4 py-2 font-tamil text-[14px] font-black transition-all duration-300 border-b-2 ${isActive ? 'text-[#ff0000] border-[#ff0000]' : 'text-[#1a2b48] border-transparent hover:text-[#ff0000]'}`
                  : `px-4 py-2 text-[12px] font-black uppercase tracking-widest transition-all duration-300 border-b-2 ${isActive ? 'text-[#ff0000] border-[#ff0000]' : 'text-[#1a2b48] border-transparent hover:text-[#ff0000]'}`;

                if (item === 'About' || item === 'Our Team') {
                  return (
                    <div key={item} className="relative group flex items-center">
                      <button className={`${linkStyle} flex items-center gap-1`}>
                        {label} <ChevronDown size={16} strokeWidth={3} className="group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      <div className="absolute top-full left-0 w-56 bg-white shadow-2xl border-t-[4px] border-[#0024f8] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 z-[100] rounded-b-lg">
                        {(item === 'About' ? ['background', 'vision', 'philosophy'] : ['executivecommittee', 'general', 'action']).map((sub) => (
                          <button
                            key={sub}
                            onClick={() => handleNavClick(item === 'About' ? `/about#${sub}` : `/our-team#${sub}`)}
                            className={`block w-full text-left px-4 py-3 rounded hover:bg-gray-50 text-[#1a2b48] transition-colors ${isTamil ? "font-tamil text-sm font-black" : "text-[11px] font-black uppercase tracking-wider"}`}
                          >
                            {item === 'About' ? t.nav.aboutMenu[sub] : t.nav.OurteamMenu[sub]}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <button key={item} onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)} className={linkStyle}>
                    {label}
                  </button>
                );
              })}
            </nav>

            {/* ACTION AREA (Button hidden on md/sm screens) */}
            <div className="flex items-center gap-3 md:gap-5 ml-auto lg:ml-0">
              {isCompact && <div className="hidden lg:block scale-100"><LanguageToggle /></div>}

              {/* FIXED: Removed from md screens using 'hidden lg:flex' */}
              <button
                onClick={() => navigate("/license")}
                className="hidden lg:flex bg-[#ff0000] text-white px-5 lg:px-8 py-3 rounded-sm font-black uppercase text-[11px] lg:text-[12px] tracking-widest shadow-xl hover:bg-[#0024f8] transition-all items-center gap-2 group shrink-0"
              >
                <span className={isTamil ? "font-tamil" : ""}>{t.nav.joinUs}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-[#1a2b48]">
                <Menu size={36} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE OVERLAY (Join Us remains here for mobile users) --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col">
             <div className="p-6 flex justify-between items-center border-b">
               <span className="font-black text-[#1a2b48] uppercase text-sm">Menu</span>
               <button onClick={() => setIsMenuOpen(false)}><X size={28} /></button>
             </div>
             <div className="flex flex-col p-6 gap-2 overflow-y-auto">
                {navItems.map((item) => (
                   <button
                     key={item}
                     onClick={() => {navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`); setIsMenuOpen(false)}}
                     className={`text-xl font-black text-[#1a2b48] text-left border-b border-gray-50 py-4 ${isTamil ? 'font-tamil' : 'uppercase'}`}
                   >
                     {t.nav[item === 'Our Team' ? 'Ourteam' : item.toLowerCase()]}
                   </button>
                ))}
                <div className="mt-8 flex flex-col gap-4">
                   <button onClick={() => navigate("/license")} className="w-full bg-[#1a2b48] text-white py-4 rounded-xl font-black text-xs uppercase">
                     {t.nav.joinUs}
                   </button>
                   <div className="flex justify-center mt-4"><LanguageToggle /></div>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
