// File: components/ServicesCard.jsx
import React from "react";
import SpotlightCard from "../ReactBits/SpotlightCard.jsx";
import { motion } from "framer-motion";
import {
  Building2,
  Home,
  Landmark
} from "lucide-react";

const services = [
  {
    title: "Corporate Office Security",
    description:
      "Contract-based security personnel for corporate buildings and offices, trained in professional protocol and access control.",
    icon: <Building2 size={36} className="text-white" />,
  },
  {
    title: "Residential & Society Security",
    description:
      "Round-the-clock guarding, patrolling, visitor screening, emergency response, and access control for apartments, gated communities, and residential societies.",
    icon: <Home size={36} className="text-white" />,
  },
  {
    title: "Institutional Security",
    description:
      "Professional security staff for schools, colleges, hospitals, and other institutions—ensuring safety, discipline, and controlled access on a contractual basis.",
    icon: <Landmark size={36} className="text-white" />,
  }
];

export default function ServicesCard() {
  return (
    <section className="px-8 py-20 lg:px-24 text-white" style={{ userSelect: 'none' }}>
      <h2 className="font-playfair text-4xl font-bold text-center mb-12 animate-fadeIn">Our Core Services</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true, amount: 0.6 }}
          >
            <SpotlightCard
              spotlightColor="rgba(198, 223, 255, 0.15)"
              className="custom-spotlight-card text-white min-h-[250px]"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
