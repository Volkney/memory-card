import { useEffect, useState } from 'react'

export default function PokemonCall( { limit=6 } ) {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(false)
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
    
    useEffect(() => {
        console.log(pokemon)
    }, [pokemon])

    if (loading) return <p>Loading Pokemon...</p>
    return (
        <ul>
            {pokemon.map(pkm => <li key={pkm.name}>
                <img src={pkm.sprite} alt={pkm.name} />
                {pkm.name}
            </li>)}
        </ul>
    )
}