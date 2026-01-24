// src/Routes/Routes.jsx
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// 1. ✅ IMPORT THE PROVIDER
// Make sure the path matches where you saved the context file
import { LanguageProvider } from "../context/LanguageContext";

// ──────────────────────────────────────────────
//  ScrollToTop component
// ──────────────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

// ──────────────────────────────────────────────
//  Import your pages / route groups
// ──────────────────────────────────────────────
import HomepagesRoutes from "./HomepagesRoutes";
import AdminRoutes from "./AdminRoutes";

import Gallery from "../Modules/Homepages/Pages/Gallery";
import BlogHome from "../Modules/Homepages/Pages/Blog";
import Layout from "../Modules/Homepages/Layout/Layout";
import License from "../Modules/Homepages/Pages/License";
import LicenseDownload from "../Modules/Homepages/Pages/LicenseDownload";
import Contact from "../Modules/Homepages/Pages/Contact";
import Complaint from "../Modules/Homepages/Pages/Complaint";
import LicenseCardPdfWrapper from "../Modules/Homepages/Pages/LicenseCardPdfWrapper";
import About from "../Modules/Homepages/Pages/About";
import GetInvolved from "../Modules/Homepages/Pages/Ourteam";
import OurTeam from "../Modules/Homepages/Pages/Ourteam";


const AppRoutes = () => {
  return (
    // 2. ✅ WRAP THE ENTIRE ROUTER WITH LANGUAGE PROVIDER
    <LanguageProvider>
      <Router>
        {/* Scroll to top on every route change */}
        <ScrollToTop />

        <Routes>
          {/* ---------- Public / Homepages ---------- */}
          <Route
            path="/*"
            element={
              <Layout>
                <HomepagesRoutes />
              </Layout>
            }
          />

          {/* Individual pages that also need Layout */}
          <Route
            path="/gallery"
            element={
              <Layout>
                <Gallery />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout>
                <BlogHome />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route path="/complaint" element={<Complaint />} />

          {/* License pages */}
          <Route
            path="/license"
            element={
              <Layout>
                <License />
              </Layout>
            }
          />
          <Route
            path="/license/download"
            element={
              <Layout>
                <LicenseDownload />
              </Layout>
            }
          />

          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
  path="/our-team"
  element={
    <Layout>
      <OurTeam />
    </Layout>
  }
  />


          {/* ---------- Admin ---------- */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route
            path="/admin/dmm/pdf/:id"
            element={<LicenseCardPdfWrapper />}
          />

          {/* ---------- Fallback ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default AppRoutes;
