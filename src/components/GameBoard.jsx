import React, {useContext, useEffect} from 'react'
import generateNumbersContent from './GenerateContent';
import { Context } from '../Context';
import RestartButton from './RestartButton';
import NewGameButton from './NewGameButton';

const GameBoard = ({ gameSettings, setIsGameStarted }) => {

  const {setTimer, moves, setMoves, formattedTimer, isGameCompleted, currentPlayerIndex, setCurrentPlayerIndex, players, setPlayers, setIsMobileModal} = useContext(Context)
  const { selectedTheme, totalPlayers, gridSize } = gameSettings

  // Parse the total number of players as an integer with a radix of 10 (decimal).
  const playerCount = parseInt(totalPlayers, 10)

  useEffect(() => {
    let intervalId
    if (!isGameCompleted) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => {
      //Clean up the timer when the component unmounts or the game is completed
      clearInterval(intervalId)
    }
  }, [isGameCompleted])

  // useEffect to initialize player data based on total player count.
  // Generates an array of player objects with unique IDs, names, scores, and pairsFound properties.

  useEffect(() => {
    const initialPlayer = Array.from({length: playerCount}, (_, index) => {
      // Player names are set to 'P1', 'P2', ... for small screens and 'Player 1', 'Player 2', ... for larger screens.
      const playerName = window.innerWidth < 768 ? `P${index + 1}` : `Player ${index + 1}`
      return {
        id: index + 1,
        name: playerName,
        score: 0,
        pairsFound: 0
      }
    })
    setPlayers(initialPlayer)
  }, [playerCount])
  
  const handleMove = () => {
    // Get the current player
    const currentPlayer = players[currentPlayerIndex]

    //Increment the score of the current player
    const updatedPlayers = [...players]
    updatedPlayers[currentPlayerIndex] = {
      ...currentPlayer,
      score: currentPlayer.score + 1,
    }
    setPlayers(updatedPlayers)

    // Move to the nest player
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length)
  }

  return (
    <div className='max-w-[1440px] mx-auto bg-backgroundWhite flex flex-col items-center gap-[80px] px-6 py-6 md:py-10 lg:py-16 md:px-10 lg:px-[165px] md:gap-[120px] lg:gap-[85px]'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='text-[24px] text-mainTextGray font-bold md:text-[40px]'>memory</h2>
        <button onClick={() => setIsMobileModal(true)} className='font-bold text-backgroundWhite py-[10px] px-[18px] bg-mainButtonOrange rounded-full md:hidden'>Menu</button>
        <div className='hidden md:flex gap-4 text-[20px]'>
          <RestartButton />
          <NewGameButton setIsGameStarted={setIsGameStarted}/>
        </div>
      </div>
      
      {selectedTheme && (
        <div className='flex justify-center mb-4'>
          {generateNumbersContent(selectedTheme, gridSize, totalPlayers, moves, setMoves, handleMove, setIsGameStarted)}
        </div>
      )}

      {totalPlayers === '1' ? (
        <div className='flex justify-center items-center gap-6 w-[90vw] sm:w-[80vw] md:w-[70vw] md:gap-[30px] lg:w-[40vw]'>

        <div className='bg-secondButtonIdle py-3 px-10 rounded-md w-1/2 text-center'>
          <p className='text-grayBlue text-[15px] font-bold'>Time</p>
          <p className='text-mainSelectionBlueHover text-2xl font-bold'>{formattedTimer}</p>
        </div>

        <div className='bg-secondButtonIdle py-3 px-10 rounded-md w-1/2 text-center'>
          <p className='text-grayBlue text-[15px] font-bold'>Moves</p>
          <p className='text-mainSelectionBlueHover text-2xl font-bold'>{moves}</p>
        </div>

      </div>
      ) : (
        <div className='flex gap-6 w-full'>
          {players.map((player, idx) => (
            <div key={player.id} className={`rounded-[10px] text-center w-full py-2 md:pl-4 md:text-left lg:flex items-center justify-between lg:py-4 lg:pr-5
            ${idx === currentPlayerIndex ? 'relative bg-mainButtonOrange before:content-[""] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-[100%] before:border-transparent before:border-[10px] before:border-b-mainButtonOrange lg:after:content-["current_turn"] after:w-full after:absolute after:bottom-0 after:left-0 after:translate-y-full after:pt-6 after:text-mainTextGray after:text-[13px] after:font-bold after:tracking-[5px] after:text-center after:uppercase' : 'bg-secondButtonIdle'}
            `}>
              <p className={`text-[15px] font-bold lg:text-[18px] ${idx === currentPlayerIndex ? 'text-backgroundWhite' : 'text-grayBlue'}`}>{player.name}</p>
              <p className={`text-2xl font-bold lg:text-[32px] ${idx === currentPlayerIndex ? 'text-backgroundWhite' : 'text-mainSelectionBlueHover'}`}>{player.score}</p>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default GameBoard;
