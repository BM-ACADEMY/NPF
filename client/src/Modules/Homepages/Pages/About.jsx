import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from "../../../context/LanguageContext";
import { aboutData } from "../../../data/About/about";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// ✅ IMAGES
import PutsfBg from "../../../assets/putsf3.jpg";
import MissionImg from "../../../assets/mission.jpg";
import PoliticalIdeology from './PoliticalIdeology';

const BackgroundImg = PutsfBg;
const VisionImg = MissionImg;
const PhilosophyImg = "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1000&auto=format&fit=crop";

const About = () => {
  const { language } = useLanguage();
  const t = aboutData[language] || aboutData['en'];
  const location = useLocation();
  const isTamil = language === 'ta';

  const mainContainerRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          gsap.to(window, { duration: 1, scrollTo: element, ease: "power2.out" });
        }, 100);
      }
    }
  }, [location]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Royal Blue Active Line (Matches Hero Blue #0024f8)
      gsap.fromTo(lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          }
        }
      );

      itemsRef.current.forEach((el) => {
        if (!el) return;
        const marker = el.querySelector('.timeline-marker');
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          toggleClass: { targets: marker, className: "active-marker" },
        });
      });
    }, mainContainerRef);
    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const TimelineItem = ({ id, title, content, image, align = "right" }) => {
    const isRight = align === "right";

    return (
      <div id={id} ref={addToRefs} className="relative w-full flex flex-col md:flex-row items-center scroll-mt-24 py-16 md:py-32">

        {/* LEFT SECTION */}
        <div className={`w-full md:w-1/2 px-6 md:px-16 ${isRight ? 'order-2 md:order-1' : 'order-2 md:order-1 text-left md:text-right'}`}>
          {isRight ? (
            <div className="timeline-img overflow-hidden rounded-xl shadow-lg border-2 border-white relative z-10">
               <img src={image} alt={title} className="w-full h-64 md:h-80 object-cover" />
            </div>
          ) : (
            <div className="timeline-content">
              {/* Title: Royal Blue (#0024f8) with Black Weight (900) */}
              <h2 className={`text-3xl md:text-5xl font-black text-[#0024f8] mb-6 inline-block relative ${isTamil ? 'font-tamil' : 'tracking-tighter uppercase leading-none'}`}>
                {title}
              </h2>
              {/* Description: Navy Text (#1a2b48) */}
              <div className={`text-[#1a2b48] opacity-90 text-lg leading-relaxed space-y-4 font-medium ${isTamil ? 'font-tamil' : ''}`}>
                {content?.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
          )}
        </div>

        {/* Center Marker: Anchored by Royal Blue line */}
        <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 z-20 order-1 md:order-2">
            <div className="timeline-marker w-4 h-4 bg-gray-200 transition-all duration-300 shadow-sm"></div>
        </div>

        {/* RIGHT SECTION */}
        <div className={`w-full md:w-1/2 px-6 md:px-16 ${isRight ? 'order-2 md:order-3' : 'order-2 md:order-3'}`}>
          {isRight ? (
            <div className="timeline-content">
              <h2 className={`text-3xl md:text-5xl font-black text-[#0024f8] mb-6 inline-block relative ${isTamil ? 'font-tamil' : 'tracking-tighter uppercase leading-none'}`}>
                {title}
              </h2>
              <div className={`text-[#1a2b48] opacity-90 text-lg leading-relaxed space-y-4 text-justify font-medium ${isTamil ? 'font-tamil' : ''}`}>
                {content?.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
          ) : (
            <div className="timeline-img overflow-hidden rounded-xl shadow-lg border-2 border-white relative z-10">
               <img src={image} alt={title} className="w-full h-64 md:h-80 object-cover" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    /* Background: Set to Hero's #f0f0f0 */
    <div className="w-full bg-[#f0f0f0] font-npf-reference pb-20">

      <style>{`
        /* Import Inter and Noto Sans Tamil exactly as in Hero */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800;900&display=swap');

        .font-npf-reference { font-family: 'Inter', sans-serif; }
        .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }

        .active-marker {
          background-color: #0024f8 !important; /* Royal Blue from Hero */
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(0, 36, 248, 0.2);
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="pt-32 pb-16 text-center">
        <span className={`text-[#ff0000] font-black tracking-[0.3em] uppercase text-xs mb-3 block ${isTamil ? 'font-tamil' : ''}`}>
          Perspective
        </span>
        {/* Title: Navy (#1a2b48) with Black Weight */}
        <h1 className={`text-4xl md:text-7xl font-black text-[#0024f8] uppercase tracking-tighter ${isTamil ? 'font-tamil' : ''}`}>
          {t.title}
        </h1>
      </div>

      <div ref={mainContainerRef} className="relative container mx-auto px-4 py-10">
        {/* Base Timeline Track */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-gray-200 -translate-x-1/2 z-0"></div>

        {/* Active Timeline Track (Royal Blue #0024f8) */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 w-[3px] bg-[#0024f8] -translate-x-1/2 z-0 origin-top"
          style={{ height: "0%" }}
        ></div>

        <TimelineItem id="background" title={t.background.title} content={t.background.content} image={BackgroundImg} align="right" />
        <TimelineItem id="vision" title={t.vision.title} content={t.vision.content} image={VisionImg} align="left" />
        <TimelineItem id="philosophy" title={t.philosophy.title} content={t.philosophy.content} image={PhilosophyImg} align="right" />
      </div>

      <PoliticalIdeology />
    </div>
  );
};

export default About;
