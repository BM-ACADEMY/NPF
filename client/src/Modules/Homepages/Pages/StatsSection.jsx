import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import { statsData } from "../../../data/stats";

const StatsSection = () => {
  const { language } = useLanguage();
  const rawData = statsData[language] || statsData["en"];

  // Reordering data to ensure "Students" is in the 2nd position
  const data = [
    rawData.find(d => d.id === 1), // Party Members
    rawData.find(d => d.id === 4), // Students (Moved to 2nd)
    rawData.find(d => d.id === 2), // Years of Service
    rawData.find(d => d.id === 3), // Successful Campaigns
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-white overflow-hidden border-y border-slate-100"
    >
      {/* --- SIMPLE SQUARE GRID VECTOR (Updated with Brand Blue tint) --- */}
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0024f8 1px, transparent 1px),
            linear-gradient(to bottom, #0024f8 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              /* Hover effect updated to Brand Navy */
              className="group relative flex flex-col items-center justify-center p-10
                         bg-white border border-slate-100 rounded-xl transition-all duration-300
                         hover:bg-[#1a2b4b] hover:shadow-xl hover:-translate-y-1 cursor-default"
            >
              {/* Stat Value - Updated to Brand Blue */}
              <div className="text-4xl md:text-5xl font-black text-[#0024f8] group-hover:text-white transition-colors duration-300 flex items-baseline gap-1">
                {inView ? (
                  <CountUp start={0} end={stat.value} duration={2} separator="," />
                ) : (
                  "0"
                )}
                {/* Suffix updated to Brand Blue */}
                <span className="text-lg font-bold text-[#0024f8] group-hover:text-white transition-colors duration-300 opacity-80">
                  {stat.suffix}
                </span>
              </div>

              {/* Minimal Divider matching Brand Blue */}
              <div className="w-10 h-1 bg-[#0024f8] group-hover:bg-white my-5 rounded-full transition-all duration-300 group-hover:w-16"></div>

              {/* Label matching Navy Blue palette */}
              <p className="text-[#1a2b4b] font-bold text-xs uppercase tracking-[0.2em] group-hover:text-white text-center leading-relaxed transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
