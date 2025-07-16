// File: components/RequestCallback.jsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { PhoneCall } from "lucide-react";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

export default function RequestCallback() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, ['/contact']);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    timeSlot: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const toggleForm = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, timeSlot } = formData;

    if (name && phone && timeSlot) {
      setIsSending(true);

      const templateParams = {
        name,
        phone,
        timeSlot
      };

      emailjs
        .send(
          "service_m7kt3zc",
          "template_4h8yn3r",
          templateParams,
          "Hi72EIqa0ftMFDS_e"
        )
        .then(() => {
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 4000);
          setFormData({ name: "", phone: "", timeSlot: "" });
          setIsOpen(false);
          toast.success("Callback Requested, We'll contact you soon.");
          console.log("Callback Request sent to Admin.");
        })
        .catch((error) => {
          console.error("❌ Failed to send callback request:", error);
          toast.error("❌ Failed to send callback request.");
        })
        .finally(() => setIsSending(false));
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-6 rounded-xl backdrop-blur bg-white/5 border border-white/10 dark:bg-[#dce1ff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72] dark:text-[#000a47] transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <motion.span
          animate={isHovered ? { rotate: [-10, 10, -10] } : { rotate: 0 }}
          transition={isHovered ? { duration: 1.5, repeat: Infinity } : {}}
        >
          <PhoneCall className="text-green-400 w-5 h-5" />
        </motion.span>
        <h2 className="text-2xl font-semibold font-[\'Playfair Display\']">Request a Callback</h2>
      </div>

      <p className="text-sm text-gray-300 mb-6 font-['Poppins'] dark:text-[#000a47] transition-colors">
        You’ll receive a call from our team within 24 hours.
      </p>

      <button
        type="button"
        onClick={toggleForm}
        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-[#0A0F24] font-semibold rounded-full shadow-md transition"
      >
        {isOpen ? "Cancel" : "Request a Callback"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="mt-6 space-y-4 overflow-hidden"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 dark:border-blue-500 dark:text-[#010b48]"
            />

            <input
              type="tel"
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 dark:border-blue-500 dark:text-[#010b48]"
            />

            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none dark:border-blue-500 dark:text-[#010b48]"
            >
              <option value="" disabled className="text-gray-400 bg-[#0A0F24] dark:bg-[#9ba9ff] dark:text-[#010b48]">
                Preferred Time Slot
              </option>
              <option value="Morning" className="text-white bg-[#0A0F24] dark:bg-[#9ba9ff] dark:text-[#010b48]">Morning</option>
              <option value="Afternoon" className="text-white bg-[#0A0F24] dark:bg-[#9ba9ff] dark:text-[#010b48]">Afternoon</option>
              <option value="Evening" className="text-white bg-[#0A0F24] dark:bg-[#9ba9ff] dark:text-[#010b48]">Evening</option>
            </select>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2 flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-[#0A0F24] font-semibold rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <svg
                  className="animate-spin h-5 w-5 text-[#0A0F24]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Submit Request"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}