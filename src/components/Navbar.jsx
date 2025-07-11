import React, { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const underlineRef = useRef(null);
  const tabRefs = useRef({});

  const tabs = ["Home", "Services", "Contact", "About Us", "Gallery"];

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    const underline = underlineRef.current;

    if (activeElement && underline) {
      const { offsetLeft, offsetWidth } = activeElement;
      underline.style.left = `${offsetLeft}px`;
      underline.style.width = `${offsetWidth}px`;
    }
  }, [activeTab]);

  return (
    <nav className="sticky top-0 z-50 relative flex justify-between items-center px-6 py-4 bg-[#0A0F24]\70 backdrop-blur-md text-white">
      {/* Logo */}
      <h1 className="text-xl font-semibold">Vyan Security</h1>

      {/* Navigation Links */}
      <div className="relative">
        <ul className="flex space-x-12 text-sm text-gray-300 relative">
          {tabs.map((tab) => (
            <li
              key={tab}
              ref={(el) => (tabRefs.current[tab] = el)}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-1 ${
                activeTab === tab ? "text-white font-medium" : "hover:text-white"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>

        {/* Sliding underline */}
        <span
          ref={underlineRef}
          className="absolute bottom-0 h-[2px] bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
        ></span>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="	bg-[#25D366] text-[#0A0F24] px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-200 transition"
      >
        Chat on WhatsApp
      </a>
    </nav>
  );
}
