import { useEffect, useState } from "react";
import "./principal.css";
import { Link } from "react-router-dom";

function principal() {
    return (
    <>
        <h1 className="titulo">Inicio Pokedex</h1>
        <div>
            <Link to="/Pokedex" className="boton-pokedex">Pokédex normal</Link>
        </div>
        <p></p>
        <div>
            <Link to="/Comparar" className="boton-pokedex">Comparar</Link>
        </div>
        <p></p>
        <div>
            <Link to="/Buscar" className="boton-pokedex">Buscar por ID</Link>
        </div>
    </>
    );
}

export default principal;
