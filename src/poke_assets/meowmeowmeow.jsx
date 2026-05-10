import { useState, useCallback, useRef } from "react";

export const useFetchPokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const offsetRef = useRef(0);

    const loadMorePokemon = useCallback(async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offsetRef.current}&limit=69`);
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
            data.results.map(poke => 
                fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`).then(res => res.json())
            )
        );
        
        setPokemonList(prev => [...prev, ...pokemonDetails]);
        offsetRef.current += 69;
    }, []);

    return { pokemonList, loadMorePokemon };
};




export const fetchSinglePokemon = async (pokemonId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    return response.json();
};




export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};