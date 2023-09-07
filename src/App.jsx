import { useState } from "react"
import StartGame from "./components/StartGame"
import GameBoard from "./components/GameBoard"


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
    <>
      {isGameStarted ? (
        <GameBoard gameSettings={gameSettings}/> 
      ) : (
        <StartGame 
          onStart={startGame}
          gameSettings={gameSettings}
          setGameSettings={setGameSettings}
          />
      )}
    </>
  )
}

export default App
