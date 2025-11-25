import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PokeID() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    // Datos principales
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));

    // Entrada Pokédex EN INGLÉS
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const texto = data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        setDescripcion(texto ? texto.flavor_text : "No Pokédex entry available.");
      });
  }, [id]);

  return (
    <div className="pokedex">
      {pokemon && (
        <>
          <h2 className="pokedex-title">Pokédex #{id}</h2>

          <div className="pokemon-frame">
            <h1 className="pokemon-name">{pokemon.name}</h1>

            {/* IMÁGENES */}
            <div className="pokemon-images">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <img src={pokemon.sprites.back_default} alt={pokemon.name} />
            </div>

            {/* TIPOS */}
            <div className="types">
              <h3>Types</h3>
              <ul>
                {pokemon.types.map((tipo) => (
                  <li
                    key={tipo.type.name}
                    className={`type-${tipo.type.name}`}
                  >
                    {tipo.type.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="stats">
              <h3>Pokédex Entry</h3>
              <p style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                {descripcion}
              </p>

              {/* DATOS BÁSICOS */}
              <p>ID: {pokemon.id}</p>
              <p>Weight: {pokemon.weight / 10} kg</p>
              <p>Height: {pokemon.height / 10} m</p>
              <p>Ability: {pokemon.abilities[0].ability.name}</p>

              {/* SONIDO */}
              <h3>Sound</h3>
              {pokemon.cries?.latest && (
                <audio key={pokemon.id} controls>
                  <source src={pokemon.cries.latest} type="audio/ogg" />
                </audio>
              )}
            </div>
          </div>
        </>
      )}

      <button
        onClick={() => navigate("/buscar")}
        className="pokedex-button"
        style={{ marginBottom: "15px" }}
      >
        VOLVER
      </button>
    </div>
  );
}

export default PokeID;
