import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from './ThemeContext.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));

// FavIcon logic stays the same
const setFaviconByTheme = () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const faviconUrl = isDarkMode ? 'logoonly.png' : 'logoonly-dark.png';
  document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = faviconUrl;
  document.head.appendChild(link);
};

setFaviconByTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFaviconByTheme);

root.render(
  <HashRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HashRouter>
);
