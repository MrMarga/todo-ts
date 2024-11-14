import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomLogger } from "retack-sdk-app-observer";

import './index.css';
import App from './App';

// Initialize the Retack SDK
const envKey = "Az_HeaKWLmFpXl7X4U6GynzR";
const appVersion = "1.0.4";

try {
    CustomLogger.init(envKey, appVersion);
} catch (error) {
    console.error("Error initializing CustomLogger:", error);
}

// Render the application
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
