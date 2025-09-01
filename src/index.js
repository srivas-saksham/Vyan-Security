import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './ThemeContext.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ Fixed basename detection
const isGithub = window.location.hostname.includes("github.io");
const basename = isGithub ? "/Vyan-Security" : "/";

// ✅ Enhanced favicon with better error handling
const setFaviconByTheme = () => {
  try {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const publicUrl = process.env.PUBLIC_URL || "";
    const faviconUrl = isDarkMode
      ? `${publicUrl}/logoonly.png`
      : `${publicUrl}/logoonly-dark.png`;

    // Remove existing favicons
    document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());

    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = faviconUrl;
    
    // Add error handling for favicon loading
    link.onerror = () => {
      console.warn('Favicon failed to load:', faviconUrl);
      // Fallback to a default favicon if needed
      link.href = `${publicUrl}/favicon.ico`;
    };
    
    document.head.appendChild(link);
  } catch (error) {
    console.error('Error setting favicon:', error);
  }
};

// Initialize favicon
setFaviconByTheme();

// Listen for theme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', setFaviconByTheme);

root.render(
  <BrowserRouter basename={basename}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);