import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Principal from "./principal.jsx";
import Comparar from "./Comparar.jsx";
import Buscar from "./Buscar.jsx"
import Pokebu from "./Pokemon.jsx"
import "./Style1.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/Pokedex" element={<App />} />
        <Route path="/Comparar" element={<Comparar />} />
        <Route path="/Buscar" element={<Buscar />}/>
        <Route path="/Buscar/:id" element={<Pokebu />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
