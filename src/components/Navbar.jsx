// File: components/Navbar.jsx

import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoonly.png";

export default function Navbar() {
  const underlineRef = useRef(null);
  const tabRefs = useRef({});

  const tabs = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
    { label: "About Us", path: "/about" },
    { label: "Gallery", path: "/gallery" },
    { label: "FAQs", path: "/faqs" },
  ];

  const location = useLocation();
  const pathname = location.pathname;
  const activeLabel = tabs.find(tab => tab.path === pathname)?.label || "";

  useEffect(() => {
    const activeElement = tabRefs.current[activeLabel];
    const underline = underlineRef.current;

    if (activeElement && underline) {
      const { offsetLeft, offsetWidth } = activeElement;
      underline.style.left = `${offsetLeft}px`;
      underline.style.width = `${offsetWidth}px`;
    }
  }, [pathname, activeLabel]);

  return (
    <nav className="sticky top-0 z-50 relative flex justify-between items-center px-6 py-4 backdrop-blur-sm text-white"
          style={{userSelect: "none"}}>
      {/* Logo and Brand */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
        <img src={logo} alt="Vyan Security Logo" className="w-8 h-8 object-contain" />
        <h1 className="text-xl font-semibold">Vyan Security</h1>
      </Link>

      {/* Navigation Links */}
      <div className="relative">
        <ul className="flex space-x-12 text-sm text-gray-300 relative">
          {tabs.map(({ label, path }) => (
            <li
              key={label}
              ref={(el) => (tabRefs.current[label] = el)}
              className={`pb-1 ${
                activeLabel === label ? "text-white font-medium" : "hover:text-white"
              }`}
            >
              <Link to={path} className="cursor-pointer transition">
                {label}
              </Link>
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
        className="bg-[#25D366] text-[#0A0F24] px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-200 transition"
      >
        Chat on WhatsApp
      </a>
    </nav>
  );
}
