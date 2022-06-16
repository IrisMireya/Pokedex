import React from "react";
import "../styles/App.scss";
import Navbar from "../components/Navbar";
import Searchbar from "./Searchbar";
import Pokedex from "../components/Pokedex";
import { getPokemons, getPokemonData, searchPokemon } from "./Api";
import { FavoriteProvider } from "../contexts/favoritesContext";


const { useState, useEffect } = React;

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count/25))
    } catch (err) {}
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const updateFavoritePokemons = (name) => {
console.log(name);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons
      }}
    >
    <div>
      <Navbar />
      <div className="App">
        <Searchbar />
    
        : (
          <Pokedex 
          loading={loading}
          pokemons={pokemons} 
          page={page}
          setPage={setPage}
          total={total}
          />
        )
      </div>
    </div>
    </FavoriteProvider>
  );
}
