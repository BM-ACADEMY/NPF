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
import MissionImg from "../../../assets/mission.jpg"; // <--- Import your local image here
import PoliticalIdeology from './PoliticalIdeology';
const BackgroundImg = PutsfBg;
const VisionImg = MissionImg; // <--- Use the imported variable here
const PhilosophyImg = "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1000&auto=format&fit=crop";

const About = () => {
  const { language } = useLanguage();
  const t = aboutData[language] || aboutData['en'];
  const location = useLocation();

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

      // 1. ANIMATE THE NAVY CENTER LINE
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

      // 2. ANIMATE ITEMS & SQUARE MARKERS
      itemsRef.current.forEach((el) => {
        if (!el) return;
        const content = el.querySelector('.timeline-content');
        const marker = el.querySelector('.timeline-marker');
        const img = el.querySelector('.timeline-img');

        // Content Fade In
        gsap.fromTo([content, img],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Marker Activation (Solid Square Activation)
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          toggleClass: { targets: marker, className: "active-marker" },
          onEnter: () => gsap.to(marker, { scale: 1.1, duration: 0.2 }),
          onLeave: () => gsap.to(marker, { scale: 1, duration: 0.2 }),
          onEnterBack: () => gsap.to(marker, { scale: 1.1, duration: 0.2 }),
          onLeaveBack: () => gsap.to(marker, { scale: 1, duration: 0.2 }),
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

        {/* LEFT */}
        <div className={`w-full md:w-1/2 px-6 md:px-16 ${isRight ? 'order-2 md:order-1' : 'order-2 md:order-1 text-left md:text-right'}`}>
          {isRight ? (
            <div className="timeline-img overflow-hidden rounded-xl shadow-lg border-2 border-gray-100 relative z-10">
               {/* Removed grayscale classes here */}
               <img src={image} alt={title} className="w-full h-64 md:h-80 object-cover transition-all duration-500" />
            </div>
          ) : (
            <div className="timeline-content">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b4b] mb-4 inline-block relative">{title}</h2>
              <div className="text-slate-500 text-lg leading-relaxed space-y-4">{content?.map((para, i) => <p key={i}>{para}</p>)}</div>
            </div>
          )}
        </div>

        {/* CENTER SQUARE MARKER */}
        <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 z-20 order-1 md:order-2">
            <div className="timeline-marker w-4 h-4 bg-[#cbd5e1] transition-all duration-300 shadow-sm"></div>
        </div>

        {/* RIGHT */}
        <div className={`w-full md:w-1/2 px-6 md:px-16 ${isRight ? 'order-2 md:order-3' : 'order-2 md:order-3'}`}>
          {isRight ? (
            <div className="timeline-content">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b4b] mb-4 inline-block relative">{title}</h2>
              <div className="text-slate-500 text-lg leading-relaxed space-y-4 text-justify">{content?.map((para, i) => <p key={i}>{para}</p>)}</div>
            </div>
          ) : (
            <div className="timeline-img overflow-hidden rounded-xl shadow-lg border-2 border-gray-100 relative z-10">
               {/* Removed grayscale classes here */}
               <img src={image} alt={title} className="w-full h-64 md:h-80 object-cover transition-all duration-500" />
            </div>
          )}
        </div>

      </div>
    );
  };

  return (
    <div className="w-full bg-white font-sans selection:bg-[#1a2b4b] selection:text-white pb-20">

      {/* --- CSS FOR THE PROFESSIONAL LINE DESIGN --- */}
      <style>{`
        /* The active solid square from your reference image */
        .active-marker {
          background-color: #1a2b4b !important; /* Dark Navy Square */
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(26, 43, 75, 0.2);
        }
      `}</style>

      {/* HEADER */}
      <div className="pt-24 pb-16 text-center bg-white border-b border-gray-100">
        <span className="text-[#FACC15] font-bold tracking-widest uppercase text-xs mb-3 block">Perspective</span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a2b4b]">{t.title}</h1>
      </div>

      {/* TIMELINE CONTAINER */}
      <div ref={mainContainerRef} className="relative container mx-auto px-4 py-10">

        {/* 1. Base Track (Light Gray Line from your image) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-[#f1f5f9] -translate-x-1/2 z-0"></div>

        {/* 2. GSAP Animated Navy Line (Active Track) */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 w-[3px] bg-[#1a2b4b] -translate-x-1/2 z-0 origin-top"
          style={{ height: "0%" }}
        ></div>

        <TimelineItem id="background" title={t.background.title} content={t.background.content} image={BackgroundImg} align="right" />
        <TimelineItem id="vision" title={t.vision.title} content={t.vision.content} image={VisionImg} align="left" />
        <TimelineItem id="philosophy" title={t.philosophy.title} content={t.philosophy.content} image={PhilosophyImg} align="right" />

      </div>
      {/* NEW SECTION ADDDED HERE */}
      <PoliticalIdeology />

    </div>
  );
};

export default About;
