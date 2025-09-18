import './App.css'
import PokemonCall from './api/PokemonApi'

function App() {

  return (
    <>
      <PokemonCall limit={6} />
    </>
  )
}

export default App
