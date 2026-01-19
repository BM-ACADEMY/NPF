import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import logo from "../../../assets/npf-logo.jpeg";
import { FaUser, FaPhoneAlt, FaIdCard, FaMapMarkerAlt, FaUpload, FaCheckCircle, FaTimesCircle, FaIdBadge } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

// ✅ Import Context and Data
import { useLanguage } from "../../../context/LanguageContext";
import { licenseData } from "../../../data/license";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- Custom Vector Background (Political Geometry) ---
const CampaignBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="campaign-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M0 0L40 40L80 0" fill="none" stroke="#0F224A" strokeWidth="1" />
          <path d="M0 80L40 40L80 80" fill="none" stroke="#F59E0B" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#campaign-pattern)" />
    </svg>
  </div>
);

export default function License() {
  const [formData, setFormData] = useState({
    name: "",
    aadhar_number: "",
    phone: "",
    address: "",
    photo: null,
  });

  const [checking, setChecking] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneAvailable, setPhoneAvailable] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ Get Language Data
  const { language } = useLanguage();
  const t = licenseData[language] || licenseData['en'];
  const isTamil = language === 'ta';

  // --- EXISTING LOGIC STARTS ---
  const checkPhone = async (number) => {
    if (number.length !== 10) {
      setPhoneAvailable(null);
      setPhoneMessage("");
      return;
    }
    setChecking(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/npf/check_phone/`, { params: { phone: number } });
      if (res.data.available) {
        setPhoneAvailable(true);
        setPhoneMessage(t.messages.phoneAvailable);
      } else {
        setPhoneAvailable(false);
        setPhoneMessage(t.messages.phoneTaken);
      }
    } catch {
      setPhoneAvailable(false);
      setPhoneMessage(t.messages.serverError);
    }
    setChecking(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "phone") {
      const clean = value.replace(/\D/g, "");
      if (clean.length <= 10) {
          setFormData((prev) => ({ ...prev, phone: clean }));
          checkPhone(clean);
      }
      return;
    }

    if (name === "aadhar_number") {
      const cleanNumber = value.replace(/\D/g, "");
      if (cleanNumber.length <= 12) {
          setFormData((prev) => ({ ...prev, aadhar_number: cleanNumber }));
      }
      return;
    }

    if (name === "photo") {
      const file = files?.[0] || null;
      setFormData((prev) => ({ ...prev, photo: file }));
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(file ? URL.createObjectURL(file) : null);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatAadhar = (number) => {
      if (!number) return '';
      const parts = [];
      for (let i = 0; i < number.length; i += 4) {
          parts.push(number.substring(i, i + 4));
      }
      return parts.join('-');
  };

  const validate = () => {
    if (!formData.name.trim()) return toast.error(t.messages.validation.name);
    if (formData.aadhar_number.length !== 12) return toast.error(t.messages.validation.aadhar);
    if (formData.phone.length !== 10) return toast.error(t.messages.validation.phone);
    if (phoneAvailable === false) return toast.error(t.messages.validation.phoneReg);
    if (!formData.address.trim()) return toast.error(t.messages.validation.address);
    if (!formData.photo) return toast.error(t.messages.validation.photo);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v ?? ""));

    try {
      await axios.post(`${API_BASE_URL}/npf/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(t.messages.success);
      setFormData({ name: "", aadhar_number: "", phone: "", address: "", photo: null });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setPhoneMessage("");
      setPhoneAvailable(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      toast.error(err.response?.data?.error || t.messages.fail);
    }
    setSubmitting(false);
  };
  // --- EXISTING LOGIC ENDS ---

  return (
    <div className="min-h-screen py-20 px-4 flex justify-center bg-slate-100 relative overflow-hidden">
      <ToastContainer position="top-right" transition={Slide} />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700;800&display=swap');
          .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        `}
      </style>

      {/* Vector Background */}
      <CampaignBackground />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F224A]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* 📝 LEFT: FORM SECTION (8 Columns) */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">

          {/* Official Banner Header */}
          <div className="bg-[#0F224A] px-8 py-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl transform translate-x-10 -translate-y-10"></div>

             <div className="flex items-center gap-5 relative z-10">
                {/* ✅ UPDATED: Round Logo in Header */}
                <div className="w-14 h-14 bg-white p-1 rounded-full shadow-lg overflow-hidden flex items-center justify-center">
                   <img
                       src={logo}
                       alt="Logo"
                       className="w-full h-full object-cover rounded-full"
                   />
                </div>
                <div>
                   <h1 className={`text-2xl md:text-3xl font-extrabold text-white tracking-tight ${isTamil ? 'font-tamil' : 'uppercase'}`}>
                      {t.title}
                   </h1>
                   <p className={`text-amber-400 text-sm font-bold uppercase tracking-widest mt-1 ${isTamil ? 'font-tamil' : ''}`}>
                      {t.subtitle}
                   </p>
                </div>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">

            {/* --- Section: Personal Details --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="group">
                    <label className={`block text-sm font-bold text-[#0F224A] mb-2 flex items-center gap-2 ${isTamil ? 'font-tamil' : 'uppercase tracking-wide'}`}>
                        <FaUser className="text-amber-500" /> {t.labels.name}
                    </label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.placeholders.name}
                        className={`w-full bg-slate-50 border-2 border-slate-200 px-4 py-3.5 rounded-lg focus:border-[#0F224A] focus:bg-white outline-none font-bold text-slate-800 transition-all ${isTamil ? 'font-tamil' : ''}`}
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className={`block text-sm font-bold text-[#0F224A] mb-2 flex items-center gap-2 ${isTamil ? 'font-tamil' : 'uppercase tracking-wide'}`}>
                        <FaPhoneAlt className="text-amber-500" /> {t.labels.phone}
                    </label>
                    <div className="relative">
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t.placeholders.phone}
                            maxLength={10}
                            className={`w-full border-2 px-4 py-3.5 rounded-lg outline-none font-mono font-bold tracking-widest transition-all ${
                                phoneAvailable === false ? "border-red-500 bg-red-50" :
                                phoneAvailable === true ? "border-green-500 bg-green-50" :
                                "border-slate-200 bg-slate-50 focus:border-[#0F224A] focus:bg-white"
                            }`}
                            required
                        />
                        {checking && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <div className="w-5 h-5 border-2 border-[#0F224A] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        {/* Status Icon */}
                        {!checking && phoneAvailable !== null && (
                            <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg ${phoneAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                {phoneAvailable ? <FaCheckCircle /> : <FaTimesCircle />}
                            </div>
                        )}
                    </div>
                    {phoneMessage && (
                        <p className={`text-xs font-bold mt-1.5 ml-1 ${phoneAvailable ? "text-green-700" : "text-red-600"} ${isTamil ? 'font-tamil' : ''}`}>
                            {phoneMessage}
                        </p>
                    )}
                </div>
            </div>

            {/* --- Section: Identity & Address --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Aadhar */}
                 <div>
                    <label className={`block text-sm font-bold text-[#0F224A] mb-2 flex items-center gap-2 ${isTamil ? 'font-tamil' : 'uppercase tracking-wide'}`}>
                        <FaIdCard className="text-amber-500" /> {t.labels.aadhar}
                    </label>
                    <input
                        name="aadhar_number"
                        value={formatAadhar(formData.aadhar_number)}
                        onChange={handleChange}
                        placeholder={t.placeholders.aadhar}
                        maxLength={14}
                        className="w-full bg-slate-50 border-2 border-slate-200 px-4 py-3.5 rounded-lg focus:border-[#0F224A] focus:bg-white outline-none font-mono font-bold text-slate-800 tracking-wider"
                        required
                    />
                </div>

                {/* Photo Upload */}
                <div>
                     <label className={`block text-sm font-bold text-[#0F224A] mb-2 flex items-center gap-2 ${isTamil ? 'font-tamil' : 'uppercase tracking-wide'}`}>
                        <FaUpload className="text-amber-500" /> {t.labels.photo}
                    </label>
                    <div className="relative group">
                        <input
                            type="file"
                            ref={fileInputRef}
                            name="photo"
                            accept="image/*"
                            onChange={handleChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            required
                        />
                        <div className={`flex items-center gap-3 w-full border-2 border-dashed border-slate-300 px-4 py-3 rounded-lg group-hover:border-[#0F224A] group-hover:bg-blue-50 transition-all ${formData.photo ? 'bg-blue-50 border-[#0F224A]' : 'bg-slate-50'}`}>
                             <div className="bg-[#0F224A] text-white p-2 rounded-md">
                                 <FaUpload size={14}/>
                             </div>
                             <div className="flex-1 min-w-0">
                                 <p className={`text-sm font-bold truncate ${isTamil ? 'font-tamil' : ''}`}>
                                     {formData.photo ? formData.photo.name : t.placeholders.photoDefault}
                                 </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address - Full Width */}
            <div>
                 <label className={`block text-sm font-bold text-[#0F224A] mb-2 flex items-center gap-2 ${isTamil ? 'font-tamil' : 'uppercase tracking-wide'}`}>
                    <FaMapMarkerAlt className="text-amber-500" /> {t.labels.address}
                </label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder={t.placeholders.address}
                    className={`w-full bg-slate-50 border-2 border-slate-200 px-4 py-3.5 rounded-lg focus:border-[#0F224A] focus:bg-white outline-none text-slate-800 resize-none font-medium transition-all ${isTamil ? 'font-tamil' : ''}`}
                    required
                />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || checking}
              className={`w-full py-4 rounded-lg font-black text-lg shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest
                ${submitting ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-[#0F224A] text-white hover:bg-[#1a3a7a]"}`}
            >
              <span className={isTamil ? 'font-tamil' : ''}>
                 {submitting ? t.buttons.submitting : t.buttons.submit}
              </span>
            </button>

          </form>
        </div>

        {/* 🪪 RIGHT: ID CARD PREVIEW (Sticky Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
             <div className="sticky top-10">
                 {/* Card Container */}
                 <div className="bg-[#0F224A] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                     {/* Background Pattern on Card */}
                     <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                     <div className="relative z-10">
                         <div className="flex items-center justify-between mb-6 text-white/90 border-b border-white/10 pb-4">
                             <h3 className={`font-bold uppercase tracking-widest text-sm ${isTamil ? 'font-tamil' : ''}`}>{t.previewTitle}</h3>
                             <div className="flex items-center gap-1.5 bg-green-500/20 px-2 py-0.5 rounded text-green-400 text-[10px] font-bold uppercase tracking-wider">
                                 <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                 {t.activeStatus}
                             </div>
                         </div>

                         {/* The Physical Card Mockup */}
                         <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] duration-300">

                             {/* Card Header */}
                             <div className="h-1 bg-[#F59E0B]"></div>
                             <div className="bg-slate-100 p-3 flex items-center justify-between border-b border-slate-200">
                                 <div className="flex items-center gap-2">
                                     {/* ✅ UPDATED: Round Logo in Preview */}
                                     <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm">
                                         <img src={logo} className="w-full h-full object-cover" alt="logo" />
                                     </div>
                                     <div>
                                         <h4 className="font-black text-[#0F224A] text-xs leading-none">NPF</h4>
                                         <p className="text-[7px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Official Membership</p>
                                     </div>
                                 </div>
                                 <FaIdBadge className="text-[#0F224A]/20 text-2xl" />
                             </div>

                             {/* Card Body */}
                             <div className="p-5 flex flex-col items-center">
                                 {/* Photo */}
                                 <div className="w-24 h-24 bg-slate-200 rounded-lg border-2 border-white shadow-md mb-3 overflow-hidden">
                                     {previewUrl ? (
                                         <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                     ) : (
                                         <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                             <FaUser size={24} />
                                             <span className="text-[8px] uppercase font-bold mt-1">Photo</span>
                                         </div>
                                     )}
                                 </div>

                                 {/* Name & Role */}
                                 <h2 className={`text-lg font-black text-[#0F224A] text-center uppercase leading-tight ${isTamil ? 'font-tamil' : ''}`}>
                                     {formData.name || "YOUR NAME"}
                                 </h2>
                                 <span className={`bg-[#F59E0B]/10 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded mt-1 uppercase tracking-wide ${isTamil ? 'font-tamil' : ''}`}>
                                     {t.card.designation}
                                 </span>

                                 {/* Details */}
                                 <div className="w-full mt-4 space-y-2">
                                     <div className="flex justify-between items-center text-xs border-b border-dashed border-slate-200 pb-1">
                                         <span className="text-slate-400 font-bold uppercase text-[9px]">ID No</span>
                                         <span className="font-mono font-bold text-[#0F224A]">{formatAadhar(formData.aadhar_number) || "XXXX-XXXX"}</span>
                                     </div>
                                     <div className="flex justify-between items-center text-xs border-b border-dashed border-slate-200 pb-1">
                                         <span className="text-slate-400 font-bold uppercase text-[9px]">Phone</span>
                                         <span className="font-mono font-bold text-[#0F224A]">{formData.phone || "XXXXXXXXXX"}</span>
                                     </div>
                                 </div>
                             </div>

                             {/* Card Footer */}
                             <div className="bg-[#0F224A] py-1.5 text-center">
                                 <p className={`text-[7px] text-white/80 uppercase tracking-[0.2em] font-medium ${isTamil ? 'font-tamil' : ''}`}>
                                     {t.card.footer}
                                 </p>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Helper Text */}
                 <p className={`text-xs text-center text-slate-500 font-medium ${isTamil ? 'font-tamil' : ''}`}>
                     {t.card.note}
                 </p>
             </div>
        </div>

      </div>
    </div>
  );
}
