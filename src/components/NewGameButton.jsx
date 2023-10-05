import React, { useContext } from 'react'
import { Context } from '../Context'

const NewGameButton = ({setIsGameStarted, isGameCompletedStats}) => {

  const {setIsMobileModal, setFoundPairs, setClickedIndices, setMoves, setTimer, setResetEffect, setIsGameCompleted, setCurrentPlayerIndex, setPlayers} = useContext(Context)

  const newGame = () => {
    setResetEffect(true) // This will re-shuffle the content when new or restarted game is clicked
    setFoundPairs([])
    setClickedIndices([])
    setMoves(0)
    setTimer(0)
    setIsMobileModal(false)
    setIsGameStarted(false)
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