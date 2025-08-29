// File: components/CallToAction.jsx

import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CallToAction() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeInUp}
      className="relative py-20 sm:py-16 md:py-20 px-4 text-white overflow-hidden dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors"
    >
      {/* Dotted Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme === "light" ? "white" : "#000a47"} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0"
        }}
      ></div>

      <div
        className="
          absolute top-0 left-0 w-full h-1 
          bg-gradient-to-r 
          from-green-500/30 via-white/20 to-green-500/30
          dark:from-blue-500/30 dark:via-black-100/20 dark:to-blue-500/30
          transition-colors duration-500
        "
      />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold font-['Playfair Display'] leading-tight">
          Secure Your Premises Today
        </h2>
        <p className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto dark:text-[#000a47] transition-colors leading-relaxed">
          Get in touch with <b>Vyan Security</b> for trained guards, rapid response, and verified protection.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-lg font-medium text-white bg-green-600 rounded-full shadow-lg transition hover:bg-green-700 hover:shadow-xl group"
          >
            <MessageCircle className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-6 sm:h-6 group-hover:animate-pulse" />
            <span className="text-xs sm:text-lg font-semibold">Contact Us Now</span>
          </a>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-lg font-medium text-white bg-transparent border border-white rounded-full shadow-lg transition hover:bg-white hover:text-[#0A0F24] hover:shadow-xl dark:bg-[#ccd3ff] dark:text-[#000a47] dark:hover:bg-transparent dark:hover:text-[#000a47] dark:hover:shadow-xl transition-colors transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72]"
          >
            <PhoneCall className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5 dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors" />
            <span className="text-xs sm:text-lg font-semibold">Request a Callback</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}