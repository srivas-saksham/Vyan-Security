import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import faqImg from '../assets/faqImg.png';

const faqs = [
  {
    question: "What makes Vyan Security different?",
    answer:
      "Our guards are trained in real-world threat scenarios and customer handling etiquette.",
  },
  {
    question: "Can I hire security just for a one-day event?",
    answer:
      "Yes! We provide flexible coverage — from hours to annual contracts.",
  },
  {
    question: "Do your guards have licenses?",
    answer:
      "All our guards are background-verified and PSARA-licensed professionals.",
  },
  {
    question: "Where is Vyan Security available?",
    answer:
      "Currently available in 10+ Indian cities and expanding fast!",
  },
  {
    question: "How soon can I book security personnel?",
    answer:
      "You can book guards as early as the same day, depending on availability.",
  },
  {
    question: "Do you provide armed security services?",
    answer:
      "Yes, we offer both armed and unarmed security based on your needs and local laws.",
  },
  {
    question: "Can I customize the security plan for my property?",
    answer:
      "Absolutely. We provide personalized security assessments and plans.",
  },
  {
    question: "What kind of training do your guards undergo?",
    answer:
      "Our guards complete physical, technical, and soft-skills training, including emergency response simulations.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen text-white dark:bg-[#ccd3ff] dark:text-[#000a47] py-16 px-4 font-poppins"
          style={{userSelect: 'none'}}>
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left Section - FAQs */}
        <div className="w-full lg:w-3/5 text-left">
          <motion.h1
            className="text-4xl sm:text-5xl font-playfair font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <p className="text-lg text-gray-400 dark:text-[#000a47] mb-10">
            Still have doubts? Let’s clear them up.
          </p>
          
          {/*Main FAQs*/}
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scroll-modern ">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                    <div
                        key={index}
                        className="bg-white/5 dark:bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl transition-all duration-300 hover:shadow-lg shadow-md overflow-hidden"
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="flex items-center justify-between px-6 py-4 cursor-pointer">
                            <h2 className="text-lg sm:text-xl font-semibold text-left flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-green-400 dark:bg-blue-600 text-black dark:text-white text-sm flex items-center justify-center font-bold shrink-0">
                                    {index + 1}
                                </span>
                                {faq.question}
                            </h2>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="w-6 h-6 text-green-400 dark:text-blue-600 transition-colors" />
                            </motion.div>
                        </div>
                        <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                            >
                            <div className="px-6 pb-6 pt-0 text-base text-left text-gray-300 dark:text-[#000a47]">
                                {faq.answer}
                            </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    );
                })}
            </div>

          <div className="mt-14 flex items-center justify-start text-sm text-green-300 dark:text-[#000a47] italic gap-2">
            <ShieldCheck className="w-5 h-5" />
            <span>
                Did you know? Our average response time is under{' '}
                <Link to="/contact" className="underline font-semibold hover:text-green-400 dark:hover:text-blue-600 transition">
                    60 minutes
                </Link>.
            </span>

          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full lg:w-2/5 flex justify-center">
          <img
            src={faqImg}
            alt="FAQ Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default FAQs;
