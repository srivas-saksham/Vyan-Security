// File: src/components/CallToActionFooter.jsx

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, PhoneCall, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";

const CallToActionFooter = () => {
  return (
    <section className="py-8 md:py-16 px-4 md:px-12 relative overflow-hidden dark:bg-[#f2f4ff] dark:text-[#000a47] transition-colors">
      <div className="max-w-5xl mx-auto">
        
        {/* Mobile Layout - Stacked */}
        <div className="block md:hidden space-y-6">
          {/* Mobile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-playfair font-bold dark:text-[#000a47] transition-colors">
                Ready to Secure What Matters?
              </h2>
            </div>
            <p className="text-gray-300 text-sm font-poppins dark:text-[#000a47] transition-colors px-4">
              Whether you need trained guards, custom contracts, or just want to learn more — our team is always ready to help.
            </p>
          </motion.div>

          {/* Mobile Action Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg shadow-green-400/10 dark:bg-[#f2f4ff] dark:shadow-[0_0_20px_#7B7A72]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <PhoneCall className="w-5 h-5 text-green-400" />
                <span className="text-base font-semibold font-poppins dark:text-[#000a47] transition-colors">Speak With Our Experts</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <MessageSquareText className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300 font-poppins dark:text-[#000a47] transition-colors text-center">
                  We respond to all queries within 24 hours.
                </span>
              </div>

              <Link
                to="/contact"
                className="block bg-green-500 hover:bg-green-600 transition-colors px-5 py-2.5 rounded-full text-center font-medium text-white font-poppins text-sm"
              >
                Contact Us Now
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden md:grid md:grid-cols-2 items-center gap-12 text-white">
          {/* Left: Message + Icon */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-9 h-9 text-green-400" />
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold dark:text-[#000a47] transition-colors">
                Ready to Secure What Matters?
              </h2>
            </div>
            <p className="text-gray-300 text-lg font-poppins max-w-md dark:text-[#000a47] transition-colors">
              Whether you need trained guards, custom contracts, or just want to learn more —
              our team is always ready to help.
            </p>
          </motion.div>

          {/* Right: Action Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg shadow-green-400/10 flex flex-col space-y-5 justify-center dark:bg-[#f2f4ff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72]"
          >
            <div className="flex items-center gap-4">
              <PhoneCall className="w-6 h-6 text-green-400" />
              <span className="text-xl font-semibold font-poppins dark:text-[#000a47] transition-colors">Speak With Our Experts</span>
            </div>

            <div className="flex items-center gap-4">
              <MessageSquareText className="w-6 h-6 text-green-400" />
              <span className="text-base text-gray-300 font-poppins dark:text-[#000a47] transition-colors">
                We respond to all queries within 24 hours.
              </span>
            </div>

            <Link
              to="/contact"
              className="mt-4 bg-green-500 hover:bg-green-600 transition-colors px-6 py-3 rounded-full text-center font-medium text-white font-poppins w-full"
            >
              Contact Us Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionFooter;