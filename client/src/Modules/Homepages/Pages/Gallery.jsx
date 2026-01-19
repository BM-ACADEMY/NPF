import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// ✅ Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { galleryData } from "../../../data/gallery";

// --- Custom Vector Background Pattern ---
const GalleryVectorBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gallery-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* Simple geometric shapes in brand colors */}
          <circle cx="30" cy="30" r="2" fill="#0F224A" />
          <path d="M0 0L60 60M60 0L0 60" stroke="#F59E0B" strokeWidth="0.5" />
          <rect x="28" y="28" width="4" height="4" fill="#0F224A" transform="rotate(45 30 30)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gallery-pattern)" />
    </svg>
  </div>
);

const HomeGallery = () => {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  const { language } = useLanguage();
  const t = galleryData[language] || galleryData['en'];
  const isTamil = language === 'ta';

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(API_URL);
        setImages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError(t.error);
      }
    };
    fetchImages();
  }, [t.error]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  return (
    <section className="relative w-full bg-white py-20 lg:py-32 overflow-hidden">

      {/* ✅ ADDED: Vector Background Pattern */}
      <GalleryVectorBackground />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&display=swap');
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">

        {/* --- Minimalist Header --- */}
        <div className="flex flex-col items-center text-center mb-16">
            <span className={`text-amber-600 font-bold uppercase tracking-[0.2em] text-xs mb-3 ${isTamil ? 'font-tamil tracking-wide' : ''}`}>
                {t.sub || "Archive"}
            </span>
            <h2 className={`text-4xl md:text-6xl font-black text-[#0F224A] mb-6 ${isTamil ? 'font-tamil' : 'tracking-tighter'}`}>
                {t.title}
            </h2>
            <div className="w-[1px] h-16 bg-gray-200"></div>
        </div>

        {error && <div className="text-red-500 text-center mb-8">{error}</div>}

        {/* --- MOSAIC GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2 auto-rows-[250px]">
          {images.map((img, index) => {
            const isFeatured = index === 0;

            return (
                <motion.div
                  key={img._id}
                  className={`relative group overflow-hidden cursor-pointer bg-gray-100 ${
                      isFeatured ? 'sm:col-span-2 sm:row-span-2' : 'col-span-1 row-span-1'
                  }`}
                  onClick={() => openLightbox(index)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={img.image_url}
                    alt={img.title}
                    // ✅ FIXED: Removed 'grayscale'. Now always full color.
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Minimalist Overlay */}
                  <div className="absolute inset-0 bg-[#0F224A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner Icon */}
                  <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                      <FaPlus className="drop-shadow-md" />
                  </div>

                  {/* Title Label (Bottom Left) */}
                  <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className={`text-white font-medium tracking-wide ${isTamil ? 'font-tamil text-sm' : 'text-xs uppercase'}`}>
                          {img.title}
                      </h3>
                  </div>
                </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- Fullscreen Cinematic Lightbox --- */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            className="fixed inset-0 z-[100] bg-white flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Lightbox Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className={`text-[#0F224A] font-bold text-lg ${isTamil ? 'font-tamil' : ''}`}>
                    {images[currentIndex].title}
                </div>
                <button onClick={closeLightbox} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FaTimes size={24} className="text-gray-400 hover:text-red-500" />
                </button>
            </div>

            {/* Lightbox Main Content */}
            <div className="flex-1 relative flex items-center justify-center bg-gray-50 p-4 md:p-12 overflow-hidden" onClick={closeLightbox}>
                <motion.img
                   key={currentIndex}
                   src={images[currentIndex].image_url}
                   alt={images[currentIndex].title}
                   className="w-auto h-auto max-w-full max-h-full shadow-2xl object-contain"
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                   onClick={(e) => e.stopPropagation()}
                />

                {/* Navigation Arrows */}
                <button
                   onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1)); }}
                   className="absolute left-4 md:left-8 p-4 text-gray-400 hover:text-[#0F224A] transition-colors"
                >
                   <FaArrowLeft size={32} />
                </button>
                <button
                   onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1)); }}
                   className="absolute right-4 md:right-8 p-4 text-gray-400 hover:text-[#0F224A] transition-colors"
                >
                   <FaArrowRight size={32} />
                </button>
            </div>

            {/* Lightbox Footer (Progress Bar) */}
            <div className="h-1 bg-gray-100 w-full">
                <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
                ></div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default HomeGallery;
