import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Assuming the 'root' id is the id of the div in your index.html
const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

// Initial render: Render an element to the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
