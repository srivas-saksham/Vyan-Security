import React from "react";
import guardPhotoshoot from "../assets/guard-photoshoot.png";

/**
 * Gallery Component - Displays a full-screen background image
 * with a typographically styled, top-centered message slightly offset to the left.
 */
const Gallery = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${guardPhotoshoot})`,
        userSelect: 'none'
      }}
    >
      {/* Top-Centered Text Box shifted slightly left */}
      <div
        className="
          absolute
          top-[10%] left-1/2 transform -translate-x-[calc(50%--60px)]
          max-w-3xl
          px-6 py-10
          text-center
        "
      >
        <h1
          className="
            text-4xl md:text-6xl
            font-black
            leading-tight
            text-[#315386]
            drop-shadow-md
            tracking-tight
          "
        >
          Photo Gallery <br />
          <span className="italic text-[#ffc45c]">Under Construction</span>
        </h1>

        <p
          className="
            mt-6
            text-lg md:text-xl
            text-[#315386]
            font-medium
            tracking-wide
          "
        >
          Our Guards are Posing for this Gallery.
          <p>It will be ready soon.</p>
        </p>
      </div>
    </div>
  );
};

export default Gallery;
