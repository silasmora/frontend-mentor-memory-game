import React, {useContext} from 'react'
import { Context } from '../Context'

const RestartButton = ({isGameCompletedStats}) => {

  const {setIsMobileModal, setFoundPairs, setClickedIndices, setMoves, setTimer, setResetEffect, setIsGameCompleted, setCurrentPlayerIndex, setPlayers} = useContext(Context)
  
  const restartGame = () => {
    setResetEffect(true)  // This will re-shuffle the content when new or restarted game is clicked
    setFoundPairs([])
    setClickedIndices([])
    setMoves(0)
    setTimer(0)
    setIsMobileModal(false)
    setIsGameCompleted(false)
    
    // Reset player scores and set current player index back to 0
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        return {
          ...player,
          score: 0,
          pairsFound: 0,
        };
      });
    });
  
    setCurrentPlayerIndex(0); // Set the current player index back to 0
    console.log('Restart button clicked')
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