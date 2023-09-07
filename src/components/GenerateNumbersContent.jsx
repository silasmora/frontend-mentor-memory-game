import React, { useEffect, useState } from 'react'

const shuffleArray = (array) => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

const generateNumbersContent = (gridSize) => {

  const numRows = parseInt(gridSize.split('x')[0]);
  const numCols = parseInt(gridSize.split('x')[1]);

  //Generate pairs of numbers for the game board
  const totalPairs = (numRows * numCols) / 2
  const initialNumbers = Array.from({length: totalPairs }, (_, index) => index + 1)
  const numbers = [...initialNumbers, ...initialNumbers]

  //Shuffle the numbers only once when the component is first rendered
  const [shuffledNumbers, setShuffledNumbers] = useState([])

  useEffect(() => {
    setShuffledNumbers(shuffleArray(numbers))
  }, [])
  
  //state to track which numbers
  const [clickedNumbers, setClickedNumbers] = useState(new Array(numbers.length).fill(false))

  const handleNumberClick = (index) => {
    //Toggle the clicked state for the clicked number
    const updatedClickedNumbers = [...clickedNumbers]
    updatedClickedNumbers[index] = !updatedClickedNumbers[index]
    setClickedNumbers(updatedClickedNumbers)
  }

  // Return the Numbers content
  return (
    <div className='grid grid-cols-4 gap-3'>
      {numbers.map((number, idx) => (
        <div key={idx} className={`rounded-full flex justify-center items-center h-[72px] w-[72px] bg-mainSelectionBlue ${clickedNumbers[idx] ? 'bg-mainButtonOrange' : 'bg-mainSelectionBlue'}`}
          onClick={() => handleNumberClick(idx)}
        >
          
          {clickedNumbers[idx] ? (
            <p className='text-[40px] font-bol text-backgroundWhite cursor-pointer'>
            {number}
          </p>
          ) : null}
          
        </div>
      ))}
    </div>
  );
}

export default generateNumbersContent