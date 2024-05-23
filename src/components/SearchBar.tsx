import { useEffect, useState } from "react";
import {
  PokemonClient,
  NamedAPIResourceList,
  NamedAPIResource,
} from "pokenode-ts"; // import the PokemonClient (EggGroups enum is fully optional)

function SearchBar() {
  const [userInput, setUserInput] = useState("");
  const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>();

  useEffect(() => {
    (async () => {
      const api = new PokemonClient(); // create a PokemonClient

      await api
        .listPokemons()
        .then((resourceList: NamedAPIResourceList) =>
          setPokemonList(() => resourceList.results)
        )
        .catch((error) => console.error(error));
    })();
  }, []);

  const handleChange = ({ target }: { target: { value: string } }) => {
    setUserInput(() => target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    alert(userInput);
    setUserInput(() => "");
  };

  return (
    <>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 rounded-3xl border border-slate-300 w-3/4 mt-1"
          value={userInput}
          onChange={handleChange}
        />
      </form>
      <ul>
        {pokemonList?.map((pokemon) => {
          return <li>{pokemon.name}</li>;
        })}
      </ul>
    </>
  );
}

export default SearchBar;
