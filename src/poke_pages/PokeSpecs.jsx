import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { fetchSinglePokemon, capitalize } from '../poke_assets/meowmeowmeow.jsx'

const PokeSpecs = ({ pokemonList }) => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const foundPokemon = pokemonList.find(p => p.id === parseInt(pokemonId));
        
        if (foundPokemon) {
            setPokemon(foundPokemon);
        } else {
            fetchSinglePokemon(pokemonId).then(data => {
                setPokemon(data);
            });
        }
    }, [pokemonId, pokemonList]);

    return pokemon && (
        <div className="pokeSpecs">
            <div className='pokeSpecsLayout'>
                <h1>#{pokemon.id} {capitalize(pokemon.name)}</h1>

                <div className="pokeSpecsCard">

                    <div className='specsTop'>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name}/>

                        <div className='pokeStats'>
                            <h2>Stats</h2>
                            {pokemon.stats.map((stat) => (
                            <p key={stat.stat.name}>
                                <strong>{stat.stat.name}</strong>: {stat.base_stat}
                            </p>
                        ))}
                        </div>
                    </div>
                    

                    <div className='pokeType'>
                        {pokemon.types.map((type) => (
                            <span key={type.slot}>{type.type.name}</span>
                        ))}
                    </div>

                    <div className='specsBottom'>
                        <div className='pokeAbilities'>
                            <h2>Abilities</h2>

                            {pokemon.abilities.map((ability) => (
                                <li key={ability.ability.name}>{ability.ability.name}</li>
                            ))}

                        </div>
                        
                        <div className='pokeSize'>
                            <h2>Size</h2>
                            <p>Height: {pokemon.height}</p>
                            <p>Weight: {pokemon.weight}</p>
                        </div>
 
                    </div>

                </div>
                
            </div>
            <div className='footerFixer'></div>
        </div>
    );
};

export default PokeSpecs;