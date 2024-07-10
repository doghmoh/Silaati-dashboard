import React from 'react';
import { createRoot } from 'react-dom/client';


import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'contexts/ConfigContext';
import { AuthProvider } from 'contexts/userContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ConfigProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ConfigProvider>
);

reportWebVitals();
