// File: src/components/FounderCard.jsx

import React from "react";
import { motion } from "framer-motion";
import { Quote, ShieldCheck } from "lucide-react";
import founderImg from "../assets/logo.png";
import SpotlightCard from "../ReactBits/SpotlightCard.jsx";
import { useTheme } from "../ThemeContext.jsx";

const FounderCard = () => {
  const { theme } = useTheme();
  return (
    <section className="relative py-24 px-6 md:px-16 overflow-hidden text-white dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        {/* Founder Image Section - filled and decorated */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col items-center justify-center gap-6"
        >
          <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-green-400/20 shadow-xl shadow-green-400/30 dark:shadow-[0_0_30px_#7B7A72]">
            <img
              src={founderImg}
              alt="Amardeep Arya Founder"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold font-poppins">Founder & Visionary</h3>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-[#000a47]">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span>15+ Years Securing Trust</span>
            </div>
          </div>
        </motion.div>

        {/* Message Section */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-transparent"
            >
            <SpotlightCard
                spotlightColor={theme === "light" ? "rgba(198, 223, 255, 0.25)" : "rgba(0, 42, 120, 0.39)"}
                className="custom-spotlight-card text-white min-h-[250px] bg-translucent dark:bg-[#dce1ff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72]"
            >
                <div className="gap-3">
                    <Quote className="w-6 h-6 text-green-400 mt-1" />
                    <p className="text-gray-300 italic text-lg leading-relaxed font-poppins dark:text-[#000a47] transition-colors">
                    Security is not just about guards or gates — it’s about trust, vigilance,
                    and the assurance that someone is always watching over what you hold dear.
                    </p>
                    <p className="text-gray-300 italic text-lg leading-relaxed font-poppins dark:text-[#000a47] transition-colors">
                        At Vyan Security, we wear this responsibility with pride.
                    </p>
                </div>

                <div className="mt-6 text-right text-white font-medium font-poppins dark:text-[#000a47] transition-colors">
                    — Amardeep Arya, Founder
                </div>
            </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderCard;
