import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ 1. Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { blogData } from "../../../data/blog";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ 2. Get Language Data
  const { language } = useLanguage();
  const t = blogData[language] || blogData['en'];

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/blog/posts/`;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError(t.error); // ✅ Use translated error
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
        toast.success(t.shareSuccess, { // ✅ Translated toast
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          transition: Slide,
        });
      } catch (err) {
        toast.error(t.shareError); // ✅ Translated toast
      }
    }
  };

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-28 overflow-hidden">
      <ToastContainer />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#dc2626] font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
            {t.tag} {/* ✅ Translated */}
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            {t.title} <span className="text-[#0056b3]">{t.highlight}</span> {t.titleSuffix}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0056b3] to-[#dc2626] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t.desc} {/* ✅ Translated */}
          </p>
        </div>

        {/* Loading & Error */}
        {loading && (
          <div className="flex justify-center py-10">
             <div className="w-10 h-10 border-4 border-[#0056b3] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="text-center py-10 bg-red-50 rounded-xl border border-red-100 max-w-lg mx-auto">
             <p className="text-[#dc2626] font-medium">{error}</p>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => {
              const isExpanded = expandedId === blog._id;
              return (
                <motion.div
                  key={blog._id || index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col h-full group"
                >
                  {/* Image */}
                  {blog.image_url && (
                    <div className="relative overflow-hidden h-56 shrink-0">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                      />
                    </div>
                  )}

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-[#0056b3] transition-colors">
                      {blog.title}
                    </h3>

                    <div className="relative">
                      <AnimatePresence initial={false}>
                        <motion.div
                          animate={{ height: isExpanded ? 200 : 80 }}
                          className={`overflow-hidden text-gray-600 leading-relaxed text-sm ${isExpanded ? "overflow-y-auto pr-2" : ""}`}
                        >
                          {blog.content}
                        </motion.div>
                      </AnimatePresence>
                      {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>}
                    </div>

                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
                      <button
                        onClick={() => toggleExpand(blog._id)}
                        className="text-[#0056b3] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        {isExpanded ? t.readLess : t.readMore} {/* ✅ Translated */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>

                      <button
                        onClick={(e) => handleShare(e, blog)}
                        className="text-slate-400 hover:text-[#dc2626] hover:bg-red-50 p-2 rounded-full transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            !loading && (
              <div className="col-span-full py-12 text-center bg-white rounded-xl shadow-sm border border-slate-200">
                <p className="text-gray-500 text-lg">{t.noBlogs}</p> {/* ✅ Translated */}
              </div>
            )
          )}
        </div>

        {/* View All Button */}
        {blogs.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold rounded-lg transition-all shadow-sm">
              {t.viewAll} {/* ✅ Translated */}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogHome;
