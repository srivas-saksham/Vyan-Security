import React from "react";

// Components
import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ServiceCards from "../components/ServiceCards.jsx";
import Stats from "../components/Stats.jsx"
import CallToAction from "../components/callAction.jsx";

import { useEffect } from 'react';



export default function Home() {
  useEffect(() => {
    document.title = 'Vyan Security - Home';
  }, []);
  return (
    <div className="dark:bg-[#ccd3ff]">
      <HeroSection />
      <ServiceCards />
      <Stats />
      <CallToAction />
    </div>
  );
}
