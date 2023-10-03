import React, { useContext } from 'react'
import { Context } from '../Context'

const NewGameButton = ({setIsMobileModal, setIsGameStarted, isGameCompletedStats}) => {

  const {setFoundPairs, setClickedIndices, setMoves, setTimer, setResetEffect, setIsGameCompleted} = useContext(Context)

  const newGame = () => {
    setResetEffect(true)
    setFoundPairs([])
    setClickedIndices([])
    setMoves(0)
    setTimer(0)
    setIsMobileModal(false)
    setIsGameStarted(false)
    setIsGameCompleted(false)
  }

  return (
    <>
      <button 
        onClick={newGame} 
        className={`bg-secondButtonGray text-mainSelectionBlueHover font-bold rounded-full py-3 px-6 transition duration-300 hover:bg-secondButtonGrayHover hover:text-backgroundWhite 
        ${isGameCompletedStats && 'w-full'}`}>
          New Game
      </button>
    </>
  )
}

export default NewGameButton