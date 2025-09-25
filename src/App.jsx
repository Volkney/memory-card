import './App.css'
import PokemonCall from './api/PokemonApi'

function App() {

  return (
    <>
      <h1 className='pb-3 my-0'>Pokemon Memory Card Game</h1>
      <PokemonCall limit={6}/>
    </>
  )
}

export default App
