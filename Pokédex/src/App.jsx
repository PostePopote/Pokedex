import { useState } from "react";
import "./style1.css";
import { Link } from "react-router-dom";

function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [pokeName, setPokeName] = useState("");
  const [pokeEntrada, setPokeEntrada] = useState({});

  const handleInputChange = (e) => {
    setPokeName(e.target.value);
  };

  const busca = () => {
    if (!pokeName) return; // Evita llamadas vacías
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  };

  const especie = () => {
    if (!pokeName) return;
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        const entryEN = data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        if (entryEN) {
          setPokeEntrada(entryEN.flavor_text.replace(/\f|\n/g, " ")); //Quita que haya saltos raros
        } else {
          setPokeEntrada("No Pokédex entries in english");
        }
      });
    }

  return (
    <div className="pokedex">
      <h1 className="pokedex-title">Pokedex</h1>

      <div className="pokemon-frame">
        {/* unicamente renderizara el apartado si pokemon tiene algun valor */}
        {pokemon && (
          <div className="pokemon-card">
            <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>

            <div className="pokemon-images">
              {pokemon.sprites?.front_default &&(
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="pokemon-image"
              />
              )}
              {/* Solamente se mostrara el sprite si es que posee algun valor 
              si se busca algun pokémon que no tenga diferencia de genero simplemente no se renderizara*/}
              {pokemon.sprites?.front_female && (
                <img
                  src={pokemon.sprites.front_female}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
              )}
              <img
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                className="pokemon-image"
              />
            </div>

            {/* Tipos de los pokémons */}
            <div className="types">
              <h3>Tipos</h3>
              <ul>
                {pokemon.types.map((t) => (
                  // se pone el type-&{} porque dependiendo del nombre 
                  // que tenga el tipo sera el fondo
                  <li key={t.type.name} className={`type-${t.type.name}`}>
                    {t.type.name}
                  </li>
                ))}
              </ul>
            </div>
            {/* Apartado de datos normales */}
            <p>ID: {pokemon.id}</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
            <p>Height: {pokemon.height / 10} m</p>
            <p>Ability: {pokemon.abilities[0].ability.name}</p>
            {pokeEntrada && (
              <p className="pokedex-entry">“{pokeEntrada}”</p>
            )}
            <h3>Sound</h3>
            <audio key={pokemon.id} controls>
              <source src={pokemon.cries.latest} type="audio/ogg" />
            </audio>

            {/* Apartado de Estadisticas */}
            <div className="stats">
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
        <input type="text" value={pokeName} onChange={handleInputChange} placeholder="pichu" className="pokedex-input"/>
        <button onClick={() => {
            busca();
            especie();}}
          className="pokedex-button" >Buscar</button>
      </div>
      <div>
        <Link to="/"  className="boton-pokedex">Volver</Link>
      </div>
    </div>
  );
}

export default Pokemon;