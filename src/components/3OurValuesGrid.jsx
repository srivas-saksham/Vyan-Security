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
    icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
    desc: "We act with uncompromised honesty and uphold the highest moral standards in all we do."
  },
  {
    title: "Rapid Response",
    icon: <Clock3 className="w-8 h-8 text-green-400" />,
    desc: "Time is safety. Our guards are trained for immediate, calm, and strategic reaction."
  },
  {
    title: "Community First",
    icon: <Users className="w-8 h-8 text-green-400" />,
    desc: "Protection with empathy — we serve communities with awareness and cultural respect."
  },
  {
    title: "Vigilant Eyes",
    icon: <SearchCheck className="w-8 h-8 text-green-400" />,
    desc: "Every detail matters. We’re trained to detect and deter the smallest signs of risk."
  },
  {
    title: "Prepared for Unseen",
    icon: <AlertCircle className="w-8 h-8 text-green-400" />,
    desc: "Readiness isn't optional — it's foundational. We train for the unpredictable."
  },
  {
    title: "Certified Excellence",
    icon: <BadgeCheck className="w-8 h-8 text-green-400" />,
    desc: "All personnel are vetted, trained, and certified under industry-best compliance."
  }
];

const OurValuesGrid = () => {
  return (
    <section className="relative py-24 px-6 md:px-20 text-white dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold font-playfair text-center mb-16 dark:text-[#000a47] transition-colors"
        >
          The Values that Drive Us
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.6 }}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all
              dark:bg-[#dce1ff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72]"
            >
              <div className="flex items-center gap-4 mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold font-poppins">{item.title}</h3>
              </div>
              <p className="text-gray-300 text-sm font-poppins leading-relaxed dark:text-[#000a47] transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative radial gradient behind */}
      <div className="absolute -top-10 -left-20 w-96 h-96 bg-green-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
    </section>
  );
};

export default OurValuesGrid;
