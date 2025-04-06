


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css';

const rootElement = document.getElementById('root'); // Ensure this matches the ID in index.html
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
