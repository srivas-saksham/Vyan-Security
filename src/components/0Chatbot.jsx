// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [dimensions, setDimensions] = useState({ width: 320, height: 400 });
  const [isOpen, setIsOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const containerRef = useRef(null);
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const messagesEndRef = useRef(null);

  const MIN_WIDTH = 300;
  const MAX_WIDTH = 800;
  const MIN_HEIGHT = 300;
  const MAX_HEIGHT = 600;

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:3001/chat", { message: input });
      setTimeout(() => {
        setMessages(prev => [...prev, { from: "bot", text: res.data.reply }]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setTimeout(() => {
        setMessages(prev => [...prev, { from: "bot", text: "Server error." }]);
        setIsLoading(false);
      }, 800);
    }
  };

  const handleResizeStart = useCallback((e) => {
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
  }, [dimensions]);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - resizeStartRef.current.x;
    const deltaY = e.clientY - resizeStartRef.current.y;
    
    const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, resizeStartRef.current.width + deltaX));
    const newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, resizeStartRef.current.height - deltaY));
    
    setDimensions({ width: newWidth, height: newHeight });
  }, [isResizing]);

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
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 dark:from-blue-400 dark:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-700 flex items-center justify-center shadow-lg transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 select-none"
          style={{
            animation: 'pulse 2s infinite, bounce 3s infinite'
          }}
        >
          <MessageCircle className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110 pointer-events-none" />
          
          {/* Floating pulse ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-30"
            style={{
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}
          />
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </button>
      ) : (
        <div
          ref={containerRef}
          className="relative bg-[#8f9595] dark:bg-[#8f9595] border border-gray-200 dark:border-[#000a47] rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out"
          style={{ 
            width: dimensions.width, 
            height: dimensions.height,
            transformOrigin: 'bottom left',
            animation: 'slideInUp 0.3s ease-out'
          }}
        >
          {/* Enhanced Resize Handle */}
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

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-4 py-3 font-semibold text-lg flex justify-between items-center relative z-10 shadow-sm">
            <div className="flex items-center gap-2">
              <span>💬 Vyan AI Guard</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Online" />
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white hover:text-gray-200 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 text-xl leading-none select-none"
            >
              <span className="pointer-events-none">×</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2 text-black dark:text-[#000a47] min-h-0 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-600 mt-8 animate-fade-in">
                <div className="mb-2">
                  <MessageCircle className="w-8 h-8 mx-auto text-blue-400 mb-2 pointer-events-none" />
                </div>
                <p className="text-sm select-none">Start a conversation!</p>
                <p className="text-xs mt-1 opacity-75 select-none">Ask me anything about security</p>
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
                    <div
                      className={`relative inline-block px-4 py-3 font-medium text-sm max-w-[85%] break-words transition-all duration-300 hover:scale-[1.02] ${
                        msg.from === "user"
                          ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-2xl rounded-br-lg shadow-lg hover:shadow-xl"
                          : "bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 text-gray-800 rounded-2xl rounded-bl-lg shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-300"
                      }`}
                    >
                      {msg.text}
                      
                      {/* Message timestamp */}
                      <div className={`absolute -bottom-5 text-xs opacity-60 select-none pointer-events-none ${
                        msg.from === "user" ? "right-0 text-gray-500" : "left-0 text-gray-500"
                      }`}>
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      
                      {/* Message tail */}
                      <div className={`absolute ${
                        msg.from === "user" 
                          ? "bottom-0 right-0 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-blue-600"
                          : "bottom-0 left-0 w-0 h-0 border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-100 dark:border-t-gray-200"
                      }`} />
                    </div>
                  </div>
                ))}
                
                {/* Enhanced Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start animate-slide-in">
                    <div className="relative inline-block px-4 py-3 rounded-2xl rounded-bl-lg bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 text-gray-800 shadow-lg border border-gray-200 dark:border-gray-300">
                      <div className="flex items-center gap-2">
                        {/* Bot avatar */}
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                          <div className="w-3 h-3 rounded-full bg-white opacity-90" />
                        </div>
                        
                        {/* Typing animation */}
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }} />
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }} />
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }} />
                        </div>
                        
                        {/* Typing text */}
                        <span className="text-xs text-gray-500 ml-1 select-none">Thinking...</span>
                      </div>
                      
                      {/* Typing indicator tail */}
                      <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-100 dark:border-t-gray-200" />
                      
                      {/* Animated border */}
                      <div className="absolute inset-0 rounded-2xl rounded-bl-lg border-2 border-blue-200 opacity-50 animate-pulse" />
                    </div>
                  </div>
                )}
              </>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-300 dark:border-[#000a47] bg-white/80 dark:bg-[#ccd3ff]/80 backdrop-blur-sm">
            <input
              className="flex-1 px-4 py-3 text-sm border-none outline-none bg-transparent text-black dark:text-[#000a47] font-medium placeholder-gray-500 dark:placeholder-gray-600 focus:placeholder-gray-400 transition-all duration-200"
              placeholder="Ask a security question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed select-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Sending...</span>
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
      `}</style>
    </div>
  );
}