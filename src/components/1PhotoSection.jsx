import React from "react";
import photo1 from "../assets/gallery/photo1.jpeg";
import photo2 from "../assets/gallery/photo2.png";
import photo3 from "../assets/gallery/photo3.png";
import photo6 from "../assets/gallery/photo6.png";
import photo4 from "../assets/gallery/photo4.png";
import photo5 from "../assets/gallery/photo5.png";

import { useTheme } from "../ThemeContext.jsx";

export default function ImageGallery() {
  const { theme } = useTheme();

  // Gallery images with relative paths
  const galleryImages = [
    {
      id: 1,
      title: "Corporate Security",
      description: "Professional office protection",
      image: photo1
    },
    {
      id: 2,
      title: "Residential Safety",
      description: "24/7 home protection services",
      image: photo2
    },
    {
      id: 3,
      title: "Trained Personnel",
      description: "Expert security professionals",
      image: photo3
    },
    {
      id: 4,
      title: "Advanced Surveillance",
      description: "Modern security systems",
      image: photo4
    },
    {
      id: 5,
      title: "Night Security",
      description: "Round-the-clock vigilance",
      image: photo5
    },
    {
      id: 6,
      title: "Access Control",
      description: "Secure entry management",
      image: photo6
    }
  ];

  return (
    <section className="relative overflow-hidden bg-transparent text-white dark:bg-[#f2f4ff] dark:text-[#000a47] transition-colors py-16 lg:py-24">
      <div className="relative z-10 px-8 lg:px-24">

        {/* Dotted Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, ${theme === "light" ? "white" : "#000a47"} 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
            backgroundPosition: "0 0"
          }}
        ></div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-800 dark:bg-white shadow-lg lg:hover:shadow-2xl transition-all duration-300 lg:transform lg:hover:scale-105 lg:cursor-pointer"
            >
              {/* Image Container - 1:1 aspect ratio on mobile, 3:2 on desktop */}
              <div className="relative overflow-hidden aspect-square lg:aspect-[3/2]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 lg:group-hover:scale-110"
                />
                {/* Gradient Overlay - only on desktop hover */}
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent dark:from-gray-900/90 dark:via-gray-900/50 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Info Overlay for Desktop */}
              <div className="hidden lg:block absolute bottom-0 left-0 right-0 p-6 text-white dark:text-white">
                <h3 className="text-2xl font-bold mb-2 font-playfair">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 dark:text-gray-200">
                  {item.description}
                </p>
              </div>

              {/* Label Below for Mobile */}
              <div className="lg:hidden bg-gray-800 dark:bg-white px-3 py-2 rounded-b-2xl">
                <h3 className="text-sm font-semibold text-white dark:text-[#000a47]">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}