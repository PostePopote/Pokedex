import { useState } from "react";
import "./buscar1.css";
import { Link } from "react-router-dom";

function Buscar() {
  const [numero, setNumero] = useState("");

  return (
    <div className="buscar-container">
      <h1>Número/ID del Pokémon</h1>

      <div>
        <input
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Ej: 25"
          className="buscar-input"
        />
        {numero && (
          <Link to={`/buscar/${numero}`} className="boton-pokedex">
            Buscar Pokémon
          </Link>
        )}
      </div>

      <div className="gen-box">
        <h3>Primera = 1 - 151</h3>
        <h3>Segunda = 152 - 251</h3>
        <h3>Tercera = 252 - 386</h3>
        <h3>Cuarta = 387 - 493</h3>
        <h3>Quinta = 494 - 649</h3>
        <h3>Sexta = 650 - 721</h3>
        <h3>Septima = 722 - 809</h3>
        <h3>Octava = 810 - 905</h3>
        <h3>Novena = 906 - 1025</h3>
        <h3>Si quiere ver Pokémons "especiales" como 
        los megas o formas alternativas debe buscarlas 
        con la Pokédex normal</h3>
      </div>

      <Link to="/" className="boton-pokedex">
        Volver
      </Link>
    </div>
  );
}

export default Buscar;
