import { useEffect, useState } from 'react'

export default function PokemonCall( { limit=6 } ) {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(false)
    const [clickedSet, setClickedSet] = useState(new Set())

    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true)
                const res = await fetch(url)
                const data = await res.json()

                const pkmDetails = await Promise.all(

                    data.results.map(async (pkm) => {
                        const res = await fetch(pkm.url)
                        const info = await res.json()
                        return { name: pkm.name, sprite: info.sprites.front_default }
                    })
                )
                setPokemon(pkmDetails)
            } catch (err) {
                console.log("error fetching Pkm: ", err)
            } finally {
                setLoading(false)
            }
        }
        fetchPokemon()
    }, [limit])
    
    function shuffleCards() {
        setPokemon(prev => {
            const shuffled = [...prev]
            for (let i = shuffled.length - 1; i > 0; i--){
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            }

          return shuffled
        })
    }
    
    function handleClickedCard(name) {
        setClickedSet(prev => {
            const newSet = new Set(prev)
            newSet.add(name)
            return newSet
        })
        shuffleCards()
      }

    if (loading) return <p>Loading Pokemon...</p>
    return (
        <ul className='grid grid-rows-2 grid-flow-col gap-12 justify-center'> 
            {pokemon.map(pkm => <li key={pkm.name} onClick={() => handleClickedCard(pkm.name)} className='border rounded p-4 hover:scale-105'>
                <img src={pkm.sprite} alt={pkm.name} draggable='false'/>
                {pkm.name}
            </li>)}
            <li>Unique Clicks: { clickedSet.size}</li>
        </ul>
    )
}