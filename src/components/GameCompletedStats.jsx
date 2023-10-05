import React, { useContext } from 'react'
import { Context } from '../Context'
import RestartButton from './RestartButton'
import NewGameButton from './NewGameButton'

export const GameCompletedStats = ({ totalPlayers, setIsGameStarted }) => {

  const {moves, formattedTimer, players} = useContext(Context)

  // Find the maximum number of pairs found by any player
  const maxPairsFound = Math.max(...players.map((player) => player.pairsFound));

  // Identify players who have found the same maximum number of pairs
  const tiedPlayers = players.filter((player) => player.pairsFound === maxPairsFound);

  return (
    <div className='absolute inset-0 bg-black/70 h-screen z-10 px-6 flex flex-col justify-center items-center md:px-14'>
      <div className='bg-backgroundWhite rounded-[20px] flex flex-col gap-4 p-6 text-[18px] font-bold w-full text-center md:px-14 md:py-12 lg:max-w-[654px]'>
      
        {totalPlayers === '1' ? (
          <>
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
          </>
        ) : (
          <>
            <h1 className='text-mainTextGray text-2xl font-bold md:text-5xl'>
              {tiedPlayers.length === 1
                ? `${tiedPlayers[0].name} Wins!`
                : tiedPlayers.length > 1
                ? "It's a tie!"
                : players.length > 0
                ? `${players.find((player) => player.pairsFound === maxPairsFound).name} Wins!`
                : "It's a tie!"}
            </h1>
            <p className='text-grayBlue text-sm font-bold md:text-[18px] lg:pb-6'>Game over! Here are the results...</p>
            <div className='flex flex-col gap-2 lg:gap-4'>
            {players
              .sort((a, b) => b.pairsFound - a.pairsFound)
              .map((player, idx) => (
              <div key={idx} className={`flex justify-between items-center rounded-lg font-bold p-4 md:py-6 md:px-8 ${
                tiedPlayers.includes(player) ? 'bg-mainTextGray' : 'bg-secondButtonIdle'
              }`}>
                <p className={` text-[13px] md:text-[18px] ${tiedPlayers.includes(player) ? 'text-backgroundWhite' : 'text-grayBlue'}`}>{tiedPlayers.includes(player) ? `${player.name} (Winner!) ` : player.name}</p>
                <p className={`text-xl md:text-3xl ${tiedPlayers.includes(player) ? 'text-backgroundWhite' : 'text-mainSelectionBlueHover'}`}>{player.pairsFound} Pairs</p>
              </div>
            ))}
            </div>
          </>
        )}
        <div className='flex flex-col gap-4 md:flex-row lg:pt-6'>
          <RestartButton isGameCompletedStats={true} />
          <NewGameButton isGameCompletedStats={true} setIsGameStarted={setIsGameStarted}/>
        </div>
      </div>
    </div>
  )
}
