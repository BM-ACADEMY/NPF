import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import { FaDownload, FaIdCard, FaCheckCircle, FaExclamationCircle, FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../assets/npf-logo.jpeg";
import "react-toastify/dist/ReactToastify.css";

// ✅ 1. Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { downloadData } from "../../../data/licensedownload";

// Subtle Document Pattern Background
const OfficialBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="doc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
           <path d="M0 0h60v60H0z" fill="none"/>
           <path d="M0 60L60 0" stroke="#0F224A" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#doc-grid)" />
    </svg>
  </div>
);

export default function MembershipDownload() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { language } = useLanguage();
  const t = downloadData[language] || downloadData['en'];
  const isTamil = language === 'ta';

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/npf/download/`;

  const simulateProgress = () => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 90) current = 90;
      setProgress(Math.round(current));
    }, 200);
    return interval;
  };

  const handleDownload = async () => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMsg(t.errors.invalid);
      toast.error(t.errors.invalid);
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    setProgress(0);

    const interval = simulateProgress();

    try {
      const res = await axios.get(`${API_URL}?phone=${cleanPhone}`, {
        responseType: "blob",
        validateStatus: () => true
      });
      clearInterval(interval);
      setProgress(100);

      if (res.status === 404 || res.status === 400) {
        setErrorMsg(t.errors.notFound);
        toast.error(t.errors.notFound);
      } else if (res.status === 200) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "membership_certificate.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(t.success);
        setSuccessMsg(t.success);
      } else {
        setErrorMsg(t.errors.notApproved);
        toast.error(t.errors.notApproved);
      }
    } catch (error) {
      clearInterval(interval);
      console.error(error);
      setErrorMsg(t.errors.server);
      toast.error("Server error.");
    } finally {
      setTimeout(() => { setLoading(false); setProgress(0); }, 1000);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 relative overflow-hidden py-10">
      <ToastContainer position="top-center" transition={Slide} />

      {/* Tamil Font Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&display=swap');
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      {/* Official Pattern Background */}
      <OfficialBackground />

      {/* Decorative Blur Circles (Cool Blue/Grey) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-300/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-lg w-full mx-4"
      >
        {/* --- Card Container --- */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">

            {/* Header Section */}
            <div className="pt-10 pb-6 px-8 text-center bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
                <div className="inline-block relative mb-4">
                   <img src={logo} alt="Logo" className="w-20 h-20 object-contain drop-shadow-sm" />
                   <div className="absolute -bottom-2 -right-2 bg-[#0F224A] text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                       <FaShieldAlt size={12} />
                   </div>
                </div>

                <h1 className={`text-2xl font-bold text-[#0F224A] mb-1 ${isTamil ? 'font-tamil' : 'uppercase tracking-tight'}`}>
                    {t.title}
                </h1>
                <p className={`text-slate-500 text-xs font-semibold uppercase tracking-widest ${isTamil ? 'font-tamil' : ''}`}>
                    {t.subtitle || "Secure ID Verification"}
                </p>
            </div>

            {/* Body Section */}
            <div className="p-8 md:p-10">

                <div className="text-center mb-8">
                    <label className={`block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 ${isTamil ? 'font-tamil' : ''}`}>
                        {t.placeholder || "Registered Mobile Number"}
                    </label>

                    {/* Input Group */}
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="XXXXXXXXXX"
                            value={phone}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, "");
                                if (onlyNums.length <= 10) setPhone(onlyNums);
                                setErrorMsg(""); // Clear error on type
                            }}
                            maxLength={10}
                            className={`w-full bg-slate-50 border-2 ${
                                errorMsg ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-[#0F224A] focus:bg-white"
                            } outline-none px-6 py-4 rounded-lg text-center text-2xl font-bold tracking-[0.2em] text-[#0F224A] transition-all duration-300 placeholder-slate-300`}
                        />
                        {/* Success Icon */}
                        {phone.length === 10 && !errorMsg && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 animate-pulse">
                                <FaCheckCircle size={22} />
                            </div>
                        )}
                    </div>

                    {/* Error Feedback */}
                    <AnimatePresence>
                        {errorMsg && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 flex items-center justify-center gap-2 text-red-600 text-xs font-bold"
                            >
                                <FaExclamationCircle /> {errorMsg}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Loading Bar */}
                {loading && (
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6 overflow-hidden">
                        <div className="h-full bg-[#0F224A] rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
                    </div>
                )}

                {/* Action Button */}
                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className={`w-full py-4 rounded-lg font-bold text-sm md:text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                        ${loading
                            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                            : "bg-[#0F224A] hover:bg-[#1a3a7a] text-white hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                        } ${isTamil ? 'font-tamil' : 'uppercase tracking-widest'}`}
                >
                    {loading ? (
                        <>
                           <svg className="animate-spin h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           {t.processing || "Verifying..."}
                        </>
                    ) : (
                        <>
                           <FaDownload />
                           {t.button || "Download Certificate"}
                        </>
                    )}
                </button>

                {/* Success Message */}
                {successMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-center"
                    >
                        <p className="text-emerald-700 font-bold text-sm flex items-center justify-center gap-2">
                            <FaCheckCircle /> {successMsg}
                        </p>
                    </motion.div>
                )}

            </div>

            {/* Footer Strip */}
            <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                 <p className={`text-[10px] text-slate-400 font-bold uppercase tracking-widest ${isTamil ? 'font-tamil' : ''}`}>
                    {t.footer || "Official NPF Portal"}
                 </p>
            </div>

        </div>
      </motion.div>
    </section>
  );
}
