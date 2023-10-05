import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import { GameCompletedStats } from './GameCompletedStats';
import icons from '../icons';

const generateContent = (selectedTheme, gridSize, totalPlayers, moves, setMoves, handleMove, setIsGameStarted) => {

  const {shuffledNumbers, setShuffledNumbers, shuffledIcons, setShuffledIcons, clickedIndices, setClickedIndices, foundPairs, setFoundPairs, resetEffect, setResetEffect, isGameCompleted, setIsGameCompleted, shuffleArray, currentPlayerIndex, players, setPlayers} = useContext(Context)
  
  const numRows = parseInt(gridSize.split('x'));
  const numCols = parseInt(gridSize.split('x'));
  
  //Calculate total possible pairs based on rows and cols
  const totalPairs = (numRows * numCols) / 2
  
  //convert totalPairs value to an array
  const initialNumbers = Array.from({length: totalPairs}, (_, index) => index + 1)
  
  //duplicate the numbers in the array so that pairing of 2 numbers is possible
  const numbers = [...initialNumbers, ...initialNumbers]

  const totalIcons = 18; // Total number of icons available
  const totalIconPairs = gridSize === '4x4' ? 8 : totalIcons; // Calculate total pairs based on grid size

  // Duplicate the icons in the array so that pairing of 2 icons is possible
  const iconPairs = [...icons.slice(0, totalIconPairs), ...icons.slice(0, totalPairs)];
  
  useEffect(() => {
    if (selectedTheme === 'Numbers') {
      setShuffledNumbers(shuffleArray(numbers));
    } else if (selectedTheme === 'Icons') {
      setShuffledIcons(shuffleArray(iconPairs))
    }
    setResetEffect(false)
  }, [resetEffect]);

  const handleNumberClick = (index) => {
    if (!foundPairs.includes(index) && clickedIndices.length < 2) {
      const updatedClickedIndices = [...clickedIndices, index];
      setClickedIndices(updatedClickedIndices);
      
      if (clickedIndices.length === 1) {
        if (selectedTheme === 'Numbers') {
          // For numbers theme, compare numbers
          if (shuffledNumbers[clickedIndices[0]] === shuffledNumbers[index]) {
            const updatedFoundPairs = [...foundPairs, clickedIndices[0], index];
            setFoundPairs(updatedFoundPairs);
            setClickedIndices([]);

            const currentPlayer = players[currentPlayerIndex]
            const updatedPlayers = [...players]
            updatedPlayers[currentPlayerIndex] = {
              ...currentPlayer,
              score: currentPlayer.score + 1,
              pairsFound: currentPlayer.pairsFound + 1
            }
            setPlayers(updatedPlayers)
          } else {
            setTimeout(() => {
              setClickedIndices([]);
              handleMove()
            }, 1000);
          }
        } else {
          // For icons theme, compare icon IDs
          if (shuffledIcons[clickedIndices[0]].id === shuffledIcons[index].id) {
            const updatedFoundPairs = [...foundPairs, clickedIndices[0], index];
            setFoundPairs(updatedFoundPairs);
            setClickedIndices([]);

            const currentPlayer = players[currentPlayerIndex]
            const updatedPlayers = [...players]
            updatedPlayers[currentPlayerIndex] = {
              ...currentPlayer,
              score: currentPlayer.score + 1,
              pairsFound: currentPlayer.pairsFound + 1
            }
            setPlayers(updatedPlayers)
          } else {
            setTimeout(() => {
              setClickedIndices([]);
              handleMove()
            }, 1000);
          }
        }
        setMoves(moves + 1);
      }
    }
  };
  

  // This will display the game results when all pairs are found
  useEffect(() => {
    if (foundPairs.length === totalPairs * 2) {
      setIsGameCompleted(true)
    } else {
      setIsGameCompleted(false)
    }
  }, [foundPairs])


  const classListNumbers = shuffledNumbers.map((number, idx) => {
    let classNames = 'flex justify-center items-center rounded-full transition duration-300';
  
    if (foundPairs.includes(idx)) {
      classNames += ' bg-mainSelectionBlueIdle';
    } else if (clickedIndices.includes(idx)) {
      classNames += ' bg-mainButtonOrange';
    } else {
      classNames += ' bg-mainSelectionBlue hover:bg-secondButtonGrayHover';
    }
    
    return classNames;
  })
  const classListIcons = shuffledIcons.map((number, idx) => {
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
    <>
      <div className={`cursor-pointer grid grid-cols-4 auto-rows-fr gap-3 h-[90vw] w-[90vw] sm:h-[80vw] sm:w-[80vw] md:h-[70vw] md:w-[70vw] md:gap-5 lg:h-[40vw] lg:w-[40vw] lg:max-w-[572px] lg:max-h-[572px] 
      ${gridSize === '6x6' && 'grid-cols-6'}
      `}>
        {selectedTheme === 'Numbers' ? (
          shuffledNumbers.map((number, idx) => (
            <div
              key={idx}
              className={classListNumbers[idx]}
              onClick={() => handleNumberClick(idx)}
            >
              {clickedIndices.includes(idx) || foundPairs.includes(idx) ? (
                <p className='text-[24px] md:text-[56px] font-bold text-backgroundWhite'>
                  {number}
                </p>
              ) : null}
            </div>
          ))
        ) : (
          shuffledIcons.map((icon, idx) => (
            <div
              key={idx}
              className={classListIcons[idx]}
              onClick={() => handleNumberClick(idx)}
            >
              {clickedIndices.includes(idx) || foundPairs.includes(idx) ? (
                <img className='h-1/2 w-1/2' src={icon.url} />
              ) : null}
            </div>
          ))
        )}
      </div>
      {isGameCompleted && (
        <GameCompletedStats totalPlayers={totalPlayers} setIsGameStarted={setIsGameStarted}/>
      )}
    </>
  );
};

export default generateContent
