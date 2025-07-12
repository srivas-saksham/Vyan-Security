// File: components/BookContractForm.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function BookContractForm() {
  const [formData, setFormData] = useState({
    company: "",
    contactPerson: "",
    contactNumber: "",
    siteLocation: "",
    securityType: "Corporate",
    startDate: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { company, contactPerson, contactNumber, siteLocation, startDate } = formData;

    if (company && contactPerson && contactNumber && siteLocation && startDate) {
      const templateParams = {
        company: formData.company,
        contactPerson: formData.contactPerson,
        contactNumber: formData.contactNumber,
        siteLocation: formData.siteLocation,
        securityType: formData.securityType,
        startDate: formData.startDate,
        email: formData.contactPersonEmail || ""
      };

      // Send to admin
      emailjs.send("service_dfr2c4y", "template_05ja1ug", templateParams, "y-A9giT-xgqX91XUf")
        .then(() => {
          console.log("✅ Contract booking sent to admin");
        })
        .catch((error) => {
          console.error("Admin email error:", error);
        });

      // Send to client
      emailjs.send("service_dfr2c4y", "template_05ja1ug", templateParams, "y-A9giT-xgqX91XUf")
        .then(() => {
          console.log("✅ Welcome email sent to client");
        })
        .catch((error) => {
          console.error("Client email error:", error);
        });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({
        company: "",
        contactPerson: "",
        contactNumber: "",
        siteLocation: "",
        securityType: "Corporate",
        startDate: ""
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-xl backdrop-blur bg-white/5 border border-white/10"
    >
      <h2 className="text-2xl font-semibold mb-4 font-[\'Playfair Display\']">Book a Contract</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company/Organization Name"
          required
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
        />

        <input
          type="text"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          placeholder="Contact Person"
          required
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
        />

        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          required
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
        />

        <input
          type="text"
          name="siteLocation"
          value={formData.siteLocation}
          onChange={handleChange}
          placeholder="Site Location"
          required
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
        />

        <select
          name="securityType"
          value={formData.securityType}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg text-white focus:ring-2 focus:ring-green-400"
        >
          <option value="Corporate" className="text-black">Corporate</option>
          <option value="Residential" className="text-black">Residential</option>
          <option value="Institute" className="text-black">Institute</option>
        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg text-white focus:ring-2 focus:ring-green-400"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-[#0A0F24] font-semibold rounded-lg shadow-md transition"
        >
          Book Now
        </button>

        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-sm mt-2 text-center"
          >
                Your booking request has been submitted.
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
