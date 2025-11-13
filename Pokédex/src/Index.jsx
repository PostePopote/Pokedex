import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

function principal() {
    return (
    <>
        <h1 className="titulo">Inicio Pokedex</h1>
        <div>
            <Link to="/Pokédex" className="boton-pokedex">Pokédex normal</Link>
        </div>
    </>
    );
}

export default principal;
