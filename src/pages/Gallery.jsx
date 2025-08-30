import React, { useEffect, useState } from "react";
import guardPhotoshoot from "../assets/guard-photoshoot.png";
import guardPhotoshootDark from "../assets/guard-photoshoot-dark.png";
import { useTheme } from "../ThemeContext";
import { Camera, Clock, Shield, Users } from "lucide-react";

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

  useEffect(() => {
    document.title = 'Vyan Security - Gallery';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, ['/gallery']);

  return (
    <div
      className="min-h-screen w-full bg-center bg-cover transition-opacity duration-500 ease-in-out relative"
      style={{
        backgroundImage: `url(${currentImage})`,
        opacity: opacity,
        userSelect: "none"
      }}
    >
      {/* Desktop Content - Unchanged */}
      <div className="hidden md:block">
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

      {/* Mobile Content - Enhanced */}
      <div className="block md:hidden">
        {/* Mobile Background Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black/20 dark:bg-white/10"></div>
        
        {/* Mobile Content Container */}
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-8">
          
          {/* Mobile Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-[#cbd6d2]/20 dark:bg-[#315386]/20 backdrop-blur-sm">
                <Camera className="w-8 h-8 text-[#cbd6d2] dark:text-[#315386]" />
              </div>
            </div>
            
            <h1 className="text-2xl font-black leading-tight text-[#cbd6d2] dark:text-[#315386] drop-shadow-md tracking-tight mb-2">
              Photo Gallery
            </h1>
            
            <div className="inline-block px-4 py-2 rounded-full bg-[#ffc45c]/90 backdrop-blur-sm">
              <span className="text-sm font-semibold text-black italic">Under Construction</span>
            </div>
          </div>

          {/* Mobile Description */}
          <div className="text-center mb-8 max-w-xs">
            <p className="text-sm text-[#cbd6d2] dark:text-[#315386] font-medium leading-relaxed">
              Our Guards are Currently Posing for this Gallery.
            </p>
          </div>
          
          {/* Mobile Features Grid */}
          <div className="w-full max-w-sm mb-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#cbd6d2]/10 dark:bg-[#315386]/10 backdrop-blur-sm rounded-xl p-4 text-center border border-[#cbd6d2]/20 dark:border-[#315386]/20">
                <Shield className="w-6 h-6 text-[#cbd6d2] dark:text-[#315386] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#cbd6d2] dark:text-[#315386]">Professional Guards</p>
              </div>
              
              <div className="bg-[#cbd6d2]/10 dark:bg-[#315386]/10 backdrop-blur-sm rounded-xl p-4 text-center border border-[#cbd6d2]/20 dark:border-[#315386]/20">
                <Users className="w-6 h-6 text-[#cbd6d2] dark:text-[#315386] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#cbd6d2] dark:text-[#315386]">Expert Team</p>
              </div>
              
              <div className="bg-[#cbd6d2]/10 dark:bg-[#315386]/10 backdrop-blur-sm rounded-xl p-4 text-center border border-[#cbd6d2]/20 dark:border-[#315386]/20 col-span-2">
                <Camera className="w-6 h-6 text-[#cbd6d2] dark:text-[#315386] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#cbd6d2] dark:text-[#315386]">Behind the Scenes Photography</p>
              </div>
            </div>
          </div>

          {/* Mobile Status Card */}
          <div className="w-full max-w-sm">
            <div className="bg-[#cbd6d2]/10 dark:bg-[#315386]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#cbd6d2]/20 dark:border-[#315386]/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#ffc45c]" />
                <span className="text-sm font-semibold text-[#cbd6d2] dark:text-[#315386]">Coming Soon</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#cbd6d2] dark:text-[#315386]">Progress</span>
                  <span className="text-xs font-medium text-[#cbd6d2] dark:text-[#315386]">75%</span>
                </div>
                
                <div className="w-full bg-[#cbd6d2]/20 dark:bg-[#315386]/20 rounded-full h-2">
                  <div className="bg-[#ffc45c] h-2 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                </div>
                
                <p className="text-xs text-center text-[#cbd6d2] dark:text-[#315386] mt-3">
                  Gallery will be ready soon with professional photos of our security team in action.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Floating Elements */}
          <div className="absolute top-20 left-4 w-2 h-2 bg-[#ffc45c]/60 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-6 w-1 h-1 bg-[#cbd6d2]/40 dark:bg-[#315386]/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 left-8 w-1.5 h-1.5 bg-[#ffc45c]/50 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-4 w-2 h-2 bg-[#cbd6d2]/30 dark:bg-[#315386]/30 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;