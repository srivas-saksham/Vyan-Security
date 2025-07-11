import React from "react";
import HeroSection from "./components/HeroSection";
import Clients from "./components/Clients";

//ReactBits Import
import ClickSpark from './ReactBits/ClickSpark.jsx';


export default function App() {
  return (
    <div className="bg-[#0A0F24] text-white min-h-screen font-sans">
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <HeroSection />
        <Clients />

      </ClickSpark>
    </div>
  );
}

