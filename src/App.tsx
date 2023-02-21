import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import PokemonCollection from './components/containers/pokemonCollection/PokemonCollection';
import Header from './components/layouts/Header';
import { Detail, Pokemon } from './interface';

interface Pokemons {
  name: string,
  url: string
}



const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<Detail>({ id: 0, isOpened: false })

  const getPokemon = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    setNextUrl(res.data.next)
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons((p) => [...p, poke.data])
      setLoading(false)
    })
  }
  useEffect(() => {
    try {
      getPokemon()
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons((p) => [...p, poke.data])
    })
    setLoading(false);
  }

  return (
    <div className="container">
      <div className="header">
        <Header />
      </div>

      <div className="list_pokemons">
        <PokemonCollection pokemons={pokemons} detail={detail} setDetail={setDetail} />
      </div>

      {!detail.isOpened ? <div className="btn" onClick={loadMore}>
        <button>{loading ? "Loading..." : "Load more"}</button>
      </div> : <></>}
    </div>
  );
}

export default App;
