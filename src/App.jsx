import './App.css'
import MonopolyGame from './components/MonopolyGame'
import GoToJailFeature from './components/GoToJailFeature'

function App() {
  return (
    <div className="app">
      <h1>Monopoly Game</h1>
      <MonopolyGame />
      <hr />
      <GoToJailFeature />
    </div>
  )
}

export default App