import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// starting point for the react application
createRoot(document.getElementById("root")).render(
  // strictmode: adds some dev only checks 
  // browserrouter: enables client side routing, that way clicking links reloads the page without reloading the whole browser
  <StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);