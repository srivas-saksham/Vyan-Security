import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  Users,
  SearchCheck,
  AlertCircle,
  BadgeCheck,
  Target,
  Globe,
  Zap,
  TrendingUp
} from "lucide-react";

const values = [
  {
    title: "Integrity Always",
    icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "We act with uncompromised honesty and uphold the highest moral standards in all we do."
  },
  {
    title: "Rapid Response",
    icon: <Clock3 className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "Time is safety. Our guards are trained for immediate, calm, and strategic reaction."
  },
  {
    title: "Community First",
    icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "Protection with empathy — we serve communities with awareness and cultural respect."
  },
  {
    title: "Vigilant Eyes",
    icon: <SearchCheck className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "Every detail matters. We're trained to detect and deter the smallest signs of risk."
  },
  {
    title: "Prepared for Unseen",
    icon: <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "Readiness isn't optional — it's foundational. We train for the unpredictable."
  },
  {
    title: "Certified Excellence",
    icon: <BadgeCheck className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
    desc: "All personnel are vetted, trained, and certified under industry-best compliance."
  }
];

const OurValuesGrid = () => {
  return (
    <>
      {/* Our Mission Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-12 text-white dark:bg-transparent dark:text-[#000a47] transition-colors overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-12 md:space-y-16"
          >
            {/* Eyebrow Text */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-green-400 dark:text-green-600 text-xs md:text-sm uppercase tracking-[0.3em] font-semibold mb-4"
              >
                What Drives Us Forward
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair mb-3 tracking-tight dark:text-[#000a47] transition-colors"
              >
                Our Mission
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"
              ></motion.div>
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 md:space-y-10"
            >
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed md:leading-relaxed font-light text-gray-100 dark:text-[#0a0a0a] transition-colors text-center max-w-4xl mx-auto">
                At <span className="font-semibold text-white dark:text-[#000a47]">Vyan Security</span>, our mission is to provide <span className="italic text-green-300 dark:text-green-700">unparalleled protection</span> through a steadfast commitment to vigilance, professionalism, and integrity.
              </p>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl md:text-3xl font-semibold font-playfair text-white dark:text-[#000a47]">
                    Beyond Protection
                  </h3>
                  <p className="text-base md:text-lg leading-loose text-gray-300 dark:text-[#2a2a2a] transition-colors">
                    We believe that true security goes beyond physical presence—it encompasses <span className="font-medium text-white dark:text-[#000a47]">trust</span>, <span className="font-medium text-white dark:text-[#000a47]">preparedness</span>, and the unwavering dedication to safeguarding what matters most to our clients.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl md:text-3xl font-semibold font-playfair text-white dark:text-[#000a47]">
                    Creating Safe Spaces
                  </h3>
                  <p className="text-base md:text-lg leading-loose text-gray-300 dark:text-[#2a2a2a] transition-colors">
                    We exist to create environments where individuals, families, and businesses can thrive without fear. By combining cutting-edge training and rigorous vetting processes, we deliver solutions that adapt to evolving challenges.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                viewport={{ once: true }}
                className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 dark:from-[#e8eaff] dark:to-[#f5f7ff] backdrop-blur-sm border border-white/10 dark:border-gray-200"
              >
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium text-center text-white dark:text-[#000a47] transition-colors italic">
                  "To be the <span className="text-green-400 dark:text-green-600 not-italic font-bold">guardian</span> you can rely on, the <span className="text-green-400 dark:text-green-600 not-italic font-bold">partner</span> you can trust, and the <span className="text-green-400 dark:text-green-600 not-italic font-bold">shield</span> that stands between uncertainty and peace of mind."
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-12 text-white dark:bg-transparent dark:text-[#000a47] transition-colors overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-12 md:space-y-16"
          >
            {/* Eyebrow Text */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-blue-400 dark:text-blue-600 text-xs md:text-sm uppercase tracking-[0.3em] font-semibold mb-4"
              >
                Where We're Heading
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair mb-3 tracking-tight dark:text-[#000a47] transition-colors"
              >
                Our Vision
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              ></motion.div>
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 md:space-y-10"
            >
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed md:leading-relaxed font-light text-gray-100 dark:text-[#0a0a0a] transition-colors text-center max-w-4xl mx-auto">
                To become India's <span className="italic text-blue-300 dark:text-blue-700">most trusted and innovative</span> security solutions provider, setting new benchmarks in <span className="font-semibold text-white dark:text-[#000a47]">safety</span>, <span className="font-semibold text-white dark:text-[#000a47]">technology</span>, and <span className="font-semibold text-white dark:text-[#000a47]">service excellence</span>.
              </p>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-600/20">
                      <Globe className="w-6 h-6 text-blue-400 dark:text-blue-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold font-playfair text-white dark:text-[#000a47]">
                      National Expansion
                    </h3>
                  </div>
                  <p className="text-base md:text-lg leading-loose text-gray-300 dark:text-[#2a2a2a] transition-colors">
                    We envision expanding our presence across every major city in India, becoming the <span className="font-medium text-white dark:text-[#000a47]">go-to security partner</span> for enterprises, residential complexes, events, and government institutions nationwide.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/20 dark:bg-purple-600/20">
                      <Zap className="w-6 h-6 text-purple-400 dark:text-purple-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold font-playfair text-white dark:text-[#000a47]">
                      Tech-Driven Security
                    </h3>
                  </div>
                  <p className="text-base md:text-lg leading-loose text-gray-300 dark:text-[#2a2a2a] transition-colors">
                    We're committed to integrating <span className="font-medium text-white dark:text-[#000a47]">AI-powered surveillance</span>, real-time monitoring systems, and smart analytics to revolutionize how security is delivered and experienced.
                  </p>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-green-500/20 dark:bg-green-600/20">
                      <Target className="w-6 h-6 text-green-400 dark:text-green-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold font-playfair text-white dark:text-[#000a47]">
                      Specialized Solutions
                    </h3>
                  </div>
                  <p className="text-base md:text-lg leading-loose text-gray-300 dark:text-[#2a2a2a] transition-colors">
                    From <span className="font-medium text-white dark:text-[#000a47]">event security</span> to <span className="font-medium text-white dark:text-[#000a47]">VIP protection</span>, we aim to develop highly specialized divisions that cater to unique security needs with precision and expertise.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-orange-500/20 dark:bg-orange-600/20">
                      <TrendingUp className="w-6 h-6 text-orange-400 dark:text-orange-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold font-playfair text-white dark:text-[#000a47]">
                      Empowering Communities
                    </h3>
                  </div>
                  <p className="text-base md:text-lg leading-loose text-gray-300 dark:text-[#2a2a2a] transition-colors">
                    Beyond business growth, we aspire to <span className="font-medium text-white dark:text-[#000a47]">empower local communities</span> by providing employment, training, and skill development opportunities in the security sector.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                viewport={{ once: true }}
                className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 dark:from-[#e8eaff] dark:to-[#f5f7ff] backdrop-blur-sm border border-white/10 dark:border-gray-200"
              >
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium text-center text-white dark:text-[#000a47] transition-colors italic">
                  "To build a <span className="text-blue-400 dark:text-blue-600 not-italic font-bold">safer India</span>, one where security is not a luxury but a <span className="text-blue-400 dark:text-blue-600 not-italic font-bold">fundamental right</span>, accessible to all and powered by <span className="text-blue-400 dark:text-blue-600 not-italic font-bold">innovation</span>."
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 md:py-20 px-4 md:px-12 text-white bg-transparent dark:bg-transparent dark:text-[#000a47] transition-colors">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.6 }}
            className="text-xl md:text-3xl font-bold font-playfair text-center mb-8 md:mb-12 dark:text-[#000a47] transition-colors"
          >
            The Values that Drive Us
          </motion.h2>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.6 }}
                className="p-4 md:p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all
                dark:bg-[#f2f4ff] transition-shadow duration-500 shadow-lg dark:shadow-[0_0_20px_#7B7A72]"
              >
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h3 className="text-base md:text-lg font-semibold font-poppins">{item.title}</h3>
                </div>
                <p className="text-gray-300 text-xs md:text-sm font-poppins leading-relaxed dark:text-[#000a47] transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurValuesGrid;