import { Facebook, Instagram, Linkedin, Phone, Mail, ArrowUp } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <footer className="bg-[#0A0F24] text-gray-300 py-12 px-4 dark:bg-[#fafbff] dark:text-[#000a47] transition-colors shadow-[0_-2px_18px_-2px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2 sm:px-4">
        
        {/* Logo & Mission */}
        <div>
          <h3 className="text-2xl font-semibold text-white dark:text-[#000a47]">Vyan Security</h3>
          <p className="mt-2 text-sm text-gray-400 dark:text-[#000a47]">
            Your trusted security partner. We deliver verified protection and rapid response.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-medium text-white mb-3 dark:text-[#000a47]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white dark:hover:text-[#5f7eff]">Home</Link></li>
            <li><Link to="/contact" className="hover:text-white dark:hover:text-[#5f7eff]">Contact</Link></li>
            <li><Link to="/about" className="hover:text-white dark:hover:text-[#5f7eff]">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-white dark:hover:text-[#5f7eff]">Gallery</Link></li>
            <li><Link to="/faqs" className="hover:text-white dark:hover:text-[#5f7eff]">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-medium text-white mb-3 dark:text-[#000a47]">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 9810245920 | 9311806920
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> vyan.secure1432@gmail.com
            </li>
            <li>
              <a
                href="https://wa.me/919810245920"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-green-500 hover:text-green-400"
              >
                WhatsApp Us ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Legal */}
        <div>
          <h4 className="text-lg font-medium text-white mb-3 dark:text-[#000a47]">Follow Us</h4>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="hover:text-white dark:hover:text-[#5f7eff]"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white dark:hover:text-[#5f7eff]"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white dark:hover:text-[#5f7eff]"><Instagram className="w-5 h-5" /></a>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <p>© {new Date().getFullYear()} Vyan Security. All rights reserved.</p>
            <p>
              <a href="#" className="hover:text-white dark:hover:text-[#5f7eff]">Privacy Policy</a> ·
              <a href="#" className="ml-2 hover:text-white dark:hover:text-[#5f7eff]">Terms</a>
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Fixed for Mobile */}
      <button
        onClick={scrollToTop}
        onTouchStart={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 active:bg-green-800 transition-all duration-200 touch-manipulation select-none"
        style={{
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}