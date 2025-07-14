// File: components/ContactPage.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import QueryForm from "../components/QueryForm.jsx";
import RequestCallback from "../components/RequestCallback";
import BrochureDownload from "../components/BrochureDownload.jsx";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
      document.title = 'Vyan Security - Contact Us';
    }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="text-white min-h-screen px-6 py-12 dark:bg-[#ccd3ff] dark:text-[#000a47] transition-colors">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-12"
        style={{userSelect: "none"}}
      >
        <h1 className="text-4xl sm:text-5xl font-[\'Playfair Display\'] font-bold leading-tight">
          Let’s Secure What Matters — Get in Touch Today
        </h1>
        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto font-[\'Poppins\'] dark:text-[#000a47] transition-colors">
          Reach out to Vyan Security for reliable protection, personalized contracts, or callback assistance.
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

      {/* Back to Top Button */}
      {showTopBtn && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur text-white p-3 rounded-full hover:bg-white/20 transition"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </section>
  );
}
