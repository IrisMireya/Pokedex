import React from "react";
import { searchPokemon } from "./Api";
const { useState } = React;

const Searchbar = (props) => {
  const { onSearch } = props;
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState();

  const onChange = (ev) => {
    setSearch(ev.target.value);
    if (ev.target.value.length === 0) {
      onSearch(null);
    }
  };

  const onClick = async (ev) => {
    onSearch(search);
    const data = await searchPokemon(search);
    setPokemon(data);
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input placeholder="Buscar pokemon..." onChange={onChange} />
      </div>
      <div className="searchbar-btn">
        <button onClick={onClick}>Buscar</button>
      </div>
      <div>
          {pokemon&&
      <div>
        <div>Nombre: {pokemon.name}</div>
        <div>Peso: {pokemon.weight}</div>
        <img src={pokemon.sprites.front_default} />
      </div>
        }
    </div>
    </div>
  );
};

export default Searchbar;
