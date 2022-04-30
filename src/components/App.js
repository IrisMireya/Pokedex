import React from "react";
import "../styles/App.scss";
import Navbar from "../components/Navbar";
import Searchbar from "./Searchbar";
import Pokedex from "../components/Pokedex";
import { getPokemons, getPokemonData } from "./Api";

const {useState, useEffect} = React;

export default function App() {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try{
      const data = await getPokemons();
      console.log(data.results);
      const promises = data.results.map(async (pokemon) =>{
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
    } catch(err){

    }
  }
 
useEffect(() => {
  fetchPokemons();
}, [])

  return (
    <div>
      <Navbar />
      <div className="App">
        <Searchbar />
        <Pokedex pokemons= {pokemons}/>
      </div>
    </div>
  );
}
