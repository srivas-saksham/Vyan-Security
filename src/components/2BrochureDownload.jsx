import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, CheckCircle, AlertCircle, Eye, X, ChevronLeft, ChevronRight, TrendingUp, Users } from "lucide-react";
import pdfFile from '../assets/brochure.pdf';
import Bpage1 from "../assets/brochure-img/brochure-1.jpg";
import Bpage2 from "../assets/brochure-img/brochure-2.jpg";
import Bpage3 from "../assets/brochure-img/brochure-3.jpg";
import Bpage4 from "../assets/brochure-img/brochure-4.jpg";
import Bpage5 from "../assets/brochure-img/brochure-5.jpg";


export default function BrochureDownload() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [downloadCount, setDownloadCount] = useState(247);
  const [todayDownloads, setTodayDownloads] = useState(5);

  // Sample brochure pages data
  
  const brochurePages = [
    {
      id: 1,
      title: "Title Page",
      thumbnail: Bpage1
    },
    {
      id: 2,
      title: "Security Services Overview",
      thumbnail: Bpage2
    },
    {
      id: 3,
      title: "Personnel Standards & Training",
      thumbnail: Bpage3
    },
    {
      id: 4,
      title: "Personnel Standards & Training",
      thumbnail: Bpage4
    },
    {
      id: 5,
      title: "Vyan Map",
      thumbnail: Bpage5
    }
  ];

  // Simulate real-time download tracking
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update download count (simulate real activity)
      if (Math.random() > 0.7) {
        setDownloadCount(prev => prev + 1);
        if (Math.random() > 0.5) {
          setTodayDownloads(prev => prev + 1);
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadStatus(null);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));
      const pdfUrl = pdfFile;
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Vyan-Security-Brochure.pdf';
      link.target = '_blank'; // Optional: open in new tab
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      
      // Update analytics
      setDownloadCount(prev => prev + 1);
      setTodayDownloads(prev => prev + 1);
      
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus(null), 3000);
      
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus(null), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % brochurePages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + brochurePages.length) % brochurePages.length);
  };

  const getStatusIcon = () => {
    if (downloadStatus === 'success') {
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    } else if (downloadStatus === 'error') {
      return <AlertCircle className="w-5 h-5 text-red-400" />;
    }
    return null;
  };

  const getStatusMessage = () => {
    if (downloadStatus === 'success') {
      return "Download completed successfully!";
    } else if (downloadStatus === 'error') {
      return "Download failed. Please try again.";
    }
    return null;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden p-8 rounded-2xl backdrop-blur-xl bg-slate-900/90 dark:bg-[#fafbff] border border-slate-700/50 dark:border-slate-300/30 text-white dark:text-[#030d48] shadow-2xl hover:shadow-3xl transition-all duration-700 group"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 1 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-green-500/20 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-green-400/20"
          />
        </div>

        {/* Content container */}
        <div className="relative z-10">
          {/* Header with Analytics */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={isHovered ? { 
                  rotate: [-5, 5, -5],
                  scale: [1, 1.1, 1]
                } : { 
                  rotate: 0,
                  scale: 1
                }}
                transition={isHovered ? { 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {}}
                className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-green-500/20 dark:from-blue-400/30 dark:to-green-400/30 backdrop-blur-sm"
              >
                <FileText className="w-8 h-8 text-blue-400 dark:text-blue-600" />
              </motion.div>
              
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 dark:from-blue-600 dark:via-purple-600 dark:to-green-600 bg-clip-text text-transparent mb-1">
                  Service Brochure
                </h2>
                <p className="text-sm text-slate-400 dark:text-[#030d48]/70 font-medium">
                  Vyan Security
                </p>
              </div>
            </div>

            {/* Download Analytics */}
            <div className="text-right">
              <motion.div 
                key={downloadCount}
                initial={{ scale: 1.2, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1 text-sm font-semibold text-green-400 dark:text-green-600 mb-1"
              >
                <TrendingUp className="w-4 h-4" />
                {downloadCount.toLocaleString()}+ downloads
              </motion.div>
              <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-[#030d48]/60">
                <Users className="w-3 h-3" />
                {todayDownloads} today
              </div>
            </div>
          </div>

          {/* Brochure Preview Thumbnail */}
          <div className="mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer rounded-lg overflow-hidden bg-slate-800/50 dark:bg-slate-200/30 p-4 border border-slate-700/50 dark:border-slate-400/30"
              onClick={() => setShowPreview(true)}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={brochurePages[0].thumbnail} 
                  alt="Brochure preview"
                  className="w-16 h-20 object-cover rounded border border-slate-600/50 dark:border-slate-400/50"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-200 dark:text-[#030d48] mb-1">
                    Vyan Security Brochure
                  </h3>
                  <p className="text-sm text-slate-400 dark:text-[#030d48]/70 mb-2">
                    Click to preview all pages before downloading
                  </p>
                  <button className="flex items-center gap-2 text-sm text-blue-400 dark:text-blue-600 hover:text-blue-300 dark:hover:text-blue-500 transition-colors">
                    <Eye className="w-4 h-4" />
                    Quick Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Status Message */}
          {downloadStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${
                downloadStatus === 'success' 
                  ? 'bg-green-500/20 dark:bg-green-400/20 border border-green-500/30 dark:border-green-400/30' 
                  : 'bg-red-500/20 dark:bg-red-400/20 border border-red-500/30 dark:border-red-400/30'
              }`}
            >
              {getStatusIcon()}
              <span className={`text-sm font-medium ${
                downloadStatus === 'success' ? 'text-green-400 dark:text-green-600' : 'text-red-400 dark:text-red-600'
              }`}>
                {getStatusMessage()}
              </span>
            </motion.div>
          )}

          {/* Download Button */}
          <motion.button
            onClick={handleDownload}
            disabled={isDownloading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            isDownloading 
              ? 'bg-slate-700/50 dark:bg-gray-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-500 dark:to-green-500 hover:from-blue-500 hover:to-green-500 dark:hover:from-blue-400 dark:hover:to-green-400 shadow-lg hover:shadow-xl'
          } ${isDownloading ? 'text-white dark:text-[#030d48]' : 'text-white dark:text-white'}`}
          >
            <motion.div
              animate={isDownloading ? { 
                y: [0, 8, 0],
                scale: [1, 0.9, 1]
              } : { 
                y: 0,
                scale: 1
              }}
              transition={isDownloading ? { 
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
            >
              <Download className={`w-6 h-6 ${!isDownloading && 'group-hover:translate-y-0.5'} transition-transform duration-300`} />
            </motion.div>
            
            <span className="font-bold tracking-wide">
              {isDownloading ? 'Preparing Download...' : 'Download PDF Brochure'}
            </span>

            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={isHovered ? { scale: 1, opacity: 0 } : { scale: 0, opacity: 0.5 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-white/20 dark:bg-white/30 rounded-2xl"
              />
            </div>
          </motion.button>

          {/* File info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-center text-xs text-slate-400 dark:text-[#030d48]/50"
          >
            PDF Format • Approx. 2.5 MB • Last updated: 30/8/2025
            {/* {new Date().toLocaleDateString()} */}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-green-500/10 dark:from-blue-400/10 dark:to-green-400/10 blur-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 blur-lg" />
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 dark:bg-[#fafbff] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white dark:text-[#030d48] mb-1">
                    Brochure Preview
                  </h3>
                  <p className="text-slate-400 dark:text-[#030d48]/70">
                    Page {currentPage + 1} of {brochurePages.length}
                  </p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 rounded-full bg-slate-800 dark:bg-slate-200 text-white dark:text-[#030d48] hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Page Content */}
              <div className="flex items-center justify-center mb-6 bg-slate-800/50 dark:bg-slate-200/50 rounded-xl p-8 relative overflow-hidden">
                <motion.img
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  src={brochurePages[currentPage].thumbnail}
                  alt={brochurePages[currentPage].title}
                  className="max-w-full max-h-96 object-contain rounded-lg shadow-2xl cursor-zoom-in hover:scale-105 transition-transform duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    const img = e.target;
                    const rect = img.getBoundingClientRect();
                    const overlay = document.createElement('div');
                    overlay.className = 'fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 cursor-zoom-out';
                    
                    const magnifiedImg = document.createElement('img');
                    magnifiedImg.src = img.src;
                    magnifiedImg.alt = img.alt;
                    magnifiedImg.className = 'max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl';
                    magnifiedImg.style.transform = 'scale(0.8)';
                    magnifiedImg.style.transition = 'transform 0.3s ease-out';
                    
                    overlay.appendChild(magnifiedImg);
                    document.body.appendChild(overlay);
                    
                    // Animate in
                    setTimeout(() => {
                      magnifiedImg.style.transform = 'scale(1)';
                    }, 10);
                    
                    // Close on click
                    overlay.onclick = () => {
                      magnifiedImg.style.transform = 'scale(0.8)';
                      setTimeout(() => {
                        document.body.removeChild(overlay);
                      }, 300);
                    };
                    
                    // Close on escape key
                    const handleKeyDown = (e) => {
                      if (e.key === 'Escape') {
                        overlay.click();
                        document.removeEventListener('keydown', handleKeyDown);
                      }
                    };
                    document.addEventListener('keydown', handleKeyDown);
                  }}
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevPage}
                  disabled={brochurePages.length <= 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-200 text-white dark:text-[#030d48] hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {/* Page Indicators */}
                <div className="flex gap-2">
                  {brochurePages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentPage
                          ? 'bg-blue-500 dark:bg-blue-600 scale-125'
                          : 'bg-slate-600 dark:bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={brochurePages.length <= 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-200 text-white dark:text-[#030d48] hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Download from Modal */}
              <div className="mt-6 pt-4 border-t border-slate-700 dark:border-slate-300">
                <motion.button
                  onClick={() => {
                    setShowPreview(false);
                    handleDownload();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-500 dark:to-green-500 hover:from-blue-500 hover:to-green-500 dark:hover:from-blue-400 dark:hover:to-green-400 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download Full Brochure
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}