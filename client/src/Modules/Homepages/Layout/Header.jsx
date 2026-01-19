import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "../../../assets/npf-logo.jpeg";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageToggle from "../../language/LanguageToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToTop();
    } else {
      navigate("/");
      setTimeout(scrollToTop, 300);
    }
  };

  // ✅ DEFINE NAVIGATION STRUCTURE
  const navItems = ['Home', 'About', 'Get Involved', 'Gallery', 'Blog', 'Contact'];

  // ✅ Helper to handle Hash Links (Scrolling to section)
  const handleNavClick = (path) => {
    setIsMenuOpen(false); // Close mobile menu
    if (path.includes('#')) {
      // If it's a hash link (e.g., /about#team)
      const [route, hash] = path.split('#');
      navigate(route);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
      scrollToTop();
    }
  };

  return (
    <div className="w-full font-sans sticky top-0 z-50 shadow-lg">
      <nav className="w-full bg-[#0F224A] text-white px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between transition-all duration-300">

        {/* LOGO */}
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-white group-hover:scale-105 transition-transform">
            <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-tight group-hover:text-[#FACC15] transition-colors">
              {t.nav.menuTitle}
            </h1>
            <span className="text-sm text-gray-400 font-light group-hover:text-white transition-colors">
              {t.nav.menuSubtitle}
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            // Get translation key (convert 'Get Involved' -> 'getInvolved')
            const transKey = item === 'Get Involved' ? 'getInvolved' : item.toLowerCase();
            const label = t.nav[transKey];

            const isAbout = item === 'About';
            const isGetInvolved = item === 'Get Involved';

            // ✅ RENDER ABOUT DROPDOWN
            if (isAbout) {
              return (
                <div key={item} className="relative group">
                  <button
                    onClick={() => handleNavClick('/about')}
                    className="flex items-center gap-1 font-medium hover:text-[#FACC15] transition-colors py-2"
                  >
                    {label} <ChevronDown size={16} />
                  </button>

                  <div className="absolute top-full left-0 w-56 bg-white text-[#0F224A] shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border-t-4 border-[#FACC15]">
                    <button onClick={() => handleNavClick('/about#background')} className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium border-b border-gray-100">
                      {t.nav.aboutMenu.background}
                    </button>
                    <button onClick={() => handleNavClick('/about#vision')} className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium border-b border-gray-100">
                      {t.nav.aboutMenu.vision}
                    </button>
                    <button onClick={() => handleNavClick('/about#ideology')} className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium border-b border-gray-100">
                      {t.nav.aboutMenu.ideology}
                    </button>
                    <button onClick={() => handleNavClick('/about#team')} className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium rounded-b-lg">
                      {t.nav.aboutMenu.team}
                    </button>
                  </div>
                </div>
              );
            }

            // ✅ RENDER GET INVOLVED DROPDOWN (FIXED LINKS)
            if (isGetInvolved) {
              return (
                <div key={item} className="relative group">
                  <button
                    onClick={() => handleNavClick('/get-involved')}
                    className="flex items-center gap-1 font-medium hover:text-[#FACC15] transition-colors py-2"
                  >
                    {label} <ChevronDown size={16} />
                  </button>

                  <div className="absolute top-full left-0 w-48 bg-white text-[#0F224A] shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border-t-4 border-[#FACC15]">
                    {/* Fixed: Use #hash links to scroll to the cards on Get Involved page */}
                    <button onClick={() => handleNavClick('/get-involved#join')} className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium border-b border-gray-100">
                      {t.nav.getInvolvedMenu.join}
                    </button>
                    <button onClick={() => handleNavClick('/get-involved#volunteer')} className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium border-b border-gray-100">
                      {t.nav.getInvolvedMenu.volunteer}
                    </button>
                    <button onClick={() => handleNavClick('/get-involved#donate')} className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium rounded-b-lg">
                      {t.nav.getInvolvedMenu.donate}
                    </button>
                  </div>
                </div>
              );
            }

            // ✅ RENDER STANDARD LINKS
            return (
              <button
                key={item}
                onClick={() => handleNavClick(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
                className="font-medium hover:text-[#FACC15] transition-colors text-sm xl:text-base"
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* RIGHT SECTION (Toggle & Buttons) */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
             <LanguageToggle />
          </div>
          <button onClick={() => navigate("/license/download")} className="hidden md:block px-4 py-2 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 text-sm font-medium">
            {t.nav.downloadId}
          </button>
          <button onClick={() => navigate("/license")} className="hidden md:block bg-[#dc2626] hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all hover:-translate-y-1 text-sm md:text-base">
            {t.nav.joinUs}
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="p-1 hover:bg-white/10 rounded-md transition-colors lg:hidden">
            <Menu size={32} className="text-white" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <nav className="fixed inset-0 z-50 bg-white text-[#0F224A] flex flex-col overflow-y-auto">
           <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
              <span className="font-bold text-lg">{t.nav.menuTitle}</span>
              <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
           </div>

           <div className="flex flex-col p-6 gap-4 text-lg font-medium">
              <div className="mb-4 flex justify-center"><LanguageToggle /></div>

              {navItems.map((item) => {
                 const transKey = item === 'Get Involved' ? 'getInvolved' : item.toLowerCase();
                 const label = t.nav[transKey];

                 // ✅ Mobile Dropdown: Get Involved (FIXED LINKS)
                 if (item === 'Get Involved') {
                   return (
                     <div key={item} className="flex flex-col gap-2">
                        <button onClick={() => handleNavClick('/get-involved')} className="text-left font-bold text-[#FACC15]">
                          {label}
                        </button>
                        <div className="pl-6 flex flex-col gap-3 text-base text-gray-600 border-l-2 border-gray-200 ml-2">
                           <button onClick={() => handleNavClick('/get-involved#join')} className="text-left hover:text-blue-600">{t.nav.getInvolvedMenu.join}</button>
                           <button onClick={() => handleNavClick('/get-involved#volunteer')} className="text-left hover:text-blue-600">{t.nav.getInvolvedMenu.volunteer}</button>
                           <button onClick={() => handleNavClick('/get-involved#donate')} className="text-left hover:text-blue-600">{t.nav.getInvolvedMenu.donate}</button>
                        </div>
                     </div>
                   );
                 }

                 // Mobile Dropdown: About
                 if (item === 'About') {
                   return (
                     <div key={item} className="flex flex-col gap-2">
                        <button onClick={() => handleNavClick('/about')} className="text-left font-bold text-[#FACC15]">
                          {label}
                        </button>
                        <div className="pl-6 flex flex-col gap-3 text-base text-gray-600 border-l-2 border-gray-200 ml-2">
                           <button onClick={() => handleNavClick('/about#background')} className="text-left hover:text-blue-600">{t.nav.aboutMenu.background}</button>
                           <button onClick={() => handleNavClick('/about#vision')} className="text-left hover:text-blue-600">{t.nav.aboutMenu.vision}</button>
                           <button onClick={() => handleNavClick('/about#ideology')} className="text-left hover:text-blue-600">{t.nav.aboutMenu.ideology}</button>
                           <button onClick={() => handleNavClick('/about#team')} className="text-left hover:text-blue-600">{t.nav.aboutMenu.team}</button>
                        </div>
                     </div>
                   );
                 }

                 return (
                    <button key={item} onClick={() => handleNavClick(item === "Home" ? "/" : `/${item.toLowerCase()}`)} className="text-left hover:text-blue-700 border-b border-gray-100 pb-2">
                      {label}
                    </button>
                 )
              })}
           </div>
        </nav>
      )}
    </div>
  );
};

export default Header;
