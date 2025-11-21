import { useEffect } from "react"

export default function PokemonCall({ limit = 6 }) {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(false)
    const [clickedSet, setClickedSet] = useState(new Set())
    const [message, setMessage] = useState('')

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
    }, [url])
    
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