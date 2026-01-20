import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer, Slide } from "react-toastify";
import { FaShareAlt, FaArrowRight, FaCalendarDay, FaNewspaper } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

// ✅ Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { blogData } from "../../../data/blog";

// --- Custom Vector Background (Abstract Network Grid) ---
const NetworkBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          {/* Stroke updated to Brand Navy */}
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#1a2b48" strokeWidth="1" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  </div>
);

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { language } = useLanguage();
  const t = blogData[language] || blogData['en'];
  const isTamil = language === 'ta';

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/blog/posts/`;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [t.error]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleShare = async (e, blog) => {
    e.stopPropagation();
    const shareUrl = window.location.href;
    const shareData = {
      title: blog.title,
      text: blog.subtitle || `Check out this post: ${blog.title}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.url}`);
        toast.success(t.shareSuccess || "Link copied!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          transition: Slide,
        });
      } catch (err) {
        toast.error(t.shareError || "Failed to copy");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString || Date.now()).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', options);
  };

  return (
    <section className="relative w-full bg-white py-20 lg:py-28 overflow-hidden border-t border-slate-100">
      <ToastContainer />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&display=swap');
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      <NetworkBackground />

      {/* Decorative Accents updated to Brand Blue */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0024f8]/5 rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1a2b48]/5 rounded-tr-[100px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">

        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-4 border-b-2 border-slate-100">
            <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                    {/* Accent bar updated to Royal Blue */}
                    <span className="w-2 h-8 bg-[#0024f8]"></span>
                    <span className={`text-[#1a2b48] font-bold uppercase tracking-widest text-sm ${isTamil ? 'font-tamil tracking-wide' : ''}`}>
                       {t.tag || "Press Room"}
                    </span>
                </div>
                {/* Title updated to Royal Blue */}
                <h2 className={`text-4xl md:text-5xl font-black text-[#0024f8] uppercase ${isTamil ? 'font-tamil leading-tight' : 'tracking-tighter'}`}>
                   {t.title}
                </h2>
            </div>
            <div className="hidden md:block">
                 <button className={`text-slate-500 font-bold hover:text-[#0024f8] transition-colors flex items-center gap-2 ${isTamil ? 'font-tamil text-sm' : 'uppercase text-xs tracking-widest'}`}>
                    {t.viewAll || "View Archive"} <FaArrowRight className="text-[#0024f8]" />
                 </button>
            </div>
        </div>

        {/* --- Loading & Error --- */}
        {loading && (
          <div className="flex justify-center py-24">
             <div className="w-12 h-12 border-4 border-slate-100 border-t-[#0024f8] rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="p-5 bg-red-50 border-l-4 border-red-600 text-red-800 font-medium max-w-xl mx-auto shadow-sm">
             {error}
          </div>
        )}

        {/* --- CARD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length > 0 ? (
                blogs.map((blog, index) => {
                    const isExpanded = expandedId === blog._id;

                    return (
                        <motion.div
                            layout
                            key={blog._id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            /* Border Top updated to Royal Blue */
                            className="bg-white border border-slate-100 border-t-4 border-t-[#0024f8] shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group"
                        >
                            <div className="relative h-52 overflow-hidden bg-slate-50">
                                {blog.image_url ? (
                                    <img
                                        src={blog.image_url}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                        <FaNewspaper size={40} className="mb-2 opacity-20"/>
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-50">No Image</span>
                                    </div>
                                )}

                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#1a2b48]/90 to-transparent p-4 pt-10">
                                    <div className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-wider">
                                        {/* Icon updated to Royal Blue */}
                                        <FaCalendarDay className="text-[#0024f8]" />
                                        {formatDate(blog.created_at || blog.date)}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                {/* Title Hover updated to Royal Blue */}
                                <h3 className={`text-xl font-bold text-[#1a2b48] mb-3 leading-snug group-hover:text-[#0024f8] transition-colors ${isTamil ? 'font-tamil' : ''}`}>
                                    {blog.title}
                                </h3>

                                <div className="relative mb-6">
                                    <AnimatePresence initial={false}>
                                        <motion.div
                                            animate={{ height: isExpanded ? "auto" : 72 }}
                                            className={`overflow-hidden text-[#1a2b48]/80 font-medium leading-relaxed text-sm ${isTamil ? 'font-tamil' : ''}`}
                                        >
                                            {blog.content}
                                        </motion.div>
                                    </AnimatePresence>
                                    {!isExpanded && (
                                        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                                    )}
                                </div>

                                <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                                    {/* Action link updated to Navy/Blue */}
                                    <button
                                        onClick={() => toggleExpand(blog._id)}
                                        className={`group/btn flex items-center gap-2 text-[#1a2b48] font-bold text-xs hover:text-[#0024f8] transition-colors ${isTamil ? 'font-tamil' : 'uppercase tracking-widest'}`}
                                    >
                                        {isExpanded ? (t.readLess || "Close") : (t.readMore || "Read Full Story")}
                                        <FaArrowRight className={`text-[#0024f8] transition-transform ${isExpanded ? "rotate-180" : "group-hover/btn:translate-x-1"}`} />
                                    </button>

                                    <button
                                        onClick={(e) => handleShare(e, blog)}
                                        className="text-slate-400 hover:text-[#0024f8] p-2 hover:bg-slate-50 rounded transition-all"
                                        title="Share"
                                    >
                                        <FaShareAlt />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })
            ) : (
                !loading && (
                    <div className="col-span-full py-20 text-center bg-white border border-slate-100">
                        <p className="text-slate-400 font-medium uppercase tracking-widest">{t.noBlogs || "No Press Releases Available."}</p>
                    </div>
                )
            )}
        </div>

        {/* --- Mobile View All --- */}
        <div className="mt-12 text-center md:hidden">
            {/* Mobile button updated to Navy */}
            <button className={`w-full py-4 bg-[#1a2b48] text-white font-bold shadow-lg ${isTamil ? 'font-tamil' : 'uppercase tracking-widest text-xs'}`}>
              {t.viewAll || "View Archive"}
            </button>
        </div>

      </div>
    </section>
  );
};

export default BlogHome;
