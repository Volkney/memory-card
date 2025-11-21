// hooks/usePokemon.js
import { useEffect, useState } from "react"

export default function usePokemon(limit = 6) {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(false)

    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`

    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true)
                const res = await fetch(url)
                const data = await res.json()

                const details = await Promise.all(
                    data.results.map(async (pkm) => {
                        const res = await fetch(pkm.url)
                        const info = await res.json()
                        return {
                            name: pkm.name,
                            sprite: info.sprites.front_default
                        }
                    })
                )

                setPokemon(details)
            } catch (err) {
                console.log("Error fetching Pokémon:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemon()
    }, [url])

    function shuffleCards() {
        setPokemon(prev => {
            const arr = [...prev]
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
            }
            return arr
        })
    }

    return { pokemon, loading, shuffleCards }
}
