// File: src/components/OurValuesGrid.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  Users,
  SearchCheck,
  AlertCircle,
  BadgeCheck
} from "lucide-react";

const values = [
  {
    title: "Integrity Always",
    icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "We act with uncompromised honesty and uphold the highest moral standards in all we do."
  },
  {
    title: "Rapid Response",
    icon: <Clock3 className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "Time is safety. Our guards are trained for immediate, calm, and strategic reaction."
  },
  {
    title: "Community First",
    icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "Protection with empathy — we serve communities with awareness and cultural respect."
  },
  {
    title: "Vigilant Eyes",
    icon: <SearchCheck className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "Every detail matters. We're trained to detect and deter the smallest signs of risk."
  },
  {
    title: "Prepared for Unseen",
    icon: <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "Readiness isn't optional — it's foundational. We train for the unpredictable."
  },
  {
    title: "Certified Excellence",
    icon: <BadgeCheck className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "All personnel are vetted, trained, and certified under industry-best compliance."
  }
];

const OurValuesGrid = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-12 text-white dark:bg-[#f2f4ff] dark:text-[#000a47] transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.6 }}
          className="text-xl md:text-3xl font-bold font-playfair text-center mb-8 md:mb-12 dark:text-[#000a47] transition-colors"
        >
          The Values that Drive Us
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.6 }}
              className="p-4 md:p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all
              dark:bg-[#fafbff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72]"
            >
              <div className="flex items-center gap-3 mb-3">
                {item.icon}
                <h3 className="text-base md:text-lg font-semibold font-poppins">{item.title}</h3>
              </div>
              <p className="text-gray-300 text-xs md:text-sm font-poppins leading-relaxed dark:text-[#000a47] transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValuesGrid;