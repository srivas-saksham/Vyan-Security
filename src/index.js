import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './ThemeContext.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));

const setFaviconByTheme = () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const faviconUrl = isDarkMode ? '/logoonly.png' : '/logoonly-dark.png';

  // Remove existing favicons
  document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());

  // Create and append new favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = faviconUrl;
  document.head.appendChild(link);
};

// Run once
setFaviconByTheme();

// Watch for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFaviconByTheme);

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
