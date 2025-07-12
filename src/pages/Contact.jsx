// File: components/ContactPage.jsx

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import QueryForm from "../components/QueryForm.jsx";
import BookContractForm from "../components/BookContractForm";
import RequestCallback from "../components/RequestCallback";
import BrochureDownload from "../components/BrochureDownload.jsx";

export default function Contact() {
  return (
    <section className="text-white min-h-screen
     px-6 py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-[\'Playfair Display\'] font-bold leading-tight">
          Let’s Secure What Matters — Get in Touch Today
        </h1>
        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto font-[\'Poppins\']">
          Reach out to Vyan Security for reliable protection, personalized contracts, or callback assistance.
        </p>
      </motion.div>

      {/* Forms Layout */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="space-y-10">
          <QueryForm />
          <RequestCallback />
        </div>

        <div className="space-y-10">
          <BookContractForm />
          <BrochureDownload />
        </div>
      </div>
    </section>
  );
}
