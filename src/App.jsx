import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import './index.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalPokemons, setTotalPokemons] = useState(0);

  const loadMorePokemons = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const newPokemons = data.results;
        setTotalPokemons(data.count);
        setPokemons([...pokemons, ...newPokemons]);
        setOffset(offset + 20);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    loadMorePokemons();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <PokemonList
                pokemons={pokemons}
                loadMorePokemons={loadMorePokemons}
                totalPokemons={totalPokemons}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
