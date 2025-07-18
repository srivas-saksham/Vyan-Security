import React from "react";

// Components
import Navbar from "../components/0Navbar.jsx";
import HeroSection from "../components/1HeroSection.jsx";
import ServiceCards from "../components/1ServiceCards.jsx";
import Stats from "../components/1Stats.jsx"
import CallToAction from "../components/1callAction.jsx";

import { useEffect } from 'react';


export default function Home() {
  useEffect(() => {
    document.title = 'Vyan Security - Home';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, ['/']);

  return (
    <div className="dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors">
      <HeroSection />
      <ServiceCards />
      <Stats />
      <CallToAction />
    </div>
  );
}
