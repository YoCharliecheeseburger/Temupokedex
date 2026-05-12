import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSinglePokemon, capitalize, fetchEvolutionChain } from '../poke_assets/meowmeowmeow.jsx'
import EvolutionCard from '../poke_components/EvolutionCard.jsx'

const PokeSpecs = ({ pokemonList }) => {
    const { pokemonId } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState([]);

    useEffect(() => {
        const loadPokemon = async () => {
            let pokemonData = pokemonList.find(p => p.id === parseInt(pokemonId));
            
            if (!pokemonData) {
                pokemonData = await fetchSinglePokemon(pokemonId);
            }
            
            setPokemon(pokemonData);
            const evolutions = await fetchEvolutionChain(pokemonData.species.url);
            setEvolutionChain(evolutions);
        };

        if (pokemonId) {
            loadPokemon();
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
                                    <strong>{capitalize(stat.stat.name)}</strong>: {stat.base_stat}
                                </p>
                            ))}
                        </div>
                    </div>
                    
                    <div className='pokeType'>
                        {pokemon.types.map((type) => (
                            <span key={type.slot}>{capitalize(type.type.name)}</span>
                        ))}
                    </div>

                    <div className='specsBottom'>
                        <div className='pokeAbilities'>
                            <h2>Abilities</h2>
                            <ul>
                                {pokemon.abilities.map((ability) => (
                                    <li key={ability.ability.name}>{capitalize(ability.ability.name)}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className='pokeSize'>
                            <h2>Size</h2>
                            <p><strong>Height:</strong> {(pokemon.height / 10).toFixed(1)} m</p>
                            <p><strong>Weight:</strong> {(pokemon.weight / 10).toFixed(1)} kg</p>
                        </div>
                    </div>

                    {evolutionChain.length > 0 && (
                        <div className='pokeEvolutions'>
                            <h2>Evolution Chain</h2>
                            <div className='evolutionContainer'>
                                {evolutionChain.map((evolution, index) => (
                                    <EvolutionCard key={index} species={evolution} onNavigate={(id) => navigate(`/PokeSpecs/${id}`)}/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PokeSpecs;