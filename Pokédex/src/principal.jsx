import { useEffect, useState } from "react";
import "./principal.css";
import { Link } from "react-router-dom";

function principal() {
    return (
    <>
        <h1 className="titulo">Inicio Pokedex</h1>
        <div>
            <Link to="/Pokédex" className="boton-pokedex">Pokédex normal</Link>
        </div>
        <p></p>
        <div>
            <Link to="/Comparar" className="boton-pokedex">Comparar</Link>
        </div>
        <p></p>
        <div>
            
        </div>
    </>
    );
}

export default principal;
