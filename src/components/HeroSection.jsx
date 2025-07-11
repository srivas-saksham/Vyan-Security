import React from "react";
// import shieldImage from "../assets/shield.png";
import "./HeroSection.css"
import shieldImage from "../assets/shield-image.png";
import bannerImgA from "../assets/banner-img-1.jpg";
import bannerImgB from "../assets/banner-img-2.jpg";
import bannerImgC from "../assets/banner-img-3.jpg";


//ReactBits Imports
import SplitText from "../ReactBits/SplitText.jsx";
import ShinyText from '../ReactBits/ShinyText.jsx';
import CardSwap, { Card } from '../ReactBits/CardSwap.jsx'


export default function HeroSection() {
  return (
  <section className="relative text-white overflow-hidden">

    {/* Content Container */}
    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:px-24">
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
          className="shiny-text text-base sm:text-s md:text-l lg:text-xl xl:text-2xl mb-4 sm:mb-5 md:mb-6 text-gray-300"
        />

        <p className="text-gray-400 mb-8">
          Vyan Security provides licensed, trained security guards for corporate offices,
          events, homes, and VIP protection across India.
        </p>
        <a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-medium"
        >
          Book a Contract
        </a>
      </div>
        {/* <img
          src={shieldImage}
          alt="Shield"
          className="w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-90 max-w-full h-auto animate-fadeIn"
        /> */}

        <div style={{ height: '600px', position: 'relative', transform: 'translateX(-80px) translateY(-150px)'}}>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            <Card>
              <div className="flex flex-col w-full h-full">
                <h3 className="text-white text-xl font-semibold text-center">Elite Trained Guards</h3>
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
                <h3 className="text-white text-xl font-semibold text-center">24/7 Protection</h3>
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
                <h3 className="text-white text-xl font-semibold text-center">Corporate & Residential Coverage</h3>
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
