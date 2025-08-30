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
    <section className="relative py-32 px-6 md:px-16 overflow-hidden transition-all duration-700">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-poppins text-white dark:text-[#010944] mb-4">
            Meet Our <span className="text-green-400">Visionary</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column - Founder Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-24"
          >
            {/* Founder Image with Enhanced Styling */}
            <div className="relative mb-12">
              <div className="absolute -inset-6 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-96 h-96 rounded-full overflow-hidden border-4 border-green-400/30 shadow-2xl shadow-green-400/30 dark:shadow-[0_0_50px_#7B7A72]">
                <img
                  src={founderImg}
                  alt="Amardeep Arya Founder"
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-400 to-green-500 text-black px-6 py-3 rounded-full text-base font-bold shadow-xl"
              >
                CEO & Founder
              </motion.div>
            </div>

            {/* Typography Section */}
            <div className="space-y-6 max-w-md">
              <div>
                <h3 className="text-5xl font-bold font-poppins text-white dark:text-[#010944] mb-3 tracking-tight leading-none">
                  Amardeep
                </h3>
                <h3 className="text-5xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-8 tracking-tight leading-tight pb-2">
                  Arya
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center lg:justify-start justify-center gap-3 text-xl text-gray-300 dark:text-[#010944]">
                  <ShieldCheck className="w-7 h-7 text-green-400 flex-shrink-0" />
                  <span className="font-medium">Chief Security Officer</span>
                </div>
                <div className="flex items-center lg:justify-start justify-center gap-3 text-lg text-gray-400 dark:text-[#010944]">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>15+ Years Securing Trust</span>
                </div>
                <div className="flex items-center lg:justify-start justify-center gap-3 text-lg text-gray-400 dark:text-[#010944]">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span>Security Industry Leader</span>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full lg:mx-0 mx-auto"></div>
            </div>
          </motion.div>

          {/* Right Column - Quote and Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:pl-8"
          >
            <SpotlightCard
              spotlightColor={theme === "light" ? "rgba(198, 223, 255, 0.25)" : "rgba(0, 42, 120, 0.39)"}
              className="custom-spotlight-card text-white min-h-[500px] bg-white/10 dark:bg-[#fafbff] backdrop-blur-lg transition-all duration-500 shadow-2xl dark:shadow-[0_0_30px_#7B7A72] border border-white/20 dark:border-[#010944]/20 hover:shadow-3xl hover:scale-[1.02] rounded-3xl"
            >
              <div className="p-10 lg:p-12">
                {/* Quote Icon */}
                <div className="flex justify-center mb-8">
                  <div className="p-6 bg-green-400/20 rounded-full backdrop-blur-sm">
                    <Quote className="w-10 h-10 text-green-400" />
                  </div>
                </div>

                {/* Main Quote */}
                <blockquote className="text-gray-100 italic text-2xl lg:text-3xl leading-relaxed font-poppins dark:text-[#010944] transition-colors mb-8 text-center font-light">
                  "Security is not just about guards or gates — it's about trust, vigilance,
                  and the assurance that someone is always watching over what you hold dear."
                </blockquote>

                <blockquote className="text-gray-200 italic text-xl lg:text-2xl leading-relaxed font-poppins dark:text-[#010944] transition-colors mb-12 text-center font-light">
                  "At Vyan Security, we wear this responsibility with pride, ensuring every client feels protected and valued."
                </blockquote>

                {/* Signature */}
                <div className="text-center">
                  <div className="w-24 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-6 rounded-full"></div>
                  <div className="text-white font-bold text-2xl font-poppins dark:text-[#010944] transition-colors tracking-wide">
                    — Amardeep Arya
                  </div>
                  <div className="text-gray-400 text-lg dark:text-[#010944] mt-3 font-light">
                    Founder & CEO, Vyan Security
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
    </section>
  );
};

export default FounderCard;