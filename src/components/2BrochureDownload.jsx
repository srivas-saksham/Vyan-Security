import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, CheckCircle, AlertCircle, Eye, TrendingUp, Users } from "lucide-react";
import Brochure from "../assets/brochure.pdf"

export default function BrochureDownload() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [downloadCount, setDownloadCount] = useState(247);
  const [todayDownloads, setTodayDownloads] = useState(5);

  // Import your PDF file
  const pdfUrl = Brochure;

  // Simulate real-time download tracking
  useEffect(() => {
    const interval = setInterval(() => {
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Vyan-Security-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
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

  const openPDFViewer = () => {
    // Option 1: Simple - Just open PDF in new tab (browser's native viewer)
    window.open(pdfUrl, '_blank');
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

        {/* Preview Button */}
        <div className="mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={openPDFViewer}
            className="w-full relative cursor-pointer rounded-lg overflow-hidden bg-slate-800/50 dark:bg-slate-200/30 p-4 border border-slate-700/50 dark:border-slate-400/30 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-20 bg-gradient-to-br from-blue-500/20 to-green-500/20 dark:from-blue-400/20 dark:to-green-400/20 rounded border border-slate-600/50 dark:border-slate-400/50 flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-400 dark:text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-slate-200 dark:text-[#030d48] mb-1">
                  Vyan Security Brochure
                </h3>
                <p className="text-sm text-slate-400 dark:text-[#030d48]/70 mb-2">
                  Click to open PDF viewer in a new window
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-400 dark:text-blue-600">
                  <Eye className="w-4 h-4" />
                  Open PDF Viewer
                </div>
              </div>
            </div>
          </motion.button>
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
          PDF Format • Approx. 2.5 MB • Last updated: 10/10/2025
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-green-500/10 dark:from-blue-400/10 dark:to-green-400/10 blur-xl" />
      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 blur-lg" />
    </motion.div>
  );
}