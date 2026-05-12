// poke_components/EvolutionCard.jsx
import { useState, useEffect } from 'react'
import { capitalize, fetchPokemonDetails } from '../poke_assets/meowmeowmeow.jsx'

const EvolutionCard = ({ species, onNavigate }) => {
    const [image, setImage] = useState(null);
    const [pokemonId, setPokemonId] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            const data = await fetchPokemonDetails(species);
            if (data) {
                setImage(data.sprites.front_default);
                setPokemonId(data.id);
            }
        };
        loadDetails();
    }, [species]);

    return (
        <div className='evolutionCard' onClick={() => pokemonId && onNavigate(pokemonId)}>
            {image && <img src={image} alt={species.name} />}
            <p>{capitalize(species.name)}</p>
        </div>
    );
};

export default EvolutionCard;