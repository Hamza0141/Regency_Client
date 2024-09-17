import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
    </StrictMode>
    ,
  </BrowserRouter>
);
