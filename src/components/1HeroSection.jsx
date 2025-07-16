import React from "react";
import { Link } from 'react-router-dom';
import "./1HeroSection.css";
import bannerImgA from "../assets/banner-img-1.jpg";
import bannerImgB from "../assets/banner-img-2.jpg";
import bannerImgC from "../assets/banner-img-3.jpg";

// ReactBits
import SplitText from "../ReactBits/SplitText.jsx";
import ShinyText from "../ReactBits/ShinyText.jsx";
import CardSwap, { Card } from "../ReactBits/CardSwap.jsx";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden text-white dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors"
      style={{ userSelect: "none" }}
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:px-24">
        {/* Text Content */}
        <div className="max-w-xl">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <SplitText
              text="Protect what"
              className="font-playfair font-semibold text-center text-3xl sm:text-5xl lg:text-7xl"
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
            <br />
            <SplitText
              text="Matters the Most!"
              className="font-playfair font-semibold text-center text-2xl sm:text-4xl lg:text-6xl"
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

          <ShinyText
            text="With Trusted Security Personnel"
            disabled={false}
            speed={2.1}
            className="shiny-text text-base sm:text-s md:text-l lg:text-xl xl:text-2xl mb-4 sm:mb-5 md:mb-6 text-gray-300 dark:text-gray-700"
          />

          <p className="text-gray-400 dark:text-gray-600 mb-8">
            Vyan Security provides licensed, trained security guards on a contract basis for corporate offices and residential properties across Delhi NCR.
          </p>

          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Book a Contract
          </Link>

        </div>

        {/* CardSwap Section */}
        <div
          className="hidden lg:block"
          style={{
            height: "600px",
            position: "relative",
            transform: "translateX(-80px) translateY(-150px)",
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
