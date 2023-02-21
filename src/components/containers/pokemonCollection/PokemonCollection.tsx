import React from 'react'
import { Detail, PokemonDetail } from '../../../interface';
import PokemonList from '../pokemonList/PokemonList';
import '../index.scss'

interface Props {
    pokemons: PokemonDetail[];
    detail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonCollection: React.FC<Props> = (props) => {
    const { pokemons, detail, setDetail } = props;
    const selectPokemon = (id: number) => {
        if (!detail.isOpened) {
            setDetail({
                id: id,
                isOpened: true
            })
        }
    }
    return (
        <section className={detail.isOpened ? "collection__container--active" : "collection__container"}>
            {
                detail.isOpened ? <div className="overlay"></div> : <></>
            }
            {
                pokemons.map((pokemon) => {
                    return (
                        <div key={pokemon.id} onClick={() => { selectPokemon(pokemon.id) }}>
                            <PokemonList
                                detail={detail}
                                setDetail={setDetail}
                                name={pokemon.name}
                                id={pokemon.id}
                                abilities={pokemon.abilities}
                                image={pokemon.sprites.front_default}
                            />
                        </div>
                    )
                })
            }
        </section>
    )
}

export default PokemonCollection