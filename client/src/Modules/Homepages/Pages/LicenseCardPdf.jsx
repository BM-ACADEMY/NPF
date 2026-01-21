import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "../../../api";
import { toast } from "react-toastify";
import signature from "../../../assets/banner/Untitled design (4).png";
import personImage from "../../../assets/npf_hero.png";
import qrcode from "../../../assets/banner/qrcode.svg";
import logo from "../../../assets/npf-logo.jpeg";

export default function LicenseCardPdf({ license = {} }) {
  const cardRef = useRef();
  const [loading, setLoading] = useState(false);

  const sanitize = (str) =>
    !str || typeof str !== "string"
      ? "Member"
      : str.replace(/[^a-zA-Z0-9 _-]/g, "").replace(/\s+/g, "_");
  const safeName = sanitize(license.name);

  // PDF Generation with Explicit Dimensions for perfect alignment
  const downloadPdf = async () => {
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        width: 340,
        height: 520,
        logging: false
      });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [340, 520] });
      pdf.addImage(imgData, "JPEG", 0, 0, 340, 520);
      pdf.save(`npf_${safeName}.pdf`);
    } catch (err) {
      toast.error("PDF generation failed");
    }
  };

  const approveAndUpload = async () => {
    try {
      setLoading(true);
      const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true, width: 340, height: 520 });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [340, 520] });
      pdf.addImage(imgData, "JPEG", 0, 0, 340, 520);

      const pdfBlob = pdf.output("blob");
      const formData = new FormData();
      formData.append("pdf_file", pdfBlob, `npf_${safeName}.pdf`);

      const res = await API.post(`/npf/${license._id}/upload_pdf/`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const whatsLink = res.data?.whatsapp_link;
      toast.success("Approved successfully!");
      if (whatsLink) {
        try { navigator.clipboard.writeText(whatsLink); toast.info("WhatsApp link copied!"); } catch {}
        setTimeout(() => window.open(whatsLink, "_blank", "noopener,noreferrer"), 200);
      }
    } catch (err) {
      toast.error("Upload failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-slate-50 min-h-screen">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
          .npf-card-render { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        `}
      </style>

      {/* --- STABLE PDF CONTAINER --- */}
      <div
        ref={cardRef}
        className="npf-card-render"
        style={{
          width: 340,
          height: 520,
          background: "#ffffff",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Top Split Accent */}
        <div style={{ height: 6, display: "flex", width: "100%", zIndex: 10 }}>
          <div style={{ flex: 1, background: "#0024f8" }}></div>
          <div style={{ flex: 1, background: "#ff0000" }}></div>
        </div>

        {/* Brand Header Row (Locked Alignment) */}
        <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} crossOrigin="anonymous" style={{ width: 44, height: 44, borderRadius: "50%", marginRight: 10 }} alt="logo" />
            <div>
              <h1 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "#1a2b48", textTransform: "uppercase" }}>NPF</h1>
              <p style={{ margin: 0, fontSize: 7, fontWeight: 700, color: "#0024f8", textTransform: "uppercase", letterSpacing: "0.5px" }}>National People's Front</p>
            </div>
          </div>

          {/* Matched Leader Image */}
          <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: "1px solid #f1f5f9" }}>
            <img src={personImage} crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="person" />
          </div>
        </div>

        {/* Logo Watermark */}
        <div style={{ position: "absolute", top: "55%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0, opacity: 0.04 }}>
          <img src={logo} crossOrigin="anonymous" style={{ width: 240 }} alt="watermark" />
        </div>

        {/* Content Body */}
        <div style={{ padding: "20px 30px", position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>

          <div style={{ width: 130, height: 155, borderRadius: "4px", overflow: "hidden", border: "4px solid #ffffff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", marginBottom: "15px" }}>
            <img
              src={license.photo || "/static/default_photo.jpg"}
              crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="photo"
            />
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 900, color: "#1a2b48", textAlign: "center", textTransform: "uppercase", marginBottom: "4px" }}>
            {license.name || "Member Name"}
          </h2>

          <div style={{ background: "#ff0000", padding: "3px 12px", borderRadius: "50px", marginBottom: "20px" }}>
            <p style={{ margin: 0, color: "#ffffff", fontSize: 8, fontWeight: 900, textTransform: "uppercase" }}>Official Member</p>
          </div>

          {/* Details - Fixed Width Labels for Perfect Alignment */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #f1f5f9", paddingBottom: "4px" }}>
              <span style={{ width: 75, fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Phone</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#1a2b48" }}>{license.phone || "9xxxxxxxxx"}</span>
            </div>

            <div style={{ display: "flex", borderBottom: "1px solid #f1f5f9", paddingBottom: "4px" }}>
              <span style={{ width: 75, fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Address</span>
              <span style={{ flex: 1, fontSize: 9, fontWeight: 600, color: "#1a2b48", lineHeight: 1.3 }}>{license.address || "No Address Provided"}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ padding: "0 30px 40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 10 }}>
          <img src={qrcode} crossOrigin="anonymous" style={{ width: 50, height: 50 }} alt="QR" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={signature} style={{ width: 60, marginBottom: -2, mixBlendMode: "multiply" }} alt="signature" />
            <div style={{ width: 70, height: 1, background: "#1a2b48", opacity: 0.2 }}></div>
            <span style={{ fontSize: 6, fontWeight: 700, color: "#1a2b48", marginTop: 2 }}>GENERAL SECRETARY</span>
          </div>
        </div>

        {/* Footer Identity Bar */}
        <div style={{ width: "100%", height: 25, background: "#1a2b48", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <p style={{ margin: 0, color: "#ffffff", fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Identification Membership Card</p>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex gap-4 mt-8">
        <button onClick={downloadPdf} className="px-8 py-2.5 bg-[#ff0000] text-white rounded-sm font-bold uppercase text-[11px] tracking-widest shadow hover:bg-red-700 transition-all">
          Download PDF
        </button>
        <button onClick={approveAndUpload} disabled={loading} className="px-8 py-2.5 bg-[#1a2b48] text-white rounded-sm font-bold uppercase text-[11px] tracking-widest shadow hover:bg-slate-800 transition-all disabled:bg-slate-300">
          {loading ? "Approving..." : "Approve & Upload"}
        </button>
      </div>
    </div>
  );
}
