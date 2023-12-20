import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonList({ pokemons, loadMorePokemons, totalPokemons }) {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        pokemons.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return response.data;
        })
      );
      setPokemonData(data);
    };

    fetchData();
  }, [pokemons]);

  return (
    <div>
      <h1>POKEDEX</h1>
      <ul>
        {pokemonData.map((pokemon) => (
          <li key={pokemon.id}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
            <div>
              Type: {pokemon.types.map((type) => type.type.name).join(', ')}
            </div>
          </li>
        ))}
      </ul>
      {pokemons.length < totalPokemons && (
        <button onClick={loadMorePokemons}>Load More</button>
      )}
    </div>
  );
}

export default PokemonList;
