import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '206857669848-6v63ti65j7this7e1j8lvvhhbha6r9m1.apps.googleusercontent.com'; 

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </GoogleOAuthProvider>
);
