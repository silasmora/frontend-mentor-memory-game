import React, { useContext } from 'react'
import RestartButton from './RestartButton'
import NewGameButton from './NewGameButton'
import { Context } from '../Context'


const MobileMenuModal = ({ setIsGameStarted }) => {

  const {isMobileModal, setIsMobileModal} = useContext(Context)

  return (
    <>
      {isMobileModal && (
        <div className='absolute inset-0 bg-black/70 h-screen z-10 px-6 flex flex-col justify-center items-center'>
          <div className='bg-backgroundWhite rounded-lg flex flex-col gap-4 p-6 text-[18px] font-bold max-w-[500px] w-full'>
            
            <RestartButton setIsMobileModal={setIsMobileModal}/>
    
            <NewGameButton setIsMobileModal={setIsMobileModal} setIsGameStarted={setIsGameStarted}/>
    
            <button onClick={() => setIsMobileModal(false)} className='bg-secondButtonGray rounded-full py-3'>
              Resume Game
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenuModal