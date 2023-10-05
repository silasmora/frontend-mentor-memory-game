import { useState } from "react"
import StartGame from "./components/StartGame"
import GameBoard from "./components/GameBoard"
import MobileMenuModal from "./components/MobileMenuModal"


function App() {
  
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [gameSettings, setGameSettings] = useState({
    selectedTheme: 'Numbers',
    totalPlayers: '1',
    gridSize: '4x4'
  })

  const startGame = () => {
    setIsGameStarted(true)
  }

  return (
    <div className={`${isGameStarted ? 'bg-backgroundWhite' : 'bg-mainTextGray'} h-screen`}>
      {isGameStarted ? (
        <GameBoard 
          gameSettings={gameSettings}
          setIsGameStarted={setIsGameStarted}
          /> 
      ) : (
        <StartGame 
          onStart={startGame}
          gameSettings={gameSettings}
          setGameSettings={setGameSettings}
          />
      )}
      <MobileMenuModal setIsGameStarted={setIsGameStarted}/>
    </div>
  )
}

export default App
