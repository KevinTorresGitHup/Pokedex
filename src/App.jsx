import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemones, setPokemon] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
      );
      const data = await response.json();
      const { results } = data;
      const newPokemones = results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const poke = await response.json();
        return {
          name: poke.name,
          id: poke.id,
          image: poke.sprites.other.dream_world.front_default,
        };
      });
      setPokemon(await Promise.all(newPokemones));
    };
    getPokemon();
  }, []);

  return (
    <>
      <h1>Pokedex</h1>
      {
        <ul>
          {pokemones.map((pokemon, index) => (
            <li key={index}>
              <img src={pokemon.image} alt={pokemon.name} />
              <p>{pokemon.name}</p>
              <p>{pokemon.id}</p>
            </li>
          ))}
        </ul>
      }
    </>
  );
}

export default App;
