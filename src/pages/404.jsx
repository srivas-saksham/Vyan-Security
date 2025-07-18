// File: src/pages/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";
import guardImg from "../assets/guardDrool.png";

import { useEffect } from "react";

const NotFound = () => {
    useEffect(() => {
      document.title = 'Vyan Security - Page Not Found';
    }, []);
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, ['/*']);
        
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-[#0A0F24] via-[#1A2337] to-[#000510] text-white overflow-hidden dark:bg-gradient-to-br dark:from-[#ccd3ff] dark:via-[#e4e9ff] dark:to-[#ffffff] dark:text-[#000a47] transition-colors">
      {/* Background Blur Elements */}
      <div className="absolute w-[400px] h-[400px] top-0 -left-20 bg-purple-500/10 blur-[140px] rounded-full animate-pulse -z-10" />
      <div className="absolute w-[300px] h-[300px] bottom-10 right-0 bg-blue-400/10 blur-[100px] rounded-full animate-spin-slow -z-10" />

      {/* 404 Heading */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl font-extrabold text-white/10 tracking-widest whitespace-nowrap select-none pointer-events-none z-0 dark:text-[#abb9df] transition-colors">
        Error
      </div>
      <h1 className="absolute inset-0 flex items-center justify-center text-[65vw] font-extrabold text-white/10 whitespace-nowrap select-none pointer-events-none z-0 dark:text-[#abb9df] transition-colors">
        404
      </h1>


      {/* Left Side Funny Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={guardImg}
          alt="Sleeping Guard"
          className="w-[320px] md:w-[420px] lg:w-[480px] object-contain drop-shadow-xl"
        />
      </div>

      {/* Right Side Text + Buttons */}
      <div className="text-center md:text-left max-w-xl w-full md:w-1/2 space-y-6 animate-fade-in-up z-10 ">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-playfair text-white leading-snug sm:leading-normal md:leading-relaxed dark:text-[#000a47]">
          <span className="block text-5xl sm:text-6xl md:text-7xl text-green-400 font-black tracking-tight leading-tight dark:text-blue-800">
              Oops!
          </span>
          Maybe the door you knocked on wasn’t guarded securely...
          </h2>

          <p className="text-base sm:text-xl text-gray-300 font-poppins leading-relaxed sm:leading-loose dark:text-[#000a47]">
          Let this not happen to your facility. Get <span className="text-green-400 font-semibold dark:text-blue-800">real</span> security now.
          </p>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl border border-blue-500 transition-all"
            >
            Home
            </Link>
            <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl border border-green-500 transition-all"
            >
            Hire Security
            </Link>
        </div>
      </div>

    </div>
  );
};

export default NotFound;
