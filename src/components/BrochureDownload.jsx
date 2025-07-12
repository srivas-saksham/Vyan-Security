// File: components/BrochureDownload.jsx

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function BrochureDownload() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-xl backdrop-blur bg-white/5 border border-white/10 text-white"
    >
      <h2 className="text-2xl font-semibold mb-3 font-[\'Playfair Display\']">Download Our Service Brochure</h2>
      <p className="text-sm text-gray-300 mb-6 font-[\'Poppins\']">
        Learn more about our offerings, personnel standards, and security deployment plans.
      </p>

      <a
        href="/assets/brochure.pdf"
        download
        className="flex items-center gap-2 w-fit px-6 py-2 rounded-full border border-white/30 hover:border-green-400 hover:shadow-xl transition-all bg-white/10 hover:bg-green-500 text-white hover:text-[#0A0F24]"
      >
        <FileText className="w-5 h-5" />
        Download PDF
      </a>
    </motion.div>
  );
}
