import { useState } from "react";
import swal from "sweetalert2";
import pokeballvacia from "./assets/Pokeball_Vacia.png";
import "./Comparar.css";
import { Link } from "react-router-dom";

function Comparar() {
  //pokename es para obtener el nombre dado en el input
  //pokemon es para que se cargue la informacion en ella
  const [pokemon, setPokemon] = useState(null);
  const [pokeName, setPokeName] = useState("");

  const [pokemon2, setPokemon2] = useState(null);
  const [pokeName2, setPokeName2] = useState("");

  //para la constante comparar
  const [resultado, setResultado] = useState([]);

  //botones
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
    if (!pokemon || !pokemon2) {
      swal.fire({
        title: "No hay Pokémons",
        text: "Necesita poner ambos Pokémons para comparar",
        imageUrl: pokeballvacia,
        imageHeight: 150,
        imageAlt: "Pokéball vacia",
      });
      return;
    }

    let r = [];
    for (let i = 0; i < pokemon.stats.length; i++) {
      const stats1 = pokemon.stats[i].base_stat;
      const stats2 = pokemon2.stats[i].base_stat;

      let ganador;

      if (stats1 > stats2) {
        ganador = pokeName;
      } else if (stats2 > stats1) {
        ganador = pokeName2;
      } else {
        ganador = "empate";
      }

      r.push({
        stat: pokemon.stats[i].stat.name,
        Pokemon1: stats1,
        Pokemon2: stats2,
        ganador: ganador,
      });
    }
    console.log(r);
    setResultado(r);
  };

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

      <div className="result-card">
        <div className="button-center">
        <button className="mini-button" onClick={comparar}>Comparar</button>
        </div>
        {resultado.map((r) => (
          <p key={r.stat}>
            {/* se muestra el nombre de la stat
            y en los parentesis da el valor más alto usando operador ternario */}
            {r.stat}: <strong>{r.ganador}</strong> ({r.Pokemon1 > r.Pokemon2 ? r.Pokemon1 : r.Pokemon2})
          </p>
        ))}
      </div>
      <div>
        <Link to="/"  className="boton-pokedex">Volver</Link>
      </div>
    </div>
  );
}

export default Comparar;
