// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { MessageCircle, Shield } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [dimensions, setDimensions] = useState({ width: 320, height: 400 });
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState('portrait');
  
  const containerRef = useRef(null);
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Dynamic sizing based on device and viewport
  const getDynamicSizes = useCallback(() => {
    const vw = viewport.width;
    const vh = viewport.height;
    
    // Mobile detection with more specific breakpoints
    const isMobileDevice = vw <= 768;
    const isTablet = vw > 768 && vw <= 1024;
    const isDesktop = vw > 1024;
    
    // Orientation detection
    const isPortrait = vh > vw;
    const isLandscape = vw > vh;
    
    let sizes = {};
    
    if (isMobileDevice) {
      if (isPortrait) {
        // Mobile Portrait
        sizes = {
          MIN_WIDTH: Math.max(280, vw * 0.85),
          MAX_WIDTH: Math.min(380, vw * 0.95),
          MIN_HEIGHT: Math.max(300, vh * 0.4),
          MAX_HEIGHT: Math.min(600, vh * 0.8),
          DEFAULT_WIDTH: Math.min(320, vw * 0.9),
          DEFAULT_HEIGHT: Math.min(450, vh * 0.65)
        };
      } else {
        // Mobile Landscape
        sizes = {
          MIN_WIDTH: Math.max(280, vw * 0.4),
          MAX_WIDTH: Math.min(450, vw * 0.6),
          MIN_HEIGHT: Math.max(250, vh * 0.6),
          MAX_HEIGHT: Math.min(400, vh * 0.85),
          DEFAULT_WIDTH: Math.min(380, vw * 0.5),
          DEFAULT_HEIGHT: Math.min(320, vh * 0.75)
        };
      }
    } else if (isTablet) {
      // Tablet
      sizes = {
        MIN_WIDTH: Math.max(320, vw * 0.3),
        MAX_WIDTH: Math.min(500, vw * 0.5),
        MIN_HEIGHT: Math.max(350, vh * 0.4),
        MAX_HEIGHT: Math.min(650, vh * 0.7),
        DEFAULT_WIDTH: Math.min(420, vw * 0.4),
        DEFAULT_HEIGHT: Math.min(500, vh * 0.6)
      };
    } else {
      // Desktop
      sizes = {
        MIN_WIDTH: 300,
        MAX_WIDTH: Math.min(800, vw * 0.4),
        MIN_HEIGHT: 300,
        MAX_HEIGHT: Math.min(700, vh * 0.8),
        DEFAULT_WIDTH: 380,
        DEFAULT_HEIGHT: 500
      };
    }
    
    return { ...sizes, isMobileDevice, isTablet, isDesktop, isPortrait, isLandscape };
  }, [viewport]);

  // Viewport size tracking with debounce
  useEffect(() => {
    const updateViewport = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setViewport({ width: vw, height: vh });
      
      // Update mobile state
      const isMobileDevice = vw <= 768;
      setIsMobile(isMobileDevice);
      
      // Update orientation
      const newOrientation = vh > vw ? 'portrait' : 'landscape';
      setOrientation(newOrientation);
    };

    // Debounced resize handler
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewport, 150);
    };

    // Initial setup
    updateViewport();
    
    // Event listeners
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateViewport, 500); // Delay for orientation change
    });
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', updateViewport);
      clearTimeout(timeoutId);
    };
  }, []);

  // Update dimensions when viewport changes
  useEffect(() => {
    const sizes = getDynamicSizes();
    
    // Only update if chat is open and dimensions need adjustment
    if (isOpen) {
      const currentWidth = dimensions.width;
      const currentHeight = dimensions.height;
      
      // Check if current dimensions are outside new bounds
      const needsWidthAdjustment = currentWidth < sizes.MIN_WIDTH || currentWidth > sizes.MAX_WIDTH;
      const needsHeightAdjustment = currentHeight < sizes.MIN_HEIGHT || currentHeight > sizes.MAX_HEIGHT;
      
      if (needsWidthAdjustment || needsHeightAdjustment) {
        setDimensions(prev => ({
          width: Math.max(sizes.MIN_WIDTH, Math.min(sizes.MAX_WIDTH, prev.width)),
          height: Math.max(sizes.MIN_HEIGHT, Math.min(sizes.MAX_HEIGHT, prev.height))
        }));
      }
    } else {
      // Set default dimensions when closed
      setDimensions({
        width: sizes.DEFAULT_WIDTH,
        height: sizes.DEFAULT_HEIGHT
      });
    }
  }, [viewport, isOpen, getDynamicSizes]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleOpen = () => {
    const sizes = getDynamicSizes();
    setDimensions({
      width: sizes.DEFAULT_WIDTH,
      height: sizes.DEFAULT_HEIGHT
    });
    setIsOpen(true);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const res = await axios.post("https://vyan-security.onrender.com/chat", { message: input });
      setTimeout(() => {
        setMessages(prev => [...prev, { from: "bot", text: res.data.reply }]);
        setIsLoading(false);
        // Focus on input after bot responds
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }, 800);
    } catch (error) {
      setTimeout(() => {
        setMessages(prev => [...prev, { from: "bot", text: "Server error." }]);
        setIsLoading(false);
        // Focus on input after error response
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }, 800);
    }
  };

  const handleResizeStart = useCallback((e) => {
    // Disable resize on mobile devices
    if (isMobile) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: dimensions.width,
      height: dimensions.height
    };
    
    document.body.style.cursor = 'nwse-resize';
    document.body.style.userSelect = 'none';
    document.body.style.pointerEvents = 'none';
    document.documentElement.style.userSelect = 'none';
  }, [dimensions, isMobile]);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing || isMobile) return;
    
    const sizes = getDynamicSizes();
    const deltaX = e.clientX - resizeStartRef.current.x;
    const deltaY = e.clientY - resizeStartRef.current.y;
    
    const newWidth = Math.max(sizes.MIN_WIDTH, Math.min(sizes.MAX_WIDTH, resizeStartRef.current.width + deltaX));
    const newHeight = Math.max(sizes.MIN_HEIGHT, Math.min(sizes.MAX_HEIGHT, resizeStartRef.current.height - deltaY));
    
    setDimensions({ width: newWidth, height: newHeight });
  }, [isResizing, isMobile, getDynamicSizes]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.pointerEvents = '';
      document.documentElement.style.userSelect = '';
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing && !isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp, isMobile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target) && !isClosing) {
        // Check if click is not on the chat button itself
        const chatButton = document.querySelector('.fixed.bottom-4.left-4 button');
        if (chatButton && !chatButton.contains(event.target)) {
          handleClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, isClosing]);

  // Dynamic positioning based on device
  const getPositionClasses = () => {
    if (isMobile) {
      if (orientation === 'portrait') {
        return 'fixed bottom-4 left-4 right-4 z-50';
      } else {
        return 'fixed bottom-4 left-4 z-50';
      }
    }
    return 'fixed bottom-4 left-4 z-50';
  };

  // Dynamic button size based on device
  const getButtonSize = () => {
    if (isMobile) {
      return 'w-16 h-16'; // Larger for mobile
    }
    return 'w-14 h-14';
  };

  // Dynamic icon size based on device
  const getIconSize = () => {
    if (isMobile) {
      return 'w-7 h-7';
    }
    return 'w-6 h-6';
  };

  return (
    <div className={getPositionClasses()}>
      {!isOpen ? (
        <button
          onClick={handleOpen}
          className={`group relative ${getButtonSize()} rounded-full bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 dark:from-blue-400 dark:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-700 flex items-center justify-center shadow-lg transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 select-none touch-manipulation`}
          style={{
            animation: 'pulse 2s infinite, bounce 3s infinite'
          }}
        >
          <MessageCircle className={`text-white ${getIconSize()} transition-transform duration-300 group-hover:scale-110 pointer-events-none`} />
          
          {/* Floating pulse ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-30"
            style={{
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}
          />
          
          {/* Notification dot */}
          <div className={`absolute -top-1 -right-1 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} bg-red-500 rounded-full flex items-center justify-center`}>
            <div className={`${isMobile ? 'w-2.5 h-2.5' : 'w-2 h-2'} bg-white rounded-full animate-pulse`} />
          </div>
        </button>
      ) : (
        <div
          ref={containerRef}
          className={`relative bg-gray-800 dark:bg-[#dce1ff] border border-gray-200 dark:border-[#000a47] rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out ${
            isMobile && orientation === 'portrait' ? 'mx-auto' : ''
          }`}
          style={{ 
            width: isMobile && orientation === 'portrait' ? '100%' : dimensions.width,
            height: dimensions.height,
            maxWidth: isMobile && orientation === 'portrait' ? '100%' : 'none',
            transformOrigin: isMobile ? 'center bottom' : 'bottom left',
            animation: isClosing ? 'slideOutDown 0.3s ease-out' : 'slideInUp 0.3s ease-out',
            // Ensure proper stacking on mobile
            zIndex: isMobile ? 9999 : 'auto'
          }}
        >
          {/* Enhanced Resize Handle - Hidden on mobile */}
          {!isMobile && (
            <div
              onMouseDown={handleResizeStart}
              className="absolute top-0 right-0 w-8 h-8 cursor-nwse-resize z-20 flex items-center justify-center group transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-200 rounded-bl-lg select-none"
              style={{ 
                background: isResizing ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              }}
            >
              {/* Resize grip lines */}
              <div className="relative w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="absolute top-1 right-1 w-2 h-0.5 bg-blue-600 dark:bg-blue-500 transform rotate-45 origin-center" />
                <div className="absolute top-2 right-0 w-3 h-0.5 bg-blue-600 dark:bg-blue-500 transform rotate-45 origin-center" />
                <div className="absolute top-3 right-1 w-2 h-0.5 bg-blue-600 dark:bg-blue-500 transform rotate-45 origin-center" />
                <div className="absolute top-0 right-2 w-0.5 h-2 bg-blue-600 dark:bg-blue-500 transform rotate-45 origin-center" />
                <div className="absolute top-1 right-3 w-0.5 h-3 bg-blue-600 dark:bg-blue-500 transform rotate-45 origin-center" />
                <div className="absolute top-2 right-2 w-0.5 h-2 bg-blue-600 dark:bg-blue-500 transform rotate-45 origin-center" />
              </div>
              
              {/* Hover effect background */}
              <div className="absolute inset-0 rounded-bl-lg bg-gradient-to-br from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
            </div>
          )}

          {/* Header */}
          <div className={`bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white ${isMobile ? 'px-4 py-4' : 'px-4 py-3'} font-semibold ${isMobile ? 'text-lg' : 'text-lg'} flex justify-between items-center relative z-10 shadow-sm`}>
            <div className="flex items-center gap-2">
              <span className={isMobile ? 'text-base' : 'text-base'}>💬 Vyan AI Guard</span>
              <div className={`${isMobile ? 'w-2.5 h-2.5' : 'w-2 h-2'} bg-green-400 rounded-full animate-pulse`} title="Online" />
            </div>
            <button 
              onClick={handleClose}
              className={`text-white hover:text-gray-200 hover:bg-white/20 rounded-full ${isMobile ? 'w-10 h-10' : 'w-8 h-8'} flex items-center justify-center transition-all duration-200 ${isMobile ? 'text-3xl' : 'text-2xl'} leading-none select-none hover:scale-110 active:scale-95 touch-manipulation`}
            >
              <span className="pointer-events-none">×</span>
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto ${isMobile ? 'px-3 py-3' : 'px-4 py-2'} text-black dark:text-[#000a47] min-h-0 space-y-3 overscroll-contain`}>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-600 mt-8 animate-fade-in">
                <div className="mb-2">
                  <MessageCircle className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'} mx-auto text-blue-400 mb-2 pointer-events-none`} />
                </div>
                <p className={`${isMobile ? 'text-base' : 'text-sm'} select-none`}>Start a conversation!</p>
                <p className={`${isMobile ? 'text-sm' : 'text-xs'} mt-1 opacity-75 select-none`}>Ask me anything about security</p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-slide-in`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    {/* AI Guard Avatar - Only for bot messages */}
                    {msg.from === "bot" && (
                      <div className={`flex-shrink-0 ${isMobile ? 'w-10 h-10' : 'w-8 h-8'} rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center ${isMobile ? 'mr-3' : 'mr-2'} mt-1 shadow-lg border-2 border-white dark:border-gray-200`}>
                        <Shield className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-white`} />
                      </div>
                    )}
                    
                    <div className={`flex flex-col ${msg.from === "user" ? "max-w-[85%]" : isMobile ? "max-w-[calc(85%-3rem)]" : "max-w-[calc(85%-2.5rem)]"}`}>
                      <div
                        className={`relative inline-block ${isMobile ? 'px-4 py-4' : 'px-4 py-3'} font-medium ${isMobile ? 'text-base' : 'text-sm'} break-words transition-all duration-300 hover:scale-[1.02] ${
                          msg.from === "user"
                            ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-2xl rounded-br-lg shadow-lg hover:shadow-xl"
                            : "bg-[#263143] dark:bg-white text-white dark:text-gray-800 rounded-2xl rounded-bl-lg shadow-lg hover:shadow-xl border border-transparent"
                        }`}
                      >
                        {msg.text}
                        
                        {/* Message tail */}
                        <div
                          className={`absolute ${
                            msg.from === "user"
                              ? "bottom-1 -right-2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-blue-700 transform rotate-45 z-0"
                              : "bottom-1 -left-2 w-0 h-0 border-r-[8px] border-r-transparent border-t-[8px] border-t-white transform -rotate-45 z-0"
                          }`}
                        />
                      </div>
                      
                      {/* Timestamp */}
                      <div className={`${isMobile ? 'text-sm' : 'text-xs'} opacity-60 select-none pointer-events-none mt-1 ${
                        msg.from === "user" ? "text-right text-gray-500" : "text-left text-gray-500"
                      }`}>
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Enhanced Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start animate-slide-in">
                    {/* AI Guard Avatar for typing indicator */}
                    <div className={`flex-shrink-0 ${isMobile ? 'w-10 h-10' : 'w-8 h-8'} rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center ${isMobile ? 'mr-3' : 'mr-2'} mt-1 shadow-lg border-2 border-white dark:border-gray-200`}>
                      <Shield className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-white`} />
                    </div>
                    
                    <div className={`relative inline-block ${isMobile ? 'px-4 py-4' : 'px-4 py-3'} rounded-2xl rounded-bl-lg bg-gray-700 dark:bg-white text-white dark:text-gray-800 shadow-lg border border-gray-600 dark:border-gray-200`}>
                      <div className="flex items-center gap-2">
                        {/* Typing animation */}
                        <div className="flex items-center gap-1">
                          <div className={`${isMobile ? 'w-2.5 h-2.5' : 'w-2 h-2'} bg-gray-300 dark:bg-gray-400 rounded-full animate-bounce`} style={{ animationDelay: '0ms', animationDuration: '1.4s' }} />
                          <div className={`${isMobile ? 'w-2.5 h-2.5' : 'w-2 h-2'} bg-gray-300 dark:bg-gray-400 rounded-full animate-bounce`} style={{ animationDelay: '200ms', animationDuration: '1.4s' }} />
                          <div className={`${isMobile ? 'w-2.5 h-2.5' : 'w-2 h-2'} bg-gray-300 dark:bg-gray-400 rounded-full animate-bounce`} style={{ animationDelay: '400ms', animationDuration: '1.4s' }} />
                        </div>

                        {/* Typing text */}
                        <span className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-500 ml-1 select-none`}>Thinking...</span>
                      </div>

                      {/* Tail */}
                      <div className="absolute bottom-1 -left-2 w-0 h-0 border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-700 dark:border-t-white transform -rotate-45 z-0" />

                      {/* Pulse border */}
                      <div className="absolute inset-0 rounded-2xl rounded-bl-lg border-2 border-blue-200 opacity-50 animate-pulse" />
                    </div>
                  </div>
                )}
              </>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`flex border-t border-gray-300 dark:border-[#000a47] bg-white/80 dark:bg-[#ccd3ff]/80 backdrop-blur-sm ${isMobile ? 'p-1' : ''}`}>
            <input
              ref={inputRef}
              className={`flex-1 ${isMobile ? 'px-4 py-4 text-base' : 'px-4 py-3 text-sm'} border-none outline-none bg-transparent text-black dark:text-[#000a47] font-medium placeholder-gray-500 dark:placeholder-gray-600 focus:placeholder-gray-400 transition-all duration-200 touch-manipulation`}
              placeholder="Ask a security question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white ${isMobile ? 'px-6 py-4 text-base' : 'px-6 py-3 text-sm'} font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed select-none touch-manipulation`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} border-2 border-white border-t-transparent rounded-full animate-spin`} />
                  <span className={`${isMobile ? 'text-sm' : 'text-xs'}`}>Sending...</span>
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideOutDown {
          from {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          to {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
          }
        }
        
        @keyframes slide-in {
          from {
            transform: translateX(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        /* Mobile specific styles */
        @media (max-width: 768px) {
          .overscroll-contain {
            overscroll-behavior: contain;
          }
          
          /* Prevent zoom on input focus */
          input[type="text"] {
            font-size: 16px !important;
          }
        }
        
        /* Prevent text selection on mobile */
        @media (hover: none) and (pointer: coarse) {
          * {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          input, textarea {
            -webkit-user-select: text;
            -khtml-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
          }
        }
      `}</style>
    </div>
  );
}