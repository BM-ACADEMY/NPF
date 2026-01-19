import React from 'react';
import GalleryHighlights from '../Pages/Gallery'; // The Gallery Section we just made
// You can import other sections here later (e.g. AboutSummary, LatestEvents, etc.)

const Home = () => {
  return (
    <div className="w-full font-sans">



      {/* 2. Gallery Highlights Section */}
      {/* This will show the 4 preview images and the "View Full Gallery" button */}
      <GalleryHighlights />

      {/* 3. (Optional) You can add more sections here later */}

    </div>
  );
};

export default Home;
