// File: src/components/FounderCard.jsx

import React from "react";
import { motion } from "framer-motion";
import { Quote, ShieldCheck, MapPin, Award } from "lucide-react";
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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-poppins text-white dark:text-[#010944] mb-3">
            Meet Our <span className="text-green-400">Visionaries</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto"></div>
        </motion.div>

        {/* Mobile Layout - Side by Side */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* First Founder - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="relative mb-3 inline-block">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-green-400/30 shadow-lg">
                  <img
                    src={founderImg}
                    alt="Amardeep Founder"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="absolute -bottom-1 -right-1 bg-green-400 text-black px-2 py-0.5 rounded-full text-[10px] font-semibold">
                  CEO
                </div>
              </div>

              <div className="mb-3">
                <h3 className="text-lg sm:text-xl font-bold font-poppins text-white dark:text-[#010944] mb-1">
                  Amardeep
                </h3>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-center gap-1 text-gray-300 dark:text-[#010944]">
                    <ShieldCheck className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] sm:text-xs">Security Officer</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-400 dark:text-[#010944]">
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    <span className="text-[10px] sm:text-xs">15+ Years</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Second Founder - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="relative mb-3 inline-block">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-blue-400/30 shadow-lg">
                  <img
                    src={founderImg}
                    alt="Co-Founder"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="absolute -bottom-1 -right-1 bg-blue-400 text-black px-2 py-0.5 rounded-full text-[10px] font-semibold">
                  Co-Founder
                </div>
              </div>

              <div className="mb-3">
                <h3 className="text-lg sm:text-xl font-bold font-poppins text-white dark:text-[#010944] mb-1">
                  Name Here
                </h3>
                <p className="text-[10px] sm:text-xs text-green-400 font-medium mb-1">Ex Army Chief</p>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-center gap-1 text-gray-300 dark:text-[#010944]">
                    <Award className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] sm:text-xs">Strategic Advisor</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-400 dark:text-[#010944]">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    <span className="text-[10px] sm:text-xs">30+ Years</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard
              spotlightColor={theme === "light" ? "rgba(198, 223, 255, 0.25)" : "rgba(0, 42, 120, 0.39)"}
              className="bg-white/10 dark:bg-[#fafbff] backdrop-blur-lg border border-white/20 dark:border-[#010944]/20 rounded-2xl shadow-lg dark:shadow-[0_0_30px_#7B7A72]"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-400/20 rounded-full backdrop-blur-sm">
                    <Quote className="w-5 h-5 text-green-400" />
                  </div>
                </div>

                <blockquote className="text-gray-100 dark:text-[#010944] text-sm leading-relaxed font-poppins text-center">
                  "Trust, vigilance, and unwavering protection — that's our promise to every client at Vyan Security."
                </blockquote>

                <div className="text-center mt-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-3"></div>
                  <div className="text-white dark:text-[#010944] font-semibold text-sm font-poppins">
                    Vyan Security
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Founders Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* First Founder - Desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-48 lg:w-56 h-48 lg:h-56 rounded-full overflow-hidden border-3 border-green-400/20 shadow-xl">
                  <img
                    src={founderImg}
                    alt="Amardeep Founder"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="absolute -bottom-3 -right-3 bg-green-400 text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  CEO
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-bold font-poppins text-white dark:text-[#010944]">
                  Amardeep
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-3 text-base text-gray-300 dark:text-[#010944]">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <span>Chief Security Officer</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sm text-gray-400 dark:text-[#010944]">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>15+ Years Securing Trust</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Second Founder - Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-48 lg:w-56 h-48 lg:h-56 rounded-full overflow-hidden border-3 border-blue-400/20 shadow-xl">
                  <img
                    src={founderImg}
                    alt="Co-Founder"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="absolute -bottom-3 -right-3 bg-blue-400 text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Co-Founder
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-3xl font-bold font-poppins text-white dark:text-[#010944]">
                    Name Here
                  </h3>
                  <p className="text-base text-green-400 font-medium mt-1">Ex Army Chief</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-3 text-base text-gray-300 dark:text-[#010944]">
                    <Award className="w-5 h-5 text-blue-400" />
                    <span>Strategic Advisor</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sm text-gray-400 dark:text-[#010944]">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>30+ Years Military Leadership</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop Quote Card - Full Width Below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <SpotlightCard
              spotlightColor={theme === "light" ? "rgba(198, 223, 255, 0.25)" : "rgba(0, 42, 120, 0.39)"}
              className="bg-white/10 dark:bg-[#fafbff] backdrop-blur-lg border border-white/20 dark:border-[#010944]/20 rounded-3xl shadow-xl dark:shadow-[0_0_30px_#7B7A72] hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-8 lg:p-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-400/20 rounded-full backdrop-blur-sm">
                    <Quote className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                <blockquote className="text-gray-100 dark:text-[#010944] text-xl lg:text-2xl leading-relaxed font-poppins text-center">
                  "Trust, vigilance, and unwavering protection — that's our promise to every client at Vyan Security."
                </blockquote>

                <div className="text-center mt-6">
                  <div className="w-20 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-4"></div>
                  <div className="text-white dark:text-[#010944] font-bold text-xl font-poppins">
                    — Leadership Team
                  </div>
                  <div className="text-gray-400 dark:text-[#010944] text-base mt-2">
                    Vyan Security
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