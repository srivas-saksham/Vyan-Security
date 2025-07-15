// File: src/components/CallToActionFooter.jsx

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, PhoneCall, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";

const CallToActionFooter = () => {
  return (
    <section className=" py-20 px-6 md:px-20 relative overflow-hidden dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 text-white">
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
          className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg shadow-green-400/10 flex flex-col space-y-5 justify-center dark:bg-[#dce1ff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72]"
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

      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default CallToActionFooter;
