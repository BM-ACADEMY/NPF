import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api";
import LicenseCardPdf from "./LicenseCardPdf";

export default function LicenseCardPdfWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch individual member record for dmm project
    API.get(`/dmm/${id}/`)
      .then((res) => {
        setLicense(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Load error:", err);
        setLoading(false);
        // Using alert as a fallback, but toast is preferred if available globally
      });
  }, [id]);

  // Loading state with brand-consistent text
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#0024f8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#1a2b48] font-bold uppercase tracking-widest text-xs">Loading dmm Member Details...</p>
        </div>
      </div>
    );
  }

  // Error state using brand Red (#ff0000)
  if (!license) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md border-t-4 border-[#ff0000]">
          <p className="text-[#1a2b48] font-black text-xl mb-2 uppercase">Record Not Found</p>
          <p className="text-gray-500 text-sm mb-6">The membership record you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 bg-[#1a2b48] text-white rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-[#0024f8] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#1a2b48] text-white rounded-sm font-bold uppercase text-[10px] tracking-widest hover:bg-[#0024f8] transition-all shadow-md"
          >
            <span className="text-lg leading-none">←</span> Back to List
          </button>

          <div className="hidden md:block">
            <p className="text-[#1a2b48] font-black uppercase text-xs tracking-tighter">
              Member Administration <span className="text-[#0024f8]">/ License Generation</span>
            </p>
          </div>
        </div>

        {/* The Card Component */}
        <div className="flex justify-center">
          <LicenseCardPdf license={license} />
        </div>
      </div>
    </div>
  );
}
