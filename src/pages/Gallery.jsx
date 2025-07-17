import React, { useEffect, useState } from "react";
import guardPhotoshoot from "../assets/guard-photoshoot.png";
import guardPhotoshootDark from "../assets/guard-photoshoot-dark.png";
import { useTheme } from "../ThemeContext";

const Gallery = () => {
  const { theme } = useTheme();
  const [currentImage, setCurrentImage] = useState(guardPhotoshoot);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start fade-out
    setOpacity(0);

    // After fade-out, switch image and fade back in
    const timeout = setTimeout(() => {
      setCurrentImage(theme === "light" ? guardPhotoshootDark : guardPhotoshoot);
      setOpacity(1);
    }, 300); // Duration of fade-out

    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <div
      className="min-h-screen w-full bg-center bg-cover transition-opacity duration-500 ease-in-out relative"
      style={{
        backgroundImage: `url(${currentImage})`,
        opacity: opacity,
        userSelect: "none"
      }}
    >
      {/* Text content */}
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
            text-[#cbd6d2]
            dark:text-[#315386]
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
            text-[#cbd6d2]
            dark:text-[#315386]
            font-medium
            tracking-wide
          "
        >
          Our Guards are Posing for this Gallery.
          <br />
          It will be ready soon.
        </p>
      </div>
    </div>
  );
};

export default Gallery;
