import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './ThemeContext.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ Detect environment and set correct basename
const isGithub = window.location.hostname.includes("github.io");
const basename = isGithub ? "/Vyan-Security" : "/";

// ✅ Set favicon based on theme + PUBLIC_URL for GitHub Pages compatibility
const setFaviconByTheme = () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const publicUrl = process.env.PUBLIC_URL || "";
  const faviconUrl = isDarkMode 
    ? `${publicUrl}/logoonly.png` 
    : `${publicUrl}/logoonly-dark.png`;

  // Remove old favicons
  document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());

  // Add new favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = faviconUrl;
  document.head.appendChild(link);
};

setFaviconByTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFaviconByTheme);

root.render(
  <BrowserRouter basename={basename}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
