import React, {useState} from 'react'

const Context = React.createContext()

const ContextProvider = ({ children }) => {

  const [isMobileModal, setIsMobileModal] = useState(false)
  const [shuffledNumbers, setShuffledNumbers] = useState([])
  const [shuffledIcons, setShuffledIcons] = useState([])
  const [clickedIndices, setClickedIndices] = useState([])
  const [foundPairs, setFoundPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [timer, setTimer] = useState(0)
  const [resetEffect, setResetEffect] = useState(false)
  const [isGameCompleted, setIsGameCompleted] = useState(false)
  const [players, setPlayers] = useState([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  const formattedTimer = new Date(timer * 1000).toISOString().substr(14, 5)

  //function to shuffle any array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const value = {
    isMobileModal,
    setIsMobileModal,
    shuffledNumbers,
    setShuffledNumbers,
    shuffledIcons,
    setShuffledIcons,
    clickedIndices,
    setClickedIndices,
    foundPairs,
    setFoundPairs,
    moves,
    setMoves,
    timer,
    setTimer,
    formattedTimer,
    resetEffect,
    setResetEffect,
    isGameCompleted,
    setIsGameCompleted,
    shuffleArray,
    currentPlayerIndex,
    setCurrentPlayerIndex,
    players,
    setPlayers
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}
