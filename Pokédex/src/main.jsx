import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Principal from "./principal.jsx";
import Comparar from "./Comparar.jsx";
import "./Style1.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/Pokédex" element={<App />} />
        <Route path="/Comparar" element={<Comparar />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
