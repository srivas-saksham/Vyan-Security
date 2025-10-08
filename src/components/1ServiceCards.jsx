// File: components/ServicesCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SpotlightCard from "../ReactBits/SpotlightCard.jsx";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext.jsx";
import { Building2, BrushCleaning, Landmark, ChevronDown, ChevronUp } from "lucide-react";

const services = [
  {
    title: "Corporate Office Security",
    description:
      "Contract-based security personnel for corporate buildings and offices, trained in professional protocol and access control.",
    icon: Building2,
  },
  {
    title: "Professional Housekeeping Services",
    description: 
      "Male housekeepers for corporates and institutions, professional cleaning and maintenance staff, long-term contract solutions with reliable and trained personnel.",
    icon: BrushCleaning,
  },
  {
    title: "Institutional Security",
    description:
      "Professional security staff for schools, colleges, hospitals, and other institutions—ensuring safety, discipline, and controlled access on a contractual basis.",
    icon: Landmark,
  }
];

export default function ServicesCard() {
  const { theme } = useTheme();
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-24 py-12 sm:py-16 lg:py-20 text-white dark:bg-[#f2f4ff] dark:text-[#000a47] transition-colors overflow-hidden" style={{ userSelect: 'none' }}>
      {/* Dotted Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme === "light" ? "white" : "#000a47"} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0"
        }}
      ></div>
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
      <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 animate-fadeIn">Our Core Services</h2>
      
      {/* Mobile View - Compact Cards with Dropdowns */}
      <div className="block lg:hidden space-y-3">
        {services.map(({ title, description, icon: Icon }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.8 }}
            className="bg-[#0A0F24] dark:bg-[#fafbff] rounded-lg border border-gray-800 dark:border-gray-300 overflow-hidden"
          >
            {/* Card Header - Always Visible */}
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              onClick={() => toggleCard(index)}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`${theme === "light" ? "text-white" : "text-[#000a47]"} flex-shrink-0`} size={20} />
                <h3 className="text-sm font-semibold dark:text-[#000a47] transition-colors leading-tight">{title}</h3>
              </div>
              <div className={`${theme === "light" ? "text-white" : "text-[#000a47]"} transition-transform duration-200 ${expandedCard === index ? 'rotate-180' : ''}`}>
                <ChevronDown size={16} />
              </div>
            </div>
            
            {/* Card Content - Expandable */}
            <motion.div
              initial={false}
              animate={{
                height: expandedCard === index ? "auto" : 0,
                opacity: expandedCard === index ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                <div className="pt-2 border-t border-gray-700 dark:border-gray-400">
                  <p className="text-gray-400 dark:text-[#000a47] text-xs leading-relaxed">{description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
        
        {/* Mobile Stats/Info Cards */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-[#0A0F24] dark:bg-[#fafbff] rounded-lg p-3 text-center border border-gray-800 dark:border-gray-300">
            <div className="text-blue-400 dark:text-blue-600 text-lg font-bold">24/7</div>
            <div className="text-xs text-gray-400 dark:text-[#000a47]">Available</div>
          </div>
          <div className="bg-[#0A0F24] dark:bg-[#fafbff] rounded-lg p-3 text-center border border-gray-800 dark:border-gray-300">
            <div className="text-blue-400 dark:text-blue-600 text-lg font-bold">50+</div>
            <div className="text-xs text-gray-400 dark:text-[#000a47]">Clients</div>
          </div>
        </div>
        
        {/* Mobile Quick Contact */}
        <div className="mt-4 bg-blue-600 dark:bg-blue-500 rounded-lg p-4 text-center">
          <div className="text-white text-sm font-semibold mb-1">Need Custom Security?</div>
          <span className="text-blue-100 text-xs">Get personalized solutions for your needs
            <Link to="/contact">
              <span className="underline font-semibold hover:text-blue-300 dark:hover:text-blue-200 transition ml-1">now</span>
            </Link>
          </span>
        </div>
      </div>

      {/* Desktop View - Original SpotlightCards */}
      <div className="hidden lg:grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, icon: Icon }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true, amount: 0.6 }}
          >
            <SpotlightCard
              spotlightColor={theme === "light" ? "rgba(198, 223, 255, 0.15)" : "rgba(0, 42, 120, 0.2)"}
              className="custom-spotlight-card text-white min-h-[250px] bg-[#0A0F24] dark:bg-[#fafbff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72]"
            >
              <div className="text-4xl mb-4 transition-colors">
                <Icon className={theme === "light" ? "text-white" : "text-[#000a47]"} size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-[#000a47] transition-colors">{title}</h3>
              <p className="text-gray-400 text-sm dark:text-[#000a47] transition-colors">{description}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}