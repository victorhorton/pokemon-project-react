import { useEffect, useState } from "react";
import {
  PokemonClient,
  NamedAPIResourceList,
  NamedAPIResource,
} from "pokenode-ts"; // import the PokemonClient (EggGroups enum is fully optional)
import { titleize } from "../utils/formatStrings";

function SearchBar(props: { handleSubmit: (arg0: string) => void }) {
  const [userInput, setUserInput] = useState("");
  const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>();
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const api = new PokemonClient(); // create a PokemonClient

      await api
        .listPokemons(0, 1301)
        .then((resourceList: NamedAPIResourceList) =>
          setPokemonList(() => resourceList.results)
        )
        .catch((error) => console.error(error));
    })();
  }, []);

  useEffect(() => {
    const amountToDisplay = 5;
    if (userInput === "" && pokemonList) {
      setOptions(
        pokemonList.slice(0, amountToDisplay).map((pokemon) => {
          return pokemon.name;
        })
      );
    } else if (pokemonList) {
      setOptions(
        pokemonList
          .filter((pokemon) => {
            return pokemon.name.includes(userInput.toLocaleLowerCase());
          })
          .slice(0, amountToDisplay)
          .map((pokemon) => {
            return pokemon.name;
          })
      );
    }
  }, [userInput, pokemonList]);

  const handleChange = ({ target }: { target: { value: string } }) => {
    setUserInput(() => target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    props.handleSubmit(userInput);
    setUserInput(() => "");
  };

  return (
    <>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={handleChange}
          list="pokemon-list"
          className="p-2 m-2 w-3/4 border border-slate-500 rounded-3xl text-center"
        />
      </form>
      <datalist id="pokemon-list">
        {options.map((option) => {
          return <option key={option}>{titleize(option)}</option>;
        })}
      </datalist>
    </>
  );
}

export default SearchBar;
