// File: components/ServicesCard.jsx
import React from "react";
import SpotlightCard from "../ReactBits/SpotlightCard.jsx";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext.jsx";
import { Building2, BrushCleaning, Landmark } from "lucide-react";

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

  return (
    <section className="px-8 py-20 lg:px-24 text-white dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors" style={{ userSelect: 'none' }}>
      <h2 className="font-playfair text-4xl font-bold text-center mb-12 animate-fadeIn">Our Core Services</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
              className="custom-spotlight-card text-white min-h-[250px] bg-[#0A0F24] dark:bg-[#dce1ff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72]"
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
    </section>
  );
}
