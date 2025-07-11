import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Wrench,
  GlobeLock,
  Clock,
  UserLock,
  BookCheck
} from "lucide-react";

import CountUp from "../ReactBits/CountUp.jsx";

export default function WhyChooseUsStats() {
  const [showPlus, setShowPlus] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const checklist = [
    {
      icon: <ShieldCheck className="text-blue-400 w-5 h-5 mt-1" />,
      text: "Trained & Verified Guards",
    },
    {
      icon: <Wrench className="text-blue-400 w-5 h-5 mt-1" />,
      text: "Customizable Security Plans",
    },
    {
      icon: <GlobeLock className="text-blue-400 w-5 h-5 mt-1" />,
      text: "Pan-India Coverage",
    },
    {
      icon: <Clock className="text-blue-400 w-5 h-5 mt-1" />,
      text: "24/7 Operational Support",
    },
    {
      icon: <UserLock className="text-blue-400 w-5 h-5 mt-1" />,
      text: "Decade of Industry Experience",
    },
    {
      icon: <BookCheck className="text-blue-400 w-5 h-5 mt-1" />,
      text: "High Client Retention Rate",
    },
  ];

  const stats = [
    {
      label: "Guards Deployed",
      value: (
        <>
          <CountUp
            from={0}
            to={50}
            duration={1}
            separator=","
            onEnd={() => setShowPlus(true)}
            className="count-up-text"
          />
          {showPlus && <span className="ml-1">+</span>}
        </>
      ),
    },
    {
      label: "Sites Secured",
      value: (
        <>
          <CountUp
            from={0}
            to={10}
            duration={1}
            separator=","
            onEnd={() => setShowPlus(true)}
            className="count-up-text"
          />
          {showPlus && <span className="ml-1">+</span>}
        </>
      ),
    },
    {
      label: "Client Retention",
      value: (
        <>
          <CountUp
            from={0}
            to={97}
            duration={1}
            separator=","
            onEnd={() => setShowPlus(true)}
            className="count-up-text"
          />
          {showPlus && <span className="ml-1">%</span>}
        </>
      ),
    },
    {
      label: "Cities Covered",
      value: (
        <>
          <CountUp
            from={0}
            to={2}
            duration={1}
            separator=","
            onEnd={() => setShowPlus(true)}
            className="count-up-text"
          />
          {showPlus && <span className="ml-1"></span>}
        </>
      ),
    },
  ];

  return (
    <section
      className="w-full px-8 py-20 lg:px-24 text-white relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12">
        {/* Left - Why Choose Us */}
        <motion.div
            className="lg:w-1/2 bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/10 relative overflow-hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            >
            {/* Decorative vertical line */}
            <div className="absolute top-10 bottom-10 left-6 w-px bg-gradient-to-b from-blue-500/40 via-transparent to-blue-500/40 opacity-20" />

            <h2 className="font-playfair text-3xl font-bold mb-8 text-white">Why Choose Vyan Security?</h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {checklist.map((item, idx) => (
                    <li
                    key={idx}
                    className="flex items-center gap-4 group transition-all duration-300 hover:scale-[1.015]"
                    >
                    {/* Icon container */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600/10 border border-blue-500/20 shadow-md backdrop-blur-md">
                        {item.icon}
                    </div>

                    {/* Text */}
                    <span className="text-gray-300 text-sm group-hover:text-white transition">
                        {item.text}
                    </span>
                    </li>
                ))}
            </ul>
        </motion.div>


        {/* Right - Stats */}
        <motion.div
          className="lg:w-1/2 grid grid-cols-2 gap-6 bg-white/5 rounded-2xl p-8 shadow-lg backdrop-blur-md border border-white/10 "
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
