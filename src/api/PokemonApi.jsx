import { useState } from 'react'
import usePokemon from '../hooks/usePokemon'
import PlayAgain from '../components/PlayAgain'
import Modal from '../components/Modal'

export default function PokemonCall({ limit = 6 }) {
    const { pokemon, loading, shuffleCards } = usePokemon(limit)

    const [clickedSet, setClickedSet] = useState(new Set())
    const [message, setMessage] = useState('')
    const [showModal, setShowModal] = useState(false)

    function handleClickedCard(name) {
        if (clickedSet.has(name)) {
            setMessage('You lose')
            setShowModal(true)
            return
        }

        const newSet = new Set(clickedSet).add(name)

        if (newSet.size === limit) {
            setMessage('You win')
            setClickedSet(newSet)
            setShowModal(true)
            return
        }

        setClickedSet(prev => new Set(prev).add(name))
        shuffleCards()
    }

    function resetGame() {
        setMessage('')
        setClickedSet(new Set())
        setShowModal(false)
    }

    if (loading) return <p>Loading Pokemon...</p>

    return (
        <div>
            <ul className='grid grid-rows-2 grid-flow-col gap-12 justify-center'>
                {pokemon.map(pkm => (
                    <li 
                        key={pkm.name} 
                        onClick={() => handleClickedCard(pkm.name)} 
                        className='border rounded p-4 hover:scale-105'
                    >
                        <img src={pkm.sprite} alt={pkm.name} draggable='false' />
                        {pkm.name}
                    </li>
                ))}
            </ul>

            <p>Streak: {clickedSet.size}</p>

            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-2xl font-bold mb-4">{message}</h2>
                <PlayAgain onReset={resetGame} />
            </Modal>
            
        </div>
    )
}
