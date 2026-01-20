import React from "react";
import { Twitter } from 'lucide-react'; // Ensure lucide-react is installed

const SocialMediaLinks = () => {

  const SocialCard = ({
    title,
    icon,
    color,
    children,
    buttonLink,
    buttonText,
    buttonColor,
  }) => (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 ${color} hover:-translate-y-2 transition-transform duration-300 flex flex-col`}
    >
      <div className="p-6 text-center flex-grow flex flex-col">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-3xl">{icon}</span>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>

        {/* Embed Container */}
        <div className="flex justify-center mb-6 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 min-h-[200px] items-center">
          {children}
        </div>

        {/* Button */}
        <div className="mt-auto">
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg w-full justify-center ${buttonColor}`}
          >
            {buttonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-28 overflow-hidden">
      {/* Subtle Background Vector Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:30px_30px] opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
           Social Media
          </h1>

        </div>

        {/* Updated Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* 👍 FACEBOOK */}
          <SocialCard
            title="Facebook"
            icon="📘"
            color="border-[#1877F2]"
            buttonLink="https://www.facebook.com/profile.php?id=61586327415764"
            buttonText="Follow"
            buttonColor="bg-[#1877F2]"
          >
            <iframe
              title="NPF Facebook"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61586327415764&tabs=timeline&width=300&height=250&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
              width="100%"
              height="250"
              className="border-none overflow-hidden"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </SocialCard>

          {/* 📸 INSTAGRAM */}
          <SocialCard
            title="Instagram"
            icon="📸"
            color="border-[#E1306C]"
            buttonLink="https://www.instagram.com/npf_pondy/?hl=en"
            buttonText="Follow"
            buttonColor="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
          >
            <iframe
              title="NPF Instagram"
              src="https://www.instagram.com/npf_pondy/embed"
              width="100%"
              height="300"
              className="rounded-lg border-none overflow-hidden"
              allowTransparency="true"
            ></iframe>
          </SocialCard>

          {/* 𝕏 TWITTER (X) */}
          <SocialCard
            title="Twitter"
            icon="𝕏"
            color="border-black"
            buttonLink="https://x.com" // Update with your actual X profile link
            buttonText="Follow"
            buttonColor="bg-black"
          >
            <div className="flex flex-col items-center justify-center p-8 text-slate-400">
              <Twitter size={60} strokeWidth={1.5} />
              <p className="mt-4 text-sm font-medium">@NPF_Official</p>
            </div>
          </SocialCard>

          {/* ▶️ YOUTUBE */}
          <SocialCard
            title="YouTube"
            icon="▶️"
            color="border-[#FF0000]"
            buttonLink="https://www.youtube.com/@NPF-u2"
            buttonText="Subscribe"
            buttonColor="bg-[#FF0000]"
          >
            <iframe
              title="NPF YouTube"
              src="https://www.youtube.com/embed?listType=user_uploads&list=@NPF-u2"
              width="100%"
              height="200"
              className="border-none overflow-hidden"
              allow="autoplay; encrypted-media"
            ></iframe>
          </SocialCard>

        </div>
      </div>
    </section>
  );
};

export default SocialMediaLinks;
