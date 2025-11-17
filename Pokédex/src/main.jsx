import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from "./App.jsx";
import Principal from "./principal.jsx";
import Comparar from "./Comparar.jsx";
import "./style1.css";

function BackgroundManager({ children }) {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    const isPrincipal = location.pathname === "/";

    body.classList.toggle("bg-principal", isPrincipal);
    body.classList.toggle("bg-secondary", !isPrincipal);

    return () => {
      body.classList.remove("bg-principal", "bg-secondary");
    };
  }, [location.pathname]);

  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BackgroundManager>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/Pokédex" element={<App />} />
          <Route path="/Comparar" element={<Comparar />} />
        </Routes>
      </BackgroundManager>
    </BrowserRouter>
  </StrictMode>
);
