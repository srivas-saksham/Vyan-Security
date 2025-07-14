// File: components/BrochureDownload.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function BrochureDownload() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-6 rounded-xl backdrop-blur bg-white/5 border border-white/10 text-white dark:bg-[#dce1ff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72] dark:text-[#000a47] transition-colors"
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.span
          animate={isHovered ? { rotate: [-10, 10, -10] } : { rotate: 0 }}
          transition={isHovered ? { duration: 1.5, repeat: Infinity } : {}}
        >
          <FileText className="w-6 h-6 text-green-400" />
        </motion.span>
        <h2 className="text-2xl font-semibold font-[\'Playfair Display\']">
          Download Our Service Brochure
        </h2>
      </div>

      <p className="text-2sm text-gray-300 mb-6 font-[\'Poppins\'] dark:text-[#000a47] transition-colors">
        Learn more about our offerings, personnel standards, and security deployment plans.
      </p>

      <a
        href="/assets/brochure.pdf"
        download
        className="flex items-center gap-2 w-fit px-6 py-2 rounded-full border border-white/30 dark:border-[#000a47] bg-white/10 dark:bg-[#d1d5db]/20 text-white dark:text-[#000a47] hover:bg-green-500 dark:hover:bg-green-500 hover:border-green-400 dark:hover:border-[#d1d5db] hover:text-[#0A0F24] hover:shadow-xl transition-all transition-colors"

      >
        <span className="sr-only">Download Icon</span>
        <FileText className="w-6 h-6 hidden" />
        Download PDF
      </a>
    </motion.div>
  );
}
