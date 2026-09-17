import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { IdeasProvider } from './context/IdeasContext';
import './assets/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <IdeasProvider>
          <App />
        </IdeasProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
