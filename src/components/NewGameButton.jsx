import React, { useContext } from 'react'
import { Context } from '../Context'

const NewGameButton = ({setIsMobileModal, setIsGameStarted}) => {

  const {setFoundPairs, setClickedIndices, setMoves, setTimer, setResetEffect} = useContext(Context)

  const restartGame = () => {
    setResetEffect(true)
    setFoundPairs([])
    setClickedIndices([])
    setMoves(0)
    setTimer(0)
    setIsMobileModal(false)
    setIsGameStarted(false)
  }

  return (
    <>
      <button 
        onClick={restartGame} 
        className='bg-secondButtonGray text-mainSelectionBlueHover font-bold rounded-full py-3 px-6 transition duration-300 hover:bg-secondButtonGrayHover hover:text-backgroundWhite'>
          New Game
      </button>
    </>
  )
}

export default NewGameButton