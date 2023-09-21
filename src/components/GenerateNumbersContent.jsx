import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const generateNumbersContent = (gridSize, moves, setMoves) => {

  const {shuffledNumbers, setShuffledNumbers, clickedIndices, setClickedIndices, foundPairs, setFoundPairs, resetEffect, setResetEffect} = useContext(Context)

  const numRows = parseInt(gridSize.split('x')[0]);
  const numCols = parseInt(gridSize.split('x')[1]);

  //Calculate total possible pairs based on rows and cols
  const totalPairs = (numRows * numCols) / 2
  
  //convert totalPairs value to an array
  const initialNumbers = Array.from({length: totalPairs}, (_, index) => index + 1)
  
  //duplicate the numbers in the array so that pairing of 2 numbers is possible
  const numbers = [...initialNumbers, ...initialNumbers]

  useEffect(() => {
    setShuffledNumbers(shuffleArray(numbers));
    setResetEffect(false)
  }, [resetEffect]);
  
  const handleNumberClick = (index) => {
  if (!foundPairs.includes(index) && clickedIndices.length < 2) {
    const updatedClickedIndices = [...clickedIndices, index];
    setClickedIndices(updatedClickedIndices);
    
    if (clickedIndices.length === 1) {
      if (shuffledNumbers[clickedIndices[0]] === shuffledNumbers[index]) {
        const updatedFoundPairs = [...foundPairs, clickedIndices[0], index];
        setFoundPairs(updatedFoundPairs);
        setClickedIndices([])
        } else {
          setTimeout(() => {
            setClickedIndices([]);
          }, 1000);
        }
        setMoves(moves + 1)
      } 
    }
  };

  const classList = shuffledNumbers.map((number, idx) => {
    let classNames = 'flex justify-center items-center rounded-full transition duration-300';
  
    if (foundPairs.includes(idx)) {
      classNames += ' bg-mainSelectionBlueIdle';
    } else if (clickedIndices.includes(idx)) {
      classNames += ' bg-mainButtonOrange';
    } else {
      classNames += ' bg-mainSelectionBlue hover:bg-secondButtonGrayHover';
    }
    
    return classNames;
  });
  
  return (
    <div className={`cursor-pointer grid grid-cols-4 auto-rows-fr gap-3 h-[90vw] w-[90vw] sm:h-[80vw] sm:w-[80vw] md:h-[70vw] md:w-[70vw] md:gap-5 lg:h-[40vw] lg:w-[40vw] lg:max-w-[532px] lg:max-h-[532px] 
    ${gridSize === '6x6' && 'grid-cols-6'}
    `}>
      {shuffledNumbers.map((number, idx) => (
        <div
          key={idx}
          className={classList[idx]}
          onClick={() => handleNumberClick(idx)}
        >
          {clickedIndices.includes(idx) || foundPairs.includes(idx) ? (
            <p className='text-[40px] font-bold text-backgroundWhite'>
              {number}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default generateNumbersContent
