import React, {useContext} from 'react'
import { Context } from '../Context'

const RestartButton = ({setIsMobileModal}) => {

  const {setFoundPairs, setClickedIndices, setMoves, setTimer, setResetEffect} = useContext(Context)

  const restartGame = () => {
    setResetEffect(true)
    setFoundPairs([])
    setClickedIndices([])
    setMoves(0)
    setTimer(0)
    setIsMobileModal(false)
  }

  return (
    <>
      <button onClick={restartGame} className='text-backgroundWhite font-bold bg-mainButtonOrange rounded-full py-3 px-6'>
          Restart
      </button>
    </>
  )
}

export default RestartButton;