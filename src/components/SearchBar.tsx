import { useState } from "react";

function SearchBar() {
  const [userInput, setUserInput] = useState("");

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
    </>
  );
}

export default SearchBar;
