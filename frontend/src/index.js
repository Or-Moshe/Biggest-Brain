import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //its rendering twice
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
