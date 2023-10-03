import React, {useContext} from 'react'
import { Context } from '../Context'

const RestartButton = ({setIsMobileModal, isGameCompletedStats}) => {

  const {setFoundPairs, setClickedIndices, setMoves, setTimer, setResetEffect, setIsGameCompleted} = useContext(Context)

  const restartGame = () => {
    setResetEffect(true)
    setFoundPairs([])
    setClickedIndices([])
    setMoves(0)
    setTimer(0)
    setIsMobileModal(false)
    setIsGameCompleted(false)
  }

  return (
    <>
      <button onClick={restartGame} className={`text-backgroundWhite font-bold bg-mainButtonOrange rounded-full py-3 px-6 hover:bg-opacity-70 transition duration-300 ease-in-out
      ${isGameCompletedStats && 'w-full'}`}>
          Restart
      </button>
    </>
  )
}

export default RestartButton;