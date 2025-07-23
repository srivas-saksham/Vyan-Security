// Fixed ChatBot component - replace your existing one

import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { MessageCircle, Shield } from "lucide-react";
import BotAvatar from "../assets/bot-img.png";

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
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [quickActionsVisible, setQuickActionsVisible] = useState(true);
  const [typingMessageIndex, setTypingMessageIndex] = useState(null);
  const [typingText, setTypingText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(true);
  const [isWelcomeTypingComplete, setIsWelcomeTypingComplete] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [initialViewportHeight, setInitialViewportHeight] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // const API_link = "https://vyan-security.onrender.com/chat";
  const API_link = "http://localhost:3001/chat";
  
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
        DEFAULT_WIDTH: 500,
        DEFAULT_HEIGHT: 500
      };
    }
    
    return { ...sizes, isMobileDevice, isTablet, isDesktop, isPortrait, isLandscape };
  }, [viewport]);

  // Enhanced message formatter
  const formatBotMessage = (text) => {
    if (!text) return '';
    
    // Convert markdown-style formatting to HTML
    let formattedText = text
      // Convert **bold** to <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert *italic* to <em>
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Convert bullet points (• or - or *) to proper HTML list items
      .replace(/^[•\-\*]\s+(.+)$/gm, '<li>$1</li>')
      // Convert numbered lists
      .replace(/^\d+\.\s+(.+)$/gm, '<li class="numbered">$1</li>')
      // Convert line breaks
      .replace(/\n/g, '<br/>');

    // Wrap consecutive <li> items in <ul> tags
    formattedText = formattedText.replace(/(<li(?:\s+class="numbered")?>[^<]*<\/li>(?:\s*<br\/>)*)+/g, (match) => {
      const isNumbered = match.includes('class="numbered"');
      const listItems = match.replace(/<br\/>/g, '').trim();
      return isNumbered ? `<ol>${listItems}</ol>` : `<ul>${listItems}</ul>`;
    });

    // Clean up numbered class attributes
    formattedText = formattedText.replace(/class="numbered"/g, '');

    return formattedText;
  };

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
      
      // Store initial viewport height on first load or orientation change
      if (initialViewportHeight === 0) {
        setInitialViewportHeight(vh);
      }
    };

    // Initial setup
    updateViewport();
    
    // Event listeners
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        setInitialViewportHeight(0); // Reset on orientation change
        updateViewport();
      }, 500);
    });
    
    // Visual viewport API for better keyboard detection
    if (window.visualViewport && isMobile) {
      const handleVisualViewportChange = () => {
        const visualHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const heightDiff = windowHeight - visualHeight;
        
        if (heightDiff > 150) {
          setIsKeyboardOpen(true);
          setKeyboardHeight(heightDiff);
        } else {
          setIsKeyboardOpen(false);
          setKeyboardHeight(0);
        }
      };
      
      window.visualViewport.addEventListener('resize', handleVisualViewportChange);
      
      return () => {
        window.removeEventListener('resize', updateViewport);
        window.removeEventListener('orientationchange', updateViewport);
        window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
      };
    }
    
    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, [isMobile]);

  //INPUT FOCUS HANDLER
  const handleInputFocus = () => {
    if (isMobile && !window.visualViewport) {
      // Fallback for devices without visual viewport API
      setTimeout(() => {
        const currentVH = window.innerHeight;
        const heightDiff = initialViewportHeight - currentVH;
        
        if (heightDiff > 150) {
          setIsKeyboardOpen(true);
          setKeyboardHeight(heightDiff);
        }
      }, 300);
    }
  };

  const handleInputBlur = () => {
    if (isMobile && !window.visualViewport) {
      // Fallback for devices without visual viewport API
      setTimeout(() => {
        if (document.activeElement !== inputRef.current) {
          setIsKeyboardOpen(false);
          setKeyboardHeight(0);
        }
      }, 150);
    }
  };



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
      setShowQuickActions(true); // Reset quick actions when closing
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

  // QUICK ACTIONS
  const QuickActions = ({ onActionClick }) => {
    // Define your 3 quick actions
    const actions = [
      {
        label: "Services",
        message: "Tell me about your services",
        emoji: "🛍️"
      },
      {
        label: "Contact", 
        message: "How do I reach you?",
        emoji: "🕐"
      },
      {
        label: "Support",
        message: "How do I contact customer support?",
        emoji: "📞"
      }
    ];

    return (
      <div className={`mt-6 transition-all duration-700 ease-out ${showQuickActions ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className="text-sm mb-3 font-medium text-gray-600 dark:text-gray-500 text-center select-none">
          Quick Questions:
        </p>
        <div className="flex flex-wrap justify-center gap-2 px-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => onActionClick(action.message)}
              className={`
                group px-4 py-2 bg-gray-200 dark:bg-white hover:bg-blue-50 dark:hover:bg-blue-100 
                text-blue-600 dark:text-blue-700 border border-blue-200 dark:border-blue-300 
                rounded-full font-medium transition-all duration-200 
                hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                transform hover:-translate-y-0.5 select-none touch-manipulation
                quick-action-button
                ${isMobile ? 'text-sm px-3 py-2' : 'text-sm'}
              `}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'both'
              }}
            >
              {/* <span className="mr-1 transition-transform duration-200 group-hover:scale-110">
                {action.emoji}
              </span> */}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleQuickAction = (message) => {
    // Hide quick actions when user clicks one
    setQuickActionsVisible(false);
    
    // Create user message
    const userMessage = { from: "user", text: message };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input field
    setInput("");
    
    // Set loading state
    setIsLoading(true);
    
    // Send message to API (reuse your existing API call logic)
    sendMessageToAPI(message);
  };
  //BOT CHARACTER BY CHARACTER MSG------------------------------------------------------------------------------------------------------
  const typeMessage = useCallback((messageText, messageIndex, isWelcomeMessage = false) => {
    if (!messageText) return;
    
    setTypingMessageIndex(messageIndex);
    setIsTypingComplete(false);
    
    // Only hide quick actions if they're already visible (not for welcome message)
    if (quickActionsVisible) {
      setQuickActionsVisible(false);
    }
    
    let currentIndex = 0;
    const typingSpeed = 30;
    
    const typeInterval = setInterval(() => {
      currentIndex++;
      setTypingText(messageText.substring(0, currentIndex));
      
      if (currentIndex >= messageText.length) {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
        setTypingMessageIndex(null);
        
        if (isWelcomeMessage) {
          setIsWelcomeTypingComplete(true);
          // Show quick actions after welcome message typing is complete
          setTimeout(() => {
            setQuickActionsVisible(true);
          }, 300);
        } else {
          // Only show quick actions again if input is empty
          if (input.trim().length === 0) {
            setQuickActionsVisible(true);
          }
        }
        
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }, typingSpeed);
    
    return typeInterval;
  }, [input, quickActionsVisible]);

  // Modified: Add welcome message AND show quick actions
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = "Hello! I'm your personal assistant. Your instant Query Resolver!";
      setMessages([{
        from: "bot",
        text: welcomeMessage
      }]);
      setShowQuickActions(true);
      setQuickActionsVisible(false); // Keep hidden until typing is complete
      setIsWelcomeTypingComplete(false);
      
      // Start typing animation for welcome message
      setTimeout(() => {
        typeMessage(welcomeMessage, 0, true); // Pass true for isWelcomeMessage
      }, 300);
    }
  }, [isOpen, typeMessage]);


  // Helper function to send message to API
  const sendMessageToAPI = async (messageText) => {
    try {
      const res = await axios.post(`${API_link}`, { 
        message: messageText 
      });
      
      setTimeout(() => {
        setIsLoading(false);
        
        // Add bot message and start typing animation
        setMessages(prev => {
          const newMessages = [...prev, { from: "bot", text: res.data.reply }];
          // Start typing animation for the last message
          setTimeout(() => {
            typeMessage(res.data.reply, newMessages.length - 1);
          }, 100);
          return newMessages;
        });
      }, 800);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        const errorMessage = "Server error.";
        
        setMessages(prev => {
          const newMessages = [...prev, { from: "bot", text: errorMessage }];
          // Start typing animation for error message
          setTimeout(() => {
            typeMessage(errorMessage, newMessages.length - 1);
          }, 100);
          return newMessages;
        });
      }, 800);
    }
  };
  
//---------------------------------------------------------------------------------------------------------------------
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Hide quick actions when user sends a message
    setQuickActionsVisible(false);
    
    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const res = await axios.post(`${API_link}`, { message: input });
      setTimeout(() => {
        setIsLoading(false);
        
        setMessages(prev => {
          const newMessages = [...prev, { from: "bot", text: res.data.reply }];
          // Start typing animation
          setTimeout(() => {
            typeMessage(res.data.reply, newMessages.length - 1);
          }, 100);
          return newMessages;
        });
      }, 800);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        const errorMessage = "Server error.";
        
        setMessages(prev => {
          const newMessages = [...prev, { from: "bot", text: errorMessage }];
          // Start typing animation for error
          setTimeout(() => {
            typeMessage(errorMessage, newMessages.length - 1);
          }, 100);
          return newMessages;
        });
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
    const baseClasses = 'fixed z-50 transition-all duration-300 ease-out';
    
    if (isMobile) {
      if (orientation === 'portrait') {
        return `${baseClasses} left-4 right-4 ${isKeyboardOpen ? 'bottom-2' : 'bottom-4'}`;
      } else {
        return `${baseClasses} left-4 ${isKeyboardOpen ? 'bottom-2' : 'bottom-4'}`;
      }
    }
    return `${baseClasses} bottom-4 left-4`;
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
            zIndex: isMobile ? 9999 : 'auto',
            ...(isMobile && isKeyboardOpen && keyboardHeight > 0 && {
              transform: `translateY(-${Math.min(keyboardHeight * 0.4, 120)}px)`,
              transition: 'transform 0.2s ease-out'
            })
          }}
        >
          {/* Enhanced Resize Handle with Red Arrow - Hidden on mobile */}
          {!isMobile && (
            <div
              onMouseDown={handleResizeStart}
              className="absolute top-0 right-0 w-10 h-10 cursor-nwse-resize z-20 flex items-center justify-center group transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-100 rounded-bl-lg select-none"
              style={{ 
                background: isResizing ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.05)',
              }}
            >
              {/* Red Arrow Icon - Rotated -90deg */}
              <div className="relative w-5 h-5 opacity-70 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:scale-110">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-red-500 group-hover:text-red-600 transition-colors duration-200 transform -rotate-90"
                >
                  {/* Diagonal Arrow pointing to bottom-right */}
                  <path 
                    d="M7 7L17 17M17 17H10M17 17V10" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  {/* Double arrow for emphasis */}
                  <path 
                    d="M4 4L10 10M10 10H6M10 10V6" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    opacity="0.6"
                  />
                </svg>
              </div>
              
              {/* Pulse effect on hover */}
              <div className="absolute inset-0 rounded-bl-lg bg-gradient-to-br from-red-400/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none animate-pulse" />
              
              {/* Tooltip */}
              <div className="absolute -top-8 -left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Drag to resize
              </div>
            </div>
          )}

          {/* Header */}
          <div className={`bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white ${isMobile ? 'px-4 py-4' : 'px-4 py-3'} font-semibold ${isMobile ? 'text-lg' : 'text-lg'} flex justify-between items-center relative z-10 shadow-sm`}>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
              <img 
                src={BotAvatar} 
                alt="Bot Avatar"
                className={`${isMobile ? 'h-10' : 'h-12'} w-auto object-cover rounded-l-lg scale-[1.1]`} 
              />

              <div className="flex flex-col justify-center px-3">
                <span className={`${isMobile ? 'text-base' : 'text-base'} font-semibold`}>Shieldon - Security Agent</span>
                <div className="flex items-center gap-1">
                  <div className={`${isMobile ? 'w-2.5 h-2.5' : 'w-2 h-2'} bg-green-400 rounded-full animate-pulse`} title="Online" />
                  <span className="text-xs text-white/80">Online</span>
                </div>
              </div>
            </div>
          </div>
            <button 
              onClick={handleClose}
              className={`text-white hover:text-gray-200 hover:bg-white/20 rounded-full ${isMobile ? 'w-12 h-12 mr-2' : 'w-10 h-10 mr-1'} flex items-center justify-center transition-all duration-200 ${isMobile ? 'text-4xl' : 'text-3xl'} leading-none select-none hover:scale-110 active:scale-95 touch-manipulation`}
            >
              <span className="pointer-events-none">×</span>
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto ${isMobile ? 'px-3 py-3' : 'px-4 py-2'} text-black dark:text-[#000a47] min-h-0 space-y-3 overscroll-contain`}>
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-slide-in`}
                style={{
                  animationDelay: `${i * 0.04}s`,
                  animationFillMode: 'both'
                }}
              >
                {/* AI Guard Avatar - Only for bot messages */}
                {msg.from === "bot" && (
                  <div className={`flex-shrink-0 ${isMobile ? 'w-10 h-10' : 'w-8 h-8'} rounded-full overflow-hidden ${isMobile ? 'mr-3' : 'mr-2'} mt-1 shadow-lg border-2 border-white dark:border-gray-200`}>
                    <img
                      src={BotAvatar}
                      alt="Bot Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                )}
                
                <div className={`flex flex-col ${msg.from === "user" ? "max-w-[85%]" : isMobile ? "max-w-[calc(85%-3rem)]" : "max-w-[calc(85%-2.5rem)]"}`}>
                  <>
                    {msg.from === "bot" && (
                      <div className="font-semibold text-xs mb-1 text-gray-300 dark:text-gray-600 select-none">
                        Shieldon
                      </div>
                    )}
                  </>
                  <div
                    className={`relative inline-block ${isMobile ? 'px-4 py-4' : 'px-4 py-3'} font-medium ${isMobile ? 'text-base' : 'text-sm'} break-words transition-all duration-300 hover:scale-[1.02] ${
                      msg.from === "user"
                        ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-2xl rounded-br-lg shadow-lg hover:shadow-xl"
                        : "bg-[#263143] dark:bg-white text-white dark:text-gray-800 rounded-2xl rounded-bl-lg shadow-lg hover:shadow-xl border border-transparent"
                    }`}
                  >
                    {msg.from === "bot" && typingMessageIndex === i && !isTypingComplete ? (
                      <span>
                        <span dangerouslySetInnerHTML={{ __html: formatBotMessage(typingText) }} />
                        <span className="animate-pulse ml-1 text-blue-300 dark:text-blue-600">|</span>
                      </span>
                    ) : msg.from === "bot" ? (
                      <div dangerouslySetInnerHTML={{ __html: formatBotMessage(msg.text) }} />
                    ) : (
                      msg.text
                    )}
                    
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
            
            {/* Show Quick Actions after welcome message */}
            {messages.length === 1 && isWelcomeTypingComplete && (
              <div 
                className={`text-center transition-all duration-300 ease-out ${
                  quickActionsVisible 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-95 pointer-events-none h-0 overflow-hidden'
                }`}
                style={{
                  transitionProperty: 'opacity, transform, height',
                  transformOrigin: 'center',
                }}
              >
                <div className={quickActionsVisible ? 'animate-fade-in' : ''}>
                  <QuickActions onActionClick={handleQuickAction} />
                  
                  {/* Server boot-up notice */}
                  <div className="mt-4 px-4">
                    <div className="bg-yellow-50 dark:bg-yellow-100 border border-yellow-200 dark:border-yellow-300 rounded-lg p-3">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                        <p className="text-xs text-yellow-700 dark:text-yellow-800 font-medium text-center">
                          Note: Server may take a minute to boot up on first request.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Enhanced Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-slide-in">
                {/* AI Guard Avatar for typing indicator */}
                <div className={`flex-shrink-0 ${isMobile ? 'w-10 h-10' : 'w-8 h-8'} rounded-full overflow-hidden ${isMobile ? 'mr-3' : 'mr-2'} mt-1 shadow-lg border-2 border-white dark:border-gray-200`}>
                  <img
                    src={BotAvatar}
                    alt="Bot Avatar"
                    className="w-full h-full object-cover"
                  />
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
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`flex border-t border-gray-300 dark:border-[#000a47] bg-white/80 dark:bg-[#ccd3ff]/80 backdrop-blur-sm ${isMobile ? 'p-1' : ''}`}>
            <input
              ref={inputRef}
              className={`flex-1 ${isMobile ? 'px-4 py-4 text-base' : 'px-4 py-3 text-sm'} border-none outline-none bg-transparent text-black dark:text-[#000a47] font-medium placeholder-gray-500 dark:placeholder-gray-600 focus:placeholder-gray-400 transition-all duration-200 touch-manipulation`}
              placeholder="Ask a security question..."
              value={input}
              onChange={(e) => {
                const newValue = e.target.value;
                const prevValue = input;
                
                setInput(newValue);
                
                // Only hide quick actions on first character typed (when going from empty to non-empty)
                if (prevValue.trim().length === 0 && newValue.trim().length === 1) {
                  setQuickActionsVisible(false);
                }
                // Only show quick actions when input becomes completely empty (when backspacing from text to empty)
                else if (prevValue.trim().length > 0 && newValue.trim().length === 0) {
                  setQuickActionsVisible(true);
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              onFocus={handleInputFocus}  // ← ADD THIS
              onBlur={handleInputBlur}    // ← ADD THIS
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
        
        .animate-fade-out {
          animation: fade-out 0.7s ease-out forwards;
        }

        @keyframes fade-out {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(10px);
          }
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }

        /* Button hover glow effect */
        .quick-action-button:hover {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        /* Prevent layout shifts during quick actions transitions */
        .quick-actions-container {
          transition: all 0.3s ease-out;
          transform-origin: center;
        }

        .quick-actions-hidden {
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden;
        }

        /* Formatted message styles */
        :global(.formatted-message ul) {
          margin: 8px 0;
          padding-left: 20px;
          list-style: none;
        }

        :global(.formatted-message ul li) {
          position: relative;
          margin: 4px 0;
          padding-left: 8px;
        }

        :global(.formatted-message ul li:before) {
          content: "•";
          color: #3b82f6;
          font-weight: bold;
          position: absolute;
          left: -12px;
        }

        :global(.formatted-message ol) {
          margin: 8px 0;
          padding-left: 20px;
          counter-reset: item;
        }

        :global(.formatted-message ol li) {
          margin: 4px 0;
          padding-left: 8px;
          counter-increment: item;
        }

        :global(.formatted-message ol li:before) {
          content: counter(item) ".";
          color: #3b82f6;
          font-weight: bold;
          margin-right: 8px;
        }

        :global(.formatted-message strong) {
          font-weight: 700;
          color: inherit;
        }

        :global(.formatted-message em) {
          font-style: italic;
          color: inherit;
        }

        /* Dark mode adjustments */
        :global(.dark .formatted-message ul li:before),
        :global(.dark .formatted-message ol li:before) {
          color: #60a5fa;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          :global(.formatted-message ul),
          :global(.formatted-message ol) {
            padding-left: 16px;
          }
          
          :global(.formatted-message ul li),
          :global(.formatted-message ol li) {
            padding-left: 6px;
          }
        }

        /* Mobile keyboard handling */
          @media (max-width: 768px) {
            .keyboard-active {
              transform: translateY(-50px) !important;
              transition: transform 0.3s ease-out !important;
            }
            
            /* Prevent viewport jumping */
            .chat-container {
              position: fixed !important;
            }
            
            /* Ensure input stays visible */
            .input-focused {
              position: relative;
              z-index: 1000;
            }
          }

          /* iOS specific adjustments */
          @supports (-webkit-touch-callout: none) {
            .mobile-keyboard-adjust {
              padding-bottom: env(keyboard-inset-height, 0px);
            }
          }
            
      `}</style>
    </div>
  );
}