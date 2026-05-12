// poke_components/PokeSearchBar.jsx
import { useState } from 'react'
import { filterPokemons } from '../poke_assets/meowmeowmeow.jsx'

const PokeSearchBar = ({ currentPagePokemon, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const hasNoResults = searchValue && filterPokemons(currentPagePokemon, searchValue).length === 0;

  return (
    <div className="pokeSearchBar">
      <label htmlFor="pokeSearch">Search Pokémon</label>
      <input type="search" id="pokeSearch" placeholder="Search by name or number..." value={searchValue} onChange={handleChange} />
      {hasNoResults && <p className="noResults">No pokémon found</p>}
    </div>
  );
};

export default PokeSearchBar;