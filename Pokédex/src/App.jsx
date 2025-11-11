import { useState } from "react";
import "./Style1.css";

function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [pokeName, setPokeName] = useState("");

  const handleInputChange = (e) => {
    setPokeName(e.target.value);
  };

  const busca = () => {
    if (!pokeName) return; // Evita llamadas vacías
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  };

  return (
    <div className="pokedex">
      <h1 className="pokedex-title">Pokédex</h1>

      <div className="pokemon-frame">
        <input
          type="text"
          value={pokeName}
          onChange={handleInputChange}
          placeholder="pichu"
        />
        <button onClick={busca}>Buscar</button>

        {pokemon && (
          <div className="pokemon-card">
            <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <img
              src={pokemon.sprites.front_shiny}
              alt={pokemon.name}
              className="pokemon-image"
            />
            {/* Tipos de los pokémons */}
            <div className="types">
              <h3>Tipos</h3>
              <ul>
                {pokemon.types.map((t) => (
                  <li key={t.type.name} className={`type-${t.type.name}`}>
                    {t.type.name}
                  </li>
                ))}
              </ul>
            </div>
            {/* Apartado de datos normales */}
            <p>ID: {pokemon.id}</p>
            <p>Peso: {pokemon.weight / 10} kg</p>
            <p>Altura: {pokemon.height / 10} m</p>
            <p>Habilidad: {pokemon.abilities[0].ability.name}</p>
            <h3>Sonido</h3>
            <audio key={pokemon.id}  controls>
              <source src={pokemon.cries.latest} type="audio/ogg"/>
            </audio>

            {/* Apartado de Estadisticas */}
            <div className="stats">
              <h3>Estadisticas</h3>
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
      </div>
    </div>
  );
}

export default Pokemon;
