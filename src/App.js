import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/0Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/0Chatbot.jsx";
import ClickSpark from "./ReactBits/ClickSpark.jsx";

// Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import FAQs from "./pages/FAQs.jsx";
import NotFound from "./pages/404.jsx";

export default function App() {
  return (
    <div
      className="text-white min-h-screen font-sans dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors scroll-modern"
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
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <Toaster
          toastOptions={{
            duration: 5000,
            style: {
              background: "#dde4ffff",
              color: "#232323ff",
              fontWeight: "500",
            },
            position:"bottom-center"
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
        <Footer />
      </ClickSpark>
    </div>
  );
}
