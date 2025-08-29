// File: components/Navbar.jsx

import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoonly.png";
import logoDark from "../assets/logoonly-dark.png";
import { useTheme } from "../ThemeContext";
import { Sun, Moon, Menu, X, Home, Phone, Users, Image, HelpCircle } from "lucide-react";

export default function Navbar() {
  const underlineRef = useRef(null);
  const tabRefs = useRef({});
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { label: "Home", path: "/", icon: Home },
    { label: "Contact", path: "/contact", icon: Phone },
    { label: "About Us", path: "/about", icon: Users },
    { label: "Gallery", path: "/gallery", icon: Image },
    { label: "FAQs", path: "/faqs", icon: HelpCircle },
  ];

  const location = useLocation();
  const pathname = location.pathname;
  const isKnownPath = tabs.some((tab) => tab.path === pathname);
  const activeLabel =
    tabs.find((tab) => tab.path === pathname)?.label ||
    (!isKnownPath ? "What is this page?" : "");

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
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 w-full py-4 backdrop-blur-sm shadow-sm dark:bg-[#dce1ff] dark:text-black"
        style={{userSelect: 'none'}}>
        {/* Top Bar Layout: Logo | Nav Links | Controls */}
        <div className="w-full px-4 sm:px-6 md:px-8 flex items-center">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={theme === "light" ? logo : logoDark}
                alt="Vyan Security Logo"
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-lg sm:text-xl font-semibold">Vyan Security</h1>
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden xs960:flex flex-1 justify-center items-center relative">
            <ul className="flex space-x-10 text-sm">
              {tabs.map(({ label, path }) => (
                <li
                  key={label}
                  ref={(el) => (tabRefs.current[label] = el)}
                  className={`pb-1 ${
                    activeLabel === label
                      ? "text-white dark:text-black font-medium"
                      : "text-gray-500 hover:text-white dark:hover:text-black"
                  }`}
                >
                  <Link to={path}>{label}</Link>
                </li>
              ))}
              {!isKnownPath && (
                <li
                  ref={(el) => (tabRefs.current["What is this page?"] = el)}
                  className="pb-1 text-xs sm:text-sm text-white dark:text-black/70 font-medium"
                >
                  <Link to="/404">What is this page?</Link>
                </li>
              )}
            </ul>
            <span
              ref={underlineRef}
              className="absolute bottom-[-4px] h-[2px] bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Right: Theme Toggle & WhatsApp */}
          <div className="flex items-center gap-3 shrink-0 ml-auto">
            {/* Theme Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-300"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* WhatsApp Full Button ≥500px */}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xs500:inline-flex items-center bg-[#25D366] text-[#0A0F24] px-4 py-2 rounded-full text-sm font-medium hover:bg-green-400"
            >
              Chat on WhatsApp
            </a>

            {/* WhatsApp Icon <500px */}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex xs500:hidden p-2 rounded-full bg-[#25D366] hover:bg-green-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M16 .396a15.6 15.6 0 0 0-13.793 23.1L.396 31.604 8.73 29.8a15.6 15.6 0 1 0 7.27-29.404Zm0 28.542a13.15 13.15 0 0 1-6.693-1.805l-.477-.274-4.974 1.157 1.064-4.858-.311-.5A13.2 13.2 0 1 1 16 28.938Zm7.279-9.78c-.4-.2-2.364-1.169-2.73-1.3-.365-.133-.632-.2-.9.2-.265.4-1.033 1.3-1.27 1.57-.233.265-.465.3-.865.1a10.7 10.7 0 0 1-3.1-1.909 11.69 11.69 0 0 1-2.2-2.756c-.232-.4 0-.615.176-.815.176-.177.4-.466.6-.7.2-.233.265-.4.4-.665a.763.763 0 0 0-.034-.7c-.1-.2-.9-2.16-1.232-2.957-.326-.8-.662-.687-.9-.7H9.55a1.77 1.77 0 0 0-1.2.566c-.4.4-1.6 1.557-1.6 3.8s1.638 4.4 1.866 4.7c.233.3 3.222 4.915 7.8 6.666a26.36 26.36 0 0 0 2.6.8 6.18 6.18 0 0 0 2.822.179c.865-.13 2.667-1.092 3.043-2.148.4-1.057.4-1.957.3-2.149-.133-.2-.465-.3-.865-.466Z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Dock Navigation */}
      <div className="xs960:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <div className="mx-4 mb-4">
          <div className="bg-white/90 dark:bg-[#dce1ff]/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-300/50">
            <div className="px-3 py-3">
              <div className="flex items-center justify-around">
                {tabs.map(({ label, path, icon: IconComponent }) => {
                  const isActive = activeLabel === label;
                  return (
                    <Link
                      key={label}
                      to={path}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-200/50 min-w-0"
                    >
                      <div
                        className={`p-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                            : "bg-gray-100 dark:bg-gray-200"
                        }`}
                      >
                        <IconComponent
                          size={18}
                          className={`${
                            isActive 
                              ? "text-white" 
                              : "text-gray-600 dark:text-gray-700"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium leading-none ${
                          isActive
                            ? "text-blue-600 dark:text-blue-700"
                            : "text-gray-500 dark:text-gray-600"
                        }`}
                      >
                        {label === "About Us" ? "About" : label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Padding to prevent content overlap */}
      <div className="xs960:hidden h-24" />
    </>
  );
}