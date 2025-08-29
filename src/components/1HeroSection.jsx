import React from "react";
import { Link } from "react-router-dom";
import "./1HeroSection.css";
import bannerImgA from "../assets/banner-img-1.jpg";
import bannerImgB from "../assets/banner-img-2.jpg";
import bannerImgC from "../assets/banner-img-3.jpg";

// ReactBits
import SplitText from "../ReactBits/SplitText.jsx";
import ShinyText from "../ReactBits/ShinyText.jsx";
import CardSwap, { Card } from "../ReactBits/CardSwap.jsx";
import shieldImg from "../assets/shield-image.png";
import worldMapImg from "../assets/world-map-trans.png";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden text-white dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors"
      style={{ userSelect: "none" }}
    >
      {/* World Map Background */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
        <img
          src={worldMapImg}
          alt="World Map Background"
          className="w-full h-full object-cover object-center"
          style={{
            filter: "invert(1) brightness(0.7) contrast(1.2)",
            mixBlendMode: "multiply"
          }}
        />
      </div>

      {/* Shield Background on Small Screens
      <div className="block lg:hidden absolute inset-0 z-5 opacity-90">
        <img
          src={shieldImg}
          alt="Shield"
          className="w-4/5 max-w-md mx-auto mt-10 opacity-20"
        />
      </div> */}

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:px-24">
        {/* Text Content */}
        <div className="max-w-xl text-center lg:text-left w-full lg:w-auto">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-5xl font-bold mb-6 lg:mb-4 leading-tight lg:leading-tight relative z-10">
            <SplitText
              text="Protect what"
              className="font-playfair font-bold text-5xl sm:text-6xl md:text-7xl lg:text-7xl block"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <SplitText
              text="Matters the Most!"
              className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-6xl block mt-2 lg:mt-1"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </h2>

          <div className="mb-8 lg:mb-6">
            <ShinyText
              text="With Trusted Security Personnel"
              disabled={false}
              speed={2.1}
              className="shiny-text text-xl sm:text-2xl md:text-2xl lg:text-xl xl:text-2xl text-gray-300 dark:text-gray-700"
            />
          </div>

          <p className="text-lg sm:text-xl md:text-xl lg:text-base text-gray-400 dark:text-gray-600 mb-10 lg:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Vyan Security provides licensed, trained security guards on a contract basis for corporate offices and residential properties across Delhi NCR.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 lg:px-6 lg:py-3 rounded-full font-semibold text-lg lg:text-base transition dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg transform hover:scale-105"
            >
              Book a Contract
            </Link>
          </div>
        </div>

        {/* CardSwap on large screens */}
        <div
          className="hidden lg:block"
          style={{
            height: "600px",
            position: "relative",
            transform: "translateX(-80px) translateY(-150px)",
            zIndex: "15"
          }}
        >
          <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
            <Card>
              <div className="flex flex-col w-full h-full">
                <h3 className="text-white text-xl font-semibold text-center">
                  Elite Trained Guards
                </h3>
                <div className="flex-1">
                  <img
                    src={bannerImgA}
                    alt="Image A"
                    className="w-full h-full object-cover rounded-b-xl"
                  />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col w-full h-full">
                <h3 className="text-white text-xl font-semibold text-center">
                  24/7 Protection
                </h3>
                <div className="flex-1">
                  <img
                    src={bannerImgB}
                    alt="Image B"
                    className="w-full h-full object-cover rounded-b-xl"
                  />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col w-full h-full">
                <h3 className="text-white text-xl font-semibold text-center">
                  Corporate & Residential Coverage
                </h3>
                <div className="flex-1">
                  <img
                    src={bannerImgC}
                    alt="Image C"
                    className="w-full h-full object-cover rounded-b-xl"
                  />
                </div>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
    </section>
  );
}