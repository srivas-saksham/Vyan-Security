// File: src/pages/AboutPage.jsx

import React from "react";
import FounderCard from "../components/3FounderCard.jsx";
import OurValuesGrid from "../components/3OurValuesGrid.jsx";
import CallToActionFooter from "../components/3CTAFooter.jsx";

import { useEffect } from 'react';

export default function About() {
    useEffect(() => {
        document.title = 'Vyan Security - About Us';
      }, []);
    
      useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, ['/about']);

  return (
    <div className="text-white overflow-x-hidden dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors"
          style={{userSelect: 'none'}}>
      <FounderCard />
      <OurValuesGrid />
      <CallToActionFooter />
    </div>
  );
};

