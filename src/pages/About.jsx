// File: src/pages/AboutPage.jsx

import React from "react";
import FounderCard from "../components/3FounderCard.jsx";
import OurValuesGrid from "../components/3OurValuesGrid.jsx";
import CallToActionFooter from "../components/3CTAFooter.jsx";
import { useTheme } from "../ThemeContext.jsx";

import { useEffect } from 'react';

export default function About() {
  const { theme } = useTheme();
  
  useEffect(() => {
    document.title = 'Vyan Security - About Us';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, ['/about']);

  return (
    <div className="relative text-white overflow-x-hidden dark:bg-[#f2f4ff] dark:text-[#000a47] transition-colors"
          style={{userSelect: 'none'}}>
      
      {/* Dotted Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme === "light" ? "white" : "#000a47"} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0"
        }}
      ></div>

      <div className="relative z-10">
        <FounderCard />
        <OurValuesGrid />
        <CallToActionFooter />
      </div>
    </div>
  );
};