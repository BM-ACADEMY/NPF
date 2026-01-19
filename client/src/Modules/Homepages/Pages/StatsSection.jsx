import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import { statsData } from "../../../data/stats";

const StatsSection = () => {
  const { language } = useLanguage();
  const data = statsData[language] || statsData["en"];

  // This hook detects when the section is visible on screen
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation only happens once
    threshold: 0.3,    // Starts when 30% of the section is visible
  });

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -ml-32 -mb-32"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {data.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-[#dc2626] mb-2 flex items-baseline">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator=","
                  />
                ) : (
                  "0"
                )}
                <span className="ml-1">{stat.suffix}</span>
              </div>

              <div className="h-1 w-12 bg-[#0056b3] rounded-full mb-4"></div>

              <p className="text-[#0F224A] font-bold text-sm md:text-lg uppercase tracking-wide">
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
