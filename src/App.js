import React from "react";

// Components
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import ServiceCards from "./components/ServiceCards.jsx";
import Stats from "./components/Stats.jsx"
import Clients from "./components/Clients.jsx";

// ReactBits Imports
import ClickSpark from "./ReactBits/ClickSpark.jsx"

export default function App() {
  return (
    <div
      className="text-white min-h-screen font-sans"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 10%, rgba(0, 17, 255, 0.15), transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(0, 255, 150, 0.1), transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05), transparent 100%),
          radial-gradient(circle at 90% 95%, rgba(0, 255, 150, 0.1), transparent 40%),
          radial-gradient(circle at 10% 85%, rgba(0, 17, 255, 0.15), transparent 40%)`,
        backgroundColor: "#0A0F24",
      }}
    >
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Navbar />
        <HeroSection />
        <ServiceCards />
        <Stats/>
        <Clients />

      </ClickSpark>
    </div>
  );
}
