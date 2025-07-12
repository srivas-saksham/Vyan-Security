// File: components/QueryForm.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

export default function QueryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    };

    emailjs.send("service_x3e64p1", "template_05ja1ug", templateParams, "y-A9giT-xgqX91XUf")
      .then(() => {
        toast.success("Query submitted successfully! We'll contact you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        toast.error("Failed to submit query");
      });

    // Optional: send second email to the client (confirmation)
    emailjs.send("service_x3e64p1", "template_18009xi", templateParams, "y-A9giT-xgqX91XUf")
      .then(() => {
        console.log("Confirmation email sent to client");
      })
      .catch((error) => {
        console.error("Client email error:", error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-xl backdrop-blur bg-white/5 border border-white/10"
    >
      <h2 className="text-2xl font-semibold mb-4 font-[\'Playfair Display\']">Have a Question?</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message / Query"
          required
          rows={4}
          className="w-full px-4 py-2 bg-transparent border border-gray-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-[#0A0F24] font-semibold rounded-lg shadow-md transition"
        >
          Submit Query
        </button>
      </form>
    </motion.div>
  );
}
