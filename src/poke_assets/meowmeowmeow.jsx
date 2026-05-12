import { useState, useCallback, useRef, useEffect } from "react";

export const useFetchPokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const hasLoaded = useRef(false);

    useEffect(() => {
        if (hasLoaded.current) return;
        
        const loadAllPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
                const data = await response.json();
                
                const pokemonDetails = await Promise.all(
                    data.results.map(poke => 
                        fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`).then(res => res.json())
                    )
                );
                
                setPokemonList(pokemonDetails);
            } catch (error) {
                console.error("Error loading pokemon:", error);
            }
        };

        loadAllPokemon();
        hasLoaded.current = true;
    }, []);

    return { pokemonList };
};

export const fetchSinglePokemon = async (pokemonId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    return response.json();
};

export const fetchEvolutionChain = async (speciesUrl) => {
    try {
        const speciesRes = await fetch(speciesUrl);
        const speciesData = await speciesRes.json();
        
        const chainRes = await fetch(speciesData.evolution_chain.url);
        const chainData = await chainRes.json();
        
        const evolutions = [];
        let current = chainData.chain;
        
        evolutions.push(current.species);
        if (current.evolves_to.length > 0) {
            evolutions.push(current.evolves_to[0].species);
            if (current.evolves_to[0].evolves_to.length > 0) {
                evolutions.push(current.evolves_to[0].evolves_to[0].species);
            }
        }
        
        return evolutions;
    } catch (error) {
        console.error("Error fetching evolution chain:", error);
        return [];
    }
};

export const fetchPokemonDetails = async (species) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${species.name}`);
        return await res.json();
    } catch (error) {
        console.error("Error fetching pokemon details:", error);
        return null;
    }
};

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const filterPokemons = (pokemonList, searchValue) => {
    if (!searchValue.trim()) return pokemonList;
    
    const searchLower = searchValue.toLowerCase();
    return pokemonList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchLower) ||
        pokemon.id.toString().includes(searchValue)
    );
};