// File: components/Navbar.jsx

import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoonly.png";
import logoDark from "../assets/logoonly-dark.png";
import { useTheme } from "../ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const underlineRef = useRef(null);
  const tabRefs = useRef({});
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
    { label: "About Us", path: "/about" },
    { label: "Gallery", path: "/gallery" },
    { label: "FAQs", path: "/faqs" },
  ];

  const location = useLocation();
  const pathname = location.pathname;
  const isKnownPath = tabs.some((tab) => tab.path === pathname);
  const activeLabel = tabs.find((tab) => tab.path === pathname)?.label || (!isKnownPath ? "What is this page?" : "");

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
    <nav
      className="sticky top-0 z-50 relative flex justify-between items-center px-6 py-4 backdrop-blur-sm transition-colors text-white dark:bg-[#dce1ff] dark:text-black"
      style={{ userSelect: "none" }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
        <img
          src={theme === "light" ? logo : logoDark}
          alt="Vyan Security Logo"
          className="w-8 h-8 object-contain"
        />
        <h1 className="text-xl font-semibold">Vyan Security</h1>
      </Link>

      {/* Navigation Links */}
      <div className="relative">
        <ul className="flex space-x-12 text-sm text-gray-300 dark:text-gray-700 relative">
          {tabs.map(({ label, path }) => (
            <li
              key={label}
              ref={(el) => (tabRefs.current[label] = el)}
              className={`pb-1 ${
                activeLabel === label
                  ? "text-white dark:text-black font-medium"
                  : "hover:text-white dark:hover:text-black"
              }`}
            >
              <Link to={path} className="cursor-pointer transition">
                {label}
              </Link>
            </li>
          ))}

          {!isKnownPath && (
            <li
              ref={(el) => (tabRefs.current["What is this page?"] = el)}
              className="pb-1 text-xs sm:text-sm text-white/70 dark:text-black/70 font-medium"
            >
              <Link to="/404" className="cursor-default">
                What is this page?
              </Link>
            </li>
          )}
        </ul>

        {/* Underline */}
        <span
          ref={underlineRef}
          className="absolute bottom-[-4px] h-[2px] bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
        ></span>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "Dark" : "Light"} Theme`}
          className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition cursor-pointer"
        >
          {theme === "light" ? (
            <Moon size={22} className="text-white" />
          ) : (
            <Sun size={22} className="text-gray-800" />
          )}
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-[#0A0F24] px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-200 dark:hover:bg-[#66e495] transition"
        >
          Chat on WhatsApp
        </a>
      </div>
    </nav>
  );
}
