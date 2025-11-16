import { useState } from "react";
import "./Comparar.css";

function Comparar() {
  const [pokemon, setPokemon] = useState(null);
  const [pokeName, setPokeName] = useState("");

  const [pokemon2, setPokemon2] = useState(null);
  const [pokeName2, setPokeName2] = useState("");

  const handleInputChange = (e) => setPokeName(e.target.value);
  const handleInputChange2 = (e) => setPokeName2(e.target.value);

  const busca = () => {
    if (!pokeName) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  };

  const buscar = () => {
    if (!pokeName2) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName2.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => setPokemon2(data));
  };

	const comparar = () => {
		
	}

  return (
    <div>
      <h1>Comparador de Pokémons</h1>

      <div className="compare-wrapper">

        {/* Tarjeta 1 */}
        {pokemon && (
          <div className="mini-card">
            <h2 className="mini-card-title">{pokemon.name.toUpperCase()}</h2>

            <div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mini-card-img"
              />
            </div>

            <div className="mini-card-stats">
              <h3>Stats</h3>
              <ul>
                {/* Se recorre el arreglo dado por la API
                Por cada stats se crea un "li", se pone como key "stats" 
                para que unicamente recorra esa parte.*/}
                {pokemon.stats.map((s) => (
                  <li key={s.stat.name}>
                    <strong>{s.stat.name}:</strong> {s.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tarjeta 2 */}
        {pokemon2 && (
          <div className="mini-card">
            <h2 className="mini-card-title">{pokemon2.name.toUpperCase()}</h2>

            <div>
              <img
                src={pokemon2.sprites.front_default}
                alt={pokemon2.name}
                className="mini-card-img"
              />
            </div>

            <div className="mini-card-stats">
              <h3>Stats</h3>
              <ul>
                {pokemon2.stats.map((s) => (
                  <li key={s.stat.name}>
                    <strong>{s.stat.name}:</strong> {s.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>

      {/* Inputs debajo */}
      <div>
        <input
          type="text"
          className="mini-input"
          value={pokeName}
          onChange={handleInputChange}
          placeholder="pikachu"
        />
        <button className="mini-button" onClick={busca}>Buscar</button>

        <input
          type="text"
          className="mini-input"
          value={pokeName2}
          onChange={handleInputChange2}
          placeholder="charmander"
        />
        <button className="mini-button" onClick={buscar}>Buscar</button>
      </div>
			<div>
				<button classname="mini-button">Comparar</button>
			</div>
    </div>
  );
}

export default Comparar;
