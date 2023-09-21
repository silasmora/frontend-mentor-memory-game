import React, {useState} from 'react'

const Context = React.createContext()

const ContextProvider = ({ children }) => {

  const [shuffledNumbers, setShuffledNumbers] = useState([])
  const [clickedIndices, setClickedIndices] = useState([])
  const [foundPairs, setFoundPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [timer, setTimer] = useState(0)

  const [resetEffect, setResetEffect] = useState(false)

  const value = {
    shuffledNumbers,
    setShuffledNumbers,
    clickedIndices,
    setClickedIndices,
    foundPairs,
    setFoundPairs,
    moves,
    setMoves,
    timer,
    setTimer,
    resetEffect,
    setResetEffect
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}
