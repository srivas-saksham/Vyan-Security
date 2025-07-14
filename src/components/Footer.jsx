// File: components/Footer.jsx

import { Facebook, Instagram, Linkedin, Phone, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0A0F24] text-gray-300 py-12 px-4 dark:bg-[#dce1ff] dark:text-[#000a47] transition-colors">
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

        {/* Logo & Mission */}
        <div>
          <h3 className="text-2xl font-semibold text-white dark:text-[#000a47] transition-colors">Vyan Security</h3>
          <p className="mt-2 text-sm text-gray-400 dark:text-[#000a47] transition-colors">
            Your trusted security partner. We deliver verified protection and rapid response.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-medium text-white mb-3 dark:text-[#000a47] transition-colors">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-medium text-white mb-3 dark:text-[#000a47] transition-colors">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 9810245920 | 9311806920
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> vyan.secure1432@gmail.com
            </li>
            <li>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-green-500 hover:text-green-400 transition"
              >
                WhatsApp Us ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Legal */}
        <div>
          <h4 className="text-lg font-medium text-white mb-3 dark:text-[#000a47] transition-colors">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white"><Instagram className="w-5 h-5" /></a>
          </div>
          <div className="mt-6 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Vyan Security. All rights reserved.</p>
            <p className="mt-1">
              <a href="#" className="hover:text-white">Privacy Policy</a> · <a href="#" className="hover:text-white">Terms</a>
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
