import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { capitalize, useFetchPokemonList, filterPokemons } from '../poke_assets/meowmeowmeow.jsx'
import PokeSearchBar from '../poke_components/PokeSearchBar.jsx'

const PokeHome = () => {
  const { pokemonList } = useFetchPokemonList();
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('1');
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 40;

  useEffect(() => {
    setIsLoading(pokemonList.length === 0);
  }, [pokemonList]);

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const displayList = filterPokemons(pokemonList, searchValue);
  const totalPages = Math.ceil(displayList.length / itemsPerPage) || 1;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedPokemon = displayList.slice(startIdx, startIdx + itemsPerPage);

  const handleGoToPage = () => {
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="pokeHome">
        <div className="loadingContainer">
          <div className="pokeBall"></div>
          <p>Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokeHome">
      <PokeSearchBar currentPagePokemon={pokemonList} onSearch={handleSearch}/>
      
      <div className="pokePageThing">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <p>&lt;</p>
        </button>
        <input type="number" min="1" max={totalPages} value={inputPage} onChange={(e) => setInputPage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()} />
        <span>/ {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <p>&gt;</p>
        </button>
      </div>

      <div className="pokeHomeCardLayout">
        {displayedPokemon.length === 0 ? (
          <div className="noResultsContainer">
            <p>No pokémon found</p>
          </div>
        ) : (
          displayedPokemon.map((pokemon) => (
            <Link key={pokemon.id} to={`/PokeSpecs/${pokemon.id}`}>
              <div className="pokeCard">
                <div className="pokeCardInner">
                  <div className="pokeCardFront">
                    <div className="pokeCardInfoHolder">
                      <h5>#{pokemon.id} {capitalize(pokemon.name)}</h5>
                      <img src={pokemon.sprites.front_default} alt={pokemon.name} width="180"/>

                      <div className='pokeType'>
                        {pokemon.types.map((type) => (
                          <span key={type.slot}>{capitalize(type.type.name)}</span>
                        ))}
                      </div>

                    </div>
                  </div>

                  <div className="pokeCardBack">
                    <img src={pokemon.sprites.back_default} alt={pokemon.name} width="180"/>
                  </div>

                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="pokePageThing">
        
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <p>&lt;</p>
        </button>

        <input type="number" min="1" max={totalPages} value={inputPage} onChange={(e) => setInputPage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()} />
        <span>/ {totalPages}</span>

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <p>&gt;</p>
        </button>

      </div>
    </div>
  );
};

export default PokeHome;