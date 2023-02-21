import React, { useEffect, useState } from 'react'
import { Detail, PokemonDetail } from '../../../interface'
import '../index.scss'


interface Props {
    abilities: {
        name: string,
        ability: string
    }[] | undefined,
    name: string,
    id: number,
    image: string,
    detail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonList: React.FC<Props> = (props) => {
    const { id, name, image, abilities, detail, setDetail } = props;
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        setIsSelected(id === detail?.id);
    }, [detail])

    const closeDetail = () => {
        setDetail({ id: 0, isOpened: false })
    }
    return (
        <>
            {isSelected ? <section className='pokemon__list--detailed'>
                <div className="detail__container">
                    <div className="detail__close" onClick={closeDetail}>X</div>
                    <div className="detail__info">
                        <img src={image} alt="" />
                        <p className="detail__name">
                            {name}
                        </p>
                    </div>
                    <div className="detail__skill">
                        <p className="detail__ability">
                            Abilities :
                        </p>
                        {
                            abilities?.map((ab: any, index) => {
                                return <div key={index}>{ab.ability.name}</div>
                            })
                        }
                    </div>
                </div>
            </section> : (!detail.isOpened ? <section className="pokemon__list__container">
                <p className="pokemon__name">{name}</p>
                <img src={image} alt="" />
            </section> : <></>)}
        </>

    )
}

export default PokemonList