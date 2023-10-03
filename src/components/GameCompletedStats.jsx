import React, { useContext } from 'react'
import { Context } from '../Context'
import RestartButton from './RestartButton'
import NewGameButton from './NewGameButton'

export const GameCompletedStats = () => {

  const {moves, formattedTimer} = useContext(Context)

  return (
    <div className='absolute inset-0 bg-black/70 h-screen z-10 px-6 flex flex-col justify-center items-center md:px-14'>
      <div className='bg-backgroundWhite rounded-[20px] flex flex-col gap-4 p-6 text-[18px] font-bold w-full text-center md:px-14 md:py-12 lg:max-w-[654px]'>
      
        <h1 className='text-mainTextGray text-2xl font-bold md:text-5xl'>You did it!</h1>
        <p className='text-grayBlue text-sm font-bold md:text-[18px] lg:pb-6'>Game over! Here's how you got on...</p>
        <div className='flex flex-col gap-2 lg:gap-4'>
          <div className='bg-secondButtonIdle flex justify-between items-center rounded-lg font-bold p-4 md:py-6 md:px-8'>
            <p className='text-grayBlue text-[13px] md:text-[18px]'>Time Elapse</p>
            <p className='text-mainSelectionBlueHover text-xl md:text-3xl'>{formattedTimer}</p>
          </div>
          <div className='bg-secondButtonIdle flex justify-between items-center rounded-lg font-bold p-4 md:py-6 md:px-8'>
            <p className='text-grayBlue text-[13px] md:text-[18px]'>Moves Taken</p>
            <p className='text-mainSelectionBlueHover text-xl md:text-3xl'>{moves} Moves</p>
          </div>
        </div>
        <div className='flex flex-col gap-4 md:flex-row lg:pt-6'>
          <RestartButton isGameCompletedStats={true}/>
          <NewGameButton isGameCompletedStats={true}/>
        </div>
      </div>
    </div>
  )
}
