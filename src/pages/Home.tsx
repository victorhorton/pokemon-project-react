import { Pokemon, PokemonClient } from "pokenode-ts";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { titleize } from "../utils/formatStrings";

function Home() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | undefined>();

  const handleSubmit = (userInput: string) => {
    (async () => {
      const api = new PokemonClient(); // create a PokemonClient

      await api
        .getPokemonByName(userInput.toLocaleLowerCase())
        .then((pokemon: Pokemon) => setCurrentPokemon(pokemon))
        .catch((error) => console.error(error));
    })();
  };

  if (currentPokemon) {
    const src = currentPokemon.sprites.front_default
      ? currentPokemon.sprites.front_default
      : "";
    return (
      <>
        <SearchBar handleSubmit={handleSubmit} />
        <img src={src} />
        <h1>{titleize(currentPokemon.name)}</h1>
      </>
    );
  } else {
    return <SearchBar handleSubmit={handleSubmit} />;
  }
}

export default Home;
