// File: src/components/FounderCard.jsx

import React from "react";
import { motion } from "framer-motion";
import { Quote, ShieldCheck, MapPin } from "lucide-react";
import founderImg from "../assets/logo.png";
import SpotlightCard from "../ReactBits/SpotlightCard.jsx";
import { useTheme } from "../ThemeContext.jsx";

const FounderCard = () => {
  const { theme } = useTheme();

  return (
    <section className="py-12 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-poppins text-white dark:text-[#010944] mb-3">
            Meet Our <span className="text-green-400">Visionary</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto"></div>
        </motion.div>

        {/* Mobile Layout - Stacked */}
        <div className="block md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            {/* Mobile Founder Image */}
            <div className="relative mb-6 inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-green-400/30 shadow-lg">
                <img
                  src={founderImg}
                  alt="Amardeep  Founder"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Mobile Badge */}
              <div className="absolute -bottom-2 -right-2 bg-green-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
                CEO
              </div>
            </div>

            {/* Mobile Typography */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-poppins text-white dark:text-[#010944] mb-1">
                Amardeep <span className="text-green-400"></span>
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-300 dark:text-[#010944]">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span>Chief Security Officer</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-[#010944]">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>15+ Years Experience</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-[#010944]">
                  <MapPin className="w-4 h-4" />
                  <span>Security Industry Leader</span>
                </div>
              </div>
            </div>

            {/* Mobile Quote Card */}
            <SpotlightCard
              spotlightColor={theme === "light" ? "rgba(198, 223, 255, 0.25)" : "rgba(0, 42, 120, 0.39)"}
              className="bg-white/10 dark:bg-[#fafbff] backdrop-blur-lg border border-white/20 dark:border-[#010944]/20 rounded-2xl shadow-lg dark:shadow-[0_0_30px_#7B7A72]"
            >
              <div className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-400/20 rounded-full backdrop-blur-sm">
                    <Quote className="w-5 h-5 text-green-400" />
                  </div>
                </div>

                {/* Mobile Quote */}
                <blockquote className="text-gray-100 dark:text-[#010944] italic text-sm leading-relaxed font-poppins mb-4 text-center font-light">
                  "Security is not just about guards or gates — it's about trust, vigilance, and the assurance that someone is always watching over what you hold dear."
                </blockquote>

                <blockquote className="text-gray-200 dark:text-[#010944] italic text-xs leading-relaxed font-poppins mb-6 text-center font-light">
                  "At Vyan Security, we wear this responsibility with pride, ensuring every client feels protected and valued."
                </blockquote>

                {/* Mobile Signature */}
                <div className="text-center">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-3"></div>
                  <div className="text-white dark:text-[#010944] font-semibold text-sm font-poppins">
                    — Amardeep 
                  </div>
                  <div className="text-gray-400 dark:text-[#010944] text-xs mt-1">
                    Founder & CEO, Vyan Security
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Founder Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Desktop Founder Image */}
            <div className="relative mb-8">
              <div className="w-64 lg:w-80 h-64 lg:h-80 rounded-full overflow-hidden border-3 border-green-400/20 shadow-xl">
                <img
                  src={founderImg}
                  alt="Amardeep  Founder"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Desktop Badge */}
              <div className="absolute -bottom-3 -right-3 bg-green-400 text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                CEO & Founder
              </div>
            </div>

            {/* Desktop Typography */}
            <div className="space-y-4 max-w-md">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold font-poppins text-white dark:text-[#010944] mb-2">
                  Amardeep
                </h3>
                <h3 className="text-3xl lg:text-4xl font-bold font-poppins text-green-400 mb-6">
                  
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center lg:justify-start justify-center gap-3 text-lg text-gray-300 dark:text-[#010944]">
                  <ShieldCheck className="w-6 h-6 text-green-400" />
                  <span className="font-medium">Chief Security Officer</span>
                </div>
                <div className="flex items-center lg:justify-start justify-center gap-3 text-base text-gray-400 dark:text-[#010944]">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>15+ Years Securing Trust</span>
                </div>
                <div className="flex items-center lg:justify-start justify-center gap-3 text-base text-gray-400 dark:text-[#010944]">
                  <MapPin className="w-5 h-5" />
                  <span>Security Industry Leader</span>
                </div>
              </div>

              <div className="w-24 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 lg:mx-0 mx-auto"></div>
            </div>
          </motion.div>

          {/* Right Column - Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard
              spotlightColor={theme === "light" ? "rgba(198, 223, 255, 0.25)" : "rgba(0, 42, 120, 0.39)"}
              className="bg-white/10 dark:bg-[#fafbff] backdrop-blur-lg border border-white/20 dark:border-[#010944]/20 rounded-3xl shadow-xl dark:shadow-[0_0_30px_#7B7A72] hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-8 lg:p-10">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-400/20 rounded-full backdrop-blur-sm">
                    <Quote className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                {/* Main Quote */}
                <blockquote className="text-gray-100 dark:text-[#010944] italic text-xl lg:text-2xl leading-relaxed font-poppins mb-6 text-center font-light">
                  "Security is not just about guards or gates — it's about trust, vigilance, and the assurance that someone is always watching over what you hold dear."
                </blockquote>

                <blockquote className="text-gray-200 dark:text-[#010944] italic text-lg lg:text-xl leading-relaxed font-poppins mb-8 text-center font-light">
                  "At Vyan Security, we wear this responsibility with pride, ensuring every client feels protected and valued."
                </blockquote>

                {/* Signature */}
                <div className="text-center">
                  <div className="w-20 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-4"></div>
                  <div className="text-white dark:text-[#010944] font-bold text-xl font-poppins">
                    — Amardeep
                  </div>
                  <div className="text-gray-400 dark:text-[#010944] text-base mt-2">
                    Founder & CEO, Vyan Security
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderCard;