// File: components/CallToAction.jsx

import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CallToAction() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeInUp}
      className="relative py-20 px-4 text-white overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 w-[120%] h-full -translate-x-1/2 bg-gradient-radial from-white/5 to-transparent blur-3xl"></div>
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h2 className="font-playfair text-4xl sm:text-5xl font-bold font-[\'Playfair Display\'] leading-tight">
          Secure Your Premises Today
        </h2>
        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
          Get in touch with <b>Vyan Security</b> for trained guards, rapid response, and verified protection.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-full shadow-lg transition hover:bg-green-700 hover:shadow-xl group"
          >
            <MessageCircle className="mr-2 w-6 h-6 group-hover:animate-pulse" />
            Contact Us Now
          </a>
          <button
            onClick={() => {
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-transparent border border-white rounded-full shadow-lg transition hover:bg-white hover:text-[#0A0F24] hover:shadow-xl"
          >
            <PhoneCall className="mr-2 w-5 h-5" />
            Request a Callback
          </button>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/30 via-white/20 to-green-500/30"></div>
    </motion.section>
  );
}
