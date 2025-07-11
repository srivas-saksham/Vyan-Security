import React from "react";

// Components
import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ServiceCards from "../components/ServiceCards.jsx";
import Stats from "../components/Stats.jsx"
import CallToAction from "../components/callAction.jsx";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceCards />
      <Stats />
      <CallToAction />
    </>
  );
}
