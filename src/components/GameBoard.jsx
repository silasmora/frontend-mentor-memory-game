import React from 'react'
import generateNumbersContent from './GenerateNumbersContent';

const GameBoard = ({ gameSettings }) => {
  const { selectedTheme, totalPlayers, gridSize } = gameSettings;

  return (
    <div className='border-2 bg-backgroundWhite h-screen p-6 flex flex-col gap-[80px]'>
      <div className='flex justify-between'>
        <h2 className='text-[24px] text-mainTextGray font-bold'>memory</h2>
        <button className='font-bold text-backgroundWhite py-[10px] px-[18px] bg-mainButtonOrange rounded-full'>Menu</button>
      </div>
      {selectedTheme === 'Numbers' && (
        <>
          {generateNumbersContent(gridSize)}
        </>
      )}

      {/* {selectedTheme !== 'Numbers' && (
        <>
          
        </>
      )} */}
    </div>
  );
};

export default GameBoard;
