import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../poke_assets/meowmeowmeow.jsx'

const PokeHome = ({ pokemonList, onLoadMore }) => {
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      onLoadMore();
      hasLoaded.current = true;
    }
  }, []);

  return (
    <div className="pokeHome">
      <div className="pokeHomeCardLayout">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className="pokeCard">

             <h5>#{pokemon.id} {capitalize(pokemon.name)}</h5>

            <Link to={`/PokeSpecs/${pokemon.id}`}><img src={pokemon.sprites.front_default} alt={pokemon.name} width="180"/></Link>

            <div className='pokeType'>
              {pokemon.types.map((type) => (
                <span key={type.slot}>{type.type.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={onLoadMore}>Load More</button>

    </div>
  )
}

export default PokeHome