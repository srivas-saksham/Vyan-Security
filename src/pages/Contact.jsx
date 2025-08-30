// File: components/ContactPage.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QueryForm from "../components/2QueryForm.jsx";
import RequestCallback from "../components/2RequestCallback.jsx";
import BrochureDownload from "../components/2BrochureDownload.jsx";
import { useTheme } from "../ThemeContext.jsx";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  const { theme } = useTheme();

  useEffect(() => {
      document.title = 'Vyan Security - Contact Us';
    }, []);

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, ['/contact']);


  return (
    <section className="relative text-white min-h-screen px-6 py-12 dark:bg-[#f2f4ff] dark:text-[#000a47] transition-colors">
      {/* Dotted Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme === "light" ? "white" : "#000a47"} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0"
        }}
      ></div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-12"
          style={{userSelect: "none"}}
        >
          <h1 className="text-4xl sm:text-5xl font-[\'Playfair Display\'] font-bold leading-tight">
            Let's Secure What Matters — Get in Touch Today
          </h1>
          <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto font-[\'Poppins\'] dark:text-[#000a47] transition-colors">
            Reach out to <b>Vyan Security</b> for reliable protection, personalized contracts, or callback assistance.
          </p>
        </motion.div>

        {/* Forms Layout */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-10"
          >
            <div className="hover:bg-white/10 hover:shadow-xl transition rounded-xl">
              <QueryForm />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-10"
          >
            <div className="hover:bg-white/10 hover:shadow-xl transition rounded-xl">
              <RequestCallback />
            </div>
            <div className="hover:bg-white/10 hover:shadow-xl transition rounded-xl">
              <BrochureDownload />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}