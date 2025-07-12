// File: components/RequestCallback.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RequestCallback() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    timeSlot: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleForm = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, timeSlot } = formData;
    if (name && phone && timeSlot) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", phone: "", timeSlot: "" });
      setIsOpen(false);
    }
  };

  return (
    <div className="p-6 rounded-xl backdrop-blur bg-white/5 border border-white/10">
      <h2 className="text-2xl font-semibold font-[\'Playfair Display\'] mb-4">Request a Callback</h2>

      <button
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
              className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg text-white focus:ring-2 focus:ring-green-400 placeholder-gray-400"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg text-white focus:ring-2 focus:ring-green-400 placeholder-gray-400"
            />

            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg text-white focus:ring-2 focus:ring-green-400"
            >
              <option value="" disabled className="text-gray-500">Preferred Time Slot</option>
              <option value="Morning" className="text-black">Morning</option>
              <option value="Afternoon" className="text-black">Afternoon</option>
              <option value="Evening" className="text-black">Evening</option>
            </select>

            <button
              type="submit"
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-[#0A0F24] font-semibold rounded-lg shadow-md transition"
            >
              Submit Request
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-400 text-sm mt-4 text-center"
        >
          ✅ Callback request sent. We'll reach out soon!
        </motion.div>
      )}
    </div>
  );
}
