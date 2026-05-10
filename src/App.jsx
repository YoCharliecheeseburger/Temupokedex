import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './pokeIndex.css'

import Footer from './poke_components/PokeFooter.jsx'
import Navbar from './poke_components/PokeNavbar.jsx'
import PokeHome from './poke_pages/PokeHome.jsx'
import PokeSpecs from './poke_pages/PokeSpecs.jsx'
import { useFetchPokemonList } from './poke_assets/meowmeowmeow.jsx'

function App() {
  const { pokemonList, loadMorePokemon } = useFetchPokemonList();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<PokeHome pokemonList={pokemonList} onLoadMore={loadMorePokemon} />} />
        <Route path='/PokeSpecs/:pokemonId' element={<PokeSpecs pokemonList={pokemonList} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App





























































//#C68879 my friend's hand color cause he wanted to be included