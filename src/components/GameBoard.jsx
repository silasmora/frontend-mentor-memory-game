import React, {useContext, useEffect} from 'react'
import generateNumbersContent from './GenerateNumbersContent';
import { Context } from '../Context';
import RestartButton from './RestartButton';
import NewGameButton from './NewGameButton';

const GameBoard = ({ gameSettings, setIsMobileModal, setIsGameStarted }) => {

  const {timer, setTimer, moves, setMoves} = useContext(Context)
  const { selectedTheme, totalPlayers, gridSize } = gameSettings

  useEffect(() => {
    let intervalId
    if (selectedTheme === 'Numbers') {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => {
      //Clean up the timer when the component unmounts or the game is completed
      clearInterval(intervalId)
    }
  }, [])

  const formattedTimer = new Date(timer * 1000).toISOString().substr(14, 5)

  return (
    <div className='max-w-[1110px] mx-auto bg-backgroundWhite flex flex-col justify-center items-center gap-[85px] pb-6 md:pb-12 lg:pb-16'>
      <div className='flex justify-between p-6 w-full md:p-10 lg:p-16'>
        <h2 className='text-[24px] text-mainTextGray font-bold md:text-[40px]'>memory</h2>
        <button onClick={() => setIsMobileModal(true)} className='font-bold text-backgroundWhite py-[10px] px-[18px] bg-mainButtonOrange rounded-full md:hidden'>Menu</button>
        <div className='hidden md:flex justify-between gap-4 text-[20px]'>
          <RestartButton />
          <NewGameButton setIsMobileModal={setIsMobileModal} setIsGameStarted={setIsGameStarted}/>
        </div>
      </div>
      
      {selectedTheme === 'Numbers' && (
        <div className='flex justify-center mb-4'>
          {generateNumbersContent(gridSize, moves, setMoves)}
        </div>
      )}

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
      
    </div>
  );
};

export default GameBoard;
