import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global CSS reset for mobile responsiveness
const globalStyles = `
  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    font-family: "EB Garamond", "Garamond", "Times New Roman", "Times", serif;
  }
  
  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    font-family: "EB Garamond", "Garamond", "Times New Roman", "Times", serif;
  }
  
  /* Apply Garamond to all elements */
  *, *::before, *::after {
    font-family: "EB Garamond", "Garamond", "Times New Roman", "Times", serif;
  }
  
  /* Prevent horizontal scrolling on mobile */
  body {
    position: relative;
  }
  
  /* iOS Safari specific fixes */
  @media screen and (max-width: 768px) {
    html {
      -webkit-text-size-adjust: 100%;
    }
    
    body {
      -webkit-overflow-scrolling: touch;
      overflow-x: hidden;
    }
  }
`;

// Inject global styles
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 